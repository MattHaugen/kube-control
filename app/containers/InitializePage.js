// @flow
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import KubectlService from '../services/kubectl.service';
import Initialize from '../components/Initialize/Initialize';
import { addToReadinessPercent, addError } from '../actions/initialize';

class InitializePageContainer extends Component {
   componentDidMount() {
      this.runChecks();
   }

   checkPromises = [
      this.verifyKubectl()
   ];

   verifyKubectl() {
      return KubectlService.getVersion().then(result => {
         if (!result.includes('Client Version')) {
            this.props.addError('Kubectl not found');
            return false;
         }
         this.props.addToReadinessPercent(100 / this.checkPromises.length);
         return true;
      });
   }

   runChecks() {
      Promise.all(this.checkPromises).then(results => {
         if (!results.includes(false)) {
            this.props.initalizeComplete();
         }
         return results;
      })
      .catch(error => {
         this.props.addError(error);
      });
   }

   render() {
      return (
         <Initialize readinessPercent={this.props.readinessPercent} errors={this.props.errors} />
      );
   }
}

const mapStateToProps = state => ({
  readinessPercent: state.initialize.readinessPercent,
  errors: state.initialize.errors
});

const mapDispatchToProps = (dispatch) => ({
   addToReadinessPercent: (percent) => {
      dispatch(addToReadinessPercent(percent));
   },
   addError: (error) => {
      dispatch(addError(error));
   },
   initalizeComplete: () => {
      dispatch(push('/counter'));
   }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitializePageContainer);
