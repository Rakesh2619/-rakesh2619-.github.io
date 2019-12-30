import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faPaperPlane, faQuestion, faImage, faCopy } from '@fortawesome/free-solid-svg-icons';
import SubMenu from './SubMenu';
import NavBar from '../content/Navbar';
import { FormGroup, Label} from 'reactstrap';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import usericon from '../../Assets/userloginimage.png';


const SideBar = props => (
  <>
    <div className={classNames('sidebar', {'is-open': props.isOpen})}>
      <div className="sidebar-header">
        <span color="info" onClick={props.toggle} style={{color: '#fff'}}>&times;</span>
        {/* <NavBar toggle={props.toggle}/> */}
        <div className="usercircle">
          <img src={usericon} alt="" />
        </div>
        <p className="text-center">
          <a href="#" style={{textDecoration:'underline'}}>Rakesh Chaganti</a>
        </p>
      </div>
      <div className="side-menu">
        
        {/* <SubMenu title="IC-54" icon={faHome} items = {submenus[0]} menuSelect = { props.setListItems } /> */}
        <h4 style = {{marginTop:'60px'}}><FontAwesomeIcon icon={faHome} />IC-54</h4>
        <ul className="list-unstyled">
          <li>
            <FormGroup check>
              <Label check>
                <input  type='checkbox' name='pastdue' checked={props.checkVal} value='pastdue' onChange={(event) => { props.checkBoxEvent(event) } } />
                <span>PAST DUE - 3</span>
              </Label>
            </FormGroup>
          </li>
          <li>
            <FormGroup check>
              <Label check>
                <input  type='checkbox' name='urgent' value='urgent' onChange={(event) => { props.checkBoxEvent(event)} } />
                <span>URGENT - 1</span>
              </Label>
            </FormGroup>
          </li>
          <li>
            <FormGroup check>
              <Label check>
                <input  type='checkbox' name='shortterm' value='shortterm' />
                <span>SHORTTERM - 0</span>
              </Label>
            </FormGroup>
          </li>
          <li>
            <FormGroup check>
              <Label check>
                <input  type='checkbox' name='longterm' value='longterm' />
                <span>LOGNTERM - 0</span>
              </Label>
            </FormGroup>
          </li>
          <li>
            <FormGroup check>
              <Label check>
                <input  type='checkbox' name='fyi' value='fyi'  />
                <span>FYI - 0</span>
              </Label>
            </FormGroup>
          </li>
      </ul>
      </div>
    </div>
    </>
  );

  const submenus = [
    [
      {
        title: "Past Due - 10",
        target: "pastdue",
        value:'pastdue'
      },
      {
        title: "Urgent",
        target: "urgent",
        value:'urgent'        
      },
      {
        title: "Short Term",
        target: "shortterm",  
        value:'shortterm'    
      },
      {
        title: "Long Term",
        target: "longterm",
        value:'longterm'
      },
      {
        title: "FYI",
        target: "fyi", 
        value:'fyi'     
      }
      
    ]
  ]
  

export default SideBar;
