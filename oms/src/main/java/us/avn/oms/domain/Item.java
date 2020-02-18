package us.avn.oms.domain;

public class Item extends OMSObject {

	public static final long serialVersionUID = 20181229135530L;
	
    private Long    shipmentId;
    private Long    itemNo;
    private String  contentCd;
    private String  newItem;
    private Double  expVolumeMin;
    private Double  expVolumeMax;
    private Double  actVolume;
	private String  active;       // Active 'A', Pending 'P', Complete 'C'
    private Long    carrierId;
    private String  carrier;
    private Long    stationId;
    private String  station;
    private Long    transferId;
    private String  transfer;
    
	public static final String ACTIVE = "A";
	public static final String COMPLETE = "C";
	public static final String DONE = "D";
	public static final String PENDING = "P";
	
   
	public Item() {	
		shipmentId = 0L; 
		itemNo=0L; 
		active="P";
		actVolume = 0D;
		carrierId = null;
		stationId = null;
		transferId = null;
	}
	
	public Item( Long id, Long ino, String act ) {
		shipmentId = id;
		itemNo = ino;
		active = act;
		carrierId = null;
		stationId = null;
		transferId = null;
		expVolumeMin = 0D;
		expVolumeMax = 0D;
		actVolume = 0D;
	}
	
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
	

	public Long getCarrierId() {
		return carrierId;
	}	

	public void setCarrierId(Long cid) {
		this.carrierId = cid;
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

	
	public String getActive() {
		return active;
	}
	
	public void setActive(String active) {
		this.active = active;
	}
	
	
	public String getCarrier() {
		return carrier;
	}
	
	public void setCarrier(String c) {
		this.carrier = c;
	}
	
	
	public Long getStationId() {
		return stationId;
	}
	
	public void setStationId( Long sid ) {
		stationId = sid;
	}


	public String getStation() {
		return station;
	}

	public void setStation(String station) {
		this.station = station;
	}

	
	public Long getTransferId() {
		return transferId;
	}
	
	public void setTransferId( Long tid ) {
		transferId = tid;
	}


	public String getTransfer() {
		return transfer;
	}

	public void setTransfer(String transfer) {
		this.transfer = transfer;
	}

}
