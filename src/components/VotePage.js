import React from 'react';
import { connect } from 'react-redux';
import { startSetOptions, startUpdateOptions } from '../actions/poll';
import database from '../firebase/firebase';

class VotePage extends React.Component {
  state = {
    id: '',
    selected: ''
  }

  // grabs the last 20 characters from the url to get ID to load from firebase
  componentWillMount() {
    const id = window.location.href.slice(-20)
    this.setState({ id });
    this.props.startSetOptions(id);
  };

  // takes the selected radio button and sets them equal to selected state
  handleChange = (e) => {
    const selected = e.target.value
    this.setState({ selected });
  }

  // Passes this.state.selected to update firebase
  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.startUpdateOptions(this.state.selected, this.state.id)
    setTimeout(() => {
      this.props.history.push(`/resultspage/${this.state.id}`);
    }, 200);
  };

  // DELETE PLEASE
  handleCheat = () => {
    console.log(this.state.selected, this.state.id)
  };

  render() {
    return (
      <div>
        <h1>{this.props.question}</h1>
        <form onSubmit={this.handleOnSubmit}>
          {/* Maps out the options that were pulled from firebase then added to redux with radio buttons and labels */}
          {this.props.options.map((option, idx) => (
            <div key={idx}>
              <label>
                {/* BAD takes the option object and creates a value string by adding the option text and the firebaseIndex together */}
                <input type='radio' value={`${option.option}` + `${option.firebaseIndex}`} checked={this.state.selected === `${option.option}` + `${option.firebaseIndex}`} onChange={this.handleChange} />
                {option.option}
              </label>
            </div>
          ))}
          <button type='submit'>Submit</button>
        </form>
        {/* DELETE PLEASE */}
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
  startSetOptions: (id) => dispatch(startSetOptions(id)),
  startUpdateOptions: (selected, id) => dispatch(startUpdateOptions(selected, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(VotePage);



// BUG if more then one option is the same string multiple radio buttons will become checked for each same option
// fix by not allowing more then one of the same answers on the createpage probably