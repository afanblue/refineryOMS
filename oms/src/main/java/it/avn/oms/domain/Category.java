package it.avn.oms.domain;

import java.io.Serializable;

public class Category implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private String text;
	  

	public String getText() {
		return text;
	}
	
	public void setText(String t) {
		this.text = t;
	}
	
	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Category{\"text\"=\"").append(this.text).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
