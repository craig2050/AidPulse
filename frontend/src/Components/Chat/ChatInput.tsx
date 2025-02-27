import { faker } from '@faker-js/faker'
import { ArrowUpwardRounded } from '@mui/icons-material'
import MicIcon from '@mui/icons-material/Mic'
import { Button, useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list'
import { RefObject, useEffect, useRef, useState } from 'react'
import { Message } from 'types/types'

const ChatInput = ({
  virtuoso
}: {
  virtuoso: RefObject<VirtuosoMessageListMethods<Message, {}> | null>
}) => {
  const theme = useTheme()
  const [message, setMessage] = useState('')
  const [listening, setListening] = useState(false)
  const [idCounter, setIdCounter] = useState(0)

  //for development purposes only
  const hasRun = useRef(false)

  const randPhrase = () => {
    const length = Math.floor(Math.random() * 50) + 10 // Random length between 10-60 characters
    return faker.lorem.sentence(length)
  }

  function randomMessage(
    user: Message['user'],
    optionalText?: string
  ): Message {
    const length = Math.floor(Math.random() * 50) + 10 // Random length between 10-60 characters
    const text = optionalText || faker.lorem.sentence(length)
    return {
      user,
      key: `${idCounter + 1}`,
      text
    }
  }

  // Check if browser supports Speech Recognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = SpeechRecognition ? new SpeechRecognition() : null

  if (recognition) {
    recognition.continuous = false // Stops automatically after a single phrase
    recognition.interimResults = false // Only return final results
    recognition.lang = 'en-US' // Set default language (can be changed)
  }

  const handleMicClick = () => {
    if (!recognition) {
      alert('Your browser does not support voice recognition.')
      return
    }

    if (!listening) {
      setListening(true)
      recognition.start()

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setMessage(transcript)
        setListening(false)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setListening(false)
      }

      recognition.onend = () => {
        setListening(false)
      }
    } else {
      recognition.stop()
      setListening(false)
    }
  }

  const handleSendClick = () => {
    if (!message.trim()) return // Prevent sending empty messages
    const fullMessage: Message = {
      key: idCounter.toString(),
      text: message,
      user: 'me'
    }
    setIdCounter(idCounter + 1)
    virtuoso.current?.data.append(
      [fullMessage],
      ({ scrollInProgress, atBottom }) => {
        return {
          index: 'LAST',
          align: 'end',
          behavior: atBottom || scrollInProgress ? 'smooth' : 'auto'
        }
      }
    )
    setMessage('') // Clear input after sending
    setTimeout(() => {
      const botMessage = randomMessage('other')
      virtuoso.current?.data.append([botMessage])

      let counter = 0
      const interval = setInterval(() => {
        if (counter++ > 20) {
          clearInterval(interval)
        }
        virtuoso.current?.data.map((message) => {
          return message.key === botMessage.key
            ? { ...message, text: message.text + ' ' + randPhrase() }
            : message
        }, 'smooth')
      }, 150)
    }, 1000)
  }

  useEffect(() => {
    //for development purposes only
    if (hasRun.current) return
    const botMessage = randomMessage(
      'other',
      "Hello, Yunjin. I see you're in a location affected by the Los Angeles Earthquake. What do you need? "
    )
    virtuoso.current?.data.append([botMessage], 'smooth')
    hasRun.current = true // Mark as run for development strict mode workaround
  }, [])

  return (
    <TextField
      variant='outlined'
      placeholder='Type a message...'
      fullWidth
      sx={{
        width: '95vw'
      }}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      color='primary'
      slotProps={{
        input: {
          style: {
            borderRadius: 50
          },
          endAdornment: (
            <InputAdornment position='start'>
              {message ? (
                <Button
                  variant='contained'
                  onClick={handleSendClick}
                  color='primary'
                  sx={{
                    borderRadius: '50%',
                    width: 25,
                    height: 30,
                    minWidth: 0
                  }}
                >
                  <ArrowUpwardRounded />
                </Button>
              ) : (
                <IconButton
                  onClick={handleMicClick}
                  sx={{
                    color: listening ? theme.palette.primary.main : 'default'
                  }}
                >
                  <MicIcon />
                </IconButton>
              )}
            </InputAdornment>
          )
        }
      }}
    />
  )
}

export default ChatInput
