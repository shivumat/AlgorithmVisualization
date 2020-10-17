import dijkstrasPathFinder from './dijkstras'

export const DIJKSTRAS = 'Dijkstras';

const findPath = (start, stop, walls, visitStatus, weighted, algorithm, xLimit, yLimit) => {
    if(algorithm === DIJKSTRAS){
        return dijkstrasPathFinder(start, stop, walls, visitStatus, weighted, xLimit, yLimit);
    }
}


export default findPath;