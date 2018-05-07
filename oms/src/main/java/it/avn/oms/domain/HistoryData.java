package it.avn.oms.domain;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

public class HistoryData implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
		
    private AnalogInput ai;
    private Collection<History> ch;
	  
	
	public AnalogInput getAiTag() {
		return this.ai;
	}
	
	public void setAiTag( AnalogInput ai ) {
		this.ai = ai;
	}
	

	public Collection<History> getHistory() {
		return ch;
	}
	
	public void setHistory( Collection<History> c ) {
		this.ch = c;
	}
		
	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		sb.append("HistoryData{\"ai\":[").append(this.ai.toString()).append("]");
		sb.append(", \"history\"=[").append(this.ch.toString()).append("]");
		sb.append("}");
		return sb.toString();
	}

}
