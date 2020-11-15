import React, {useState,useEffect} from 'react';
import SortBar from './sortBar/SortBar';
import SortBlock from './sortBlock/SortBlock';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import sort from '../../../../static/sort/algorithms/index';
import {BUBBLE, SELECTION, INSERTION} from '../../../../static/sort/enums/algos';
import {SLOW, MEDIUM, FAST} from '../../../../static/sort/enums/speeds';
import './Sort.css';

export default function Sort(){
    const sortLength = 50;
    
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
    const [sortArrayObject, setSortArrayObject] = useState({"sortArray" : getJumbledArray(sortLength) , "isDone" : false, "highlighted" : []});
    const [isLoading, setIsLoading] = useState(false);
    const [algo, setAlgo] = React.useState(BUBBLE);
    const [speed, setSpeed] = React.useState(SLOW);

    useEffect(() =>{
        if(isLoading){
            document.body.style.cursor = 'progress';
        }else{
            document.body.style.cursor = 'default';
        }
        if(isLoading && !sortArrayObject.isDone){
            let resultArrayObject = sortArrayObject;
            let i = speed.value;
            while(i !== 0){
                resultArrayObject = sort(sortLength, algo, resultArrayObject);
                i--;
            }
            setSortArrayObject(resultArrayObject);
        }
        if(isLoading && sortArrayObject.isDone){
            setIsLoading(false);
        }
     },[isLoading, sortArrayObject] )

    const startLoading = () => {
        setIsLoading(true);
    }
    function setFindSpeed(speed){
        setSpeed(speed);
    }

    function setFindAlgo(algo){
        setAlgo(algo);
    }
    function reset(){
        setSortArrayObject({"sortArray" : getJumbledArray(sortLength) , "isDone" : false, "highlighted" : []})
    }

    return (
        <div className='sort'>
            <SortBar startLoading={startLoading} isLoading={isLoading} algos={[BUBBLE, SELECTION, INSERTION]} 
            speeds={[SLOW, MEDIUM, FAST]} setFindSpeed={setFindSpeed} setFindAlgo={setFindAlgo} 
            reset={reset} />
            <Divider/>
            <SortBlock sortArray={sortArrayObject.sortArray} highlighted={sortArrayObject.highlighted}/>
            <Modal open={isLoading} BackdropProps={{className: 'loadingBackDrop'}}><div></div></Modal>
        </div>
    );
}