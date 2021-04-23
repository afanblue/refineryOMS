/*************************************************************************
 * Contents.js
 * Copyright (C) 2018  Laboratorio de Lobo Azul
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 ***********************************************************************/

import React, {Component} from 'react';
//import Log                from './requests/Log.js';
//import logo from './logo.svg';

import ActiveAlarms       from './pages/ActiveAlarms.js';
import AdHoc              from './pages/AdHoc.js';
import AlarmMsgAdmin      from './pages/AlarmMsgAdmin.js';
import AlarmTypeAdmin     from './pages/AlarmTypeAdmin.js';
import AnalogInputAdmin   from './pages/AnalogInputAdmin.js';
import AnalogOutputAdmin  from './pages/AnalogOutputAdmin.js';
import CalcVarAdmin       from './pages/CalcVarAdmin.js';
import CarrierAdmin       from './pages/CarrierAdmin.js';
import ConfigAdmin        from './pages/ConfigAdmin.js';
import ControlBlockAdmin  from './pages/ControlBlockAdmin.js';
import CrontabAdmin        from './pages/CrontabAdmin.js';
import DefaultContents    from './pages/DefaultContents.js';
import DigitalInputAdmin  from './pages/DigitalInputAdmin.js';
import DigitalOutputAdmin from './pages/DigitalOutputAdmin.js';
import DockAdmin          from './pages/DockAdmin.js';
import DockingAdmin       from './pages/DockingAdmin.js';
import FieldAdmin         from './pages/FieldAdmin.js';
import Field              from './pages/Field.js';
import GroupList          from './pages/GroupList.js';
import ListSchematics     from './pages/ListSchematics.js';
import OrderAdmin         from './pages/OrderAdmin.js';
import PipeAdmin          from './pages/PipeAdmin.js';
import PlotGroupVars      from './pages/PlotGroupVars.js';
import PlotGroupAdmin     from './pages/PlotGroupAdmin.js';
import ProcessUnit        from './pages/ProcessUnit.js';
import ProcessUnitAdmin   from './pages/ProcessUnitAdmin.js';
import ProcessUnitList    from './pages/ProcessUnitList.js';
import RoleAdmin          from './pages/RoleAdmin.js';
import Schematic          from './pages/Schematic.js';
import SchematicAdmin     from './pages/SchematicAdmin.js';
import ShipAdmin          from './pages/ShipAdmin.js';
import SiteOverview       from './pages/SiteOverview.js';
import SiteStar           from './pages/SiteStar.js';
import TagAdmin           from './pages/TagAdmin.js';
import TankAdmin          from './pages/TankAdmin.js';
import TransferAdmin      from './pages/TransferAdmin.js';
import UserAdmin          from './pages/UserAdmin.js';
//require('es6-promise').polyfill();
//require('isomorphic-fetch');



function fetchContents( category, option, stage, jsonData, menuSelect ) {
  let pageName = category + "." + option;
  switch ( category ) {
    case "Admin":
      option = (((option==="")||(option===null))?"Users":option);
      switch( option ) {
        case "AlarmMessages":
          return <AlarmMsgAdmin stage={stage} />
        case "AlarmTypes":
          return <AlarmTypeAdmin stage={stage} />
        case "AnalogInputs":
          return <AnalogInputAdmin stage={stage} />
        case "AnalogOutputs":
          return <AnalogOutputAdmin stage={stage} />
        case "CalcVariables":
          return <CalcVarAdmin stage={stage} />
        case "Carriers":
          return <CarrierAdmin stage={stage} />
        case "ControlBlocks":
          return <ControlBlockAdmin stage={stage} />
        case "Crontab":
          return <CrontabAdmin stage={stage} />
        case "DigitalInputs":
          return <DigitalInputAdmin stage={stage} />
        case "DigitalOutputs":
          return <DigitalOutputAdmin stage={stage} />
        case "Docks":
          return <DockAdmin stage={stage} />
        case "Fields":
          return <FieldAdmin stage={stage} />
        case "Pipes":
          return <PipeAdmin stage={stage} />
        case "ProcessUnits":
          return <ProcessUnitAdmin stage={stage} />
        case "Roles":
          return <RoleAdmin stage={stage} />
        case "SystemConfiguration":
          return <ConfigAdmin stage={stage} />
        case "Ships":
          return <ShipAdmin stage={stage} />
        case "Tags":
          return <TagAdmin stage={stage} />
        case "Tanks":
          return <TankAdmin stage={stage} />
        case "Users":
          return <UserAdmin stage={stage} />
        default:
          return <DefaultContents pageName={pageName}/>
      }
    case "Orders" :
      option = (((option==="")||(option===null))?"Active":option);
      switch ( option ) {
        case "Active":
          return <OrderAdmin stage={stage} option="B" />
        case "LastWeeksOrders":
          return <OrderAdmin stage={stage} option="7" />
        case "LastMonthsOrders":
          return <OrderAdmin stage={stage} option="M" />
        case "Purchases":
          return <OrderAdmin stage={stage} option="P"/>
        case "Sales":
          return <OrderAdmin stage={stage} option="S"/>
        case "VesselDock":
          return <DockingAdmin stage={stage} />
        default:
          return <DefaultContents pageName={pageName} />
      }
    case "Alarms" :
      option = (((option==="")||(option===null))?"ActiveAlarms":option);
      switch ( option ) {
        case "AlarmsList":
          return <DefaultContents pageName={pageName} />
        case "ActiveAlarms":
          return <ActiveAlarms stage={stage} />
        default:
          return <DefaultContents pageName={pageName} />
      }
    case "FieldDisplays":
      option = (((option==="")||(option===null))?"SiteOverview":option);
      switch ( option ) {
        case "SiteOverview":
          return <SiteOverview stage={stage}
                               tankType="filled" />
        default:
          return <Field stage={stage}
                        fieldName={option}
                        tankType="normal" />
      }
    case "PlotGroups" :
      option = (((option==="")||(option===null))?"SiteStarPlot":option);
      switch ( option ) {
        case "SiteStarPlot":
          return <SiteStar stage={stage} />
        case "ManageGroups":
          return <PlotGroupAdmin stage={stage} />
        case "GroupList":
          return <GroupList stage={stage}
                            menuSelect={menuSelect} />
        case "AdHoc":
          return <AdHoc stage={stage} />
        default:
          if( typeof option === 'string' ) {
            return <DefaultContents pageName={pageName} />
          } else {
            return <PlotGroupVars stage={stage}
                              id={option}
                              source={"id"} />
          }
      }
    case "ProcessUnits" :
      option = (((option==="")||(option===null))?"ProcessUnits":option);
      switch ( option ) {
        case "ProcessUnits":
          return <ProcessUnitList stage={stage}
                                  menuSelect={menuSelect} />
        default:
          return <ProcessUnit stage={stage}
                              option={option} />
      }
    case "Schematics" :
      option = (((option==="")||(option===null))?"ListSchematics":option);
      switch ( option ) {
        case "AdminSchematics":
          return <SchematicAdmin stage={stage} />
        case "ListSchematics":
          return <ListSchematics stage={stage}
                                 menuSelect={menuSelect} />
        default:
          return <Schematic stage={stage} option={option} />
      }
    case "Transfers" :
      option = (((option==="")||(option===null))?"ActiveTransfers":option);
      switch ( option ) {
        case "AdminExecutable":
          return <TransferAdmin stage={stage} type={'X'}/>
        case "AdminTemplate":
          return <TransferAdmin stage={stage} type={'T'}/>
        case "ActiveTransfers":
          return <TransferAdmin stage={stage} type={'A'}/>
        case "Last7DaysTransfers":
          return <TransferAdmin stage={stage} type={'7'} />
        case "ScheduledTransfers":
          return <TransferAdmin stage={stage} type={'S'} />
        default:
          return <DefaultContents pageName={pageName} />
      }
    default:
      return <DefaultContents pageName={pageName} />
  }

}

class Contents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorySelected: props.selected,
      pageSelected: props.option,
      menuSelect: props.handleMenuSelect,
      updateData: false,
      updateDisplay: true,
      stage: "begin",
      returnedText: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let state = prevState;
    if( nextProps.selected !== prevState.categorySelected
      || nextProps.option !== prevState.pageSelected ) {
      state = { categorySelected: nextProps.selected,
                pageSelected: nextProps.option,
                menuSelect: nextProps.handleMenuSelect,
                stage: nextProps.stage,
                updateData: true,
                updateDisplay: false,
                returnedText: null };
    }
    return state;
  }

  componentDidUpdate( prevProps, prevState ) {
  }

  shouldComponentUpdate(nextProps,nextState) {
    let sts = this.state.categorySelected !== nextProps.selected;
    sts = sts || this.state.pageSelected !== nextProps.option;
//    sts = sts || nextState.updateDisplay;
    return sts;
  }

  render() {
    const option = this.props.option;
    const selected = this.props.selected;
    const stage = this.state.stage;
    const jsonData = this.state.returnedText;
    const menuSelect = this.state.menuSelect;
    return (
      fetchContents( selected, option, stage, jsonData, menuSelect )
    )
  }

}

export default Contents;
