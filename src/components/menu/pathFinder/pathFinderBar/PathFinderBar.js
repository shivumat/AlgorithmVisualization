import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import AlgorithmSelect from './algoSelect/AlgorithmSelect';

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

export default function PathFinderButtons() {
  const classes = useStyles();

  return (
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Toolbar>
          <AlgorithmSelect/>
          <Fab color="primary" aria-label="add" className={classes.fabButton}>
            <PlayArrowIcon />
          </Fab>
          <div className={classes.grow} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
  );
}
