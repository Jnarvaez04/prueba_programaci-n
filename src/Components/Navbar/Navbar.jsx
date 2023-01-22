import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/img/Logo_casino.jpg';


export const NavbarApp = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="img_casino"
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top rounded-circle mr-4"
            />{" "}
            CASINO
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};
