import React from 'react';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import SortIcon from '@material-ui/icons/Sort';
import PathFinder from '../components/menu/pathFinder/PathFinder'
import Sort from '../components/menu/sort/Sort'

export default [
    {
        "label"     :   "Path Finder",
        "menuIcon"  :   <DeviceHubIcon />,
        "value"     :   0,
        "tabPanel"  :   <PathFinder/>
    },
    {
        "label"     :   "Sort",
        "menuIcon"  :   <SortIcon />,
        "value"     :   1,
        "tabPanel"  :   <Sort/>
    }
]
