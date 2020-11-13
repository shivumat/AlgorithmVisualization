import React, {useState,useEffect} from 'react';
import SortBar from './sortBar/SortBar';
import SortBlock from './sortBlock/SortBlock';
import Divider from '@material-ui/core/Divider'
import './Sort.css';

export default function Sort(props){
    const sortLength = 70;
    const [sortArray, setSortArray] = useState([]);

    useEffect(() =>{
        setSortArray(getJumbledArray(sortLength))
    },[])

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

    const startLoading = () => {
      let newArray = sortArray;
      let temp = newArray[0];
      newArray[0] = newArray[1];
      newArray[1] = temp;
      setSortArray([...newArray]);
    }

    return (
        <div className='sort'>
            <SortBar startLoading={startLoading} />
            <Divider/>
            <SortBlock sortArray={sortArray}/>
        </div>
    );
}