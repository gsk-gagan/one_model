import React, { Component } from 'react';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";

class ModalPage extends Component {
  constructor(props) {
    super(props);
    this.toggleIt = this.toggleIt.bind(this);
  }

  toggleIt() {
    console.log("Tried to toggle");
    console.log(this.props);
    this.props.toggleIt();
    this.props.model.execute('6+60'); 
    console.log("Called props toggleIt");
  }

  render() {
    return (
      <MDBContainer>
        <MDBBtn color="info" onClick={this.toggleIt}>Right</MDBBtn>
        <MDBModal isOpen={this.props.modal} toggle={this.toggleIt} fullHeight position="right">
          <MDBModalHeader toggle={this.toggleIt}>MDBModal title</MDBModalHeader>
          <MDBModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggleIt}>Close</MDBBtn>
            <MDBBtn color="primary">Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}


export default ModalPage;