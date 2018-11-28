import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import database from '../firebase/firebase';
import moment from 'moment';
import { startAddOptions } from '../actions/poll';
import Header from './Header';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class CreatePage extends React.Component {
  state = {
    options: [{ option: '', count: 0 }, { option: '', count: 0 }, { option: '', count: 0 }],
    list: [],
    question: ''
  };

  // so you can type in the question box
  handleUpdateQuestion = (e) => {
    const question = e.target.value
    this.setState({ question });
  }

  // if at the bottom of the input list automatically adds a new one when you start typing
  handleAddOption = (e) => {
    const id = e.target.id
    const text = e.target.value
    this.setState({
      ...this.state.options[id].option.concat(text)
    });

    this.state.options[id].option = text

    if (id == this.state.options.length - 1) {
      this.setState({ options: this.state.options.concat([{ option: '', count: 0 }]) });
    }
  };

  // Submits data to firebase and redux then takes you to the votepage
  handleOnSubmit = (e) => {
    e.preventDefault();
    const optionsArray = [];
    let number = 0;
    const options = this.state.options.map((option) => {
      // Removes blank answers from the choices then adds choices to an array
      if (option.option.trim() != '') {
        option.firebaseIndex = number;
        number = number + 1;
        return optionsArray.push(option)
      } else {
        // don't add it to the array
      }
    });

    // Makes it so you need at least 2 options and a question
    if (this.state.question === '' || optionsArray.length < 2) {
      alert("Please add a question and at least 2 options")
    } else {
      // Used for testing on one page
      this.setState({
        list: this.state.list.concat(optionsArray)
      });

      // Sends choices and question to firebase needs to go through redux
      this.props.startAddOptions({
        question: this.state.question,
        options: optionsArray
      });

      // Takes user to the voting page with the unique ID for the question
      setTimeout(() => {
        this.props.history.push(`/votepage/${this.props.id}`);
      }, 200);
    }
  };

  render() {
    return (
      <div>
        <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
        >
          <Header />
          <form onSubmit={this.handleOnSubmit}>
            <input
              type='text'
              value={this.state.question}
              placeholder='Question here'
              autoComplete='off'
              onInput={this.handleUpdateQuestion}
            />
            <div id='input-container'>
              {/* Maps out option inputs dynamically as more are needed */}
              {this.state.options.map((option, idx) => (
                <div key={idx}>
                  <input
                    id={idx}
                    type='text'
                    value={option.option}
                    placeholder={`Option ${idx + 1}`}
                    onInput={this.handleAddOption}
                    autoComplete='off'
                  />
                </div>
              ))}
            </div>
            <button>Create</button>
          </form>
        </Grid>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    id: state.poll.id
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddOptions: (optionsData) => dispatch(startAddOptions(optionsData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);