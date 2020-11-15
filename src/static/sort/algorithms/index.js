import bubble from './bubble';
import selection from './selection';
import insert from './insert';
import {BUBBLE, SELECTION, INSERTION} from '../enums/algos';

const sort = (upperLimit, algorithm, sortArrayObject) => {
    let lowerComparingIndex = -1;
    let upperComparingIndex = -1;
    if(sortArrayObject.lowerComparingIndex !== undefined){
        lowerComparingIndex = sortArrayObject.lowerComparingIndex;
    }
    if(sortArrayObject.upperComparingIndex !== undefined){
        upperComparingIndex = sortArrayObject.upperComparingIndex;
    }
    if(algorithm === BUBBLE){
        return bubble(lowerComparingIndex, upperComparingIndex, sortArrayObject.sortArray, upperLimit);
    }
    if(algorithm === SELECTION){
        return selection(lowerComparingIndex, upperComparingIndex, sortArrayObject.sortArray, upperLimit, sortArrayObject.minIndex);
    }
    if(algorithm === INSERTION){
        return insert(lowerComparingIndex, upperComparingIndex, sortArrayObject.sortArray, upperLimit, sortArrayObject.currentToInsert);
    }
}


export default sort;