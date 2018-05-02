import React, { Component } from "react";
import shortid from "shortid";
import { Progress } from "semantic-ui-react";
import styled from "styled-components";

type Props = {
   readinessPercent: number;
   errors: Array<string>;
};

const styledContainer = styled.div`
   display: flex;
   height: 100%;
   width: 100%;
   align-items: center;

   .grid {
      width: 100%;
   }

   .error-list {
      text-align: center;
      color: red;
   }
`;

export default class Initialize extends Component<Props> {
   props: Props;

   render() {
      const renderedErrors = this.props.errors.map(error => (
         <p key={shortid.generate()}>{error}</p>
      ));

      return (
         <styledContainer>
            <div className={`ui two column centered aligned grid`}>
               <div className="column">
                  <Progress
                     percent={this.props.readinessPercent}
                     progress
                     color="teal"
                  />

                  <div className="error-list">{renderedErrors}</div>
               </div>
            </div>
         </styledContainer>
      );
   }
}
