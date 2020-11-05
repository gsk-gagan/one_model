/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as React from 'react';

import { InspectorRow } from './InspectorRow';

interface SelectionInspectorProps {
  selectedData: any;
  onInputChange: (id: string, value: string, isBlur: boolean) => void;
}

export class SelectionInspector extends React.PureComponent<SelectionInspectorProps, {}> {
  /**
   * Render the object data, passing down property keys and values.
   */
  private renderObjectDetails() {
    const selObj = this.props.selectedData;
    const rejectKeys = ['key', 'loc', 'color'];
    const dets = [];
    const startDets = [];
    for (const k in selObj) {
      if (rejectKeys.includes(k)) {
        continue;
      }
      const val = selObj[k];
      const row = <InspectorRow
                    key={k}
                    id={k}
                    value={val}
                    onInputChange={this.props.onInputChange} />;
      if (k === 'text' || k === 'r' || k === 'input_df') {
          startDets.push(row);
      } else {
        dets.push(row);
      }
    }
    const res = startDets.concat(dets);
    return res;
  }

  public render() {
    return (
      <div id='myInspectorDiv' className='inspector'>
        <table>
          <tbody>
            {this.renderObjectDetails()}
          </tbody>
        </table>
      </div>
    );
  }
}
