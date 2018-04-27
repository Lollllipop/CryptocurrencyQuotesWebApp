import React, { Component } from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

export default class Chart extends Component {
  render() {
    return (
      <div className="Chart">
        <Sparklines data={this.props.data} height={43}>
          <SparklinesLine style={{ strokeWidth: 2, stroke: '#8ed53f', fill: 'none' }} />
        </Sparklines>  
      </div>
    );
  }
}