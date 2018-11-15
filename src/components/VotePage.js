import React from 'react';
import { connect } from 'react-redux';

class CreatePage extends React.Component = (props) => (
  <div>
    hi
    <p>{props.question}</p>
  </div>
);

const mapStateToProps = (state) => {
  return {
    question: state.poll.optionsData.question,
    id: state.poll.id
  }
}

export default connect(mapStateToProps)(VotePage);