import React from 'react';
import { connect } from 'react-redux';

class VotePage extends React.Component {
  state = {
    id: ''
  }

  handleCheat = () => {
  };

  componentWillMount() {
    const id = window.location.href
    this.setState(() => ({ id }))
  };

  render() {
    return (
      <div>
        {this.props.question}
        <button onClick={this.handleCheat}>Cheaty Button</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.poll.optionsData.question
  }
}

export default connect(mapStateToProps)(VotePage);