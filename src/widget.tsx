import { ReactWidget, UseSignal } from '@jupyterlab/apputils';

import * as React from 'react';

import { KernelModel } from './model';

import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

// import GridExamplesPage from "./grid";
import NavbarPage from "./navbar";
import HelloWorld from "./hello";
import ModalPage from "./modal";


export class KernelView extends ReactWidget {
  constructor(model: KernelModel) {
    super();
    this._model = model;
  }

  protected render(): React.ReactElement<any> {
    return (
      <React.Fragment>
        <NavbarPage />

        <MDBContainer>
          <MDBRow>
            <MDBCol md="3">
              <HelloWorld name="Someone" message="It's working"/>
              <div>
                This place will have the side panel
              </div>
            </MDBCol>

            <MDBCol md="9">
              <MDBRow>
                <button
                  key="header-thread"
                  className="jp-example-button"
                  onClick={(): void => {
                    this._model.execute('3+5');
                  }}
                >
                  Compute 3+5
                </button>
              </MDBRow>
              <MDBRow>
                <UseSignal signal={this._model.stateChanged}>
                  {(): JSX.Element => (
                    <span key="output field">{JSON.stringify(this._model.output)}</span>
                  )}
                </UseSignal>
              </MDBRow>
            </MDBCol>

          </MDBRow>

          <MDBRow>
            <MDBCol md="4">
              <ModalPage />
            </MDBCol>
            <MDBCol md="4">
              <ModalPage />
            </MDBCol>
            <MDBCol md="4">
              <ModalPage />
            </MDBCol>
          </MDBRow>

        </MDBContainer>
      </React.Fragment>
    );
  }

  private _model: KernelModel;
}
