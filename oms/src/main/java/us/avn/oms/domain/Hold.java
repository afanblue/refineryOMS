package us.avn.oms.domain;

public class Hold extends OMSObject {

    private Long   carrierId;
    private Long   orderNo;
    private Double volume;
    private Long   noDuplicates;
   
	public Hold() {	}
	
	public Hold( Long cid, Long ono ) {
		this.carrierId = cid;
		this.orderNo = ono;
	}

	public Long getCarrierId() {
		return carrierId;
	}

	public void setCarrierId(Long carrierId) {
		this.carrierId = carrierId;
	}

	
	public Long getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(Long orderNo) {
		this.orderNo = orderNo;
	}
	

	public Double getVolume() {
		return volume;
	}

	public void setVolume(Double volume) {
		this.volume = volume;
	}
	

	public Long getNoDuplicates() {
		return noDuplicates;
	}

	public void setNoDuplicates(Long noDuplicates) {
		this.noDuplicates = noDuplicates;
	}
	

}
