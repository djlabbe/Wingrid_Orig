import React, { Component } from 'react';
import { connect } from 'react-redux';
import SheetList from './SheetList';
import WeekView from './WeekView';

class Dashboard extends Component {
  state = { year: null, week: null };

  render() {
    if (this.state.week == null || this.state.year == null) {
      return (
        <SheetList
          onSelect={(year, week) => {
            this.setState({ year, week });
          }}
        />
      );
    }

    return (
      <WeekView
        year={this.state.year}
        week={this.state.week}
        onCancel={() => this.setState({ year: null, week: null })}
      />
    );
  }
}

export default connect()(Dashboard);
