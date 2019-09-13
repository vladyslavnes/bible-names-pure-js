import React, { useState } from 'react'
import './App.css'
import Header from './components/Header/Header.jsx'
import GameSettings from './components/GameSettings/GameSettings.jsx'
import GamePage from './components/GamePage/GamePage.jsx'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LANGUAGES from './assets/data/languages.json'

function App () {
  const [language, setLanguage] = useState('ru')
  const [config, setConfig] = useState({})

  return (
    <Router>
      <div className='App'>
        <Header
          title={LANGUAGES.title[language]}
          setLanguage={lang => {
            setLanguage(lang)
          }}
        />
        <Route
          exact
          path='/'
          render={props => (
            <GameSettings
              language={language}
              saveConfig={config => {
                setConfig(config)
              }}
            />
          )}
        />
        <Route
          path='/game'
          render={props => <GamePage language={language} config={config} />}
        />
      </div>
    </Router>
  )
}

export default App
