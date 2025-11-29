import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/entrypoints/content/modules/json/App'

function render() {
  const rootEl = document.createElement('div')
  let code = document.querySelector('pre')?.textContent || ''

  try {
    code = JSON.parse(code)
  }
  catch {
  }

  rootEl.id = 'json-formatter'
  rootEl.style.cssText = 'width: 100vw; height: 100vh;'
  document.body.innerHTML = ''
  document.body.appendChild(rootEl)

  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App code={code} />
    </React.StrictMode>,
  )
}

export { render }
