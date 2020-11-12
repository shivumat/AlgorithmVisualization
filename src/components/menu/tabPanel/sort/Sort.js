import React, {useState} from 'react';
import SortBar from './sortBar/SortBar';
import SortBlock from './sortBlock/SortBlock';
import Divider from '@material-ui/core/Divider'
import './Sort.css';

export default function Sort(props){

    const getJumbledArray = (length) => {
        for (var array=[],i=0;i<length;i++) array[i]=i+1;
        var tmp, current, top = array.length;
        if(top) while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
        return array;
    }
    const sortLength = 70;
    const jumbledArray = getJumbledArray(sortLength)
    const [sortArray, setSortArray] = useState(jumbledArray);

    return (
        <div className='sort'>
            <SortBar />
            <Divider/>
            <SortBlock sortArray={sortArray}/>
        </div>
    );
}