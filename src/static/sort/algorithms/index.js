import bubble from './bubble'
import {BUBBLE} from '../enums/algos';

const sort = (upperLimit, algorithm, sortArrayObject, speed) => {
    if(algorithm === BUBBLE){
        let lowerComparingIndex = -1;
        let upperComparingIndex = -1;
        if(sortArrayObject.lowerComparingIndex !== undefined){
            lowerComparingIndex = sortArrayObject.lowerComparingIndex;
        }
        if(sortArrayObject.upperComparingIndex !== undefined){
            upperComparingIndex = sortArrayObject.upperComparingIndex;
        }
        return bubble(lowerComparingIndex, upperComparingIndex, sortArrayObject.sortArray, upperLimit, speed);
    }
}


export default sort;