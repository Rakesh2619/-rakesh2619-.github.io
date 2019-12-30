import React, { useRef, useEffect, useState } from 'react';
import '../../App.css';
import { AgGridReact } from 'ag-grid-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import 'ag-grid-enterprise';

import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Label,
  Button,
  ButtonGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from 'reactstrap';

let a = [];
const CommonGrid = (props) => {
  const { gridItems } = props;
  let gridApi;
  let gridColumnApi;
  const [rowData, setRowData] = useState(null);
  const gridElem = useRef(null);

  const columnDefs = [
    {
      enableRowGroup: true,
      field: 'category',
      headerName: 'Category',
      hide: true,
      rowGroup: true,
       pinned: 'left'
    },
    {
      headerName: "Ship From VBU #",
      field: "ShipFromVBU",
     headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
     checkboxSelection: true,
     sortable: true,
      editable: true
    },
    { headerName: "DC Number", field: "DCNumber", sortable: true },
    { headerName: "Ship Unit", field: "ShipUnit" , sortable: true },
    { headerName: "FlowSetting", field: "FlowSetting", editable: true , sortable: true},
    { headerName: "SDC", field: "SDC", editable: true , sortable: true },
    { headerName: "Pallet Flag", field: "PalletFlag", editable: true , sortable: true },
    { headerName: "Max Stack Height", field: "MaxStackHeight", editable: true , sortable: true},
    { headerName: "Supply Chain Planner", field: "SupplyChainPlanner", editable: true, sortable: true },
    { headerName: "Comments", field: "Comments", editable: true, sortable: true },
    { headerName: "DC MOM", field: "DCMOM", editable: true, sortable: true },
    { headerName: "Priority", field: "Priority", sortable: true},
    { headerName: "Order/ Req Create Date ", field: "OrderReqCreateDate" , sortable: true},
    { headerName: "Schedule Arrival Date ", field: "ScheduleArrivalDate", sortable: true },
    { headerName: "Actual Arrival Date", field: "ActualArrivalDate", sortable: true },
    { headerName: "Item Stocked", field: "ItemStocked" , sortable: true},
    { headerName: "Stock Effective Date", field: "StockEffectiveDate", sortable: true },
    { headerName: "Non Stock Effective Date ", field: "NonStockEffectiveDate", sortable: true },
    { headerName: "PO Number", field: "PONumber", sortable: true },
    { headerName: "Item Number", field: "ItemNumber", sortable: true },
    { headerName: "Item Description", field: "ItemDescription", sortable: true },
    { headerName: "Vendor Name", field: "VendorName", sortable: true },
    { headerName: "Add", field: "Add" , sortable: true},
    { headerName: "Item Weight (lbs)", field: "ItemWeight", sortable: true },
    { headerName: "Item Depth (in)", field: "ItemDepth", editable: true, sortable: true },
    { headerName: "Item Width (in)", field: "ItemWidth", editable: true , sortable: true},
    { headerName: "Item Height (in)", field: "ItemHeight", editable: true , sortable: true},
    { headerName: "Innerpack Qty", field: "InnerpackQty", editable: true , sortable: true},
    { headerName: "Innerpack Weight (lbs)", field: "InnerpackWeight", editable: true, sortable: true },
    { headerName: "Innerpack Depth (in)", field: "InnerpackDepth", editable: true, sortable: true },
    { headerName: "Innerpack Width (in)", field: "InnerpackWidth", editable: true, sortable: true },
    { headerName: "Innerpack Height (in)", field: "InnerpackHeight", editable: true, sortable: true },
    { headerName: "Case Qty", field: "CaseQty", editable: true , sortable: true},
    { headerName: "Case Weight (lbs)", field: "CaseWeight", editable: true , sortable: true},
    { headerName: "Case Depth (in)", field: "CaseDepth", editable: true, sortable: true },
    { headerName: "Case Width (in)", field: "CaseWidth", editable: true , sortable: true},
    { headerName: "Case Height (in)", field: "CaseHeight", editable: true , sortable: true},
    { headerName: "Pallet Weight (lbs)", field: "PalletWeight", editable: true, sortable: true },
    { headerName: "Pallet Qty", field: "PalletQty", editable: true , sortable: true},
    { headerName: "Pallet Depth (in)", field: "PalletDepth", editable: true, sortable: true },
    { headerName: "Pallet Width (in)", field: "PalletWidth", editable: true, sortable: true },
    { headerName: "Pallet Height (in)", field: "PalletHeight", editable: true , sortable: true},
    { headerName: "Cases per Tier", field: "CasesperTier", editable: true , sortable: true},
    { headerName: "Tiers per Pallet", field: "TiersperPallet", editable: true, sortable: true },
    { headerName: "Innerpack Cube", field: "InnerpackCube", editable: true , sortable: true},
    { headerName: "Case Cube", field: "CaseCube", editable: true , sortable: true},
    { headerName: "Pallet Cube", field: "PalletCube", editable: true , sortable: true},
    { headerName: "Packaging Type", field: "PackagingType", editable: true , sortable: true},
    { headerName: "Hazmat Code", field: "HazmatCode", editable: true , sortable: true},
    { headerName: "Product Nested", field: "ProductNested", editable: true , sortable: true},
    { headerName: "Squeeze Clamp Safe", field: "SqueezeClampSafe", editable: true , sortable: true},
    { headerName: "Conveyable", field: "Conveyable", editable: true, sortable: true },
    { headerName: "Replaces Item Number", field: "ReplacesItemNumber", editable: true, sortable: true },
    { headerName: "PG#", field: "PG", editable: true , sortable: true},
    { headerName: "Liquid Content", field: "LiquidContent", editable: true, sortable: true }
  ]

  const defaultColDef = {
    resizable: true
  };
  const autoGroupColumnDef = {
    headerName: 'Items Name'
  }
  const getRowNodeId = (node) => {
    return node.id;
  }
  const onGridReady = (params) => {
    gridApi = params.api;
    gridColumnApi = params.columnApi;
   // params.api.sizeColumnsToFit();
  }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [secondmodal, secondsetModal] = useState(false);
  const secondtoggle = () => secondsetModal(!secondmodal);

  useEffect(() => {
    setRowData(gridItems);
  }, [props])

  const updateValue = () => {
   // let confirmVal = window.confirm("Do you want to update the fields?");
      const selectedRows = (gridElem.current && gridElem.current.gridOptions.api.getSelectedRows());
      for (let j = 0; j < rowData.length; j++) {
        for (let i = 0; i < selectedRows.length; i++) {
          if (rowData[j].id === selectedRows[i].id) {
            rowData[j]["ShipFromVBU"] = (document.querySelector("#ShipFromVBU").value !== '') ? document.querySelector("#ShipFromVBU").value : rowData[j]["ShipFromVBU"];
            rowData[j]["FlowSetting"] = (document.querySelector("#FlowSetting").value !== '') ? document.querySelector("#FlowSetting").value : rowData[j]["FlowSetting"];
            rowData[j]["SDC"]         = (document.querySelector("#SDC").value !== '') ? document.querySelector("#SDC").value : rowData[j]["SDC"];
            rowData[j]["PalletFlag"] = (document.querySelector("#PalletFlag").value !== '') ? document.querySelector("#PalletFlag").value : rowData[j]["PalletFlag"];
            rowData[j]["MaxStackHeight"] = (document.querySelector("#MaxStackHeight").value !== '') ? document.querySelector("#MaxStackHeight").value : rowData[j]["MaxStackHeight"];
            rowData[j]["SupplyChainPlanner"] = (document.querySelector("#SupplyChainPlanner").value !== '') ? document.querySelector("#SupplyChainPlanner").value : rowData[j]["SupplyChainPlanner"];
            rowData[j]["Comments"] = (document.querySelector("#Comments").value !== '') ? document.querySelector("#Comments").value : rowData[j]["Comments"];
            rowData[j]["DCMOM"] = (document.querySelector("#DCMOM").value !== '') ? document.querySelector("#DCMOM").value : rowData[j]["DCMOM"];
            rowData[j]["ItemDepth"] = (document.querySelector("#ItemDepth").value !== '') ? document.querySelector("#ItemDepth").value : rowData[j]["ItemDepth"];
            rowData[j]["ItemWidth"] = (document.querySelector("#ItemWidth").value !== '') ? document.querySelector("#ItemWidth").value : rowData[j]["ItemWidth"];
            rowData[j]["ItemHeight"] = (document.querySelector("#ItemHeight").value !== '') ? document.querySelector("#ItemHeight").value : rowData[j]["ItemHeight"];
            rowData[j]["InnerpackQty"] = (document.querySelector("#InnerpackQty").value !== '') ? document.querySelector("#InnerpackQty").value : rowData[j]["InnerpackQty"];
            rowData[j]["InnerpackWeight"] = (document.querySelector("#InnerpackWeight").value !== '') ? document.querySelector("#InnerpackWeight").value : rowData[j]["InnerpackWeight"];
            rowData[j]["InnerpackDepth"] = (document.querySelector("#InnerpackDepth").value !== '') ? document.querySelector("#InnerpackDepth").value : rowData[j]["InnerpackDepth"];
            rowData[j]["InnerpackWidth"] = (document.querySelector("#InnerpackWidth").value !== '') ? document.querySelector("#InnerpackWidth").value : rowData[j]["InnerpackWidth"];
            rowData[j]["InnerpackHeight"] = (document.querySelector("#InnerpackHeight").value !== '') ? document.querySelector("#InnerpackHeight").value : rowData[j]["InnerpackHeight"];
            rowData[j]["CaseQty"] = (document.querySelector("#CaseQty").value !== '') ? document.querySelector("#CaseQty").value : rowData[j]["CaseQty"];
            rowData[j]["CaseWeight"] = (document.querySelector("#CaseWeight").value !== '') ? document.querySelector("#CaseWeight").value : rowData[j]["CaseWeight"];
            rowData[j]["CaseDepth"] = (document.querySelector("#CaseDepth").value !== '') ? document.querySelector("#CaseDepth").value : rowData[j]["CaseDepth"];
            rowData[j]["CaseWidth"] = (document.querySelector("#CaseWidth").value !== '') ? document.querySelector("#CaseWidth").value : rowData[j]["CaseWidth"];
            rowData[j]["CaseHeight"] = (document.querySelector("#CaseHeight").value !== '') ? document.querySelector("#CaseHeight").value : rowData[j]["CaseHeight"];
            rowData[j]["PalletWeight"] = (document.querySelector("#PalletWeight").value !== '') ? document.querySelector("#PalletWeight").value : rowData[j]["PalletWeight"];
            rowData[j]["PalletQty"] = (document.querySelector("#PalletQty").value !== '') ? document.querySelector("#PalletQty").value : rowData[j]["PalletQty"];
            rowData[j]["PalletDepth"] = (document.querySelector("#PalletDepth").value !== '') ? document.querySelector("#PalletDepth").value : rowData[j]["PalletDepth"];
            rowData[j]["PalletWidth"] = (document.querySelector("#PalletWidth").value !== '') ? document.querySelector("#PalletWidth").value : rowData[j]["PalletWidth"];
            rowData[j]["PalletHeight"] = (document.querySelector("#PalletHeight").value !== '') ? document.querySelector("#PalletHeight").value : rowData[j]["PalletHeight"];
            rowData[j]["CasesperTier"] = (document.querySelector("#CasesperTier").value !== '') ? document.querySelector("#CasesperTier").value : rowData[j]["CasesperTier"];
            rowData[j]["TiersperPallet"] = (document.querySelector("#TiersperPallet").value !== '') ? document.querySelector("#TiersperPallet").value : rowData[j]["TiersperPallet"];
            rowData[j]["InnerpackCube"] = (document.querySelector("#InnerpackCube").value !== '') ? document.querySelector("#InnerpackCube").value : rowData[j]["InnerpackCube"];
            rowData[j]["CaseCube"] = (document.querySelector("#CaseCube").value !== '') ? document.querySelector("#CaseCube").value : rowData[j]["CaseCube"];
            rowData[j]["PalletCube"] = (document.querySelector("#PalletCube").value !== '') ? document.querySelector("#PalletCube").value : rowData[j]["PalletCube"];
            rowData[j]["PackagingType"] = (document.querySelector("#PackagingType").value !== '') ? document.querySelector("#PackagingType").value : rowData[j]["PackagingType"];
            rowData[j]["HazmatCode"] = (document.querySelector("#HazmatCode").value !== '') ? document.querySelector("#HazmatCode").value : rowData[j]["HazmatCode"];
            rowData[j]["ProductNested"] = (document.querySelector("#ProductNested").value !== '') ? document.querySelector("#ProductNested").value : rowData[j]["ProductNested"];
            rowData[j]["SqueezeClampSafe"] = (document.querySelector("#SqueezeClampSafe").value !== '') ? document.querySelector("#SqueezeClampSafe").value : rowData[j]["SqueezeClampSafe"];
            rowData[j]["Conveyable"] = (document.querySelector("#Conveyable").value !== '') ? document.querySelector("#Conveyable").value : rowData[j]["Conveyable"];
            rowData[j]["ReplacesItemNumber"] = (document.querySelector("#ReplacesItemNumber").value !== '') ? document.querySelector("#ReplacesItemNumber").value : rowData[j]["ReplacesItemNumber"];
            rowData[j]["PG"] = (document.querySelector("#PG").value !== '') ? document.querySelector("#PG").value : rowData[j]["PG"];
            rowData[j]["LiquidContent"] = (document.querySelector("#LiquidContent").value !== '') ? document.querySelector("#LiquidContent").value : rowData[j]["LiquidContent"];
            
          }
        }
      // setRowData(editedRowData)
      gridElem.current.gridOptions.api.setRowData(rowData)
      setUpdateDate(rowData);
      toggle();
    }
  }

  const setUpdateDate = (data) => {
    let payload = {
      item: data
    }
    axios.post(`http://localhost:4000/apis/updateitems`, payload)
      .then(result => {
        alert("Data Updated Succesfully");
      })
  }

  return (
    <div style ={{ marginTop:'9%'}}>
        <FontAwesomeIcon icon={faEdit} onClick={toggle} /> 
        <Button color="success" style= {{marginTop:'-13%', marginLeft:'86%'}} onClick={secondtoggle}>Submit</Button>{' '}
        <Modal isOpen={secondmodal} toggle={secondtoggle}>
        <ModalBody><b>Do you want to Submit your updated Results?</b>
            <Input type="textarea" placeholder="Please Provide Some Comments" rows={5} />
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
              <Button  className="updatebutton" onClick={secondtoggle} >Submit</Button>{' '}
              <Button onClick={secondtoggle} >Cancel</Button>
              </ButtonGroup>
            </ModalFooter>
          </Modal>
      <div className="ag-theme-balham" style={{ height: '460px', width: '109%' }}>
        <AgGridReact
          autoGroupColumnDef={ autoGroupColumnDef }
          columnDefs={ columnDefs }
          rowData={ rowData }
         defaultColDef={ defaultColDef }
          animateRows={ true }
     onGridReady={ onGridReady }
          rowSelection="multiple"
          getRowNodeId={ getRowNodeId }
          ref={ gridElem }
        />
      </div>
      <Modal isOpen={modal} toggle={toggle} style = {{width:'77%'}} size='xl'>
        <ModalHeader toggle={toggle}>Edit Items</ModalHeader>
        <ModalBody style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
          <Container>
            <Row>
              {columnDefs.map((item) => {
                if (item.editable) {
                  return (
                    <Col className="xs-3">
                      <label>{item.headerName}</label>
                      <FormGroup>
                        <input type="text" name={item.field} id={item.field} />
                      </FormGroup>
                    </Col>
                  )
                }
              })}
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup >
            <Button className="updatebutton" onClick={(evt) => { updateValue(evt) }} >Update</Button>{' '}
            <Button onClick={toggle}>Cancel</Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default CommonGrid;
