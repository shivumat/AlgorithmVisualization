
const insert = (lowerComparingIndex, upperComparingIndex, array, upperLimit, currentToInsert) => {
    let isDone = false;
    let highlighted = [];
    let toInsert = currentToInsert === undefined ? 0 : currentToInsert;
    if(lowerComparingIndex === -1 && upperComparingIndex === -1){
        lowerComparingIndex = 1;
        upperComparingIndex = 1;
        toInsert = array[upperComparingIndex];
    }
    if(upperComparingIndex === upperLimit){
        isDone = true;
    }
    if(!isDone){
        if(lowerComparingIndex > 0 && array[lowerComparingIndex - 1] > toInsert){
            array[lowerComparingIndex] = array[lowerComparingIndex - 1];
            lowerComparingIndex--;
            highlighted = [upperComparingIndex];
        }
        else{
            array[lowerComparingIndex] = toInsert;
            highlighted = [lowerComparingIndex];
            upperComparingIndex++;
            lowerComparingIndex = upperComparingIndex;
            toInsert = array[upperComparingIndex];
        }
    }
    return {"sortArray" : array , "isDone" : isDone , "lowerComparingIndex" : lowerComparingIndex , "upperComparingIndex" : upperComparingIndex,
            "highlighted" : highlighted, "currentToInsert" : toInsert};
}

export default insert;