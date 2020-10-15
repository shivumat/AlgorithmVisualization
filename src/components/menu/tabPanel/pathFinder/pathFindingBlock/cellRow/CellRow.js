import React from 'react';
import Cell from './cell/Cell'
import './CellRow.css'

export default function CellRow(props){

    const { start, stop} = props;

    const columns = new Array(props.columns).fill().map((value, index) => (({
        xCord: index
      })));

    return (
        <div className='cellRow'>
            {columns.map((column, i) => <Cell key={i} start={column.xCord===start.xCord && props.yCord===start.yCord}
                        stop={column.xCord===stop.xCord && props.yCord===stop.yCord}
                        xCord = {column.xCord} yCord = {props.yCord} />)}
        </div>
        );
}