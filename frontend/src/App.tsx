import { Paper } from '@mui/material'
import RealMessageList from 'Components/Chat/MessageList'
import ResponderMessageList from 'Components/Chat/ResponderMessageList'
import { useContext } from 'react'
import './App.css'
import logo from './assets/whitelogo.webp'
import Home from './Components/Home/Home'
import { AppContext } from './context/AppContext'; // Import the global context

function App() {
  const context = useContext(AppContext)
  if (!context) throw new Error('App must be used within an AppProvider')

  const { userType } = context

  const renderComponent = () => {
    switch (userType) {
      case 'victim':
        return <RealMessageList />
      case 'volunteer':
        return (
          <>
            <ResponderMessageList/>
          </>
        )
      case 'responder':
        return (
          <>
            <ResponderMessageList/>
          </>
        )
      default:
        return <Home />
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
