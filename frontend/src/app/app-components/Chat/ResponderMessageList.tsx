"use client";

import { Avatar, useTheme, Button, Typography, Paper, Grid, Box } from "@mui/material";
import {
  VirtuosoMessageList,
  VirtuosoMessageListLicense,
  VirtuosoMessageListMethods,
  VirtuosoMessageListProps,
} from "@virtuoso.dev/message-list";
import { useRef, useState } from "react";
// import ChatInput from "./ChatInput";
import Image from "next/image";
import { Message } from "@/app/types/types";
import InteractiveGraphic from "../InteractiveGraphic/InteractiveGraphic";
import ChartJS from "../Chart/Chart";

const key = process.env.NEXT_PUBLIC_VIRTUOSO_KEY || "";

const ItemContent: VirtuosoMessageListProps<Message, null>["ItemContent"] = ({
  data,
}: {
  data: Message;
}) => {
  const ownMessage = data.user === "me";
  const theme = useTheme();

  return (
    <div
      style={{
        paddingBottom: "2rem",
        display: "flex",
        alignItems: "flex-end",
        flexDirection: data.user === "me" ? "row-reverse" : "row",
      }}
    >
      {data.user !== "me" && (
        <Avatar style={{ backgroundColor: "#1E1E1E" }}>
          {" "}
          <Image
            alt="AidPulseLogo"
            src="/assets/logo.webp"
            height={24}
            width={24}
          ></Image>
        </Avatar>
      )}

      <div
        style={{
          maxWidth: "65%",
          marginLeft: data.user === "me" ? undefined : 8, // Space between avatar and message
          marginRight: data.user === "me" ? 8 : undefined, // Space for "me" messages
          background: ownMessage
            ? theme.palette.primary.main
            : theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: "1rem",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {data.text}
      </div>
    </div>
  );
};

// Chart types and their labels
const chartTypes = [
  { id: "disaster", label: "Disaster Types" },
  { id: "resource", label: "Resource Requests" },
  { id: "household", label: "Household Composition" },
  { id: "utility", label: "Utility Outages" },
  { id: "medical", label: "Medical Assistance" },
  { id: "shelter", label: "Shelter Status" },
  { id: "gender", label: "Gender Distribution" },
];

export default function ResponderMessageList() {
  const virtuoso = useRef<VirtuosoMessageListMethods<Message, null>>(null);
  const theme = useTheme();
  const [activeChart, setActiveChart] = useState("disaster");
  const [showCharts, setShowCharts] = useState(true);

  return (
    <>
      <Box sx={{ p: 2, mb: 2 }}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Disaster Relief Data Visualizations
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Interactive visualizations showing disaster relief data for victims affected by various types of disasters. 
            These visualizations help emergency response teams identify priorities and allocate resources effectively.
          </Typography>
          
          {showCharts && (
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 2, height: '400px', borderRadius: 2 }}>
                    <ChartJS chartType={activeChart} height="360px" />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 2, height: '400px', borderRadius: 2 }}>
                    <ChartJS 
                      chartType={activeChart === "disaster" ? "household" : 
                              activeChart === "resource" ? "utility" : 
                              activeChart === "household" ? "shelter" : 
                              activeChart === "utility" ? "gender" : 
                              activeChart === "medical" ? "disaster" : 
                              activeChart === "shelter" ? "medical" : "resource"} 
                      height="360px" 
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {chartTypes.map((chart) => (
              <Button
                key={chart.id}
                variant={activeChart === chart.id ? "contained" : "outlined"}
                color="primary"
                onClick={() => {
                  setActiveChart(chart.id);
                  setShowCharts(true);
                }}
                sx={{
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  textTransform: "none",
                  ...(activeChart === chart.id ? {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    "&:hover": { backgroundColor: theme.palette.primary.dark },
                  } : {}),
                }}
              >
                {chart.label}
              </Button>
            ))}
          </Box>
        </Paper>
      </Box>
      
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Additional Data Insights
        </Typography>
        <InteractiveGraphic title={"Disaster Response Interactive Map"} buttonUrl={""} />
      </Box>
    </>
  );
}
