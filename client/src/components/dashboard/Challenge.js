import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import Entry from './Entry';
import Grid from './Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEntry } from '../../actions/entry';

const Challenge = ({
  getEntry,
  sheet,
  onCancel,
  entryData: { entry, loading }
}) => {
  useEffect(() => {
    getEntry(sheet._id);
  }, [getEntry, sheet._id]);

  if (loading) {
    return <Spinner />;
  }

  if (entry) {
    return <Grid sheet={sheet} onCancel={onCancel} />;
  }

  return <Entry sheet={sheet} onCancel={onCancel} />;
};

Challenge.propTypes = {
  getEntry: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  sheet: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { auth: state.auth, entryData: state.entry };
};

export default connect(
  mapStateToProps,
  { getEntry }
)(Challenge);
