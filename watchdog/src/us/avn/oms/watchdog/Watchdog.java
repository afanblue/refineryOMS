package us.avn.oms.watchdog;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Watchdog {

    private Logger log = LogManager.getLogger(this.getClass());
    private static Logger slog = LogManager.getLogger("us.avn.oms.watchdog.Watchdog");

	public static void main(String[] args) {
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss\n");
		Watchdog x = new Watchdog();
		try {
			x.execute(args);
		} catch( Exception e ) {
//			Date now = new Date();
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
//    		System.out.println(sdf.format(now) + eas.toString());	
			slog.error(eas);
		}
	}
	
	/**
	 * Method: execute
	 * Description: start the thread that checks watchdogs.
	 * 				start @ the minute and run every minute after that.
	 */
	public void execute(String[]args) {
        TimerTask updx = new CheckWatchdogs(args);
        Timer xTimer = new Timer(true);
        Calendar cal = Calendar.getInstance();
//		wait until  seconds after (15 seconds before) the minute
        int start = 30;
        if( cal.get(Calendar.SECOND) > 20 ) { start += 60 ; }
        int delay = start * 1000 - 1000 * cal.get(Calendar.SECOND) - cal.get(Calendar.MILLISECOND);
        xTimer.scheduleAtFixedRate(updx, delay, 60*1000);
        log.debug("Watchdog check thread started");
        while( 1 == 1 ) {
        	try {
        		Thread.sleep( 60 * 60 * 1000);
        	} catch (Exception e) {
    			StringWriter sw = new StringWriter();
    			e.printStackTrace(new PrintWriter(sw));
    			String eas = sw.toString();
        		log.error(eas.toString());
        	}
        }

	}

}
