'use client'

import { AppContext } from '@/app/AppContext'
import { EmojiPeople, HealthAndSafety, Support } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import data from '@/data/messages.json'
import { useContext, useEffect, useState } from 'react'

function Home() {
  const [greeting, setGreeting] = useState<string>('')
  const [homeText, setHomeText] = useState<string>('')

  useEffect(() => {
    // Extract the greeting message from the JSON
    if (data.greeting) {
      setGreeting(data.greeting)
      setHomeText(data.homeText)
    }
  }, [])

  const context = useContext(AppContext)
  if (!context) throw new Error('App must be used within an AppProvider')

  const { setUserType } = context
  return (
    <Box
      className='Home'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        padding: '20px',
        height: '92dvh', // Use dynamic viewport height for mobile browsers
        overflow: 'hidden', // Prevents scrolling
        fontFamily: 'Montserrat, sans-serif' // Use the new font
      }}
    >

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Button
          variant='contained'
          className='home-button victim'
          onClick={() => setUserType('victim')}
          color='success'
          sx={{
            width: '80%',
            maxWidth: '400px',
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '10px',
            color: 'white'
          }}
        >
          <EmojiPeople fontSize='large' />I need help
        </Button>
      </Box>

      <Box
        sx={{
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          alignItems: 'center',
          paddingBottom: '20px'
        }}
      >
        <Button
          variant='contained'
          className='home-button'
          onClick={() => setUserType('victim')}
          sx={{
            width: '80%',
            maxWidth: '400px',
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '10px'
          }}
        >
          <Support fontSize='large' />I want to help
        </Button>

        <Button
          variant='contained'
          className='home-button responder'
          onClick={() => setUserType('responder')}
          sx={{
            width: '80%',
            maxWidth: '400px',
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '10px'
          }}
        >
          <HealthAndSafety fontSize='large' />I am a Responder
        </Button>
      </Box>
    </Box>
  )
}

export default Home
