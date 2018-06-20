package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

public class PlotGroup implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String name;
	private Long id1;
	private Long id2;
	private Long id3;
	private Long id4;
	private String active;
    private Collection<IdName> aiList;
    
    public PlotGroup() {}

    public PlotGroup( Long i, String n ) {
    	this.id = i;
    	this.name = n;
    }
    	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}

	public void setName(String n) {
		this.name = n;
	}
		

	public Long getId1() {
		return id1;
	}

	public void setId1(Long id1) {
		this.id1 = id1;
	}


	public Long getId2() {
		return id2;
	}

	public void setId2(Long id2) {
		this.id2 = id2;
	}


	public Long getId3() {
		return id3;
	}

	public void setId3(Long id3) {
		this.id3 = id3;
	}


	public Long getId4() {
		return id4;
	}

	public void setId4(Long id4) {
		this.id4 = id4;
	}


	public Collection<IdName> getAiList() {
		return aiList;
	}

	public void setAiList(Collection<IdName> aiList) {
		this.aiList = aiList;
	}


	public String getActive() {
		return active;
	}

	public void setActive(String a) {
		this.active = a;
	}
		

	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("PlotGroup{\"id\"=").append(this.id);
		sb.append(", \"name\"=\"").append(this.name).append("\"");
		sb.append(", \"id1\"=").append(this.id1);
		sb.append(", \"id2\"=").append(this.id2);
		sb.append(", \"id3\"=").append(this.id3);
		sb.append(", \"id4\"=").append(this.id4);
	    sb.append("}");
		return sb.toString();
	}

}
