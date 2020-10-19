import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import './WeightField.css'

export default function WeightField(props) {

    const {updateISWeightCehcked, updateWeight}= props;

  const toggleIsWeight = (event) => {
    updateISWeightCehcked(event.target.checked);
  };
  
  const onWeightChange = (event) => {
    updateWeight(event.target.value);
  };

  const onWeightInput = (event) => {
    if(event.target.value.length > 2){
        event.target.value = event.target.value.slice(0,2)
    }
    if(event.target.value===''){
        event.target.value='';
    }
};

  return (
      <div className="weightField">
        <Checkbox
            onChange={toggleIsWeight}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}

        />
        <TextField
          className="weightNumber"
          type="number"
          label="Weight"
          error={false}
          onChange={onWeightChange}
          onInput={onWeightInput}
          InputLabelProps={{
            shrink: true,
            className: 'weightLabel',
          }}
          inputProps={{
            className: 'weightInput',
            max:    99,
            min:    0
          }}
        />
      </div>
  )
}