import dijkstrasPathFinder from './dijkstras'

export const DIJKSTRAS = 'Dijkstras';

const findPath = (start, stop, walls, visitStatus, weights, algorithm, xLimit, yLimit) => {
    if(algorithm === DIJKSTRAS){
        return dijkstrasPathFinder(start, stop, walls, visitStatus, weights, xLimit, yLimit);
    }
}


export default findPath;