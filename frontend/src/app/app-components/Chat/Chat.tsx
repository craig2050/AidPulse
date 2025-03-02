import { LocationData } from '@/app/types/types'
// import data from '@/data/questions.json'
import { useEffect, useState } from 'react'
import './Chat.css'
interface ChatProps {
  onSelectComponent: (componentName: string) => void
}

function Chat({ onSelectComponent }: ChatProps) {
  // const [messages, setMessages] = useState<string[]>([])
  const [location, setLocation] = useState<LocationData | null>(null)
  const [locationError, setLocationError] = useState<string>('')
  const [locationSent, setLocationSent] = useState<boolean>(false)

  // Function to send location to backend
  const sendLocationToBackend = async (locationData: LocationData) => {
    try {
      console.log(
        '%c🔄 Sending location to backend...',
        'color: blue; font-weight: bold'
      )
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3002'
      const response = await fetch(`${apiUrl}/api/location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(locationData)
      })

      const data = await response.json()

      if (data.success) {
        console.log(
          '%c✅ Location successfully sent to backend',
          'color: green; font-weight: bold'
        )
        console.log('Backend response:', data)
        setLocationSent(true)
      } else {
        console.error(
          '%c❌ Failed to send location to backend',
          'color: red; font-weight: bold'
        )
        console.error('Error message:', data.message)
      }
    } catch (error) {
      console.error(
        '%c❌ Error connecting to backend',
        'color: red; font-weight: bold'
      )
      console.error('Error details:', error)
    }
  }

  // Request geolocation when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      console.log('Requesting geolocation from browser...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success - store coordinates
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          }

          setLocation(locationData)
          console.log(
            '%c📍 Location obtained',
            'color: green; font-weight: bold'
          )
          console.log('📍 Latitude:', locationData.latitude)
          console.log('📍 Longitude:', locationData.longitude)
          console.log('📍 Accuracy:', locationData.accuracy, 'meters')

          // Send to backend
          sendLocationToBackend(locationData)
        },
        (error) => {
          // Error handling
          setLocationError(error.message)
          console.error('Geolocation error:', error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    } else {
      setLocationError('Geolocation is not supported by this browser.')
    }
  }, [])


  // **Note from Jayde: Don't need to over think this right now, but this data manipulation is a little code smelly to me.
  // There's probably a better way to handle this from a data side so we don't have to do this. We can work it out once we have the details finalized
  // This is suspicious because the data is unpreditable -- this code is written to work with many potential incoming data models. We need to collaborate on this.


// function isQuestionDataArray(section: QuestionData[]) {
//   return (
//     Array.isArray(section) &&
//     section.length > 0 &&
//     typeof section[0].DataElementName === 'string'
//   );
// }

// const combinedData: QuestionData[] = Object.values(data).reduce<QuestionData[]>((acc, section) => {
//   if (isQuestionDataArray(section)) {
//     acc.push(...section);
//   }
//   else if (section?.data && !Array.isArray(section) && section !== null && 'data' in section) {
//     const sec = section as { data: any };
//     if (isQuestionDataArray(sec.data)) {
//       acc.push(...sec.data);
//     }
//   }
//   return acc;
// }, []);
//**************************************************************** */

  // useEffect(() => {
  //   const objectWithEmptyValue = combinedData.find(
  //     (item: any) => item.value === ''
  //   )
  //   if (objectWithEmptyValue) {
  //     // Pass objectWithEmptyValue to LLM
  //     console.log('Object with empty value:', objectWithEmptyValue)
  //     // Add your LLM call here
  //   }
  // }, [combinedData])

  // const handleSendMessage = (message: string) => {
  //   setMessages([...messages, message])
  // }

  return (
    <div className='Chat'>
      <button className='back-button' onClick={() => onSelectComponent('')}>
        Back
      </button>
      {location && (
        <div className='location-info'>
          <small>
            Your location: {location.latitude.toFixed(6)},{' '}
            {location.longitude.toFixed(6)}
          </small>
          {locationSent && <span> ✓</span>}
        </div>
      )}
      {locationError && (
        <div className='location-error'>
          <small>Location error: {locationError}</small>
        </div>
      )}
      {/* <MessageList messages={messages} /> */}
      {/* <MessageInput onSendMessage={handleSendMessage} /> */}
    </div>
  )
}

export default Chat
