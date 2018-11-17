import React from 'react';
import { connect } from 'react-redux';
import { startSetOptions } from '../actions/poll';

export class ResultsPage extends React.Component {
  state = {
    id: ''
  }

  componentWillMount() {
    const id = window.location.href.slice(-20)
    this.setState({ id });
    this.props.startSetOptions(id);
  };

  handleCheat = () => {
    console.log(this.props.options)
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
    question: state.poll.optionsData.question,
    options: state.poll.optionsData.options
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSetOptions: (id) => dispatch(startSetOptions(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);