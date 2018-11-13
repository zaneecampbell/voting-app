import React from 'react';
import { connect } from 'react-redux';

export const ResultsPage = (props) => (
  <div>
    hi
    <p>{props.question}</p>
  </div>
);

const mapStateToProps = (state) => {
  return {
    question: state.poll.question
  }
}

export default connect(mapStateToProps)(ResultsPage);