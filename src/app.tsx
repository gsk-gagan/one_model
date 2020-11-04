import { UseSignal } from '@jupyterlab/apputils';

import * as React from 'react';

import { KernelModel } from './model';

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";

import NavbarPage from "./navbar";
import ModalPage from "./modal";
import GoD from "./godemo";

export interface IAppProps {
  model: KernelModel;
}

export interface IAppState {
  setupModal: boolean;
  hyperModal: boolean;
}

export class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      setupModal: false,
      hyperModal: false
    };
    this.toggleHyperModal = this.toggleHyperModal.bind(this);
    this.toggleSetupModal = this.toggleSetupModal.bind(this);

    this.onClickFit = this.onClickFit.bind(this);
    this.onClickTransform = this.onClickTransform.bind(this);
  }

  toggleSetupModal(): void {
    this.setState({
      setupModal: !this.state.setupModal
    }); 
  }

  toggleHyperModal(): void {
    this.setState({
      hyperModal: !this.state.hyperModal
    }); 
  }

  onClickFit(): void {
    alert("Fit Called");
  }

  onClickTransform(): void {
    alert("Transform Called");
  }

  render(): React.ReactElement<any> {
    return (
      <React.Fragment>
        <NavbarPage
          onClickSetup={this.toggleSetupModal}
          onClickHyper={this.toggleHyperModal}
          onClickFit={this.onClickFit}
          onClickTransform={this.onClickTransform}
        />
        <ModalPage
          title="Setup"
          body="Will contain field where the setup will be specified"
          modal={this.state.setupModal} 
          toggle={this.toggleSetupModal}
        />
        <ModalPage
          title="Hyperparameter Tuning"
          body="Will be done later"
          modal={this.state.hyperModal} 
          toggle={this.toggleHyperModal}
        />

        <MDBContainer>
          <MDBRow>

            <MDBCol md="3">
              <MDBRow>
                <MDBBtn gradient="blue"
                  onClick={(): void => {
                    this.props.model.execute('100+12');
                  }}
                >
                  100+12
                </MDBBtn>
              </MDBRow>

              <MDBRow>
                <MDBBtn gradient="purple"
                  onClick={(): void => {
                    this.props.model.execute('my_fun()');
                  }}
                >
                  my_fun()
                </MDBBtn>
              </MDBRow>              

              <MDBRow>
                <p>Response: </p>
                <div>
                  <UseSignal signal={this.props.model.stateChanged}>
                    {(): JSX.Element => (
                      <span key="output field">{JSON.stringify(this.props.model.output)}</span>
                    )}
                  </UseSignal>
                </div>
              </MDBRow>
            </MDBCol>

            <MDBCol md="9">
              <GoD />
            </MDBCol>

          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

