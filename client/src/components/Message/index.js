import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import useStyles from './styles';

export default function Message({ message: { user, text, date }, name }) {
  const classes = useStyles();

  return (
    <Box className={`${classes.box} ${user === name ? classes.selfBox : null}`}>
      <Paper variant="outlined" className={classes.paper}>
        <Typography variant={'subtitle2'}>{user}:</Typography>
        <Typography>
          {text}
          <Typography className={classes.textDate} variant={'caption'}>
            {date}
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
}
