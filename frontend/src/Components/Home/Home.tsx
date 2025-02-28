import { EmojiPeople, HealthAndSafety, Support } from "@mui/icons-material";
import { Button, Box, Typography } from "@mui/material";
import { useEffect, useState } from 'react'
import data from '../../messages.json' // Import the JSON file

function Home({ onSelectComponent }: { onSelectComponent: any }) {
  const [greeting, setGreeting] = useState<string>('')
  const [homeText, setHomeText] = useState<string>('');

  useEffect(() => {
    // Extract the greeting message from the JSON
    if (data.greeting) {
      setGreeting(data.greeting)
      setHomeText(data.homeText);
    }
  }, []);

  return (
    <Box
      className="Home"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        padding: "20px",
        height: "92dvh", // Use dynamic viewport height for mobile browsers
        overflow: "hidden", // Prevents scrolling
        fontFamily: 'Montserrat, sans-serif', // Use the new font
      }}
    >
      {/* Introductory Message */}
      {greeting && (
        <Typography variant="h4" sx={{ marginBottom: "10px", fontSize: "28px", fontWeight: "600" }}>
          {greeting}
        </Typography>
      )}

      <Typography variant="h6" sx={{ marginBottom: "20px", fontSize: "18px", fontWeight: "400" }} align="center">
        {homeText}
      </Typography>

      {/* Victim Button - Centered Vertically */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          className="home-button victim"
          onClick={() => onSelectComponent("victim")}
          sx={{
            width: "80%",
            maxWidth: "400px",
            borderRadius: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            padding: "10px",
            color: "white",
          }}
        >
          <EmojiPeople fontSize="large" />
          I need help.
        </Button>
      </Box>

      {/* Volunteer & Responder Buttons at Bottom */}
      <Box
        sx={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "100%",
          alignItems: "center",
          paddingBottom: "20px", // Adds some spacing from the bottom
        }}
      >
        <Button
          variant="contained"
          className="home-button"
          onClick={() => onSelectComponent("volunteer")}
          sx={{
            width: "80%",
            maxWidth: "400px",
            borderRadius: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            padding: "10px",
          }}
        >
          <Support fontSize="large" />
          I want to help.
        </Button>

        <Button
          variant="contained"
          className="home-button responder"
          onClick={() => onSelectComponent("responder")}
          sx={{
            width: "80%",
            maxWidth: "400px",
            borderRadius: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            padding: "10px",
          }}
        >
          <HealthAndSafety fontSize="large" />
          I am a Responder.
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
