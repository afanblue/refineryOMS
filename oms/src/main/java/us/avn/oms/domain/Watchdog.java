package us.avn.oms.domain;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

/*       
 *       id: 2
 *     name: DigitalInput
 *  updated: 170700
 *   active: Y
 */
public class Watchdog implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss\n");

	public static final String AI = "AnalogInput";
	public static final String AO = "AnalogOutput";
	public static final String DCAI = "DataCollectionAI";
	public static final String DCAO = "DataCollectionAO";
	public static final String DCDI = "DataCollectionDI";
	public static final String DCDO = "DataCollectionDO";
	public static final String DI = "DigitalInput";
	public static final String DO = "DigitalOutput";
	public static final String TRANSFER = "Transfer";
	
	private Long id;
	private Long updated;
	private String name;
	private String active;
	private String lastModifiedDt;
    
    public Watchdog() { }
    
    public Watchdog( String n ) {
    	this.name = n;
    }

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	

	public Long getUpdated() {
		return updated;
	}
	
	public void setUpdated(Long upd) {
		this.updated = upd;
	}

	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	
	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}
	

	public String getLastModifiedDt() {
		return lastModifiedDt;
	}

	public void setLastModifiedDt(String lastModifiedDt) {
		this.lastModifiedDt = lastModifiedDt;
	}

	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Watchdog{");
		sb.append(" \"id\"=").append(this.id);
		sb.append(", \"name\"=\"").append(this.name).append("\"");
		sb.append(", \"updated\"=").append(this.updated);
		sb.append(", \"active\"=\"").append(this.active).append("\"");
		sb.append(", \"lastModifiedDt\"=\"");
		sb.append(this.lastModifiedDt==null?"null":this.lastModifiedDt);
		sb.append("\"");
		sb.append("}");
		return sb.toString();
	}

}
