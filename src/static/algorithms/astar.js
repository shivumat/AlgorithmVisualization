const aStarPathFinder = (start, stop, walls, visitStatus, weights, xLimit, yLimit) =>{
    let resultVisitStatus = [...visitStatus];
    if(resultVisitStatus.length === 0){
        resultVisitStatus.push({...start, 'previous' : {start}, 'pathWeight' : 0 , 
        'holisticWeight' : getHolisticDistance(start.xCord, start.yCord, stop),'visited' :false});
    }
    if(resultVisitStatus.length !== 0){
        var currentNodeIndex = resultVisitStatus.findIndex((node) => !node.visited);
        if(currentNodeIndex>-1){
            var currentNode = resultVisitStatus[currentNodeIndex];
            resultVisitStatus = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , 0 , -1, xLimit, yLimit, walls, weights);
            resultVisitStatus = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , -1 , 0, xLimit, yLimit, walls, weights);
            resultVisitStatus = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , 0 , 1, xLimit, yLimit, walls, weights);
            resultVisitStatus = getNeighbourNodeWithShortestDistnace(currentNode, resultVisitStatus , 1 , 0, xLimit, yLimit, walls, weights);
            resultVisitStatus[currentNodeIndex].visited = true;
        }
    }
    return resultVisitStatus;
}

const getNeighbourNodeWithShortestDistnace = (currentNode, visitStatus, xOffset , yOffset, xLimit, yLimit, walls, weights, stop) => {
    var neighBourXCord = currentNode.xCord + xOffset;
    var neighBourYCord = currentNode.yCord + yOffset;
    if(!isUnAccessibleNode(neighBourXCord, neighBourYCord, xLimit, yLimit, walls, visitStatus)){
        var neighbourIndex = visitStatus.findIndex((node) => node.visited === false && node.xCord === neighBourXCord && node.yCord === neighBourYCord)
        if(neighbourIndex > -1 && visitStatus[neighbourIndex].pathWeight < currentNode.pathWeight + getCellWeight(neighBourXCord, neighBourYCord, weights)){
            visitStatus[neighbourIndex].pathWeight = currentNode.pathWeight + getCellWeight(neighBourXCord, neighBourYCord, weights);
            visitStatus[neighbourIndex].previous = {'xCord' : currentNode.xCord , 'yCord' : currentNode.yCord};
            visitStatus[neighbourIndex].holisticWeight = currentNode.pathWeight + getCellWeight(neighBourXCord, neighBourYCord, weights) + 
                                                                getHolisticDistance(neighBourXCord, neighBourYCord, stop);
        }else if(neighbourIndex < 0){
            visitStatus.push({'xCord' : neighBourXCord , 'yCord' : neighBourYCord, 
            'previous' : {'xCord' : currentNode.xCord , 'yCord' : currentNode.yCord}, 
            'pathWeight' : currentNode.pathWeight + getCellWeight(neighBourXCord, neighBourYCord, weights), 
            'holisticWeight' : currentNode.pathWeight + getCellWeight(neighBourXCord, neighBourYCord, weights) + getHolisticDistance(neighBourXCord, neighBourYCord, stop), 
            'visited' : false})
        }
    }
    visitStatus.sort((node1,node2) => node1.holisticWeight - node2.holisticWeight);
    return visitStatus;
}

const getCellWeight = (xCord, yCord, weights) => {
    var weightIndex = weights.findIndex((node) => node.xCord === xCord && node.yCord === yCord);
    return weightIndex > -1 ?  parseInt(weights[weightIndex].weight) +1  : 1;
}

function isUnAccessibleNode(neighBourXCord, neighBourYCord, xLimit, yLimit, walls, visitStatus) {
    return neighBourXCord < 0 || 
    neighBourYCord < 0 || 
    neighBourXCord >= xLimit || 
    neighBourYCord >= yLimit ||
    walls.some((item) => item.xCord === neighBourXCord && item.yCord === neighBourYCord) ||
    visitStatus.some((item) => item.visited && item.xCord === neighBourXCord && item.yCord === neighBourYCord);
}

const getHolisticDistance = (xCord, yCord, end) =>{
    return Math.sqrt(Math.pow(parseInt(end.yCord) - parseInt(yCord),2) + Math.pow(parseInt(end.xCord) - parseInt(xCord),2))
}

export default aStarPathFinder;