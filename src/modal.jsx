import React, { Component } from 'react';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";

class ModalPage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggle();
  }

  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.modal} toggle={this.toggle} fullHeight position="right" backdrop={false}>
          <MDBModalHeader toggle={this.toggle}>{this.props.title}</MDBModalHeader>
          <MDBModalBody>
            {this.props.body}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
            <MDBBtn color="primary">Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}


export default ModalPage;