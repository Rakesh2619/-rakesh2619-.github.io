import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SideBar from './components/sidebar/SideBar';
import Content from './components/content/Content';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

export default () => {

  const [isOpen, setOpen] = useState(true)
  const [checkVal, setCheckVal] = useState({});
  const [optionSelect, setoptionSelect] = useState({});

  const toggle = () => setOpen(!isOpen)
  useEffect(() => {
    //initload(); 
    setoptionSelect({pastdue: true});
    setCheckVal()  
  }, [])

  const serviceApi = (payload) => {
      axios.post(`http://localhost:4000/apis/inititems`, payload)
      .then(result => {
        // if(payload.item = 'pastdue'){
         // setListData(result.data)
        // }
        
      })
  }

  const getCall = ( payload) => {
    serviceApi(payload)
  }
  
  const initload = () => {
    let param = {
      item: 'pastdue'
    }
    getCall(param)
  }

  // let itemval = '';
  let optionSelectFin = {
    pastdue: true,
    urgent: false,
    shortterm: false,
    longterm: false,
    fyi: true
  };

  const checkboxChange = (event) => {
    const _event = event.target;
    const param = _event.value;

    if(param === 'pastdue' && _event.checked){
      optionSelectFin.pastdue = true
      
    } else if(param === 'pastdue' && !_event.checked){
      optionSelectFin.pastdue = false
    }
    
    if(param === 'urgent' && _event.checked) {
      optionSelectFin.urgent = true
    } else if(param === 'urgent' && !_event.checked) {
      optionSelectFin.urgent = false
    } 

    if(param === 'shortterm' && _event.checked) {
      optionSelectFin.shortterm = true;
    } else if(param === 'shortterm' && !_event.checked) {
      optionSelectFin.shortterm = false
    } 

    if(param === 'longterm' && _event.checked) {
      optionSelectFin.longterm = true
    } else if(param === 'longterm' && !_event.checked) {
      optionSelectFin.longterm = false
    } 

    if(param === 'fyi' && _event.checked) {
      optionSelectFin.fyi = true
    } else if(param === 'fyi' && !_event.checked) {
      optionSelectFin.fyi = false
    } 
   

    setoptionSelect(optionSelectFin)
  }

  const getListItems = (evt) => {
    const paramKey = (evt.target.innerText !== 'Past Due - 10') ? (evt.target.innerText) : 'pastdue' ;
    let param = {
      item: paramKey.toLowerCase()
    }
    serviceApi(param)
  }

  return (
    <Router>
      <div className="App wrapper">
        <SideBar checkVal={checkVal} toggle={toggle} isOpen={isOpen} setListItems = { getListItems } checkBoxEvent = { checkboxChange }/>
        <Content toggle={toggle} isOpen={isOpen} selectedItem = { optionSelect } />
      </div>
    </Router>
  );
}

