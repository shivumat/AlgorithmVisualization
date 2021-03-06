import React, { useEffect } from 'react';
import PathFinderButtons from './pathFinderBar/PathFinderBar';
import PathFindingBlock from './pathFindingBlock/PathFindingBlock';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import findPath from '../../../../static/pathfinder/algorithms/index';
import {DIJKSTRAS,ASTAR,BFS} from '../../../../static/pathfinder/enums/algos';
import {SLOW, MEDIUM, FAST} from '../../../../static/pathfinder/enums/speeds';
import './PathFinder.css';

export default function PathFinder(props){

    const rows = 25;
    const columns = 61;
    const [start, setStart] = React.useState({'xCord' : 15, 'yCord' : 12});
    const [stop, setStop] = React.useState({'xCord' : 45, 'yCord' : 12});
    const [walls, setWalls] = React.useState([]);
    const [path, setPath] = React.useState([]);
    const [visitStatus, setVisitStatus] = React.useState([]);
    const [weights, setWeights] = React.useState([]);
    const [dragStart, setDragStart] = React.useState(false);
    const [dragStop, setDragStop] = React.useState(false);
    const [mouseDown, setMouseDown] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isWeightChecked, setIsWeightChecked] = React.useState(false);
    const [algo, setAlgo] = React.useState(DIJKSTRAS);
    const [speed, setSpeed] = React.useState(SLOW);
    const [weight, setWeight] = React.useState(0);
    const [weightDisabled, setWeightDisabled] = React.useState(false);

    const getPathFromStop= (resultVisitStatus) => {
        var node = stop;
        var finalPath = [];
        while(node.xCord !== start.xCord || node.yCord !== start.yCord){
            let pathNode = (resultVisitStatus.find((visit) => visit.xCord === node.xCord && visit.yCord === node.yCord)).previous;
            finalPath.push(pathNode);
            node = pathNode;
        }
        return finalPath;
    }

    useEffect(() =>{
        if(isLoading){
            document.body.style.cursor = 'progress';
        }else{
            document.body.style.cursor = 'default';
        }
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
            if(!resultVisitStatus.some((node) => !node.visited)){
                console.log(resultVisitStatus)
                if(resultVisitStatus.some((node) => node.xCord === stop.xCord && node.yCord === stop.yCord)){
                    var finalPath = getPathFromStop(resultVisitStatus);
                    setPath(finalPath);
                }
                setIsLoading(false);
            }else{
                setVisitStatus(resultVisitStatus);
            }
        }
        if(path.length !== 0){
            setIsLoading(false);
        }
       if(isLoading && visitStatus.length !== 0 && visitStatus.some((node) => node.visited && node.xCord === stop.xCord && node.yCord === stop.yCord)){
            var finalPath = getPathFromStop(visitStatus);
            setPath(finalPath);
        }
        if(algo === BFS){
            setWeightDisabled(true);
            setWeights([]);
        }else{
            setWeightDisabled(false)
        }
     },[isLoading, visitStatus, path, algo] )

    function mouseDownOnCell(xCord, yCord){
        setMouseDown(true);
        if(start.xCord === xCord && start.yCord === yCord){
            setDragStart(true);
        }
        else if(stop.xCord === xCord && stop.yCord === yCord){
            setDragStop(true);
        }else{
            addOrRemoveWallOrWeight(xCord, yCord);
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
            addOrRemoveWallOrWeight(xCord, yCord);
        }
    }  

    function addOrRemoveWallOrWeight(xCord, yCord) {
        if(isWeightChecked && weight > 0 && !weightDisabled){
            let wallIndex = walls.findIndex(
                (wall) => wall.xCord === xCord && wall.yCord === yCord
            );
            let index = weights.findIndex(
                (weightCell) => weightCell.xCord === xCord && weightCell.yCord === yCord
            );
            if(wallIndex > -1){
                walls.splice(wallIndex, 1);
            }
            if (index > -1) {
                weights[index].weight = weight;
            } else {
                weights.push({ 'xCord': xCord, 'yCord': yCord, 'weight' : weight });
            }
            setWalls(walls);
            setWeights(weights);
        }else{
            let weightIndex = weights.findIndex(
                (weightCell) => weightCell.xCord === xCord && weightCell.yCord === yCord
            );
            let index = walls.findIndex(
                (wall) => wall.xCord === xCord && wall.yCord === yCord
            );
            if(weightIndex > -1){
                weights.splice(weightIndex, 1);
            }
            if (index > -1) {
                walls.splice(index, 1);
            } else {
                walls.push({ 'xCord': xCord, 'yCord': yCord });
            }
            setWalls(walls);
            setWeights(weights);
        }
    }

    function startLoading(){
        clearBeforeLoading();
        setIsLoading(true);
    }

    function setFindSpeed(speed){
        setSpeed(speed);
    }

    function setFindAlgo(algo){
        setAlgo(algo);
    }

    function clearBlock(){
        setWalls([]);
        setWeights([]);
        clearBeforeLoading();
    }

    function clearBeforeLoading(){
        setVisitStatus([]);
        setPath([]);
    }

    function updateISWeightCehcked(isChecked){
        setIsWeightChecked(isChecked);
    }

    function updateWeight(weight){
        setWeight(weight);
    }
    
    function updateWeightDisabled(disabled){
        setWeightDisabled(disabled);
    }
    
    return (
        <div className='pathFinder'>
            <PathFinderButtons isLoading={isLoading} startLoading={startLoading} algos={[DIJKSTRAS,ASTAR,BFS]} 
            speeds={[SLOW, MEDIUM, FAST]} setFindSpeed={setFindSpeed} setFindAlgo={setFindAlgo} weightDisabled={weightDisabled}
            clearBlock={clearBlock} updateISWeightCehcked={updateISWeightCehcked} updateWeight={updateWeight} updateWeightDisabled={updateWeightDisabled}/>
            <Divider/>
            <PathFindingBlock rows={rows} columns={columns} start={start} stop={stop} isMouseDown={mouseDown}
                isDragStart ={dragStart} isDragStop={dragStop} mouseUpOnCell={mouseUpOnCell} walls={walls}
                cellOnHover={cellOnHover} mouseDownOnCell={mouseDownOnCell} path = {path} isLoading={isLoading}
                visitStatus={visitStatus} weight={weight} isWeightChecked={isWeightChecked && weight > 0 && !weightDisabled}
                weights={weights} weightDisabled={weightDisabled}/>
            <Modal open={isLoading} BackdropProps={{className: 'loadingBackDrop'}}><div></div></Modal>
        </div>
    );
}