import { useState } from 'react'

function App() {
  const [message] = useState('Hello, Popup!')

  return (
    <>
      <p>{message}</p>
    </>
  )
}

export default App
