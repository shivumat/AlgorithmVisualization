import React, { useEffect } from 'react';
import './Cell.css';
import Start from '../../../cellIcons/Start';
import Stop from '../../../cellIcons/Stop';
import Weight from '../../../cellIcons/Weight';
import Wall from '../../../cellIcons/Wall';
import Path from '../../../cellIcons/Path';
import Visited from '../../../cellIcons/Visited';
import Visiting from '../../../cellIcons/Visiting';

export default function Cell(props){
    const [isWall,setIsWall] = React.useState(false);
    const [isWeight,setIsWeight] = React.useState(false);
    const [cellWeight,setCellWeight] = React.useState(0);

    const {xCord, yCord, mouseDownOnCell, cellOnHover, mouseUpOnCell, isStart , isStop, 
        isWallCell, isWeightChecked, isMouseDown, isDragStart, isDragStop, isVisited, isVisiting, 
        isPath, isLoading, isWeightCell, weight} = props;

    function getCellContent(){
        return  isStart     ?   <Start/>:
                isStop      ?   <Stop/> : 
                isWeight    ?   <Weight value={cellWeight} />   :
                isWall      ?   <Wall/> : 
                isPath      ?   <Path/> : 
                isVisited   ?   <Visited/>  : 
                isVisiting  ?   <Visiting/> : 
                        '';
    }

    useEffect(()=>{
        setIsWall(isWallCell);
        setIsWeight(isWeightCell);
    },[isWallCell, isWeightCell])

    function onCellMouseDown(e){
        console.log(isWall,isWeight)
        if(!isLoading){
            toggleWallAndWeight(isStart, isStop);
            mouseDownOnCell(xCord,yCord);
        }
    }

    function toggleWallAndWeight(start , stop){
        if(isWeightChecked){
            if(isWeight){
                setCellWeight(weight);
            }
            if(isWall){
                setIsWall(false);
            }
           if(!start && !stop){
                setIsWeight(true);
                setCellWeight(weight);
            }
        }else{
            if(isWeight){
                setIsWeight(false);
            }
            if(isWall){
                setIsWall(false);
            }
            else{
                if(!start && !stop){
                    setIsWall(true);
                }
            }
        }
    }
    
    function onCellMouseUp(e){
        if(!isLoading){
            mouseUpOnCell(xCord,yCord);
        }
    }

    function onCellMouseOver(e){
        if(!isLoading){
            if(isMouseDown){
                toggleWallAndWeight(isDragStart, isDragStop)
            }
            cellOnHover(xCord,yCord);
        }
    }

    return (<div className='cell' onMouseDown={onCellMouseDown} onMouseEnter={onCellMouseOver} onMouseUp={onCellMouseUp}>
            {getCellContent()}
        </div>)

}