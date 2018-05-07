import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

export default function Chart(props) {
  return (
    <div className="Chart">
      <Sparklines data={props.data} height={43}>
        <SparklinesLine style={{ strokeWidth: 2, stroke: '#8ed53f', fill: 'none' }} />
      </Sparklines>  
    </div>
  );
}
