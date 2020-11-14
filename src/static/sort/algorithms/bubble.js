const bubble = (lowerComparingIndex, upperComparingIndex, array, upperLimit) => {
    let isDone = false;
    let speed = 1;
    while(speed!== 0){
        if(lowerComparingIndex === -1 && upperComparingIndex === -1){
            lowerComparingIndex = 1;
            upperComparingIndex = upperLimit - 1;
        }
        if(lowerComparingIndex > upperComparingIndex){
            lowerComparingIndex = 1;
            upperComparingIndex--;
        }
        if(upperComparingIndex === 0){
            isDone = true;
        }
        if(!isDone){
                if(array[lowerComparingIndex-1]>array[lowerComparingIndex]){
                let temp = array[lowerComparingIndex-1];
                array[lowerComparingIndex-1] = array[lowerComparingIndex];
                array[lowerComparingIndex] = temp;
                }       
                lowerComparingIndex++;
        }
        speed--;
    }
    return {"sortArray" : array , "isDone" : isDone , "lowerComparingIndex" : lowerComparingIndex , "upperComparingIndex" : upperComparingIndex};
}

export default bubble;