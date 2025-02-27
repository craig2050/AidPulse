import { Avatar, Icon, useTheme } from '@mui/material'
import {
  VirtuosoMessageList,
  VirtuosoMessageListLicense,
  VirtuosoMessageListMethods,
  VirtuosoMessageListProps
} from '@virtuoso.dev/message-list'
import { AppContext } from 'context/AppContext'
import { useContext, useRef } from 'react'
import { Message } from 'types/types'
import logo from "../../assets/logo.webp";
import ChatInput from './ChatInput'

const ItemContent: VirtuosoMessageListProps<Message, null>['ItemContent'] = ({
  data
}: {
  data: any
}) => {
  const ownMessage = data.user === 'me'
  const context = useContext(AppContext)
  const theme = useTheme()
  if (!context) throw new Error('App must be used within an AppProvider')
  const { userType, setUserType } = context

  return (
    <div
      style={{
        paddingBottom: '2rem',
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: data.user === 'me' ? 'row-reverse' : 'row'
      }}
    >
      {data.user !== 'me' && <Avatar style={{backgroundColor: '#1E1E1E'}}> <img src={logo} style={{height: 24, width: 24}}></img></Avatar>}

      <div
        style={{
          maxWidth: '65%',
          marginLeft: data.user === 'me' ? undefined : 8, // Space between avatar and message
          marginRight: data.user === 'me' ? 8 : undefined, // Space for "me" messages
          background: ownMessage
            ? theme.palette.primary.main
            : theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: '1rem',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {data.text}
      </div>
    </div>
  )
}

export default function RealMessageList() {
  const virtuoso = useRef<VirtuosoMessageListMethods<Message, {}>>(null)

  return (
    <div
      className='tall-example'
      style={{
        height: 'calc(100vh - 84px)',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '80%'
      }}
    >
      <VirtuosoMessageListLicense licenseKey=''>
        <VirtuosoMessageList<Message, null>
          ref={virtuoso as any}
          style={{ flex: 1, backgroundColor: 'black' }}
          computeItemKey={({ data }: { data: any }) => data.key}
          initialLocation={{ index: 'LAST', align: 'end' }}
          shortSizeAlign='bottom-smooth'
          ItemContent={ItemContent}
        />
      </VirtuosoMessageListLicense>
      {/*
      <button
        onClick={() => {
          const myMessage = randomMessage('me')
          virtuoso.current?.data.append(
            [myMessage],
            ({ scrollInProgress, atBottom }) => {
              return {
                index: 'LAST',
                align: 'end',
                behavior: atBottom || scrollInProgress ? 'smooth' : 'auto'
              }
            }
          )

          setTimeout(() => {
            const botMessage = randomMessage('other')
            virtuoso.current?.data.append([botMessage])

            let counter = 0
            const interval = setInterval(() => {
              if (counter++ > 20) {
                clearInterval(interval)
              }
              virtuoso.current?.data.map((message) => {
                return message.key === botMessage.key
                  ? { ...message, text: message.text + ' ' + randPhrase() }
                  : message
              }, 'smooth')
            }, 150)
          }, 1000)
        }}
      >
        Ask the bot a question!
      </button> */}
      <div
        className='chat-input-container'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 8
        }}
      >
        <ChatInput virtuoso={virtuoso} />
      </div>
    </div>
  )
}
