'use client'

import { useContext, useEffect, useState } from 'react'
import { AppContext } from './AppContext'
import MessageList from './components/Chat/MessageList'
import ResponderMessageList from './components/Chat/ResponderMessageList'
import { Paper } from '@mui/material'
import Image from 'next/image'
import Home from './components/Home/Home'

export default function App() {
  const context = useContext(AppContext)
  if (!context) throw new Error('App must be used within an AppProvider')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const { userType } = context

  const renderComponent = () => {
    switch (userType) {
      case 'victim':
        return <MessageList />
      case 'volunteer':
        return (
          <>
            <ResponderMessageList />
          </>
        )
      case 'responder':
        return (
          <>
            <ResponderMessageList />
          </>
        )
      default:
        return <Home />
    }
  }

  return (
    <div className='App'>
      <Paper elevation={0}>
        <div>{renderComponent()}</div>
      </Paper>
    </div>
  )
}
