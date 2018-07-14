
export function ControlBlock(id,tid,type,outp,inp,ao,adi,aai) { 
  this.id=id; this.tagId=tid; this.blockType=type; this.output=outp; this.input=inp;
  this.allOutputs=ao; this.allDInputs=adi; this.allAInputs=aai;
}
