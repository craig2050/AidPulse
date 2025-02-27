function Home({ onSelectComponent }: { onSelectComponent: any }) {
  return (
    <div className='Home'>
      <button className='home-button' onClick={() => onSelectComponent('civilian')}>
        Civilian
      </button>
      <button
        className='home-button'
        onClick={() => onSelectComponent('volunteer')}
      >
        Volunteer
      </button>
      <button
        className='home-button'
        onClick={() => onSelectComponent('responder')}
      >
        Responders
      </button>
    </div>
  )
}

export default Home
