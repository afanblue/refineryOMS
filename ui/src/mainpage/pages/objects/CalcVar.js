

export function CalcVar( i,t,defn,ot,its,otl,itl ) {
  this.id=i; this.tag=t; this.definition=(defn===null?"0":defn);
  this.outputTagId=ot; this.inputTags=its; this.scanValue=null;
  this.outputTagList=otl; this.tagList=itl;
}