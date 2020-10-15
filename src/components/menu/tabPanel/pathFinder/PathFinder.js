import React from 'react';
import PathFinderButtons from './pathFinderBar/PathFinderBar';
import PathFindingBlock from './pathFindingBlock/PathFindingBlock';
import Divider from '@material-ui/core/Divider';
import './PathFinder.css';

export default function PathFinder(props){

    const [start, setStart] = React.useState({'xCord' : 10, 'yCord' : 10});
    const [stop, setStop] = React.useState({'xCord' : 40, 'yCord' : 10});
    const [walls, setWalls] = React.useState([]);
    const [dragStart, setDragStart] = React.useState(false);
    const [dragStop, setDragStop] = React.useState(false);
    const [mouseDown, setMouseDown] = React.useState(false);

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

    const rows = 21;
    const columns = 51;

    return (
        <div className='pathFinder'>
            <PathFinderButtons/>
            <Divider/>
            <PathFindingBlock rows={rows} columns={columns} start={start} stop={stop} isMouseDown={mouseDown}
                isDragStart ={dragStart} isDragStop={dragStop} mouseUpOnCell={mouseUpOnCell}
                cellOnHover={cellOnHover} mouseDownOnCell={mouseDownOnCell}/>
        </div>
    );
}