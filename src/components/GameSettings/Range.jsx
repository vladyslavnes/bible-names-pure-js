import React from 'react'
import { Grid, Slider } from '@material-ui/core'

export default function Range (props) {
  return (
    <Grid container>
      <Grid item xs={2} className='slider-constraint'>
        {props.min}
      </Grid>
      <Grid item xs={8}>
        <Slider
          marks
          defaultValue={props.default}
          step={props.step}
          min={props.min}
          max={props.max}
          onChange={props.onChange}
        />
      </Grid>
      <Grid item xs={2} className='slider-constraint'>
        {props.max}
      </Grid>
    </Grid>
  )
}
