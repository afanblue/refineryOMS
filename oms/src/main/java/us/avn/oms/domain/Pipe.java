package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;
import java.util.Vector;


public class Pipe extends Tag implements Serializable {

	private static final long serialVersionUID = -2719140494446170126L;
	private Collection<Vertex> vtxList;
	
	public Pipe() {
		tagTypeCode = "P";
		vtxList = new Vector<Vertex>();
	}

	public Pipe(Long i, String n) {
		super(i, n);
		tagTypeCode = "P";
		vtxList = new Vector<Vertex>();
	}

	public Pipe(Long i, String n, String c) {
		super(i, n, c);
		tagTypeCode = "P";
		vtxList = new Vector<Vertex>();
	}

	public Pipe(Tag t) {
		super(t);
		tagTypeCode = "P";
		vtxList = new Vector<Vertex>();
	}
	

	public Collection<Vertex> getVtxList() {
		return vtxList;
	}

	public void setVtxList(Collection<Vertex> vtxList) {
		this.vtxList = vtxList;
	}

	
}
