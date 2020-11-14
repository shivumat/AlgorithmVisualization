import React from 'react';
import Card from '@material-ui/core/Card';
import './SortBlock.css'
import Tower from './tower/Tower';

export default function SortBlock(props) {
  const {sortArray} = props;

  return (
    <Card className='sortBlock'>
      {sortArray.map((value, i)=> <Tower key={i} value={value} isHighlighted = {props.highlighted.includes(i)}/> )}
    </Card>
  );
}
