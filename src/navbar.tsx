import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

class NavbarPage extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render(): React.ReactElement<any> {
    return (
      <Router>
        <MDBNavbar color="indigo" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">OneModel</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <MDBNavLink to="#!">Setup</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!">Hyperparameters</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <span className="mr-2">Versioning</span>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem href="#!">Save</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Load</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBBtn gradient="peach">Fit</MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn gradient="blue">Transform</MDBBtn>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>
      );
    }
}

export default NavbarPage;