import React from 'react';
import { connect } from 'react-redux';
import { startSetOptions, startRealTimeOptions } from '../actions/poll';

export class ResultsPage extends React.Component {
  state = {
    id: ''
  }

  // on page load fetches voting data from firebase using the key from the url then sets the options
  componentWillMount() {
    const id = window.location.href.slice(-20)
    this.setState({ id });
    this.props.startSetOptions(id);
  };

  // enables a listener on component mount that keeps track of the vote count for each option in real time
  componentDidMount() {
    this.props.startRealTimeOptions(this.state.id, this.props.question);
  }

  handleCheat = () => {
    console.log(this.state.id)
  };

  render() {
    return (
      <div>
        <h1>{this.props.question}</h1>
        {
          this.props.options.map((option, idx) => (
            <div key={idx}>
              {option.option} {option.count}
            </div>
          ))
        }
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
  startRealTimeOptions: (id) => dispatch(startRealTimeOptions(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);