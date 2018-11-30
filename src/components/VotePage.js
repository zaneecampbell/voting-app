import React from 'react';
import { connect } from 'react-redux';
import { startSetOptions, startUpdateOptions } from '../actions/poll';
import database from '../firebase/firebase';
import Header from './Header';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  radioLabel: {
    fontSize: '3.5vw'
  },
  buttonLabel: {
    fontSize: '4.5vw'
  }
});

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

  render() {
    const { classes } = this.props;

    return (
        <div>
          <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          spacing={40}
          >
            <Typography style={{marginTop: '50px', fontSize: '5.5vw'}}>{this.props.question}</Typography>
            <form onSubmit={this.handleOnSubmit}>
                {/* Maps out the options that were pulled from firebase then added to redux with radio buttons and labels */}
                  <FormGroup style={{marginTop: '50px'}}>
                    {this.props.options.map((option, idx) => (
                      <div key={idx}>
                        <FormControlLabel classes={{label: classes.radioLabel}} control={
                            <Radio 
                            type='radio' 
                            value={option.firebaseIndex} 
                            checked={this.state.selected === `${option.firebaseIndex}`} 
                            onChange={this.handleChange} 
                            />}
                          label={option.option}
                        />
                      </div>
                    ))}
                <Button style={{marginTop: '15px'}} classes={{label: classes.buttonLabel}} type='submit'>Submit</Button>
                </FormGroup>
            </form>
          </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VotePage));


// Only let people vote once by adding a value into local storage for that particular poll (last thing since testing easier without)

// BUG if visiting invald votepage url doesn't push to notfoundpage