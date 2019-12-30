import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Container, Row, Col, FormGroup, Label } from 'reactstrap';
import NavBar from './Navbar';
import CommonGrid from '../Items/GridItem';
import axios from 'axios';
import Accordion from '../accordian/accordian';
// import { Switch, Route } from 'react-router-dom';
let prevArray = [];

const Content = (props) => {

  const [actualData, setActualData] = useState([]);
  const [gridDataUpdate, setGridDataUpdate] = useState([]);
  
  const contents = [
    {
      "title": "Past Due - 10",
      "results": [{
        "name": "6456734521",
        "value": "gridpastdue1"
      }, {
        "name": "9876543219",
        "value": "gridpastdue2"
      }, {
        "name": "8765432198",
        "value": "gridpastdue3"
      }]
    }
  ]

  const urgent = [
    {
      "title": "Urgent",
      "results": [{
        "name": "8765432121",
        "value": "rowdataurgent1"
      }]
    }
  ]

  useEffect(() => {
    setGridDataUpdate(gridDataUpdate)
  }, [gridDataUpdate])

  const getGridData = (event) => {
    const { checked, id } = event.target;
    const tempArray = actualData;

    if( checked === true ) {
      const payload = { item: event.target.value }
      axios.post(`http://localhost:4000/apis/inititems`, payload)
        .then(result => {
          actualData.push(result.data);
          setActualData(tempArray);
          updateGridData(tempArray);
        })
    }
    else if( checked === false ) {
      const filteredArray = actualData.filter( item => item.id !== id );
      
      setActualData(filteredArray); //state
      updateGridData(filteredArray);

    }
  }


  const updateGridData = (array) => {
    let gridData = [];
    for(let i = 0; i < array.length; i++) {
        gridData = [...gridData, ...array[i].data]
    }
    setGridDataUpdate(gridData);
  }

  return (
    <Container fluid className={classNames('content', { 'is-open': props.isOpen })}>
      <NavBar toggle={props.toggle} />
      <Row xs="2" className="gridSection">
        <Col xs="12" md="3" className="pt50" style ={{backgroundColor:'white'}}>
          {/* {props.lists && props.lists.map((items, key) => { */}
          <div className={(props.selectedItem.pastdue) ? 'show' : 'hide'}>
            <Accordion title='PAST DUE ' >
              <ul className="list-unstyled">
                <li>
                  {contents && contents.map(item => {
                    return (
                      <>
                        {item.results && item.results.map((res, index) => {
                          return (
                            <FormGroup check>
                              <Label check>
                                <input type='checkbox' name='PASTDUE 1' id = {`pastdue-${index}`} 
                                onChange={(event) => { getGridData(event) }} value={res.value} />
                                <span>{res.name}</span>
                              </Label>
                            </FormGroup>
                          )
                        })}
                      </>
                    )
                  })}
                </li>
              </ul>
            </Accordion>
          </div>
          <div className={(props.selectedItem.urgent) ? 'show' : 'hide'}>
            <Accordion title='URGENT ' >
              <ul className="list-unstyled">
                <li>
                  {urgent && urgent.map(item => {
                    return (
                      <>
                        {item.results && item.results.map((res, index) => {
                          return (
                            <FormGroup check>
                              <Label check>
                                <input type='checkbox' name='URGENT 1' id = {`urgent-${index}`}
                                  onChange={(event) => { getGridData(event) }} value={res.value} />
                                <span>{res.name}</span>
                              </Label>
                            </FormGroup>
                          )
                        })}

                      </>
                    )
                  })}
                </li>
              </ul>
            </Accordion>
          </div>
        </Col>
        <Col xs="12" md="9">
          {console.log("actualdata: ", actualData)}
          <CommonGrid gridItems={gridDataUpdate} prevsArray={prevArray} style={{ width: '600px', margin: '0 auto' }} />
        </Col>
      </Row>
    </Container>
  )
}

export default Content;

