package us.avn.oms.pmc;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class Pmc {

    private Logger log = LogManager.getLogger(this.getClass());
    private static Logger slog = LogManager.getLogger("us.avn.oms.pmc.Pmc");

	public static void main(String[] args) {
		Pmc pmc = new Pmc();
		try {
			pmc.execute(args);
		} catch( Exception e) {
//			Date now = new Date();
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
//    		System.out.println(sdf.format(now) + eas.toString());	
			slog.error(eas);
		}
	}
	
	public void execute(String[]args) {
        TimerTask aitt = new XferAIData();
        TimerTask ditt = new XferDIData();
        Timer aiTimer = new Timer(true);
        Timer diTimer = new Timer(true);
        Calendar cal = Calendar.getInstance();
        int delay = 60000 - 1000 * cal.get(Calendar.SECOND) - cal.get(Calendar.MILLISECOND);
        aiTimer.scheduleAtFixedRate(aitt, delay, 60*1000);
        log.debug("AI scan started");
        diTimer.scheduleAtFixedRate(ditt, delay, 60*1000);
        log.debug("DI scan started");
        //running timer task as daemon thread
        //cancel after sometime
        while( 1 == 1 ) {
        	try {
        		Thread.sleep( 60 * 60 * 1000);
        	} catch (Exception e) {
//    			Date now = new Date();
    			StringWriter sw = new StringWriter();
    			e.printStackTrace(new PrintWriter(sw));
    			String eas = sw.toString();
//        		System.out.println(sdf.format(now) + eas.toString());	
    			log.error(eas);
        	}
        }

	}

}
