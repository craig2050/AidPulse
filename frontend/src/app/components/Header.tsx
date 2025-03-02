'use client'
import { Paper } from '@mui/material'
import Image from 'next/image'

export default function Header() {
  return (
    <header className='App-header'>
      <Paper>
        <Image
          src='/assets/whitelogo.webp'
          alt='logo'
          className='logo'
          height={60}
          width={60}
        />
      </Paper>
    </header>
  )
}
