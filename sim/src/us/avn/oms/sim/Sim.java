package us.avn.oms.sim;

import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class Sim {

    private Logger log = LogManager.getLogger(this.getClass());

	public static void main(String[] args) {
		Sim sim = new Sim();
		sim.execute(args);
	}
	
	public void execute(String[]args) {
        TimerTask aitt = new SimulateAnalogData();
        TimerTask ditt = new SimulateDigitalData();
        Timer aiTimer = new Timer(true);
        Timer diTimer = new Timer(true);
        Calendar cal = Calendar.getInstance();
//		wait until 45 seconds after (15 seconds before) the minute
        int start = 45;
        if( cal.get(Calendar.SECOND) > 40 ) { start = 60 + 45; }
        int delay = start * 1000 - 1000 * cal.get(Calendar.SECOND) - cal.get(Calendar.MILLISECOND);
        aiTimer.scheduleAtFixedRate(aitt, delay, 60*1000);
        log.debug("Analog scan started");
        diTimer.scheduleAtFixedRate(ditt, delay, 60*1000);
        log.debug("Digital scan started");
        while( 1 == 1 ) {
        	try {
        		Thread.sleep( 60 * 60 * 1000);
        	} catch (InterruptedException e) {
        		log.debug(e.getStackTrace().toString());
        	}
        }

	}

}
