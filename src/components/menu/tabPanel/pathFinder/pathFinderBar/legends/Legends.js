import React from 'react';
import Tab from '@material-ui/core/Tab';
import Start from '../../cellIcons/Start';
import './Legends.css'
import Stop from '../../cellIcons/Stop';
import Visiting from '../../cellIcons/Visiting';
import Visited from '../../cellIcons/Visited';
import Path from '../../cellIcons/Path';
import Wall from '../../cellIcons/Wall';
import Weight from '../../cellIcons/Weight';

export default function Legends(){

    return <div className='pathFinderLegend'>
                <div className='pathFinderLegendCell'>
                            <Start/>
                            <span className='pathFinderLegendLabel'>Start</span>
                </div>
                <div className='pathFinderLegendCell'>
                            <Stop/>
                            <span className='pathFinderLegendLabel'>Stop</span>
                </div>
                <div className='pathFinderLegendCell'>
                            <Visiting/>
                            <span className='pathFinderLegendLabel'>Visiting</span>
                </div>
                <div className='pathFinderLegendCell'>
                            <Visited/>
                            <span className='pathFinderLegendLabel'>Visited</span>
                </div>
                <div className='pathFinderLegendCell'>
                            <Path/>
                            <span className='pathFinderLegendLabel'>Path</span>
                </div>
                <div className='pathFinderLegendCell'>
                            <Wall/>
                            <span className='pathFinderLegendLabel'>Wall</span>
                </div>
            </div>
}