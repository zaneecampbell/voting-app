import React from 'react';
import { connect } from 'react-redux';
import { startSetOptions, startRealTimeOptions } from '../actions/poll';
import Header from './Header';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { VictoryPie } from 'victory';

const styles = theme => ({
  paper: {
    fontSize: '4.5vw',
    marginTop: '50px',
    paddingLeft: '20px',
    paddingRight: '20px',
    textAlign: 'right'
  }
})

export class ResultsPage extends React.Component {
  state = {
    id: '',
    data: []
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
    console.log(this.props.options)

    // Updates the piechart in real time
    this.pieChartUpdater = setInterval(() => {
      const optionsForData = []

      this.props.options.map((option, idx) => {
        optionsForData.push({x: idx, y: option.count, label: option.option})
      })
      this.setState({ data: optionsForData })
    }, 1000)
  }

  // clears piechart updating (no memory leak!)
  componentWillUnmount() {
    clearInterval(this.pieChartUpdater)
  }

  cheat = () => {
    console.log(this.state.data)
  }
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
            <Paper className={classes.paper}>
              {
                this.props.options.map((option, idx) => (
                  <div key={idx}>
                    {option.option}: {option.count}
                  </div>
                ))
              }
            </Paper>
            <VictoryPie
              data={this.state.data}
            />
            <button onClick={this.cheat}>Cheat</button>
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
  startRealTimeOptions: (id) => dispatch(startRealTimeOptions(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResultsPage));

// BUG when piechart updates TypeError: Cannot read property 'indexOf' of null, during update