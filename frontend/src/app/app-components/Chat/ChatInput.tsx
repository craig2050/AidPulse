import { AppContext } from '@/app/AppContext'
import { ArrowUpwardRounded } from '@mui/icons-material'
import MicIcon from '@mui/icons-material/Mic'
import { Button, useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list'
import { RefObject, useContext, useEffect, useRef, useState } from 'react'
import { findFirstEmptyValue, promptFunction, updateValueById } from '@/app/utils'
import victimData from '@/data/victimData.json';
import { LLMResponse, Message } from '../../types/types'


interface ChatInputProps {
  virtuoso: RefObject<VirtuosoMessageListMethods<Message, null> | null>;
}

const ChatInput = ({
  virtuoso
}: ChatInputProps) => {
  const theme = useTheme()
  const [message, setMessage] = useState<string>('')
  const [listening, setListening] = useState<boolean>(false)
  const idCounterRef = useRef<number>(0)
  const context = useContext(AppContext)
  if (!context) throw new Error('App must be used within an AppProvider')

  // For development purposes only
  const hasRun = useRef<boolean>(false)

  const { SpeechRecognition, webkitSpeechRecognition } =
    window as WindowWithSpeechRecognition
  const RecognitionConstructor = SpeechRecognition || webkitSpeechRecognition
  const recognition: SpeechRecognition | null = RecognitionConstructor
    ? new RecognitionConstructor()
    : null

  if (recognition) {
    recognition.continuous = false // Stops automatically after a single phrase
    recognition.interimResults = false // Only return final results
    recognition.lang = 'en-US' // Set default language
  }

  const handleMicClick = (): void => {
    if (!recognition) {
      alert('Your browser does not support voice recognition.')
      return
    }

    if (!listening) {
      setListening(true)
      recognition.start()

      recognition.onresult = (event: SpeechRecognitionEvent): void => {
        const transcript: string = event.results[0][0].transcript
        setMessage(transcript)
        setListening(false)
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent): void => {
        console.error('Speech recognition error:', event.error)
        setListening(false)
      }

      recognition.onend = (): void => {
        setListening(false)
      }
    } else {
      recognition.stop()
      setListening(false)
    }
  }

  const handleSendClick = (): void => {
    if (!message.trim()) return // Prevent sending empty messages
    const fullMessage: Message = {
      key: idCounterRef.current.toString(),
      text: message,
      user: 'me'
    }
    idCounterRef.current++
    virtuoso.current?.data.append(
      [fullMessage],
      ({
        scrollInProgress,
        atBottom
      }): { index: 'LAST'; align: 'end'; behavior: 'smooth' | 'auto' } => ({
        index: 'LAST',
        align: 'end',
        behavior: atBottom || scrollInProgress ? 'smooth' : 'auto'
      })
    )

    // Parse questionData from localStorage. If not available, fallback to victimData.
    const storedQuestionData: string | null =
      localStorage.getItem('questionData')
    const parsedQuestionData = storedQuestionData
      ? (JSON.parse(storedQuestionData) as typeof victimData)
      : victimData
    updateValueById(parsedQuestionData, context.currentQuestion, message)

    setMessage('') // Clear input after sending
    setTimeout((): void => {
      const storedData: string | null = localStorage.getItem('questionData')
      const parsedData = storedData
        ? (JSON.parse(storedData) as typeof victimData)
        : victimData
      const questionObject = findFirstEmptyValue(parsedData)
      context.setCurrentQuestion(questionObject.id)
      const question: string = promptFunction(JSON.stringify(questionObject))

      generateQuestion(question)
    }, 1000)
  }

  const generateQuestion = async (question: string): Promise<void | null> => {
    const apiUrl = 'http://localhost:5005/chat'
    const payload = { prompt: question }
    console.log(question)
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data: LLMResponse = await response.json()
      const botMessage: Message = {
        user: 'other',
        key: idCounterRef.current.toString(),
        text: data.response
      }

      virtuoso.current?.data.append([botMessage], 'smooth')
      idCounterRef.current++
      hasRun.current = true // Mark as run for development strict mode workaround
    } catch (error) {
      console.error('Error communicating with LLM API:', error)
      return null
    }
  }

  useEffect(() => {
    // For development purposes only
    if (hasRun.current) return
    const storedQuestionData = localStorage.getItem('questionData')
    const parsedQuestionData = storedQuestionData
      ? (JSON.parse(storedQuestionData) as typeof victimData)
      : victimData
    const questionObject = findFirstEmptyValue(parsedQuestionData)
    context.setCurrentQuestion(questionObject.id)
    const question: string = promptFunction(JSON.stringify(questionObject))
    generateQuestion(question)
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
          style: { borderRadius: 50 },
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
