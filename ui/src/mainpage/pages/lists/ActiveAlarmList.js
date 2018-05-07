import React, {Component} from 'react';


class ActiveAlarmList extends Component {
  constructor(props) {
    super(props);
    this.state = {alarmList: props.alarmList};
  }
  
  componentWillReceiveProps(nextProps) {
    console.log( "ActiveAlarmList.willRcvProps: "
               + ((nextProps.option===null)?"null":nextProps.option) );
    this.setState({ alarmList: nextProps.alarmList });
  }
  

  
  render() {
    console.log("ActiveAlarmList.render ");
    var almList = this.state.alarmList;
    let handleSelect  = this.props.handleSelect;
    var now = (new Date()).toLocaleString('en-US', {hour12:false});
    return ( 
      <div className="oms-tabs">
        <h2><div>
          <img src="./images/spacer.png" alt="space" width="30px" height="2px"/>
          Alarm List 
          <img src="./images/spacer.png" alt="space" width="50px" height="2px"/>
          {now}
        </div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Name </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Occurred </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Description </th>
              <th className={["oms-spacing-80","oms-underline"].join(' ')}> Code </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Pri </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Value </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Message </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {almList.map(
            function(n,x){
              var z = n.id;
              var color = n.color;
              if( n.acknowledged === 'Y' ) {
                color = "white";
              }
              var almOcc = n.almOccurred;
              var occ = (new Date(almOcc)).toLocaleString('en-US', {hour12:false});
              return (
                <tr key={x}>
                  <td className={["oms-spacing-90","oms-cursor-pointer"].join(' ')} 
                      style={{"color":color}}>
                    <a onClick={() => {handleSelect({z})}}>{n.tagId.name}</a>
                  </td>
                  <td className="oms-spacing-120" style={{"color":color}}>
                    {occ}
                  </td>
                  <td className="oms-spacing-240" style={{"color":color}}>
                    {n.tagId.description}
                  </td>
                  <td className="oms-spacing-80" style={{"color":color}}>
                    {n.code}
                  </td>
                  <td className="oms-spacing-50" style={{"color":color}}>
                    {n.priority}
                  </td>
                  <td className="oms-spacing-90" style={{"color":color}}>
                    {n.value}
                  </td>
                  <td className="oms-spacing-240" style={{"color":color}}>
                    {n.message}
                  </td>
                </tr>
                );
              } 
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default ActiveAlarmList;