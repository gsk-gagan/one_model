/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as React from 'react';
import { MDBInput } from "mdbreact";


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
    let inp_ele;
    if (this.props.id === 'r') {
      const checked = parseInt(val) != 0;
      inp_ele = (
        <div className="custom-control custom-checkbox">
          <input
                className='custom-control-input'
                type='checkbox'
                id='data_node_input_checkbox'
                checked={checked}
                onChange={this.handleNodeTypeChange}
                onBlur={this.handleNodeTypeChange} />
          <label 
            className="custom-control-label" 
            htmlFor="data_node_input_checkbox">Data node</label>
        </div>
      );
    } else if (this.props.id === 'input_df') {
      const inp_text = 'Input data';
      const checked = parseInt(val) != 0;
      inp_ele = (
        <div className="custom-control custom-checkbox">
          <input
              className='custom-control-input'
              type='checkbox'
              id='input_node_input_checkbox'
              checked={checked}
              onChange={this.handelInputDataChange}
              onBlur={this.handelInputDataChange} />
          <label 
            className="custom-control-label" 
            htmlFor="input_node_input_checkbox">{inp_text}</label>
        </div>
      );
    } else {
      let inp_text = this.props.id;
      if (this.props.id === 'text'){
        inp_text = 'Name';
      }
      inp_ele = (
        <MDBInput
          label={inp_text}
          size='sm'
          disabled={this.props.id === 'key'}
          value={val}
          onChange={this.handleInputChange}
          onBlur={this.handleInputChange} />
      );
    }

    return inp_ele;
  }
}
