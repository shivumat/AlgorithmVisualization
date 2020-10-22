import React from 'react';
import Cell from './cell/Cell'
import './CellRow.css'

export default function CellRow(props){

    const { start, stop, visitStatus , path, walls, weights} = props;

    const isStartCell = (column) => column.xCord===start.xCord && props.yCord===start.yCord;

    const isStopCell = (column) => column.xCord===stop.xCord && props.yCord===stop.yCord;

    const isVisitedCell = (column) => visitStatus.some((node) => node.visited && column.xCord === node.xCord && props.yCord === node.yCord);

    const isVisitingCell = (column) => visitStatus.some((node) => (!node.visited) && column.xCord === node.xCord && props.yCord === node.yCord);

    const isPathCell = (column) => path.some((node) => column.xCord === node.xCord && props.yCord === node.yCord);

    const isWallCell = (column) => walls.some((node) => column.xCord === node.xCord && props.yCord === node.yCord);

    const isWeightCell = (column) => weights.some((node) => column.xCord === node.xCord && props.yCord === node.yCord);

    const columns = new Array(props.columns).fill().map((value, index) => (({
        xCord: index
      })));

    return (
        <div className='cellRow'>
            {columns.map((column, i) => <Cell key={i} isStart={isStartCell(column)} isStop={isStopCell(column)}
                        xCord = {column.xCord} yCord = {props.yCord} isVisited={isVisitedCell(column)} {...props}
                        isVisiting={isVisitingCell(column)} isPath={isPathCell(column)} 
                        isWallCell={isWallCell(column)} isWeightCell={isWeightCell(column)} />)}
        </div>
        );
}