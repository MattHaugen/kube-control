// @flow
import React, { Component } from 'react';
import { Progress } from 'semantic-ui-react';
import styles from './Initialize.scss';

type Props = {};

export default class Initialize extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container}>
        <div className={`ui two column centered aligned ${styles.grid}`}>
          <div className="column">
            <Progress percent={44} progress color="teal" />

            <div className={styles.errorList}>
              ERRORS
            </div>
          </div>
        </div>
      </div>
    );
  }
}
