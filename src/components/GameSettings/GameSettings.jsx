import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './GameSettings.css'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import STRINGS from '../../assets/data/languages.json'
import { Grid, Typography, Switch } from '@material-ui/core'
import Range from './Range.jsx'

export default function GameSettings(props) {
  const [players, setPlayers] = useState([])
  const [namesCount, setNamesCount] = useState(96)
  const [isGameTimed, setIsGameTimed] = useState(false)
  const [answerTiming, setAnswerTiming] = useState(30)

  const playersCount = players.length

  const parsePlayers = players => {
    const playersData = players
      .replace(/,\s*$/, '')
      .split(/,\s?/)
      .map(playerName => ({ name: playerName.trim(), score: 0 }))
    setPlayers(playersData)

    return playersData
  }

  const getMinPlayersCount = () => (playersCount < 3 ? 2 : playersCount)
  const getMaxPlayersCount = () => {
    //* fit as many *full* cycles of players as possible
    return playersCount < 3 ? 96 : ((96 / playersCount) | 0) * playersCount
  }

  const isDataValid = () => playersCount > 1
  const getConfig = () => ({
    players,
    namesCount,
    isGameTimed,
    answerTiming
  })

  return (
    <div className="component-gamesettings">
      <div className="players-names">
        <Typography variant="h5">
          {STRINGS.playersNames[props.language]}
        </Typography>
        <Input
          type="text"
          onChange={e => {
            setPlayers(parsePlayers(e.target.value))
          }}
          autoFocus
          placeholder={STRINGS.namesPlaceholder[props.language]}
        />
      </div>
      <br />

      <Range
        min={getMinPlayersCount()}
        max={getMaxPlayersCount()}
        default={96}
        step={playersCount || 2}
        onChange={(_, value) => {
          setNamesCount(value)
        }}
      />

      <Grid container>
        <Typography variant="h6">
          <Switch
            value={isGameTimed}
            onChange={() => {
              setIsGameTimed(isGameTimed => !isGameTimed)
            }}
          />
          {STRINGS.isGameTimed[props.language]}
        </Typography>
        {isGameTimed && (
          <Range
            min={10}
            max={120}
            step={10}
            default={30}
            onChange={(_, value) => {
              setAnswerTiming(value)
            }}
          />
        )}
      </Grid>

      <Typography variant="h5">
        {STRINGS.namesCount[props.language]}: {namesCount}
      </Typography>
      <Typography variant="h5">
        {STRINGS.playersCount[props.language]}: {playersCount}
      </Typography>
      {isGameTimed && (
        <Typography variant="h5">
          {STRINGS.answerTiming[props.language]}:{' '}
          {answerTiming + STRINGS.answerTiming.seconds[props.language]}
        </Typography>
      )}
      <Link to="/game">
        <Button
          size="large"
          variant="contained"
          color="primary"
          disabled={!isDataValid()}
          onClick={() => {
            props.saveConfig(getConfig())
          }}
        >
          Начать
        </Button>
      </Link>
    </div>
  )
}
