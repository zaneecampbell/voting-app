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
    fontSize: '50px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px'
    }
  },
  buttonLabel: {
    fontSize: '30px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px'
    }
  }
});

class VotePage extends React.Component {
  state = {
    id: '',
    selected: '',
    vote: false
  };

  // grabs the last 20 characters from the url to get ID to load from firebase
  componentWillMount() {
    const id = window.location.href.replace(/\?/gi, '').slice(-20);
    this.setState({ id });
    this.props.startSetOptions(id);
  }

  // checks localstorage to see if youve voted on this poll before
  componentDidMount() {
    try {
      const voted = localStorage.getItem('id');
      if (voted === this.state.id) {
        this.setState({ vote: true });
      } else {
        this.setState({ vote: false });
      }
    } catch (e) {
      // Do nothing
    }
  }

  // takes the selected radio button and sets them equal to selected state
  handleChange = e => {
    const selected = e.target.value;
    this.setState({ selected });
  };

  // Passes this.state.selected to update firebase
  handleOnSubmit = e => {
    if (this.state.selected) {
      if (this.state.vote === false) {
        e.preventDefault();
        this.props.startUpdateOptions(this.state.selected, this.state.id);
        localStorage.setItem('id', this.state.id);
        setTimeout(() => {
          this.props.history.push(`/resultspage/${this.state.id}`);
        }, 200);
      } else {
        alert(`You have already voted on this poll, continue to results`);
        this.props.history.push(`/resultspage/${this.state.id}`);
      }
    } else {
      e.preventDefault();
      alert('Pick a choice please');
    }
  };

  handleChangeVote = () => {
    this.setState({ vote: false });
    console.log(this.state.id);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid
          container
          direction='column'
          justify='space-between'
          alignItems='center'
          spacing={0}
        >
          <Typography style={{ marginTop: '50px', fontSize: '50px' }}>
            {this.props.question}
          </Typography>
          <form onSubmit={this.handleOnSubmit}>
            {/* Maps out the options that were pulled from firebase then added to redux with radio buttons and labels */}
            <Paper>
              <FormGroup style={{ marginTop: '50px' }}>
                {this.props.options.map((option, idx) => (
                  <div key={idx} id='form-div'>
                    <FormControlLabel
                      style={{ padding: '10px' }}
                      classes={{ label: classes.radioLabel }}
                      control={
                        <Radio
                          type='radio'
                          value={option.firebaseIndex}
                          checked={
                            this.state.selected === `${option.firebaseIndex}`
                          }
                          onChange={this.handleChange}
                        />
                      }
                      label={option.option}
                    />
                  </div>
                ))}
                <Button
                  style={{ paddingTop: '15px' }}
                  classes={{ label: classes.buttonLabel }}
                  type='submit'
                >
                  Submit
                </Button>
              </FormGroup>
            </Paper>
          </form>
          {/* <Button onClick={this.handleChangeVote} style={{fontSize: '20px', marginTop: '30px'}}>Vote Again Test Button</Button> */}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    question: state.poll.optionsData.question,
    options: state.poll.optionsData.options
  };
};

const mapDispatchToProps = dispatch => ({
  startSetOptions: id => dispatch(startSetOptions(id)),
  startUpdateOptions: (selected, id) =>
    dispatch(startUpdateOptions(selected, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(VotePage));

// BUG Turn localstorage id into an object to add more ids too so people cant go to a different poll vote then come back and vote again
// check in new object if id exists then set vote state to true or false based on that
// BUG if visiting invald votepage url doesn't push to notfoundpage

// FUTURE set it based on IP address so people cant clear localstorage
