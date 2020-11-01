import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AlgorithmSelect from './algoSelect/AlgorithmSelect';
import WeightField from './weightField/WeightField'
import CircularProgress from '@material-ui/core/CircularProgress';
import SpeedSelect from './speedSelect/SpeedSelect';
import './PathFinderBar.css'
import Legends from './legends/Legends';


const useStyles = makeStyles((theme) => ({
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto'
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 0,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export default function PathFinderButtons(props) {
  const classes = useStyles();

  function startLoading(){
    props.startLoading();
  }

  return (
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Toolbar>
          <AlgorithmSelect {...props}/>
          <Button variant="contained" color="primary" className="clearButton" onClick={props.clearBlock}>CLEAR</Button>
          <WeightField {...props} />
          <Fab color="primary" aria-label="add" className={classes.fabButton}>
            {props.isLoading ? <CircularProgress className='loadingProgress' color="inherit"/>:<PlayArrowIcon onClick={startLoading}/>}
          </Fab>
          <div className={classes.grow} />
          <Legends/>
          <SpeedSelect {...props}/>
        </Toolbar>
      </AppBar>
  );
}
