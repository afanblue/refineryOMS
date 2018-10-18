/*******************************************************************************
 * Copyright (C) $(date) A. E. Van Ness
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
 *******************************************************************************/

function DrawTank(ctx,style,x,y,w,h) {
  var r = (100*w)/h;
  ctx.strokeStyle=style;
  phi = Math.asin(w/(r*2));
  var xl = r * Math.cos(phi);
  var dl = r - xl;
  ctx.fillStyle=style;
  ctx.beginPath();
  ctx.arc(x+w/2,y+xl,r,-phi+3*Math.PI/2,phi+3*Math.PI/2,false);
  ctx.stroke();
  ctx.arc(x+w/2,y-xl,r,-phi+Math.PI/2,phi+Math.PI/2,false);
  ctx.stroke();
  var by = y + h - xl;
  ctx.arc(x+w/2, by, r, phi+Math.PI/2, -phi+Math.PI/2,true);
  ctx.stroke();
  ctx.lineTo(x+w,y);
  ctx.stroke();
}

function DrawEmptyTank(ctx,style,x,y,w,h,l) {
	  ctx.strokeStyle=style;
	  ctx.rect(x,y,w,h);
	  ctx.stroke();
}

function DrawFilledTank(ctx,style,x,y,w,h,l) {
  ctx.strokeStyle=style;
  ctx.rect(x,y,w,h);
  ctx.stroke();
  ctx.fillStyle=style;
  ly = y+h-l;
  ctx.fillRect(x,ly,w,l);
  ctx.stroke();
}

