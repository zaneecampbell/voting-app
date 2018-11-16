import React from 'react';
import { connect } from 'react-redux';
import { startSetOptions } from '../actions/poll';
import database from '../firebase/firebase';

class VotePage extends React.Component {
  state = {
    id: ''
  }

  handleCheat = () => {
    console.log(this.props.options)
  };

  // grabs the last 20 characters from the url to get ID to load from firebase
  componentWillMount() {
    const id = window.location.href.slice(-20)
    this.setState({ id });
    this.props.startSetOptions(id);
  };

  render() {
    return (
      <div>
        {this.props.question}
        <form>
          {this.props.options.map((option, idx) => (
            <div key={idx}>
              <label>
                <input id={idx} type='radio' value={option.option} name={this.props.question}/>
                {option.option}
              </label>
            </div>
          ))}
        </form>
        <button onClick={this.handleCheat}>cheaty button</button>
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
  startSetOptions: (id) => dispatch(startSetOptions(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(VotePage);