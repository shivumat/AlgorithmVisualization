import React from 'react';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import SortIcon from '@material-ui/icons/Sort';
import StorageIcon from '@material-ui/icons/Storage';
import PathFinder from '../components/menu/pathFinder/PathFinder';
import Sort from '../components/menu/sort/Sort';
import DataStructure from '../components/menu/dataStructure/DataStructure';

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
    },
    {
        "label"     :   "Data Structure",
        "menuIcon"  :   <StorageIcon />,
        "value"     :   2,
        "tabPanel"  :   <DataStructure/>
    }
]
