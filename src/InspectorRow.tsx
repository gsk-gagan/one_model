/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as React from 'react';

interface InspectorRowProps {
  id: string;
  value: string;
  onInputChange: (key: string, value: string, isBlur: boolean) => void;
}

export class InspectorRow extends React.PureComponent<InspectorRowProps, {}> {
  constructor(props: InspectorRowProps) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNodeTypeChange = this.handleNodeTypeChange.bind(this);
    this.handelInputDataChange = this.handelInputDataChange.bind(this);
  }

  private handleInputChange(e: any) {
    this.props.onInputChange(this.props.id, e.target.value, e.type === 'blur');
  }

  private handleNodeTypeChange(e: any) {
    if (e.target.checked) {
      this.props.onInputChange(this.props.id, '20', true);
    } else {
      this.props.onInputChange(this.props.id, '0', true);
    }
  }

  private handelInputDataChange(e: any) {
    if (e.target.checked) {
      this.props.onInputChange(this.props.id, '1', true);
    } else {
      this.props.onInputChange(this.props.id, '0', true);
    }
  }

  public render() {
    let val = this.props.value;
    let inp_text;
    let inp_type;
    if (this.props.id === 'r') {
      inp_text = 'Data node';
      const checked = parseInt(val) != 0;
      inp_type = <input
              type='checkbox'
              id='relink'
              checked={checked}
              onChange={this.handleNodeTypeChange}
              onBlur={this.handleNodeTypeChange} />;      
    } else if (this.props.id === 'input_df') {
      inp_text = 'Input data';
      const checked = parseInt(val) != 0;
      inp_type = <input
              type='checkbox'
              id='relink'
              checked={checked}
              onChange={this.handelInputDataChange}
              onBlur={this.handelInputDataChange} />;            
    } else {
      inp_text = this.props.id;
      inp_type = <input
              disabled={this.props.id === 'key'}
              value={val}
              onChange={this.handleInputChange}
              onBlur={this.handleInputChange} />;
    }

    if (this.props.id === 'text'){
      inp_text = 'Name';
    }

    return (
      <tr>
        <td>{inp_text}</td>
        <td>{inp_type}</td>
      </tr>
    );
  }
}
