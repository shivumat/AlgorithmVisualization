import React from 'react';
import PathFinderButtons from './pathFinderBar/PathFinderBar';
import PathFindingBlock from './pathFindingBlock/PathFindingBlock';
import Divider from '@material-ui/core/Divider';
import './PathFinder.css';

export default function PathFinder(props){

    const [start, setStart] = React.useState({'xCord' : 10, 'yCord' : 10});
    const [stop, setStop] = React.useState({'xCord' : 40, 'yCord' : 10});

    const rows = 21;
    const columns = 51;

    return (
        <div className='pathFinder'>
            <PathFinderButtons/>
            <Divider/>
            <PathFindingBlock rows={rows} columns={columns} start={start} stop={stop}/>
        </div>
    );
}