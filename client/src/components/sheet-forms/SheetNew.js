import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SheetForm from './SheetForm';
import SheetFormReview from './SheetFormReview';

class SheetNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SheetFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      // Strip off the 'label' that is included
      // in the form values from the Select team list
      <SheetForm
        onFormSubmit={values => {
          values.games = values.games.map(game => {
            return Object.assign({}, game, {
              homeTeam: game.homeTeam.value,
              awayTeam: game.awayTeam.value
            });
          });
          this.setState({ showFormReview: true });
        }}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: 'sheetForm'
})(SheetNew);
