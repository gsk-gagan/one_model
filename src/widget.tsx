import { ReactWidget, UseSignal } from '@jupyterlab/apputils';

import * as React from 'react';

import { KernelModel } from './model';

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";

// import GridExamplesPage from "./grid";
import NavbarPage from "./navbar";
import HelloWorld from "./hello";
import ModalPage from "./modal";
import GoD from "./godemo";


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
              <MDBRow>
                <HelloWorld name="Someone" message="It's working"/>
                <div>
                  This place will have the side panel
                </div>
              </MDBRow>


              <MDBRow>
                <MDBBtn gradient="aqua"
                  onClick={(): void => {
                    this._model.execute('100+12');
                  }}
                >
                  100+12
                </MDBBtn>
              </MDBRow>


              <MDBRow>
                <button
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

              <MDBRow>
                <MDBCol md="12">
                  <ModalPage />
                </MDBCol>
                <MDBCol md="12">
                  <ModalPage />
                </MDBCol>
                <MDBCol md="12">
                  <ModalPage />
                </MDBCol>
              </MDBRow>
            </MDBCol>

            <MDBCol md="9">
              <MDBRow>
                <GoD />
              </MDBRow>
            </MDBCol>

          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }

  private _model: KernelModel;
}
