import { useContext } from 'react'
import { AppContext } from './context/AppContext' // Import the global context
import RealMessageList from 'Components/Chat/MessageList'
import logo from './assets/logo.webp'
import './App.css'
import Chat from './Components/Chat/Chat'
import Home from './Components/Home/Home'
import InteractiveGraphic from './Components/InteractiveGraphic/InteractiveGraphic'
import { Paper, Typography } from '@mui/material'
import ResponderMessageList from 'Components/Chat/ResponderMessageList'

function App() {
  const context = useContext(AppContext)
  if (!context) throw new Error('App must be used within an AppProvider')

  const { userType, setUserType } = context

  const renderComponent = () => {
    switch (userType) {
      case 'civilian':
        return <RealMessageList />
      case 'victim':
        return <RealMessageList/>
      case 'responder':
        return (
          <>
            <ResponderMessageList/>
          </>
        )
      default:
        return <Home onSelectComponent={setUserType} />
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Paper>
          <img src={logo} alt='Logo' className='logo' />
        </Paper>
      </header>
      <Paper elevation={0}>
        <div>{renderComponent()}</div>
      </Paper>
    </div>
  )
}

export default App
