// @flow
import React, { Component } from 'react';
import shortid from 'shortid';
import { Progress } from 'semantic-ui-react';
import styles from './Initialize.scss';

type Props = {
   readinessPercent: number,
   errors: Array<string>
};

export default class Initialize extends Component<Props> {
   props: Props;

   render() {
      const renderedErrors = this.props.errors.map(error => <p key={shortid.generate()}>{ error }</p>);

      return (
         <div className={styles.container}>
            <div className={`ui two column centered aligned ${styles.grid}`}>
               <div className="column">
                  <Progress percent={this.props.readinessPercent} progress color="teal" />

                  <div className={styles.errorList}>
                     {renderedErrors}
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
