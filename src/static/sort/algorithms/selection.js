import { ContactSupportOutlined } from "@material-ui/icons";

const selection = (lowerComparingIndex, upperComparingIndex, array, upperLimit, minIndex) => {
    let isDone = false;
    let highlighted = [];
    let newMinIndex ;
    if(lowerComparingIndex === -1 && upperComparingIndex === -1){
        lowerComparingIndex = 0;
        upperComparingIndex = lowerComparingIndex + 1;
    }
    if(lowerComparingIndex === upperLimit){
        isDone = true;
    }
    if(!isDone){
        newMinIndex = minIndex === undefined ? lowerComparingIndex : minIndex;
        if(upperComparingIndex !== upperLimit){
            if(array[upperComparingIndex] < array[newMinIndex]){
                newMinIndex = upperComparingIndex;
            }
            highlighted = [newMinIndex , upperComparingIndex]
            upperComparingIndex++;
        }else{
            let temp = array[lowerComparingIndex];
            array[lowerComparingIndex] = array[newMinIndex];
            array[newMinIndex] = temp;
            highlighted = [newMinIndex , lowerComparingIndex]
            lowerComparingIndex++;
            upperComparingIndex = lowerComparingIndex + 1;
            newMinIndex = undefined;
        }
    }
    return {"sortArray" : array , "isDone" : isDone , "lowerComparingIndex" : lowerComparingIndex , "upperComparingIndex" : upperComparingIndex,
            "highlighted" : highlighted, "minIndex" : newMinIndex};
}

export default selection;