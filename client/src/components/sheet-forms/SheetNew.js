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
      <SheetForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
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
