/*******************************************************************************
 * Copyright (C) 2018 A. E. Van Ness
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
package us.avn.oms.service.impl;

import java.util.Collection;
import java.util.Iterator;

import us.avn.oms.domain.Vertex;
import us.avn.oms.mapper.VertexMapper;
import us.avn.oms.service.VertexService;

public class VertexServiceImpl implements VertexService {


	private VertexMapper vtxMapper;
	
	public void setVertexMapper( VertexMapper vm ) {
		this.vtxMapper = vm;
	}
	
	@Override
	public Collection<Vertex> getAllVertices( Long tagId ) {
		return vtxMapper.getAllVertices(tagId);
	}
	
	@Override
	public Vertex getVertex( Long id) {
		return vtxMapper.getVertex(id);
	}
	
	@Override
	public void clearVertices( Long id ) {
		vtxMapper.clearVertices(id);
	}
	
	@Override
	public Long updateVertex( Vertex v ) {
		vtxMapper.updateVertex(v);
		return 1L;
	}

	@Override
	public Long insertVertex( Vertex c ) {		
		vtxMapper.insertVertex(c);
		return 1L;
	}

	@Override
	public void updateVertices( Long id, Collection<Vertex> vtxList ) {
		clearVertices(id);
		Iterator<Vertex> iv = vtxList.iterator();
		while( iv.hasNext()) {
			Vertex v = iv.next();
			if( 0L == v.getId() ) {
				v.setTagId(id);
				insertVertex(v);
			} else {
				updateVertex(v);
			}
		}
	}

}