'use client'

import { AppContext } from '@/app/AppContext'
import { Fade, IconButton, Box, Typography } from '@mui/material' // Import MUI components
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Image from 'next/image'
import { useContext, useState } from 'react'

interface InteractiveGraphicProps {
  title: string
  buttonUrl: string
}

const InteractiveGraphic = ({ buttonUrl, title }: InteractiveGraphicProps) => {
  const [showImage, ] = useState(false)
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('AppContext not found')
  }

  const { hasGraphic, setUserType } = context
  
  // Handler for the back button
  const handleBack = () => {
    // Setting userType to empty string will render the WelcomeScreen
    setUserType("");
  };

  return (
    <div className='InteractiveGraphic'>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: 'black' }}>
        <IconButton 
          onClick={handleBack}
          aria-label="back to home"
          sx={{ mr: 1, color: 'primary.main' }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
          Back to Home
        </Typography>
      </Box>
      
      <div style={{ backgroundColor: 'black', padding: '20px' }}>
        <Fade in={hasGraphic} timeout={1000}>
          {/* <Button
            variant="contained"
            color="primary"
            className="interactive-button"
            onClick={handleButtonClick}
            sx={{ mt: 2 }}
          >
            Show Interactive Graphic
          </Button> */}
          <Image
            src='/assets/ScatterGif.gif'
            height={100}
            width={100}
            alt='Interactive Graphic'
          />
        </Fade>

        {showImage && (
          <div className='interactive-image'>
            <Image src={buttonUrl} alt='Interactive Graphic' height={100} width={100}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default InteractiveGraphic
