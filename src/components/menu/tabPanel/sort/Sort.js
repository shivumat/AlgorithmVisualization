import React, {useState,useEffect} from 'react';
import SortBar from './sortBar/SortBar';
import SortBlock from './sortBlock/SortBlock';
import Divider from '@material-ui/core/Divider';
import sort from '../../../../static/sort/algorithms/index';
import {BUBBLE} from '../../../../static/sort/enums/algos';
import './Sort.css';

export default function Sort(){
    const sortLength = 40;
    const [sortArrayObject, setSortArrayObject] = useState({"sortArray" : [] , "isDone" : false});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{
        setSortArrayObject({...sortArrayObject , "sortArray" : getJumbledArray(sortLength)})
    },[])

    useEffect(() =>{
        if(isLoading && !sortArrayObject.isDone){
            let resultArrayObject = sort(sortLength, BUBBLE, sortArrayObject);
            setSortArrayObject(resultArrayObject);
        }
        if(isLoading && sortArrayObject.isDone){
            setIsLoading(false);
        }
     },[isLoading, sortArrayObject] )

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
        setIsLoading(true);
    }

    return (
        <div className='sort'>
            <SortBar startLoading={startLoading} isLoading={isLoading}/>
            <Divider/>
            <SortBlock sortArray={sortArrayObject.sortArray}/>
        </div>
    );
}