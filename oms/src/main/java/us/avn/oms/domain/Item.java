package us.avn.oms.domain;

public class Item extends OMSObject {

	public static final long serialVersionUID = 20181229135530L;
	
    private Long    shipmentId;
    private Long    itemNo;
	private String  active;       // Active 'A', Pending 'P', Complete 'C'
    private String  contentCd;
    private String  newItem;
    private Double  expVolumeMin;
    private Double  expVolumeMax;
    private Double  actVolume;
   
	public Item() {	}
	
	public Long getShipmentId() {
		return shipmentId;
	}

	public void setShipmentId(Long sid) {
		this.shipmentId = sid;
	}

	
	public Long getItemNo() {
		return itemNo;
	}	

	public void setItemNo(Long ino) {
		this.itemNo = ino;
	}
	

	public String getActive() {
		return active;
	}
	
	public void setActive(String active) {
		this.active = active;
	}
	
	
	public String getContentCd() {
		return contentCd;
	}

	public void setContentCd(String ccd ) {
		this.contentCd = ccd;
	}
	

	public String getNewItem() {
		return newItem;
	}

	public void setNewItem(String ni ) {
		this.newItem = ni;
	}
	

	public Double getExpVolumeMin() {
		return expVolumeMin;
	}

	public void setExpVolumeMin(Double volume) {
		this.expVolumeMin = volume;
	}
	

	public Double getExpVolumeMax() {
		return expVolumeMax;
	}

	public void setExpVolumeMax(Double volume) {
		this.expVolumeMax = volume;
	}
	

	public Double getActVolume() {
		return actVolume;
	}

	public void setActVolume(Double volume) {
		this.actVolume = volume;
	}
	

	

}
