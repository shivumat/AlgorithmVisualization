import React from 'react';
import Card from '@material-ui/core/Card';
import CellRow from './cellRow/CellRow';
import './PathFindingBlock.css'

export default function PathFindingBlock(props) {

  const rows = new Array(props.rows).fill().map((value, index) => (({
    yCord: index
  })));

  return (
    <Card className='pathFidingBlock'>
      {rows.map((row, i) => <CellRow key={i} yCord = {row.yCord} {...props}/>)}
    </Card>
  );
}
