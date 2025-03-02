'use client'

import { Fade } from "@mui/material"; // Import MUI's Fade transition
import { useContext, useState } from "react"
import { AppContext } from '@/app/AppContext'
import Image from 'next/image'

const InteractiveGraphic = ({ title, buttonUrl }: any) => {
  const [showImage, setShowImage] = useState(false)
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("AppContext not found")
  }

  const { hasGraphic } = context

  // const handleButtonClick = () => {
  //   setShowImage(true)
  // }

  return (
    <div className="InteractiveGraphic" style={{ backgroundColor: "black", padding: "20px" }}>
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
        <Image src='/assets/ScatterGif.gif' height={100} width={100} alt="Interactive Graphic" />
      </Fade>

      {showImage && (
        <div className="interactive-image">
          <img src={buttonUrl} alt="Interactive Graphic" />
        </div>
      )}
    </div>
  )
}

export default InteractiveGraphic
