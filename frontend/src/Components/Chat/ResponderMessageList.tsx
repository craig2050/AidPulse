import { Avatar, useTheme } from '@mui/material'
import {
  VirtuosoMessageList,
  VirtuosoMessageListLicense,
  VirtuosoMessageListMethods,
  VirtuosoMessageListProps
} from '@virtuoso.dev/message-list'
import InteractiveGraphic from 'Components/InteractiveGraphic/InteractiveGraphic'
import { useRef } from 'react'
import { Message } from 'types/types'
import logo from '../../assets/logo.webp'
import ChatInput from './ChatInput'

const key = process.env.VIRTUOSO_KEY || ''

const ItemContent: VirtuosoMessageListProps<Message, null>['ItemContent'] = ({
  data
}: {
  data: Message
}) => {
  const ownMessage = data.user === 'me'
  const theme = useTheme()

  return (
    <div
      style={{
        paddingBottom: '2rem',
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: data.user === 'me' ? 'row-reverse' : 'row'
      }}
    >
      {data.user !== 'me' && (
        <Avatar style={{ backgroundColor: '#1E1E1E' }}>
          {' '}
          <img
            alt='AidPulseLogo'
            src={logo}
            style={{ height: 24, width: 24 }}
          ></img>
        </Avatar>
      )}

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

export default function ResponderMessageList() {
  const virtuoso = useRef<VirtuosoMessageListMethods<Message, null>>(null)
  return (
    <>
      <InteractiveGraphic title={'graphic'} buttonUrl={''} />
      <div
        className='tall-example'
        style={{
          height: '70dvh',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '80%'
        }}
      >
        <VirtuosoMessageListLicense licenseKey={key}>
          <VirtuosoMessageList<Message, null>
            ref={virtuoso}
            style={{ flex: 1, backgroundColor: 'black' }}
            computeItemKey={({ data }: { data: Message }) => data.key}
            initialLocation={{ index: 'LAST', align: 'end' }}
            shortSizeAlign='bottom-smooth'
            ItemContent={ItemContent}
          />
        </VirtuosoMessageListLicense>
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
    </>
  )
}
