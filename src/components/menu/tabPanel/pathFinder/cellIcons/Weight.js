import React from 'react';
import Icon from '@material-ui/core/Icon';
import './CellIcons.css';

export default function Weight(props){

    return  <Icon fontSize='small' className='weightCellIcon'>{props.value}</Icon>  
}