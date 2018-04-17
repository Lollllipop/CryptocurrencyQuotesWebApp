import React, { Component } from 'react';
//import { connect } from 'react-redux';

class PaginationButton extends Component {
  render() {
    return (
      <div className="PaginationButton">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true"><i className="fas fa-angle-left"></i>  Prev Page</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">Next Page    <i className="fas fa-angle-right"></i></span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default PaginationButton;