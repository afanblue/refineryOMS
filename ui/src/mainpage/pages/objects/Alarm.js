

/*
 * "id":5,"objId":null,"abbr":"HH","message":"High High Alarm"
 */

export function Alarm(i,t,ao,ack,act,pri,c,clr,msg,v) {
  this.id=i; this.tagId=t; this.almOccurred=ao; this.acknowledged=ack;
  this.active=act; this.priority=pri; this.code=c; this.color=clr;
  this.message=msg; this.value=v;
};

export function AlarmMsg(i,a,m) { 
  this.id=i; this.abbr=a; this.message=m; 
};

export function AlarmType(i,p,c,mid,msg) {
  this.id=i; this.priority=p; this.code=c;
  this.alarmMsgId=mid; this.alarmMsg=msg;
}
