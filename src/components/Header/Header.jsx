import React, { useState } from 'react'
import iconLangSettings from './settings-icon.svg'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import './Header.css'
import { Grid, IconButton } from '@material-ui/core'

const styles = {
  toolbar: {
    display: 'flex'
  },
  title: {
    flex: 1
  },
  langsWrap: {
    display: 'flex'
  },
  langOptions: {
    margin: 5
  },
  langIcon: {
    paddingRight: 0
  }
}

export default function Header (props) {
  const [showLangs, setShowLangs] = useState(false)

  return (
    <AppBar position='static'>
      <Toolbar style={styles.toolbar}>
        <Typography variant='h6' style={styles.title}>
          {props.title}
        </Typography>
        {showLangs && (
          <Grid style={styles.langsWrap}>
            <Typography
              style={styles.langOptions}
              onClick={() => {
                props.setLanguage('en')
              }}
            >
              EN
            </Typography>
            <Typography
              style={styles.langOptions}
              onClick={() => {
                props.setLanguage('uk')
              }}
            >
              UK
            </Typography>
            <Typography
              style={styles.langOptions}
              onClick={() => {
                props.setLanguage('ru')
              }}
            >
              RU
            </Typography>
          </Grid>
        )}
        <IconButton
          style={styles.langIcon}
          onClick={() => {
            setShowLangs(!showLangs)
          }}
        >
          <img src={iconLangSettings} alt='set language' />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
