import bubble from './bubble';
import selection from './selection';
import {BUBBLE, SELECTION} from '../enums/algos';

const sort = (upperLimit, algorithm, sortArrayObject) => {
    if(algorithm === BUBBLE){
        let lowerComparingIndex = -1;
        let upperComparingIndex = -1;
        if(sortArrayObject.lowerComparingIndex !== undefined){
            lowerComparingIndex = sortArrayObject.lowerComparingIndex;
        }
        if(sortArrayObject.upperComparingIndex !== undefined){
            upperComparingIndex = sortArrayObject.upperComparingIndex;
        }
        return bubble(lowerComparingIndex, upperComparingIndex, sortArrayObject.sortArray, upperLimit);
    }
    if(algorithm === SELECTION){
        let lowerComparingIndex = -1;
        let upperComparingIndex = -1;
        if(sortArrayObject.lowerComparingIndex !== undefined){
            lowerComparingIndex = sortArrayObject.lowerComparingIndex;
        }
        if(sortArrayObject.upperComparingIndex !== undefined){
            upperComparingIndex = sortArrayObject.upperComparingIndex;
        }
        return selection(lowerComparingIndex, upperComparingIndex, sortArrayObject.sortArray, upperLimit, sortArrayObject.minIndex);
    }
}


export default sort;