import React, { useEffect } from 'react';
import PathFinderButtons from './pathFinderBar/PathFinderBar';
import PathFindingBlock from './pathFindingBlock/PathFindingBlock';
import Divider from '@material-ui/core/Divider';
import findPath from '../../../../static/algorithms/index';
import {DIJKSTRAS} from '../../../../static/enums/algos';
import {SLOW, MEDIUM, FAST} from '../../../../static/enums/speeds';
import './PathFinder.css';

export default function PathFinder(props){

    const rows = 21;
    const columns = 51;
    const [start, setStart] = React.useState({'xCord' : 10, 'yCord' : 10});
    const [stop, setStop] = React.useState({'xCord' : 40, 'yCord' : 10});
    const [walls, setWalls] = React.useState([]);
    const [path, setPath] = React.useState([]);
    const [visitStatus, setVisitStatus] = React.useState([]);
    const [weights, setWeights] = React.useState([]);
    const [dragStart, setDragStart] = React.useState(false);
    const [dragStop, setDragStop] = React.useState(false);
    const [mouseDown, setMouseDown] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [algo, setAlgo] = React.useState(DIJKSTRAS);
    const [speed, setSpeed] = React.useState(SLOW);

    const getPathFromStop= () => {
        var node = stop;
        var finalPath = [];
        while(node.xCord !== start.xCord || node.yCord !== start.yCord){
            let pathNode = (visitStatus.find((visit) => visit.xCord === node.xCord && visit.yCord === node.yCord)).previous;
            finalPath.push(pathNode);
            node = pathNode;
        }
        return finalPath;
    }

    useEffect(() =>{
        if(isLoading && visitStatus.length === 0){
            let resultVisitStatus = findPath(start, stop, walls, visitStatus, weights ,algo, columns, rows);
            setVisitStatus(resultVisitStatus)
        }
        if(isLoading && visitStatus.length !== 0 && visitStatus.some((node) => !(node.visited && node.xCord === stop.xCord && node.yCord === stop.yCord))){
            let resultVisitStatus = visitStatus;
            let i = speed.value;
            while(i !== 0){
                resultVisitStatus = findPath(start, stop, walls, resultVisitStatus, weights ,algo, columns, rows);
                i--;
            }
            setVisitStatus(resultVisitStatus)
        }
       if(isLoading && visitStatus.length !== 0 && visitStatus.some((node) => node.visited && node.xCord === stop.xCord && node.yCord === stop.yCord)){
            var finalPath = getPathFromStop();
            setPath(finalPath);
        }
        if(path.length !== 0){
            setIsLoading(false);
        }
     },[isLoading, visitStatus, path] )

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
        clearBeforeLoading();
        setIsLoading(true);
    }

    function setFindSpeed(speed){
        setSpeed(speed);
    }

    function clearBeforeLoading(){
        setVisitStatus([]);
        setPath([]);
    }
    return (
        <div className='pathFinder' onMouseDown={handelMouseDown} onMouseUp={handelMouseUp}>
            <PathFinderButtons isLoading={isLoading} startLoading={startLoading} algos={[DIJKSTRAS]} speeds={[SLOW, MEDIUM, FAST]}
                setFindSpeed={setFindSpeed}/>
            <Divider/>
            <PathFindingBlock rows={rows} columns={columns} start={start} stop={stop} isMouseDown={mouseDown}
                isDragStart ={dragStart} isDragStop={dragStop} mouseUpOnCell={mouseUpOnCell}
                cellOnHover={cellOnHover} mouseDownOnCell={mouseDownOnCell} path = {path} isLoading={isLoading}
                visitStatus={visitStatus}/>
        </div>
    );
}