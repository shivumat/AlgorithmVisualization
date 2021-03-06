import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlgorithmSelect from '../../common/algoSelect/AlgorithmSelect';
import SpeedSelect from '../../common/speedSelect/SpeedSelect';
import './SortBar.css'


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

export default function SortBar(props) {
  const classes = useStyles();

  function startLoading(){
    if(!props.isLoading){
      props.startLoading();
    }
  }
  
  return (
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Toolbar>
          <AlgorithmSelect {...props}/>
          <Button variant="contained" color="primary" className="clearButton" onClick={props.reset}>RESET</Button>
          <Fab color="primary" aria-label="add" className={classes.fabButton} onClick={startLoading}>
            {props.isLoading ? <CircularProgress className='loadingProgress' color="inherit"/>:<PlayArrowIcon/>}
          </Fab>
          <div className={classes.grow} />
          <SpeedSelect {...props}/>
        </Toolbar>
      </AppBar>
  );
}
