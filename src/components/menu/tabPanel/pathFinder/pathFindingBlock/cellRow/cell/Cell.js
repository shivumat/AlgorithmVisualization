import React from 'react';
import './Cell.css';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import FlagRoundedIcon from '@material-ui/icons/FlagRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import SettingsOverscanRoundedIcon from '@material-ui/icons/SettingsOverscanRounded';
import StopIcon from '@material-ui/icons/Stop';

export default function Cell(props){
    const [isWall,setIsWall] = React.useState(false);

    const {xCord, yCord, mouseDownOnCell, cellOnHover, mouseUpOnCell, isStart , isStop, 
            isMouseDown, isDragStart, isDragStop, isVisited, isVisiting, isPath, isLoading} = props;

    function getCellContent(){
        return  isStart ?   <PlayArrowRoundedIcon className='cellIcon'/> :
                isStop  ?   <FlagRoundedIcon className='cellIcon'/>    : 
                isWall  ?   <StopIcon fontSize='large' className='cellIcon'/>    : 
                isPath  ?   <SettingsOverscanRoundedIcon fontSize='large' className='cellPath'/>    : 
                isVisited  ? <CheckCircleOutlineRoundedIcon className='cellVisited'/>    : 
                isVisiting  ? <CheckCircleOutlineRoundedIcon color='primary' className='cellIcon'/>    : 
                        '';
    }

    function onCellMouseDown(e){
        if(!isLoading){
            if(isWall){
                setIsWall(false);
            }
            else{
                if(!isStart && !isStop){
                    setIsWall(true);
                }
            }
            mouseDownOnCell(xCord,yCord);
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
                if(isWall){
                    setIsWall(false);
                }
                else{
                    if(!isDragStart && !isDragStop){
                        setIsWall(true);
                    }
                }
            }
            cellOnHover(xCord,yCord);
        }
    }


return (<div className='cell' onMouseDown={onCellMouseDown} onMouseUp={onCellMouseUp} onMouseEnter={onCellMouseOver}>
        {getCellContent()}
    </div>)
}