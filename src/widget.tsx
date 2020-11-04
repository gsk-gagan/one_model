import { ReactWidget, UseSignal } from '@jupyterlab/apputils';

import * as React from 'react';

import { KernelModel } from './model';

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";

// import GridExamplesPage from "./grid";
import NavbarPage from "./navbar";
import HelloWorld from "./hello";
import ModalPage from "./modal";
import GoD from "./godemo";


interface IAppState {
  modal: boolean;
}

interface IAppProps {
  model: KernelModel;
}


class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      modal: true
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(): void {
    this.setState({
      modal: !this.state.modal
    });
  }

  render(): React.ReactElement<any> {
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
                    this.props.model.execute('100+12');
                  }}
                >
                  100+12
                </MDBBtn>
              </MDBRow>


              <MDBRow>
                <button
                  className="jp-example-button"
                  onClick={(): void => {
                    this.props.model.execute('3+5');
                  }}
                >
                  Compute 3+5
                </button>
              </MDBRow>
              <MDBRow>
                <UseSignal signal={this.props.model.stateChanged}>
                  {(): JSX.Element => (
                    <span key="output field">{JSON.stringify(this.props.model.output)}</span>
                  )}
                </UseSignal>
              </MDBRow>

              <MDBRow>
                <MDBCol md="12">
                  <ModalPage modal={this.state.modal} toggleIt={this.toggleModal} model={this.props.model}/>
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

}


export class KernelView extends ReactWidget {
  constructor(model: KernelModel) {
    super();
    this._model = model;
    // this._state = {modal: true};
    // this.toggleModal = this.toggleModal.bind(this);
  }

  // toggleModal(): void {
  //   this._state.modal = !this._state.modal;
  //   console.log("Parent state change");
  //   console.log(this._state);
  // }

  protected render(): React.ReactElement<any> {
    return (
      <App model={this._model}/>
    );
  }

  private _model: KernelModel;
  // private _state: IAppState;
}
