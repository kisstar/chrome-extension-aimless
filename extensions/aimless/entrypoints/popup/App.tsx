import { useState } from 'react'

function App() {
  const [message] = useState('Aimless Toolkit')

  return (
    <>
      <p>{message}</p>
    </>
  )
}

export default App
