import React from 'react';
import { Link } from 'react-router-dom';

class CreatePage extends React.Component {
  state = {
    options: [ {option: ''} ]
  };


  // if at the bottom of the input list automatically adds a new one
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

  render() {
    return (
    <div>
      <form>
        <input placeholder='Question here (optional)'></input>
        <div id='input-container'>
          {this.state.options.map((option, idx) =>(
            <div key={idx}>
            <input
              id={idx}
              type='text'
              value={option.option}
              placeholder={`Option ${idx}`}
              onInput={this.handleAddOption}
            />
            </div>
          ))}
        </div>
      </form>
      <Link to='/votepage'> Create </Link>
    </div>
)}};

export default CreatePage;
