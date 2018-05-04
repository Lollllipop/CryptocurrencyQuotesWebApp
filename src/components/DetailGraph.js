import React, { Component } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { epoch2String } from '../utils';

class DetailGraph extends Component {
  render() {
    return (
      <div className="DetailGraph">
        <Sparklines data={this.props.data}>
          <SparklinesLine color='#000000' style={{strokeWidth: 0.2}}/>
        </Sparklines>
        <div className='graph-bottom'>
          (1일) {epoch2String(this.props.lastMinute)}
        </div>
      </div>
    );
  }
}

export default DetailGraph;