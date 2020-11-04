import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn
} from "mdbreact";

import { BrowserRouter as Router } from 'react-router-dom';


interface INavbarProps {
  onClickSetup: any;
  onClickHyper: any;
  onClickFit: any;
  onClickTransform: any;
}

interface INavbarState {
  isOpen: boolean;
}

class NavbarPage extends Component<INavbarProps, INavbarState> {
  constructor(props: INavbarProps) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.onClickSetup = this.onClickSetup.bind(this);
    this.onClickHyper = this.onClickHyper.bind(this);
    this.onClickFit = this.onClickFit.bind(this);
    this.onClickTransform = this.onClickTransform.bind(this);
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onClickSetup(): void {
    this.props.onClickSetup();
  }

  onClickHyper(): void {
    this.props.onClickHyper();
  }

  onClickFit(): void {
    this.props.onClickFit();
  }

  onClickTransform(): void {
    this.props.onClickTransform();
  }

  render(): React.ReactElement<any> {
    return (
      <Router>
        <MDBNavbar color="blue-gradient" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">OneModel</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem>
                <MDBNavLink to="#!" onClick={this.onClickSetup}>Setup</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!" onClick={this.onClickHyper}>Hyperparameters</MDBNavLink>
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
                <MDBBtn gradient="peach" onClick={this.onClickFit}>Fit</MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn gradient="aqua" onClick={this.onClickTransform}>Transform</MDBBtn>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>
    );
  }
}

export default NavbarPage;