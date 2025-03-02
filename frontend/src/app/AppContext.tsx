'use client'

import { createContext, useState, useEffect, ReactNode } from 'react'
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import victimData from '@/data/victimData.json'
import responderData from '@/data/responderData.json'
import { red, green, indigo } from '@mui/material/colors'

export interface AppContextType {
  userType: string
  hasGraphic: boolean
  setHasGraphic: (hasGraphic: boolean) => void
  setUserType: (component: string) => void
  theme: Theme
  userIdentifier: string
  configureNewUserSetup: () => void
  currentQuestion: number
  setCurrentQuestion: (question: number) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<string>('')
  const [hasGraphic, setHasGraphic] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [userIdentifier, setUserIdentifier] = useState('')

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType') || ''
    setUserType(storedUserType)

    const storedUserIdentifier = localStorage.getItem('userIdentifier') || ''
    setUserIdentifier(storedUserIdentifier)
  }, [])

  useEffect(() => {
    localStorage.setItem('userType', userType)
  }, [userType])

  const configureNewUserSetup = () => {
    console.log('Configuring new user setup...')
    const identifier = uuidv4()
    localStorage.setItem('userIdentifier', identifier)

    if (userType === 'victim') {
      localStorage.setItem('questionData', JSON.stringify(victimData))
    } else if (userType === 'responder') {
      localStorage.setItem('questionData', JSON.stringify(responderData))
    }
    setUserIdentifier(identifier)
  }

  const getTheme = () => {
    let primaryColor;
    if (userType === 'responder') primaryColor = red
    if (userType === 'victim') primaryColor = green
    else {
      primaryColor = indigo
    }

    return createTheme({
      palette: {
        mode: 'dark',
        primary: primaryColor
      }
    })
  }

  const theme = getTheme()

  return (
    <AppContext.Provider
      value={{
        userType,
        setUserType,
        theme,
        hasGraphic,
        setHasGraphic,
        userIdentifier,
        configureNewUserSetup,
        currentQuestion,
        setCurrentQuestion
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  )
}
