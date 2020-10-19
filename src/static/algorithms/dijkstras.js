const dijkstras = (start, stop, walls, visitStatus, weights, xLimit, yLimit) =>{
    let resultVisitStatus = [...visitStatus];
    if(resultVisitStatus.length === 0){
        resultVisitStatus.push({...start, 'previous' : {start}, 'pathWeight' : 0 , 'visited' :false});
    }
    if(resultVisitStatus.length !== 0){
        var currentNodeIndex = resultVisitStatus.findIndex((node) => !node.visited);
        var currentNode = resultVisitStatus[currentNodeIndex];
        resultVisitStatus = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , 0 , -1, xLimit, yLimit, walls, weights);
        resultVisitStatus = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , -1 , 0, xLimit, yLimit, walls, weights);
        resultVisitStatus = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , 0 , 1, xLimit, yLimit, walls, weights);
        resultVisitStatus = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , 1 , 0, xLimit, yLimit, walls, weights);
        resultVisitStatus[currentNodeIndex].visited = true;
    }
    return resultVisitStatus;
}

const getNeighbourNodeWithShortestDistnace = (currentNode, visitStatus, xOffset , yOffset, xLimit, yLimit, walls, weights) => {
    var neighBourXCord = currentNode.xCord + xOffset;
    var neighBourYCord = currentNode.yCord + yOffset;
    if(!isUnAccessibleNode(neighBourXCord, neighBourYCord, xLimit, yLimit, walls, visitStatus)){
        var neighbourIndex = visitStatus.findIndex((node) => node.visited === false && node.xCord === neighBourXCord && node.yCord === neighBourYCord)
        if(neighbourIndex > -1 && visitStatus[neighbourIndex].pathWeight < currentNode.pathWeight + getCellWeight(visitStatus[neighbourIndex], currentNode, weights)){
            visitStatus[neighbourIndex].pathWeight = currentNode.pathWeight + getCellWeight(visitStatus[neighbourIndex], currentNode, weights);
            visitStatus[neighbourIndex].previous = {'xCord' : currentNode.xCord , 'yCord' : currentNode.yCord};
        }else if(neighbourIndex < 0){
            visitStatus.push({'xCord' : neighBourXCord , 'yCord' : neighBourYCord, 'previous' : {'xCord' : currentNode.xCord , 'yCord' : currentNode.yCord}, 'pathWeight' : currentNode.pathWeight + getCellWeight(neighBourXCord, neighBourYCord, weights), 'visited' : false})
        }
    }
    return visitStatus;
}

const getCellWeight = (cellA, cellB, weights) => {
    l//have to be implemented 
    return 1;
}

export default dijkstras;

function isUnAccessibleNode(neighBourXCord, neighBourYCord, xLimit, yLimit, walls, visitStatus) {
    return neighBourXCord < 0 || 
    neighBourYCord < 0 || 
    neighBourXCord >= xLimit || 
    neighBourYCord >= yLimit ||
    walls.some((item) => item.xCord === neighBourXCord && item.yCord === neighBourYCord) ||
    visitStatus.some((item) => item.visited && item.xCord === neighBourXCord && item.yCord === neighBourYCord);
}
