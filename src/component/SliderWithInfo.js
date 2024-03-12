// SliderWithInfo.js
import React from 'react';
import Slider from '@mui/material/Slider';

const SliderWithInfo = ({ min, max, value, symbol, title, setValue, updateChartData }) => {
  return (
    <div>
      <div>
        <p>{title}</p>
      </div>
      <div>
        <h2>
          {symbol} {value}
        </h2>
      </div>
      <div>
        <Slider
          aria-label="Temperature"
          defaultValue={value}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={min}
          max={max}
          onChange={(e, value) => {
            setValue(value);
            updateChartData(); // Add this line to update the chart data
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p>
            {symbol} {min}
          </p>
        </div>
        <div>
          <p>
            {symbol} {max}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SliderWithInfo;
