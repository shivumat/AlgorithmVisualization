const bubble = (lowerComparingIndex, upperComparingIndex, array, upperLimit, speed) => {
    let isDone = false;
    let highlighted = [];
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
                highlighted = [lowerComparingIndex-1, lowerComparingIndex]
        }else{
            highlighted = []
        }
        speed--;
    }
    return {"sortArray" : array , "isDone" : isDone , "lowerComparingIndex" : lowerComparingIndex , "upperComparingIndex" : upperComparingIndex,
            "highlighted" : highlighted};
}

export default bubble;