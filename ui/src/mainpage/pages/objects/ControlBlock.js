/*************************************************************************
 * ControlBlock.js
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


export function ControlBlock(id,pvId,spId,type, co, pv, sp, outp, pvv, spv ) { 
  this.id=id;
  this.pvId=(pvId===null?0:pvId);
  this.spId=(spId===null?0:spId); 
  this.blockType=type;
  this.co=(co===null?"":co); 
  this.pv=(pv===null?"":pv);
  this.sp=(sp===null?"":sp);
  this.output=(outp===null?0:outp);
  this.procValue=(pvv===null?0:pvv);
  this.setpoint=(spv===null?0:spv);
}
