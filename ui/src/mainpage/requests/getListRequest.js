import Log from './mainpage/requests/Log.js';


export function Request(u,a) { this.uri = u; this.action=a; }


export function getListRequest( cat, page, stage ) {
  Log.info( "getRequest: "+ cat + ":" + ((page===null)?"(null)":page) + "/" + stage );
  let myRequest="http://localhost:8080/oms";
  let action = "GET";
  switch ( page ) {
    case "AdminSystemConfiguration":
      myRequest = null;
      break;
    case "AdminAlarmMessages":
      myRequest += "/alarm/message/all";
      break;
    case "AdminAlarmTypes":
      myRequest += "/alarm/type/all";
      break;
    case "AdminUsers":
      myRequest = null;
      break;
    case "AdminRoles":
      myRequest += "/role/all";
      break;
    case "AdminTanks":
      myRequest += "/tank/all";
      break;
    case "AdminFields":
      myRequest += "/field/all";
      break;
    case "AdminProcessUnits":
      myRequest += "/processunit/all";
      break;
    case "AdminLinks":
      myRequest += "/link/all";
      break;
    default:
      myRequest = null;
  }
  var requestBlock = new Request(myRequest,action);
  return requestBlock;
}

