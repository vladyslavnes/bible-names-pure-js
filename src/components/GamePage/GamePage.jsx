import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import STRINGS from '../../assets/data/languages.json'
import { Typography, Card, CardActions, CardContent } from '@material-ui/core'
import NAMES from '../../assets/data/names.json'
import './GamePage.css'

function shuffle (array) {
  let ctr = array.length
  let temp
  let index

  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr)
    ctr--
    temp = array[ctr]
    array[ctr] = array[index]
    array[index] = temp
  }
  return array
}

export default function GameSettings (props) {
  const config = {
    players: [
      { name: 'Pete', score: 0 },
      { name: 'Jake', score: 0 },
      { name: 'John', score: 0 }
    ],
    namesCount: 72,
    isGameTimed: false,
    answerTiming: 30
  }

  const names = shuffle(NAMES.standard).slice(0, props.config.namesCount)

  const [currentName, setName] = useState(names[0])
  const [currentPlayer, setPlayer] = useState(config.players[0])

  const nextCard = player => {
    props.config.players.find(({ name }) => name === player).score++
  }
  return (
    <div>
      {/* <Typography className="player-question" variant="h4">
        Johnathan, tell about
      </Typography> */}
      <div className='component-gamepage'>
        {
          <Card elevation={5} color='primary' className='name-card'>
            <CardContent>
              <Typography
                color='textSecondary'
                gutterBottom
                style={{ textAlign: 'left' }}
              >
                Vladyslav
              </Typography>
              <Typography variant='body1' component='p'>
                {currentName[props.language]}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>I can</Button>
              <Button size='small'>I can't</Button>
            </CardActions>
          </Card>
        }
      </div>
    </div>
  )
}
