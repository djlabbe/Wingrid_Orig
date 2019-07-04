// Manages the state of the week -
// Shows the user an entry form if they have not yet made picks,
// shows the grid once picks have been submitted.

import React, { Component } from 'react';
import Entry from './Entry';
import Grid from './Grid';

class WeekView extends Component {
  state = { showGrid: false };

  renderContent() {
    if (this.state.showGrid) {
      return <Grid />;
    }
    return <Entry onSubmit={() => this.setState({ showGrid: true })} />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default WeekView;
