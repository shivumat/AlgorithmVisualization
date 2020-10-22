import React, { useEffect } from 'react';
import './Cell.css';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import FlagRoundedIcon from '@material-ui/icons/FlagRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import SettingsOverscanRoundedIcon from '@material-ui/icons/SettingsOverscanRounded';
import StopIcon from '@material-ui/icons/Stop';
import Icon from '@material-ui/core/Icon';

export default function Cell(props){
    const [isWall,setIsWall] = React.useState(false);
    const [isWeight,setIsWeight] = React.useState(false);
    const [cellWeight,setCellWeight] = React.useState(0);

    const {xCord, yCord, mouseDownOnCell, cellOnHover, mouseUpOnCell, isStart , isStop, 
        isWallCell, isWeightChecked, isMouseDown, isDragStart, isDragStop, isVisited, isVisiting, 
        isPath, isLoading, isWeightCell, weight} = props;

    function getCellContent(){
        return  isStart ?   <PlayArrowRoundedIcon className='cellIcon'/> :
                isStop  ?   <FlagRoundedIcon className='cellIcon'/>    : 
                isWeight  ?   <Icon fontSize='small' className='weightCellIcon'>{cellWeight}</Icon>    :
                isWall  ?   <StopIcon fontSize='large' className='cellIcon'/>    : 
                isPath  ?   <SettingsOverscanRoundedIcon fontSize='large' className='cellPath'/>    : 
                isVisited  ? <CheckCircleOutlineRoundedIcon className='cellVisited'/>    : 
                isVisiting  ? <CheckCircleOutlineRoundedIcon color='primary' className='cellIcon'/>    : 
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