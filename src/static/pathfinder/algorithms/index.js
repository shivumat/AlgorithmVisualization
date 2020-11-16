import dijkstrasPathFinder from './dijkstras'
import aStarPathFinder from './astar'
import bfs from './bfs'
import {DIJKSTRAS,ASTAR,BFS} from '../enums/algos';

const findPath = (start, stop, walls, visitStatus, weights, algorithm, xLimit, yLimit) => {
    if(algorithm === DIJKSTRAS){
        return dijkstrasPathFinder(start, stop, walls, visitStatus, weights, xLimit, yLimit);
    }
    if(algorithm === ASTAR){
        return aStarPathFinder(start, stop, walls, visitStatus, weights, xLimit, yLimit);
    }
    if(algorithm === BFS){
        return bfs(start, stop, walls, visitStatus, weights, xLimit, yLimit);
    }
}


export default findPath;