import React from 'react';
import { Link } from 'react-router-dom';
import database from '../firebase/firebase';

class CreatePage extends React.Component {
  state = {
    options: [ {option: ''} ],
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
    this.setState(() => {
      this.state.options[id].option = text
    });

    if (id == this.state.options.length - 1) {
      this.setState({ options: this.state.options.concat([ {option: ''} ])});
    }
  };

  // FIX will connect to redux and not react store
  handleOnSubmit = (e) => {
    e.preventDefault();
    const optionsArray = [];
    const options = this.state.options.map((option) => {
      // Removes blank answers from the choices
      if (option.option.trim() != '') {
        return optionsArray.push(option)
      } else {
        // do nothing
      }
    });

    this.setState({
      list: this.state.list.concat(optionsArray)
    });
  };

  // DELETE PLEASE
  handleConsole = () => {
    console.log(this.state.options)
    console.log(this.state.question)
    database.ref('zane').set({ name: 'Eric' }).then(() => {
      console.log('Data saved');
    }).catch((e) => {
      console.log('this failed', e);
    })
  }

  render() {
    return (
    <div>
      <form onSubmit={this.handleOnSubmit}>
        <input 
          type='text'
          value={this.state.question}
          placeholder='Question here (optional)'
          autoComplete='off'
          onInput={this.handleUpdateQuestion}
        />
        <div id='input-container'>
          {this.state.options.map((option, idx) => (
            <div key={idx}>
              <input
                id={idx}
                type='text'
                value={option.option}
                placeholder={`Option ${idx}`}
                onInput={this.handleAddOption}
                autoComplete='off'
              />
            </div>
          ))}
        </div>
        <button>Create</button>
      </form>
      <button onClick={this.handleConsole}>Console Cheaty Button</button>
      <div>
      <Link to='/votepage'>Voting Page</Link>
      <Link to='/resultspage'>Voting Page</Link>
      </div>
    </div>
)}};

export default CreatePage;
