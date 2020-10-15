import React from 'react';
import './Cell.css';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import StopIcon from '@material-ui/icons/Stop';

export default function Cell(props){
    const [isWall,setIsWall] = React.useState(false);

    const {xCord, yCord, mouseDownOnCell, cellOnHover, mouseUpOnCell, isStart , isStop, 
            isMouseDown, isDragStart, isDragStop} = props;

    function getCellContent(){
        return  isStart ?   <KeyboardArrowRightIcon className='cellIcon'/> :
                isStop  ?   <HighlightOffIcon className='cellIcon'/>    : 
                isWall  ?   <StopIcon fontSize='large' className='cellIcon'/>    : 
                        '';
    }

    function onCellMouseDown(e){
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
    
    function onCellMouseUp(e){
        mouseUpOnCell(xCord,yCord);
    }

    function onCellMouseOver(e){
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


return (<div className='cell' onMouseDown={onCellMouseDown} onMouseUp={onCellMouseUp} onMouseEnter={onCellMouseOver}>
        {getCellContent()}
    </div>)
}