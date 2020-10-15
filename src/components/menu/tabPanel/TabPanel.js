import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './TabPanel.css'

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div className='tabpanel' role="tabpanel" hidden={value !== index} id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`} {...other} >
      {value === index && (
        <Box className='tabBox' p={3}>
          <Typography className='tab' component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};