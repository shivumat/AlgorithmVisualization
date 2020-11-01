import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import menuItems from '../../../static/menuItems'

export default function MenuBar(props){

    return  <AppBar position="static" color="default">
                <Tabs value={props.value} onChange={props.handleChange} indicatorColor="primary" 
                textColor="primary" centered>
                    {menuItems.map((menu,i) => <Tab key={i} label={menu.label} icon={menu.menuIcon} 
                    disabled ={menu.value === 2}/>)}
                </Tabs>
            </AppBar>
}