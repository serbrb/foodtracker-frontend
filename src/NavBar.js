import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import Link
import styles from './NavBar.module.css';
import logo from './assets/logo.png';
const NavBar = () => {
  function logout(){
    localStorage.removeItem("userId");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    window.location.replace("/");
  }
  return (
    <Navbar style={{backgroundColor:'#262673', color:' white'}}>
      <Container style={{backgroundColor:'#262673', color:' white'}}>
        <Navbar.Brand as={NavLink} to="/dashboard" style={{color:'white'}}>
        <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
        FOOD TRACKING</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav >
            <Nav.Link as={NavLink} to="/dashboard" style={{backgroundColor:'#262673', color:' white'}} className={styles.navLink}>
              FOOD ITEMS
            </Nav.Link>
          </Nav>
          <Nav >
            <Nav.Link as={NavLink} to="/users" style={{backgroundColor:'#262673', color:' white'}} className={styles.navLink}>
              USERS
            </Nav.Link>
          </Nav>
          <div style={{flex:'1'}}></div>
          <Nav >Hi {localStorage.getItem("firstName")+" "+localStorage.getItem("lastName")}</Nav>
          &nbsp;&nbsp;<Button style={{backgroundColor:'orange'}} onClick={()=>logout()}>LOGOUT</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
