'use client'
import { Paper, Typography } from '@mui/material'
import { useContext } from 'react'
import { AppContext } from '../AppContext'

export default function Header() {
  const context = useContext(AppContext)
  if (!context) return
  const { userType } = context
  return (
    <header className='App-header'>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com'/>
      <link
        href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
        rel='stylesheet'
      ></link>
      <link
        href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined'
        rel='stylesheet'
      />

      {/* <Paper
        sx={{
          backgroundColor: (theme) =>
            userType ? theme.palette.primary.main : ''
        }}
      >
        <Typography variant='h5' className='text-center p-2'>AidPulse</Typography>
      </Paper> */}
    </header>
  )
}
