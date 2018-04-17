import React, { Component } from 'react';
//import { connect } from 'react-redux';

class CoinsList extends Component {
  render() {
    return (
      <div className="CoinsList">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">종류</th>
              <th scope="col">
                가격
                <i className="fas fa-caret-up"></i>
                <i className="fas fa-caret-down"></i>
              </th>
              <th scope="col">
                거래량(24H)
                <i className="fas fa-caret-up"></i>
                <i className="fas fa-caret-down"></i>
              </th>
              <th scope="col">
                거래액(24H)
                <i className="fas fa-caret-up"></i>
                <i className="fas fa-caret-down"></i>
              </th>
              <th scope="col">
                가격차
                <i className="fas fa-caret-up"></i>
                <i className="fas fa-caret-down"></i>
              </th>
              <th scope="col">가격 추세(7일)</th>
              <th scope="col">
                등락폭(24H)
                <i className="fas fa-caret-up"></i>
                <i className="fas fa-caret-down"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CoinsList;