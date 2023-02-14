import React from 'react'
import ReactDOM from 'react-dom/client'
import reset from "./assets/styles/reset.css"
import style from "./assets/styles/index.css";
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
