import React, { useState, useRef } from 'react';
import  { Collapse, NavItem, NavLink, Label, FormGroup } from 'reactstrap';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import classNames from 'classnames';
// import { Link } from 'react-router-dom';
// import { QuerySelector } from '../../../node_modules/ag-grid-community';

const SubMenu = props => {
  
  const checkboxcheck = useRef(false);

  const [collapsed, setCollapsed] = useState(true)
  const toggleNavbar = () => setCollapsed(!collapsed)
  const { icon, title, items } = props;

  const tabSelection = (event) => {
    const target = event.target;
    const parent = target.parentElement;
    const allElements = document.querySelectorAll('#navTabs li');
    for(let i = 0; i < allElements.length; i++ ){
        allElements[i].classList.remove('active')
    }
    parent.classList.add('active')
    // allElements.classList.remove('active');
  }

 
  return (
    <div id='navTabs'>
      {/* <NavItem onClick={toggleNavbar} className={classNames({'menu-open': !collapsed})}> */}
      <h2> { title } </h2>
      <ul className="list-unstyled">
        {items.map((item, index) => (
          <li key={index}>
            <FormGroup check>
              <Label check>
                {/* <input  type='checkbox' name={item.title} value={item.value} onChange={(event) => { checkboxChange(event)} }/> */}
                <span>{item.title}</span>
              </Label>
            </FormGroup>
          </li>
        ))}
      </ul>
      {/* <NavItem className="pl-4">
        <NavLink>
          
        </NavLink>
        </NavItem> */}
        {/* {items.map((item, index) => (
            <NavItem key={index} onClick={ tabSelection } className={(item.title === 'Past Due - 10') ? 'active pl-8' : 'pl-8'}>
              <NavLink  tag={Link} to={item.target} onClick={(evt) => {evt.preventDefault();} }>
                <input type='checkbox' value={item.title} name={item.title} checked={(item.title === 'Past Due - 10') ? true : false} /> 
                <span>{item.title}</span>
              </NavLink>
           </NavItem>
            ))} */}
      {/* </NavItem> */}
      {/* <Collapse isOpen={!collapsed} navbar className={classNames('items-menu',{'mb-1': !collapsed})}>
        {items.map((item, index) => (
            <NavItem key={index} className="pl-4">
              <NavLink tag={Link} to={item.target}>
                {item.title}
              </NavLink>
            </NavItem>
            ))}
      </Collapse> */}
    </div>
  );
}

export default SubMenu;
