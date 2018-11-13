import React from 'react';
import { Link } from 'react-router-dom';

class CreatePage extends React.Component {
  state = {
    options: [ {option: ''} ],
    list: []
  };


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

  handleConsole = () => {
    console.log(this.state.options)
  }

  render() {
    return (
    <div>
      <form onSubmit={this.handleOnSubmit}>
        <input placeholder='Question here (optional)'></input>
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
    </div>
)}};

export default CreatePage;
