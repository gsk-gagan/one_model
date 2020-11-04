import { ReactWidget } from '@jupyterlab/apputils';

import * as React from 'react';

import { KernelModel } from './model';

import { App } from "./app";

export class KernelView extends ReactWidget {
  constructor(model: KernelModel) {
    super();
    this._model = model;
  }

  protected render(): React.ReactElement<any> {
    return (
      <App model={this._model}/>
    );
  }

  private _model: KernelModel;
}
