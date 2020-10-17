import React, { useEffect } from 'react';
import PathFinderButtons from './pathFinderBar/PathFinderBar';
import PathFindingBlock from './pathFindingBlock/PathFindingBlock';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import findPath from '../../../../static/algorithms/index';
import {DIJKSTRAS} from '../../../../static/algorithms/index';
import './PathFinder.css';

export default function PathFinder(props){

    const rows = 21;
    const columns = 51;
    const [start, setStart] = React.useState({'xCord' : 10, 'yCord' : 10});
    const [stop, setStop] = React.useState({'xCord' : 40, 'yCord' : 10});
    const [walls, setWalls] = React.useState([]);
    const [path, setPath] = React.useState([]);
    const [visitStatus, setVisitStatus] = React.useState({'visited' : [], 'visiting' : []});
    const [weighted, setWeighted] = React.useState([]);
    const [dragStart, setDragStart] = React.useState(false);
    const [dragStop, setDragStop] = React.useState(false);
    const [mouseDown, setMouseDown] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const getPathFromStop= () => {
        var node = stop;
        var finalPath = [];
        while(node.xCord !== start.xCord || node.yCord !== start.yCord){
            console.log(node.xCord, node.yCord)
            let pathNode = (visitStatus.visited.find((visit) => visit.xCord === node.xCord && visit.yCord === node.yCord)).previous;
            finalPath.push(pathNode);
            node = pathNode;
        }
        return finalPath;
    }

    useEffect(() =>{
        if(isLoading){
            var reslutVisitStatus = findPath(start, stop, walls, visitStatus, weighted ,DIJKSTRAS, columns, rows);
            setVisitStatus(reslutVisitStatus);
        }
        if(isLoading && visitStatus.visited.some((node) => node.xCord !== stop.xCord || node.yCord !== stop.yCord)){
            var reslutVisitStatus = findPath(start, stop, walls, visitStatus, weighted ,DIJKSTRAS, columns, rows);
            setVisitStatus(reslutVisitStatus);
        }
        if(isLoading && visitStatus.visited.some((node) => node.xCord === stop.xCord && node.yCord === stop.yCord)){
            var finalPath = getPathFromStop();
            setPath(finalPath);
        }
        if(path.length !== 0){
            setIsLoading(false);
        }
     },[isLoading, visitStatus, path])

    function mouseDownOnCell(xCord, yCord){
        setMouseDown(true);
        if(start.xCord === xCord && start.yCord === yCord){
            setDragStart(true);
        }
        else if(stop.xCord === xCord && stop.yCord === yCord){
            setDragStop(true);
        }else{
            addOrRemoveWall(xCord, yCord);
        }
    }

    function mouseUpOnCell(xCord, yCord){
        setMouseDown(false);
        setDragStart(false);
        setDragStop(false);
    }
  
    function cellOnHover(xCord, yCord){
        if(mouseDown && dragStart){
            if(stop.xCord !== xCord || stop.yCord !== yCord){
                setStart({'xCord' : xCord, 'yCord' : yCord})
            }
        }
        else if(mouseDown && dragStop){
            if(start.xCord !== xCord || start.yCord !== yCord){
                setStop({'xCord' : xCord, 'yCord' : yCord})
            }
        }
        else if(mouseDown && !dragStart && !dragStop){
            addOrRemoveWall(xCord, yCord);
        }
    }  

    function addOrRemoveWall(xCord, yCord) {
        var index = walls.findIndex(
            (wall) => wall.xCord === xCord && wall.yCord === yCord
        );
        if (index > -1) {
            walls.splice(index, 1);
        } else {
            walls.push({ xCord: xCord, yCord: yCord });
        }
        setWalls(walls);
    }

    function handelMouseDown(e){
        setMouseDown(true);
    }

    function handelMouseUp(e){
        setMouseDown(false);
    }

    function startLoading(){
        setIsLoading(true);
    }

    return (
        <div className='pathFinder' onMouseDown={handelMouseDown} onMouseUp={handelMouseUp}>
            <PathFinderButtons isLoading={isLoading} startLoading={startLoading} algos={[DIJKSTRAS]}/>
            <Divider/>
            <PathFindingBlock rows={rows} columns={columns} start={start} stop={stop} isMouseDown={mouseDown}
                isDragStart ={dragStart} isDragStop={dragStop} mouseUpOnCell={mouseUpOnCell}
                cellOnHover={cellOnHover} mouseDownOnCell={mouseDownOnCell} path = {path} isLoading={isLoading}
                visited = {visitStatus.visited} visiting={visitStatus.visiting}/>
        </div>
    );
}