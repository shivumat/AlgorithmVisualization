import React from 'react';
import { Fade } from '@material-ui/core';
import './Tower.css'

export default function Tower(props) {

  return (
    <Fade in={true} timeout = {{enter : 1000, exit: 1000}}>
        <div className='tower'>
            {[...Array(props.value)].map((e, i) => <div key={i} className='towerBlock'></div>)}
        </div>
    </Fade>
  );
}
