const dijkstras = (start, stop, walls, visitStatus, weights, xLimit, yLimit) =>{
    let resultVisitStatus = [...visitStatus];
    if(resultVisitStatus.length === 0){
        resultVisitStatus.push({...start, 'previous' : {start}, 'pathWeight' : 0 , 'visited' :false});
    }
    if(resultVisitStatus.length !== 0){
        var currentNodeIndex = resultVisitStatus.findIndex((node) => !node.visited);
        var currentNode = resultVisitStatus[currentNodeIndex];
        var northNode = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , 0 , -1, xLimit, yLimit);
        var westNode = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , -1 , 0, xLimit, yLimit);
        var southNode = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , 0 , 1, xLimit, yLimit);
        var eastNode = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , 1 , 0, xLimit, yLimit);
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

const getNeighbourNodeWithShortestDistnace = (currentNode, visitStatus, xOffset , yOffset, xLimit, yLimit ) => {
    var neighBourXCord = currentNode.xCord + xOffset;
    var neighBourYCord = currentNode.yCord + yOffset;
    if(neighBourXCord < 0 || neighBourYCord < 0 || neighBourXCord >= xLimit || neighBourYCord >= yLimit){
        return undefined;
    }
    else{
        var neighbourIndex = visitStatus.findIndex((node) => node.visited === false && node.xCord === neighBourXCord && node.yCord === neighBourYCord)
        var isVisited = visitStatus.some((node) => node.visited === true && node.xCord === neighBourXCord && node.yCord === neighBourYCord)
        if(isVisited || (neighbourIndex > -1 && visitStatus[neighbourIndex].pathWeight < currentNode.pathWeight + 1)){
            return undefined;
        }else if(neighbourIndex > -1){
            visitStatus.splice(neighbourIndex , 1)
        }
        return {'xCord' : neighBourXCord , 'yCord' : neighBourYCord, 'previous' : currentNode, 'pathWeight' : currentNode.pathWeight + 1, 'visited' : false}
    }
}

export default dijkstras;