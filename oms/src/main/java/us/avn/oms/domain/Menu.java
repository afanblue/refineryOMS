package us.avn.oms.domain;

import java.io.Serializable;

public class Menu implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private String text;
	private Integer orderNo;
	private String uri;
	private String viewPriv;
	private String execPriv;
	private String category;
	private String menuName;
	  

	public String getText() {
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	
	public Integer getOrderno() {
		return orderNo;
	}
	
	public void setOrderno(Integer orderNo) {
		this.orderNo = orderNo;
	}
	
	
	public String getUri() {
		return uri;
	}
	
	public void setUri(String uri) {
		this.uri = uri;
	}
	
	
	public String getViewpriv() {
		return viewPriv;
	}
	
	public void setViewpriv(String viewPriv) {
		this.viewPriv = viewPriv;
	}
	
	
	public String getExecpriv() {
		return execPriv;
	}
	
	public void setExecpriv(String execPriv) {
		this.execPriv = execPriv;
	}

	
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	
	public String getMenuname() {
		return menuName;
	}

	public void setMenuname(String menuName) {
		this.menuName = menuName;
	}


	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Menu{\"text\":\"").append(this.text).append("\"");
		sb.append("\", orderno\":").append(this.orderNo).append("");
		sb.append("\", uri\":\"").append(this.uri).append("\"");
		sb.append("\", viewpriv\":\"").append(this.viewPriv).append("\"");
		sb.append("\", execpriv\":\"").append(this.execPriv).append("\"");
		sb.append("\", category\":\"").append(this.category).append("\"");
		sb.append("\", menuname\":\"").append(this.menuName).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
