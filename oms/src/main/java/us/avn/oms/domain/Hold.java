package us.avn.oms.domain;

public class Hold extends OMSObject {

    private Long   carrierId;
    private Long   holdNo;
    private Double volume;
    private Long   noDuplicates;
   
	public Hold() {	}
	
	public Hold( Long cid, Long hno ) {
		this.carrierId = cid;
		this.holdNo = hno;
	}

	public Long getCarrierId() {
		return carrierId;
	}

	public void setCarrierId(Long carrierId) {
		this.carrierId = carrierId;
	}

	
	public Long getHoldNo() {
		return holdNo;
	}

	public void setHoldNo(Long holdNo) {
		this.holdNo = holdNo;
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
