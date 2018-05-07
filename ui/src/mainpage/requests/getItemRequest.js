

export function Request(u,a) { this.uri = u; this.action=a; }


export function getItemRequest( cat, page, stage, id ) {
  console.log( "getItemRequest: "+ cat + ":" + ((page===null)?"(null)":page) + "/" + stage + ":" + id);
  let myRequest="http://localhost:8080/oms";
  let action = "GET";
  switch ( page ) {
    case "AdminSystemConfiguration":
      myRequest += "/config/all";
      break;
    case "AdminAlarmMessages":
      myRequest += "/alarm/message/" + id;
      break;
    case "AdminAlarmTypes":
      myRequest += "/alarm/type/" + id;
      break;
    case "AdminUsers":
      myRequest += "/user/"+id;
      break;
    case "AdminRoles":
      myRequest += "/role/" + id;
      break;
    case "AdminTanks":
      myRequest += "/tank/" + id;
      break;
    case "AdminFields":
      myRequest += "/Field/" + id;
      break;
    case "AdminProcessUnits":
      myRequest += "/processunit/" + id;
      break;
    case "AdminLinks":
      myRequest += "/link/" + id;
      break;
    default:
      myRequest = null;
  }
  var requestBlock = new Request(myRequest,action);
  return requestBlock;
}

