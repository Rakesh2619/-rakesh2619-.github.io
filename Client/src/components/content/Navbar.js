import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Button, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


export default props => {
  let toggleflag = true;
  const [isOpen, setOpen] = useState(true)
  const toggle = () => {
    if(toggleflag){
      setOpen(true)
    } else {
      setOpen(false)
    }
  }
  
  return (
    <Navbar color="light" light className="navbar shadow-sm p-3 mb-5 bg-white rounded" expand="md">
      <Button color="info" onClick={props.toggle}>
        <FontAwesomeIcon icon={(isOpen) ? faArrowLeft : faArrowRight}/>
      </Button>
      <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
      </Collapse>
    </Navbar>
    
  );
}
