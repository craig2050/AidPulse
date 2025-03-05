"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Icon, LatLngExpression, DivIcon } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Typography, Paper, Chip, Avatar } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FloodIcon from '@mui/icons-material/Water';
import HurricaneIcon from '@mui/icons-material/Air';
import EarthquakeIcon from '@mui/icons-material/Vibration';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HomeIcon from '@mui/icons-material/Home';

// Fix for Leaflet icon issue in Next.js
const fixLeafletIcon = () => {
  // Only run on the client side
  if (typeof window !== 'undefined') {
    // @ts-ignore
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: '/assets/marker-icon-2x.png',
      iconUrl: '/assets/marker-icon.png',
      shadowUrl: '/assets/marker-shadow.png',
    });
  }
};

// Sample disaster data
const disasterData = [
  {
    id: 1,
    type: 'wildfire',
    location: [34.0522, -118.2437] as LatLngExpression,
    severity: 'high',
    affectedArea: 2500, // in meters
    victims: 120,
    timestamp: new Date('2025-03-01T10:30:00'),
    description: 'Wildfire in Los Angeles area affecting residential neighborhoods',
  },
  {
    id: 2,
    type: 'flood',
    location: [37.7749, -122.4194] as LatLngExpression,
    severity: 'medium',
    affectedArea: 1800,
    victims: 85,
    timestamp: new Date('2025-03-02T14:15:00'),
    description: 'Flooding in San Francisco Bay Area after heavy rainfall',
  },
  {
    id: 3,
    type: 'hurricane',
    location: [25.7617, -80.1918] as LatLngExpression,
    severity: 'critical',
    affectedArea: 5000,
    victims: 250,
    timestamp: new Date('2025-03-03T08:45:00'),
    description: 'Hurricane making landfall in Miami with strong winds and storm surge',
  },
  {
    id: 4,
    type: 'earthquake',
    location: [37.8044, -122.2711] as LatLngExpression,
    severity: 'high',
    affectedArea: 3000,
    victims: 180,
    timestamp: new Date('2025-03-04T16:20:00'),
    description: 'Earthquake in Oakland with significant structural damage',
  },
];

// Sample responder data
const responderData = [
  {
    id: 101,
    type: 'medical',
    location: [34.0624, -118.2537] as LatLngExpression,
    capacity: 50,
    available: 22,
    description: 'Medical response team with emergency supplies',
  },
  {
    id: 102,
    type: 'rescue',
    location: [37.7849, -122.4294] as LatLngExpression,
    capacity: 30,
    available: 12,
    description: 'Search and rescue team with specialized equipment',
  },
  {
    id: 103,
    type: 'shelter',
    location: [25.7717, -80.2018] as LatLngExpression,
    capacity: 200,
    available: 85,
    description: 'Emergency shelter with food and supplies',
  },
  {
    id: 104,
    type: 'medical',
    location: [37.8144, -122.2811] as LatLngExpression,
    capacity: 75,
    available: 40,
    description: 'Field hospital with trauma specialists',
  },
];

// Component to recenter map when data changes
const MapRecenter = ({ center }: { center: LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

// Get icon based on disaster type
const getDisasterIcon = (type: string) => {
  switch (type) {
    case 'wildfire':
      return <LocalFireDepartmentIcon sx={{ color: '#ff4444' }} />;
    case 'flood':
      return <FloodIcon sx={{ color: '#33b5e5' }} />;
    case 'hurricane':
      return <HurricaneIcon sx={{ color: '#aa66cc' }} />;
    case 'earthquake':
      return <EarthquakeIcon sx={{ color: '#ffbb33' }} />;
    default:
      return <LocalFireDepartmentIcon sx={{ color: '#ff4444' }} />;
  }
};

// Get color based on severity
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low':
      return '#4285F4';
    case 'medium':
      return '#FBBC05';
    case 'high':
      return '#EA4335';
    case 'critical':
      return '#8B0000';
    default:
      return '#EA4335';
  }
};

// Get icon based on responder type
const getResponderIcon = (type: string) => {
  switch (type) {
    case 'medical':
      return <MedicalServicesIcon sx={{ color: '#00C851' }} />;
    case 'rescue':
      return <PersonPinIcon sx={{ color: '#FF8800' }} />;
    case 'shelter':
      return <HomeIcon sx={{ color: '#2BBBAD' }} />;
    default:
      return <PersonPinIcon sx={{ color: '#FF8800' }} />;
  }
};

// Create a custom icon for the map markers
const createCustomIcon = (type: string, isDisaster: boolean = true) => {
  // Define colors based on type
  let color = '#ff4444'; // default color
  
  if (isDisaster) {
    switch (type) {
      case 'wildfire': color = '#ff4444'; break;
      case 'flood': color = '#33b5e5'; break;
      case 'hurricane': color = '#aa66cc'; break;
      case 'earthquake': color = '#ffbb33'; break;
    }
  } else {
    switch (type) {
      case 'medical': color = '#00C851'; break;
      case 'rescue': color = '#FF8800'; break;
      case 'shelter': color = '#2BBBAD'; break;
    }
  }
  
  // Create a custom divIcon with CSS styling
  return new L.DivIcon({
    html: `<div style="
      background-color: ${color};
      border: 2px solid white;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 5px rgba(0,0,0,0.5);
    "></div>`,
    className: 'custom-div-icon',
    iconSize: isDisaster ? [30, 30] : [24, 24],
    iconAnchor: isDisaster ? [15, 15] : [12, 12]
  });
};

interface DisasterMapProps {
  height?: string;
  width?: string;
}

const DisasterMap: React.FC<DisasterMapProps> = ({ height = '100%', width = '100%' }) => {
  const [activeDisaster, setActiveDisaster] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([37.0902, -95.7129]); // US center
  const [mapZoom, setMapZoom] = useState(4);

  // Fix Leaflet icon issue on component mount
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  const handleDisasterClick = (id: number, location: LatLngExpression) => {
    setActiveDisaster(id);
    setMapCenter(location);
    setMapZoom(10);
  };

  return (
    <Box sx={{ height, width, position: 'relative' }}>
      {/* Disaster summary panel */}
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 1000,
          p: 2,
          maxWidth: 300,
          backgroundColor: 'rgba(33, 33, 33, 0.9)',
          borderRadius: 2,
          color: 'white',
          backdropFilter: 'blur(4px)'
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 1, color: 'error.light' }}>
            <LocalFireDepartmentIcon fontSize="small" />
          </Box>
          Active Disasters: {disasterData.length}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
          {disasterData.map((disaster) => (
            <Chip
              key={disaster.id}
              icon={getDisasterIcon(disaster.type)}
              label={`${disaster.type.charAt(0).toUpperCase() + disaster.type.slice(1)}`}
              onClick={() => handleDisasterClick(disaster.id, disaster.location)}
              color={activeDisaster === disaster.id ? 'primary' : 'default'}
              variant={activeDisaster === disaster.id ? 'filled' : 'outlined'}
              size="small"
              sx={{
                bgcolor: activeDisaster === disaster.id ? 'primary.main' : 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.25)',
                }
              }}
            />
          ))}
        </Box>
        <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', p: 1.5, borderRadius: 1, mb: 1 }}>
          <Typography variant="body2" sx={{ color: 'white', display: 'flex', alignItems: 'center', mb: 1 }}>
            <PersonPinIcon fontSize="small" sx={{ mr: 1, color: 'error.light' }} />
            <strong>{disasterData.reduce((sum, d) => sum + d.victims, 0)}</strong>
            <Box component="span" sx={{ ml: 0.5 }}>people affected</Box>
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
            <MedicalServicesIcon fontSize="small" sx={{ mr: 1, color: 'success.light' }} />
            <strong>{responderData.reduce((sum, r) => sum + r.available, 0)}</strong>
            <Box component="span" sx={{ mx: 0.5 }}>of</Box>
            <strong>{responderData.reduce((sum, r) => sum + r.capacity, 0)}</strong>
            <Box component="span" sx={{ ml: 0.5 }}>responders available</Box>
          </Typography>
        </Box>
      </Paper>

      {/* Map container */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapRecenter center={mapCenter} />

        {/* Render disaster markers and affected areas */}
        {disasterData.map((disaster) => (
          <React.Fragment key={disaster.id}>
            <Circle
              center={disaster.location}
              radius={disaster.affectedArea}
              pathOptions={{
                fillColor: getSeverityColor(disaster.severity),
                fillOpacity: 0.3,
                color: getSeverityColor(disaster.severity),
                weight: 1,
              }}
            />
            <Marker
              position={disaster.location}
              eventHandlers={{
                click: () => handleDisasterClick(disaster.id, disaster.location),
              }}
              icon={createCustomIcon(disaster.type, true)}
            >
              <Popup>
                <Typography variant="subtitle2" fontWeight="bold">
                  {disaster.type.charAt(0).toUpperCase() + disaster.type.slice(1)}
                </Typography>
                <Typography variant="body2">{disaster.description}</Typography>
                <Typography variant="body2">
                  Severity: <strong>{disaster.severity}</strong>
                </Typography>
                <Typography variant="body2">
                  Affected: <strong>{disaster.victims} people</strong>
                </Typography>
                <Typography variant="body2">
                  Reported: {disaster.timestamp.toLocaleString()}
                </Typography>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}

        {/* Render responder markers */}
        {responderData.map((responder) => (
          <Marker
            key={responder.id}
            position={responder.location}
            icon={createCustomIcon(responder.type, false)}
          >
            <Popup>
              <Typography variant="subtitle2" fontWeight="bold">
                {responder.type.charAt(0).toUpperCase() + responder.type.slice(1)} Team
              </Typography>
              <Typography variant="body2">{responder.description}</Typography>
              <Typography variant="body2">
                Capacity: <strong>{responder.available}</strong> of {responder.capacity} available
              </Typography>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default DisasterMap;
