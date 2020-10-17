const dijkstras = (start, stop, walls, visitStatus, weighted, xLimit, yLimit) =>{
    let visiting = visitStatus.visiting;
    let visited = visitStatus.visited;
    if(visited.length === 0){
        visiting.push({...start, 'previous' : [start], 'pathWeight' : 0 });
    }
    if(visiting.length !== 0){
        var currentNode = visiting.shift();
        // console.log(currentNode.xCord, currentNode.yCord, stop.xCord, stop.yCord)
        var northNode = getNeighbourNodeWithShortestDistnace(currentNode, visited, visiting , 0 , -1, xLimit, yLimit);
        var westNode = getNeighbourNodeWithShortestDistnace(currentNode, visited, visiting , -1 , 0), xLimit, yLimit;
        var southNode = getNeighbourNodeWithShortestDistnace(currentNode, visited, visiting , 0 , 1, xLimit, yLimit);
        var eastNode = getNeighbourNodeWithShortestDistnace(currentNode, visited, visiting , 1 , 0, xLimit, yLimit);
        visited.push(currentNode);
        if(northNode !== undefined){
            visiting.push(northNode);
        }
        if(westNode !== undefined){
            visiting.push(westNode);
        }
        if(southNode !== undefined){
            visiting.push(southNode);
        }
        if(eastNode !== undefined){
            visiting.push(eastNode);
        }
    }
    return {'visited' : visited, 'visiting' : visiting}
}

const getNeighbourNodeWithShortestDistnace = (currentNode, visited, visiting, xOffset , yOffset, xLimit, yLimit ) => {
    var neighBourXCord = currentNode.xCord + xOffset;
    var neighBourYCord = currentNode.yCord + yOffset;
    if(neighBourXCord < 0 || neighBourYCord < 0 || neighBourXCord >= xLimit || neighBourYCord >= yLimit){
        return undefined;
    }
    else{
        var neighbourIndex = visiting.findIndex((node) => node.xCord === neighBourXCord && node.yCord === neighBourYCord)
        var isVisited = visited.some((node) => node.xCord === neighBourXCord && node.yCord === neighBourYCord)
        if(isVisited || (neighbourIndex > -1 && visiting[neighbourIndex].pathWeight < currentNode.pathWeight + 1)){
            return undefined;
        }else if(neighbourIndex > -1){
            visiting.splice(neighbourIndex , 1)
        }
        return {'xCord' : neighBourXCord , 'yCord' : neighBourYCord, 'previous' : currentNode, 'pathWeight' : currentNode.pathWeight + 1}
    }
}

export default dijkstras;