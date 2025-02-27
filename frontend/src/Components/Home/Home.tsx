import { EmojiPeople, HealthAndSafety, Support } from "@mui/icons-material";
import { Button, Box } from "@mui/material";

function Home({ onSelectComponent }: { onSelectComponent: any }) {
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
      }}
    >
      {/* Civilian Button - Centered Vertically */}
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
          className="home-button"
          onClick={() => onSelectComponent("civilian")}
          color="success"
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
          Get Help
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
          Volunteer
        </Button>

        <Button
          variant="contained"
          className="home-button"
          onClick={() => onSelectComponent("responder")}
          color="error"
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
          Responder
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
