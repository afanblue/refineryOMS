/*************************************************************************
 * Crontab.js
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
/* eslint-env node, browser, es6 */

export function Crontab(id,n,moh,hod,dom,moy,dow,hd,md) {
	this.id=id; this.name=n; this.moh=moh;
    this.hod=hod; this.dom=dom; this.moy=moy; this.dow=dow;
    this.hourDuration=hd; this.minuteDuration=md;
}