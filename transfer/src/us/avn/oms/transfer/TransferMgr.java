package us.avn.oms.transfer;

import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class TransferMgr {

    private Logger log = LogManager.getLogger(this.getClass());

	public static void main(String[] args) {
		TransferMgr x = new TransferMgr();
		x.execute(args);
	}
	
	/**
	 * Method: execute
	 * Description: start the thread that processes transfers.
	 * 				start @ 15 seconds after the minute and run
	 * 				every minute after that.
	 * 
	 * @param args  used to specify when new transfers are created
	 * 				from templates.  
	 * 				If 1 arg: args[0] is the repeat interval, ie, it
	 * 						  is run when  min % args[0] == 0
	 * 				If 2 args: args[0] = hour, args[1] is the minute 
	 */
	public void execute(String[]args) {
        TimerTask updx = new UpdateTransfers(args);
        Timer xTimer = new Timer(true);
        Calendar cal = Calendar.getInstance();
//		wait until 45 seconds after (15 seconds before) the minute
        int start = 15;
        if( cal.get(Calendar.SECOND) > 10 ) { start += 60 ; }
        int delay = start * 1000 - 1000 * cal.get(Calendar.SECOND) - cal.get(Calendar.MILLISECOND);
        xTimer.scheduleAtFixedRate(updx, delay, 60*1000);
        log.debug("TransferMgr update thread started");
        while( 1 == 1 ) {
        	try {
        		Thread.sleep( 60 * 60 * 1000);
        	} catch (InterruptedException e) {
        		log.debug(e.getStackTrace().toString());
        	}
        }

	}

}
