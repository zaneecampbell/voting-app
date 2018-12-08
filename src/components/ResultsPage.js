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
    textAlign: 'left'
  },
  gridContainer: {
  }
})

export class ResultsPage extends React.Component {
  state = {
    id: '',
    data: []
  }

  // on page load fetches voting data from firebase using the key from the url then sets the options
  componentWillMount() {
    const id = window.location.href.replace(/\?/gi, '').slice(-20)
    this.setState({ id });
    this.props.startSetOptions(id);
  };

  // enables a listener on component mount that keeps track of the vote count for each option in real time
  componentDidMount() {
    this.props.startRealTimeOptions(this.state.id, this.props.question);

    // Updates the piechart in real time
    this.pieChartUpdater = setInterval(() => {
      const optionsForData = []

      this.props.options.map((option, idx) => {
        if (option.count != 0) {
          optionsForData.push({x: idx, y: option.count, label: option.option})
        } else {
          // Do nothing with it
        }
      })
      this.setState({ data: optionsForData })
    }, 200)
  }

  // clears piechart updating when you leave (no memory leak!)
  componentWillUnmount() {
    clearInterval(this.pieChartUpdater)
  }

  render() {
    const { classes } = this.props;

    return (
        <Grid
        classes={{container: classes.gridContainer}}
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
        >
          <Grid item xs={12}>
            <Typography style={{textAlign: 'center', marginTop: '50px', fontSize: '5.5vw'}}>{this.props.question}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Grid         
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={16}
              >
                <Grid item md={6}>
                  {
                    this.props.options.map((option, idx) => (
                      <div key={idx}>
                        {option.option}: {option.count}
                      </div>
                    ))
                  }
                </Grid>
                <Grid item md={6}>
                  <VictoryPie
                    colorScale={["red", "blue", "lime", "yellow", "fuchsia", "aqua", "gray", "white", "maroon", "green", "olive", "navy", "purple", "teal", "silver", "black"]}
                    data={this.state.data}
                    labelRadius={90}
                    radius={200}
                    style={{ labels: { fill: "black", fontSize: 20, fontWeight: "bold" } }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
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

// Functionally Done

// BUG on mobile when going back to a page adds a question mark at the end of the URL ruining redirect

// Style piechart