import React, {Component} from 'react';
//import logo from './logo.svg';
import ActiveAlarms       from './pages/ActiveAlarms.js';
import ActiveTransfers    from './pages/ActiveTransfers.js';
import AdHoc              from './pages/AdHoc.js';
import AlarmMsgAdmin      from './pages/AlarmMsgAdmin.js';
import AlarmTypeAdmin     from './pages/AlarmTypeAdmin.js';
import AnalogInputAdmin   from './pages/AnalogInputAdmin.js';
import ConfigAdmin        from './pages/ConfigAdmin.js';
import DefaultContents    from './pages/DefaultContents.js';
import DigitalInputAdmin  from './pages/DigitalInputAdmin.js';
import FieldAdmin         from './pages/FieldAdmin.js';
import Field              from './pages/Field.js';
import GroupList          from './pages/GroupList.js';
import Last7DaysTransfers from './pages/Last7DaysTransfers.js';
import PlotGroup          from './pages/PlotGroup.js';
import PlotGroupAdmin     from './pages/PlotGroupAdmin.js';
import ProcessUnit        from './pages/ProcessUnit.js';
import ProcessUnitAdmin   from './pages/ProcessUnitAdmin.js';
import ProcessUnitList    from './pages/ProcessUnitList.js';
import RoleAdmin          from './pages/RoleAdmin.js';
import ScheduledTransfers from './pages/ScheduledTransfers.js';
import SiteOverview       from './pages/SiteOverview.js';
import SiteStar           from './pages/SiteStar.js';
import TankAdmin          from './pages/TankAdmin.js';
import TransferAdmin      from './pages/TransferAdmin.js';
import UserAdmin          from './pages/UserAdmin.js';
import VesselAdmin        from './pages/VesselAdmin.js';
require('es6-promise').polyfill();
require('isomorphic-fetch');


function fetchContents( category, option, stage, jsonData, menuSelect ) {
  console.log("Contents.fetchContents: category: "+category+", option="+option+", stage="+stage);
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
        case "DigitalInputs":
          return <DigitalInputAdmin stage={stage} />
        case "Fields":
          return <FieldAdmin stage={stage} />
        case "ProcessUnits":
          return <ProcessUnitAdmin stage={stage} />
        case "Roles":
          return <RoleAdmin stage={stage} />
        case "SystemConfiguration":
          return <ConfigAdmin stage={stage} />
        case "Tanks":
          return <TankAdmin stage={stage} />
        case "Users":
          return <UserAdmin stage={stage} />
        case "Vessels":
          return <VesselAdmin stage={stage} />
        default:
          return <DefaultContents />    
      }     
    case "Alarms" :
      option = (((option==="")||(option===null))?"ActiveAlarms":option);
      switch ( option ) {
        case "AlarmsList":
          return <DefaultContents />
        case "ActiveAlarms":
          return <ActiveAlarms stage={stage} />
        default:
          return <DefaultContents />    
      }
    case "FieldDisplays":
      option = (((option==="")||(option===null))?"SiteOverview":option);
      switch ( option ) {
        case "SiteOverview":
          return <SiteOverview stage={stage}
                               tankType="filled" />
        default:
          return <Field stage={stage}
                        field={option}
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
            return <DefaultContents />
          } else {
            return <PlotGroup stage={stage}
                              id={option} />
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
    case "Transfers" :
      option = (((option==="")||(option===null))?"ActiveTransfers":option);
      switch ( option ) {
        case "AdminExecutable":
          return <TransferAdmin stage={stage}
                                type={'X'}/>
        case "AdminTemplate":
          return <TransferAdmin stage={stage}
                                type={'T'}/>
        case "ActiveTransfers":
          return <ActiveTransfers stage={stage}/>
        case "Last7DaysTransfers":
          return <Last7DaysTransfers stage={stage}/>
        case "ScheduledTransfers":
          return <ScheduledTransfers stage={stage}/>
        default:
          return <DefaultContents />    
      }
    default:
      return <DefaultContents />
  }

}

class Contents extends Component {
  constructor(props) {
    super(props);
    console.log( "Contents: " + props.selected + ":" + props.option + "/" + props.stage );
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
  
  componentWillReceiveProps(nextProps) {
    console.log( "Contents.willRcvProps: " + nextProps.selected +"=?"+this.state.categorySelected
               + ":" + nextProps.page + "=?" + this.state.pageSelected + " -- " 
               + ((nextProps.option===null)?"null":nextProps.option)
               + "/" + nextProps.stage );
    if( nextProps.selected !== this.state.categorySelected
      || nextProps.option !== this.state.pageSelected ) {
      this.setState({ categorySelected: nextProps.selected,
                      pageSelected: nextProps.option,
                      menuSelect: nextProps.handleMenuSelect,
                      stage: nextProps.stage,
                      updateData: true,
                      updateDisplay: false,
                      returnedText: null });
    }
  }

  componentDidUpdate( prevProps, prevState ) {
    console.log( "Contents.didUpdate: updated? " + (this.state.updated?"T":"F") );
  }

  shouldComponentUpdate(nextProps,nextState) {
    console.log( "Contents.shouldUpdate: " + nextProps.selected + ":" 
               + nextProps.option + "/" + nextState.stage
               + " - " + (nextState.updateDisplay?"T":"F") );
    console.log( "Contents.shouldUpdate: " 
               + this.state.categorySelected + "/" + nextState.categorySelected + ":" 
               + this.state.pageSelected + "/" + nextState.pageSelected );
    let sts = this.state.categorySelected !== nextProps.selected;
    sts = sts || this.state.pageSelected !== nextProps.option;
//    sts = sts || nextState.updateDisplay;
    console.log( "Contents.shouldUpdate? : " + (sts?"T":"F") );
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
