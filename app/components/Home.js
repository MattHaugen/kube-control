// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as childProcess from 'child_process';
import * as promisify from 'util.promisify';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const exec = promisify.default(childProcess.exec);
    const { spawn } = childProcess;

    exec('kubectl config current-context')
    .then(result => {
      console.log(result.trim());
      return result;
    });

    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
