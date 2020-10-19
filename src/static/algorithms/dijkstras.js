const dijkstras = (start, stop, walls, visitStatus, weights, xLimit, yLimit) =>{
    let resultVisitStatus = [...visitStatus];
    if(resultVisitStatus.length === 0){
        resultVisitStatus.push({...start, 'previous' : {start}, 'pathWeight' : 0 , 'visited' :false});
    }
    if(resultVisitStatus.length !== 0){
        var currentNodeIndex = resultVisitStatus.findIndex((node) => !node.visited);
        var currentNode = resultVisitStatus[currentNodeIndex];
        var northNode = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , 0 , -1, xLimit, yLimit, walls);
        var westNode = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , -1 , 0, xLimit, yLimit, walls);
        var southNode = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , 0 , 1, xLimit, yLimit, walls);
        var eastNode = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , 1 , 0, xLimit, yLimit, walls);
        currentNode.visited = true;
        resultVisitStatus[currentNodeIndex] = currentNode;
        if(northNode !== undefined){
            resultVisitStatus.push(northNode);
        }
        if(westNode !== undefined){
            resultVisitStatus.push(westNode);
        }
        if(southNode !== undefined){
            resultVisitStatus.push(southNode);
        }
        if(eastNode !== undefined){
            resultVisitStatus.push(eastNode);
        }
    }
    return resultVisitStatus;
}

const getNeighbourNodeWithShortestDistnace = (currentNode, visitStatus, xOffset , yOffset, xLimit, yLimit, walls) => {
    var neighBourXCord = currentNode.xCord + xOffset;
    var neighBourYCord = currentNode.yCord + yOffset;
    if(isAccessibleNode(neighBourXCord, neighBourYCord, xLimit, yLimit, walls, visitStatus)){
        return undefined;
    }
    else{
        var neighbourIndex = visitStatus.findIndex((node) => node.visited === false && node.xCord === neighBourXCord && node.yCord === neighBourYCord)
        if(neighbourIndex > -1 && visitStatus[neighbourIndex].pathWeight < currentNode.pathWeight + 1){
            return undefined;
        }else if(neighbourIndex > -1){
            visitStatus.splice(neighbourIndex , 1)
        }
        return {'xCord' : neighBourXCord , 'yCord' : neighBourYCord, 'previous' : currentNode, 'pathWeight' : currentNode.pathWeight + 1, 'visited' : false}
    }
}

export default dijkstras;

function isAccessibleNode(neighBourXCord, neighBourYCord, xLimit, yLimit, walls, visitStatus) {
    return neighBourXCord < 0 || neighBourYCord < 0 || neighBourXCord >= xLimit || neighBourYCord >= yLimit ||
        walls.some((item) => item.xCord === neighBourXCord && item.yCord === neighBourYCord) ||
        visitStatus.some((item) => item.visited && item.xCord === neighBourXCord && item.yCord === neighBourYCord);
}
