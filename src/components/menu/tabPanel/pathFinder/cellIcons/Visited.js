import React from 'react';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import './CellIcons.css';

export default function Visited(props){

    return  <CheckCircleOutlineRoundedIcon {...props} className='cellVisited'/>  
}