import React from 'react';
import './Cell.css';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function Cell(props){

    function getCellContent(){
        return  props.start ?   <KeyboardArrowRightIcon className='cellIcon'/> :
                props.stop  ?   <HighlightOffIcon className='cellIcon'/>    : 
                        '';
    }

return (<div className='cell'>{getCellContent()}</div>)
}