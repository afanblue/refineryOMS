/*******************************************************************************
 * Copyright (C) 2018 Laboratorio de Lobo Azul
 *  
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *******************************************************************************/
package us.avn.oms.watchdog;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Properties;
import java.util.TimerTask;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import us.avn.oms.domain.Watchdog;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.WatchdogService;

/**
 * WatchdogCheck verifies that all of the active processes in the watchdog
 * table are actually being updated.  There are three global variables for
 * this class, the lastCheckedCount, lastUpdateCount, and notifiedCount.
 * <br>It loops through all of the active records (active='Y') and looks to see if
 * <ol><li> the lastCheckedCount is greater than or equal to the interval from the 
 * table. </li>
 * <li> If it does not, then it's <b>not time to check to see if the program has 
 * run</b>. So the lastCheckedCount is updated.</li>  
 * <li> If it does, then it is time to <b>see if the program has run</b>, so the 
 * lastUpdateCount is checked.</li>
 * <li>If it doesn't match the value from the record, then <b>all is well</b>, 
 * and the lastCheckedCount is cleared.</li>
 * <li>If it does, then the <b>program didn't run</b>, so we need to </li>
 * <li>increment the notified count</li>
 * <li>If the notified count exceeds the limit, we notify the "mail_user" and clear the notified count</li>
 * <li>Otherwise, we just increment the notified count</li>
 * </ol>
 * @author Allan
 *
 */
public class WatchdogCheck extends TimerTask {

	private static final long   DEFAULT_INTERVAL = 60L;

	private static final String MAIL_FROM = "EMAIL_FROM";
	private static final String MAIL_PWD = "EMAIL_PWD";
	private static final String MAIL_USER = "EMAIL_USER";
	private static final String SITE = "SITE";
	private static final String SMTP_HOST = "SMTP_HOST";
	private static final String SMTP_PORT = "SMTP_PORT";
	private static final String WATCHDOG_EMAIL = "WATCHDOG_EMAIL";
		
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());

    private ApplicationContext context = null;
    private ConfigService cfgs = null;
    private WatchdogService wds = null;

    private Long emailInterval;
    private HashMap<Long,Long> lastCheckedCount = new HashMap<Long,Long>(20);
    private HashMap<Long,Long> lastUpdateCount = new HashMap<Long,Long>(20);
    private HashMap<Long,Long> notifiedCount = new HashMap<Long,Long>(20);
    private static HashMap<String,String> configuration;
   
    public WatchdogCheck( String[] args ) { 
    	if( args.length == 0 ) {
    		emailInterval = DEFAULT_INTERVAL;
    	} else {
    		try {
    			emailInterval = new Long(args[1]);
    		} catch( Exception e ) {
    			emailInterval = DEFAULT_INTERVAL;
    		}
    	}
    }
    
	public void run( ) {
		log.debug("Start watchdog processing");
		/*  */
		if( context == null) { context = new ClassPathXmlApplicationContext("app-context.xml"); }
		if( cfgs == null ) { cfgs = (ConfigService) context.getBean("configService"); }
		if( wds  == null ) { wds  = (WatchdogService) context.getBean("watchdogService"); }
		
		configuration = cfgs.getAllConfigItems();
		Collection<Watchdog> cwd = wds.getActiveWatchdogs();
		log.debug("Active watchdogs: "+cwd.size());
		Iterator<Watchdog> iwd = cwd.iterator();
		StringBuffer deadDogs = new StringBuffer(2000);
		String delim = "";
		while( iwd.hasNext() ) {
			Watchdog wd = iwd.next();
//			log.debug("Check active watchdog: "+wd.toString());
			Long luc = lastUpdateCount.get(wd.getId())==null?-1:lastUpdateCount.get(wd.getId());
			if( luc < 0L ) {
				notifiedCount.put(wd.getId(),emailInterval+1);
			} else if( luc.equals(wd.getUpdated() ) ) {
				log.debug(wd.getName()+" is not updating: "+luc+"/"+wd.getLastModifiedDt());
				Long nc = notifiedCount.get(wd.getId())==null?0L:notifiedCount.get(wd.getId());
				if( nc >= emailInterval ) {
					deadDogs.append(delim).append(wd.getName());
					delim = ", ";
					notifiedCount.put(wd.getId(),1L);					
				} else {
					notifiedCount.put(wd.getId(),nc+1);
				}
			} else {
				notifiedCount.put(wd.getId(),0L);
			}
			lastUpdateCount.put(wd.getId(), wd.getUpdated());
		}
		if( 0 < deadDogs.length() ) {
			sendMail(deadDogs.toString());
		}
	}
	

	private void sendMail( String wd ) {
		log.debug("Sending email for "+wd);
		String to = configuration.get(WATCHDOG_EMAIL);
		String host = configuration.get(SMTP_HOST);
		String port = configuration.get(SMTP_PORT);
		String from = configuration.get(MAIL_FROM);
		final String user = configuration.get(MAIL_USER);
		final String pwd = configuration.get(MAIL_PWD);

		Properties properties = System.getProperties();
		properties.setProperty("mail.smtp.host", host);
		properties.setProperty("mail.smtp.port", port);
		properties.setProperty("mail.user", user);
		properties.setProperty("mail.password", pwd);
        properties.setProperty("mail.smtp.auth","true");
        properties.setProperty("mail.smtp.starttls.enable","true");
        
		Authenticator auth = new Authenticator() {
			//override the getPasswordAuthentication method
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(user, pwd);
			}
		};
		Session session = Session.getInstance(properties, auth);

		try {
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(from));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
			message.setSubject("Service(s) is(are) not updating");
			StringBuffer sb = new StringBuffer(2000);
			sb.append(wd).append(" is(are) not updating for OMS site ");
			sb.append(configuration.get(SITE)).append("\n\n<p/>");
			sb.append("Please do not reply to this message");
			message.setContent(sb.toString(), "text/html");

			// Send message
			Transport.send(message);
		} catch (MessagingException mex) {
			StringWriter sw = new StringWriter();
			mex.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);
		}
	}
	
}
