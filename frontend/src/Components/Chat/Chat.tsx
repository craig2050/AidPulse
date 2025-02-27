import { useEffect, useState } from 'react'
import './Chat.css'
import MessageInput from './Message/MessageInput'
import MessageList from './Message/MessageList'
import data from '../../questions.json'

function Chat({ onSelectComponent }: { onSelectComponent: any }) {
  const [messages, setMessages] = useState<string[]>([])

  const combinedData = Object.values(data).reduce((acc: any, section) => {
    if (section.data && Array.isArray(section.data)) {
      acc.push(...section.data)
    }
    return acc
  }, [])

  useEffect(() => {
    const objectWithEmptyValue = combinedData.find(
      (item: any) => item.value === ''
    )
    if (objectWithEmptyValue) {
      // Pass objectWithEmptyValue to LLM
      console.log('Object with empty value:', objectWithEmptyValue)
      // Add your LLM call here
    }
  }, [combinedData])

  const handleSendMessage = (message: string) => {
    setMessages([...messages, message])
  }

  return (
    <div className='Chat'>
      <button className='back-button' onClick={() => onSelectComponent('Home')}>
        Back
      </button>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default Chat
