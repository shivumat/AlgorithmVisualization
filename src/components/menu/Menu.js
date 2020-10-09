import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TabPanel from './tabPanel/TabPanel';
import MenuBar from './menuBar/MenuBar';
import menuItems from '../../static/menuItems'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Menu() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <MenuBar value={value} handleChange={handleChange}/>
      {menuItems.map((menu,i)=> {
        return  <TabPanel key={i} value={value} index={menu.value}>
                  {menu.tabPanel}
                </TabPanel>
      })}
    </div>
  );
}
