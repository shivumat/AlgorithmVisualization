import React from 'react';
import SortBar from './sortBar/SortBar';
import SortBlock from './sortBlock/SortBlock';
import Divider from '@material-ui/core/Divider'
import './Sort.css';

export default function PathFinder(props){

    return (
        <div className='sort'>
            <SortBar />
            <Divider/>
            <SortBlock/>
        </div>
    );
}