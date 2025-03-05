"use client";

import { Avatar, useTheme, Button, Typography, Paper, Grid, Box, IconButton, Card, CardContent, Tabs, Tab, Divider, Chip } from "@mui/material";
import {
  VirtuosoMessageList,
  VirtuosoMessageListLicense,
  VirtuosoMessageListMethods,
  VirtuosoMessageListProps,
} from "@virtuoso.dev/message-list";
import { useRef, useState, useContext } from "react";
import Image from "next/image";
import { Message } from "@/app/types/types";
import InteractiveGraphic from "../InteractiveGraphic/InteractiveGraphic";
import ChartJS from "../Chart/Chart";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BarChartIcon from '@mui/icons-material/BarChart';
import MapIcon from '@mui/icons-material/Map';
import PieChartIcon from '@mui/icons-material/PieChart';
import { AppContext } from "@/app/AppContext";

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
  { id: "disaster", label: "Disaster Types", icon: <PieChartIcon /> },
  { id: "resource", label: "Resource Requests", icon: <BarChartIcon /> },
  { id: "household", label: "Household Composition", icon: <BarChartIcon /> },
  { id: "utility", label: "Utility Outages", icon: <PieChartIcon /> },
  { id: "medical", label: "Medical Assistance", icon: <PieChartIcon /> },
  { id: "shelter", label: "Shelter Status", icon: <PieChartIcon /> },
  { id: "gender", label: "Gender Distribution", icon: <PieChartIcon /> },
];

export default function ResponderMessageList() {
  const virtuoso = useRef<VirtuosoMessageListMethods<Message, null>>(null);
  const theme = useTheme();
  const [activeChart, setActiveChart] = useState("disaster");
  const [showCharts, setShowCharts] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  
  // Use AppContext to navigate back to welcome screen
  const context = useContext(AppContext);
  if (!context) throw new Error("Component must be used within an AppProvider");
  const { setUserType } = context;
  
  const handleBack = () => {
    // Setting userType to empty string will render the WelcomeScreen
    setUserType("");
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header with back button */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2, 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: theme.palette.background.paper,
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <IconButton 
          onClick={handleBack}
          aria-label="back to home"
          sx={{ mr: 1, color: theme.palette.primary.main }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Responder Dashboard
        </Typography>
        <Chip 
          label="Active Responder" 
          color="primary" 
          size="small" 
          sx={{ ml: 'auto', borderRadius: '16px' }}
        />
      </Box>
      
      {/* Tabs for navigation */}
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        variant="fullWidth"
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Tab label="Data Visualizations" icon={<BarChartIcon />} iconPosition="start" />
        <Tab label="Interactive Map" icon={<MapIcon />} iconPosition="start" />
      </Tabs>
      
      {/* Main content area */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {/* Data Visualizations Tab */}
        {activeTab === 0 && (
          <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.primary.main }}>
                Disaster Relief Data Visualizations
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Interactive visualizations showing disaster relief data for victims affected by various types of disasters. 
                These visualizations help emergency response teams identify priorities and allocate resources effectively.
              </Typography>
              
              {/* Chart filters as chips */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {chartTypes.map((chart) => (
                  <Chip
                    key={chart.id}
                    label={chart.label}
                    icon={chart.icon}
                    onClick={() => {
                      setActiveChart(chart.id);
                      setShowCharts(true);
                    }}
                    color={activeChart === chart.id ? "primary" : "default"}
                    variant={activeChart === chart.id ? "filled" : "outlined"}
                    sx={{ 
                      borderRadius: '16px',
                      '& .MuiChip-label': { px: 1 },
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': { transform: 'translateY(-2px)' }
                    }}
                  />
                ))}
              </Box>
              
              {/* Charts */}
              {showCharts && (
                <Box sx={{ mb: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Card elevation={2} sx={{ p: 2, height: '400px', borderRadius: 2, overflow: 'hidden' }}>
                        <ChartJS chartType={activeChart} height="360px" />
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              )}
              
              {/* Data summary */}
              <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Key Insights:
                </Typography>
                <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
                  <li>Wildfire is the most common disaster type affecting victims</li>
                  <li>Shelter and water are the most requested resources</li>
                  <li>Over 60% of affected households include children</li>
                  <li>Power outages are reported by 78% of victims</li>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
        
        {/* Interactive Map Tab */}
        {activeTab === 1 && (
          <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.primary.main }}>
                Disaster Response Interactive Map
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Geospatial visualization of disaster-affected areas and victim locations. 
                This map helps responders coordinate rescue and relief operations efficiently.
              </Typography>
              
              <Box sx={{ height: '500px', width: '100%', position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                <InteractiveGraphic title={"Disaster Response Interactive Map"} buttonUrl={""} />
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}
