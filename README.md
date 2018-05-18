## OMS ("Oil Movement System")

This project provides a simulation of an oil refinery w/a UI for watching/controlling the action.  Controlling is a bit of a misnomer, since the only real control currently is in the management of transfers.  The "action" occurs in "real" time, that is, there is no compression of time to make the action happen faster.

**DISCLAIMER 1:**  The provided picture and DB is of the Delaware City, Delaware refinery.  There has been no communication between me and the past or present owners of this site about the nature of their refinery.  If there is any correlation between this implementation and the actual site, it is strictly co-incidental.

**DISCLAIMER 2:**  This is my re-interpretation of a system I worked on early in my career.  There is no relationship between this system and the original OMS produced by that employer, even though I have borrowed the name.  Any mistakes in this re-interpretation are, of course, mine.  The original system had a single page menu whose items were activated by a light pen and location of the pen.  There was a hidden location from which Star Trek could be run.  That particular feature has not been carried over.

**DISCLAIMER 3:**  The historical compression algorithms are my implementations of some algorithms originally developed at another employer.  That employer bears no responsibility for any errors in my implementations. 

There are a number of features which have not (yet) been implemented.  These include, but are not limited to 
- [x] Linux installation procedures.
- [ ] On the field displays, selecting a tank, will generate a more detailed display of the tank selected.
- [ ] digital input processing (the full implementation of this would be associated w/inputs indicating the presence of tank cars, tank trucks and ships (set by the simulator based on either a schedule defined somewhere) and on cute animations of transfers)
- [ ] analog output processing (the assumption is that these are setpoints.  For the simulator to response "realistically", we need to define the input(s) which reflects the actions of the setpoint which would imply needing to understand the reaction time to the set point. Sorry, TMI required)
- [ ] digital output processing (like the analog outputs, the effect of a digital output is shown in some other value, e.g., the status of a valve or an analog value, like a pump or valve position)
- [ ] implementation of digital inputs to more realistically handle tank car, tank truck, and ship presence
- [ ] temperature correction of the volumes
- [ ] simulated arrival of additional crude for processing
- [ ] automated transfers for refined products to tank cars (railroads), tank trucks, and ships.  There is a first pass implementation of this, but it needs additional testing.  For this to work properly, it should be possible to set up transfers to the tank cars and or tank trucks for multiple products and the transfers end up being multiply defined.  In addition, the presence of a given tank car/truck would ideally have a product associated with it.
- [ ] graphical display of transfers (cute animations!)
- [x] an archival mechanism for the historical data (db/archive.bat; db/archive.sh)
- [ ] automated payment
- [ ] user manual

The application is built using a Java-based REST data source (Tomcat/Spring) which references a MySQL database.  The UI is implemented in react.  Underlying the UI and the database are some ancillary programs, all implemented in Java.  

-  The transfer service automatically creates transfers based on transfer templates
-  The SCADA/PMC service transfers values between the XFER table to the appropriate type table (analog/digital input/output) and saves the data
-  The simulator generates semi-realistic values for the values based on the temperature (fetched from the USWS), the transfer definitions, and the refinery output fractions.  Both the temperature location and the refinery output fractions are defined in the CONFIG table and are accessible via the admin UI.

There are additional files provided to enable creation of the services for Windows users.
-  start the simulator, transfer, and scada/pmc services
-  purge log files for Tomcat and the services.  Note that the purgeOMSLogs.bat and purgeOMSLogs.bat need to be modified to correctly set the directory in which they are located.
-  save the database every night.

## Installation - So you've pulled the repo into {oms}.


### Required products:

The following are assumed to be installed:

    -  mysql
    -  Java (Version 8 or greater)
    -  Tomcat 8
    -  node/npm
    -  react-konva, rechart, moment, victory
    -  php (used to load DB and extract DB configuration)
    -  Developers: Eclipse/your favorite IDE

### Assumptions:

For the startup procedures, the Linux installation is assumed to be in /usr/share/oms.

There is also an assumption that whoever's doing this is conversant w/the above products and the languages used for this.  The languages used are:

   -  Java - for the webapp, which is only used as a set of REST services for the React app to consume.  Java is also used for the transfer, scada (pmc), and simulate programs.
             
   -  ECMAscript (JavaScript) - for the React-based UI.
    
   -  SQL  - Shouldn't need to know this unless you're updating the services
    
   -  PHP - there are some utilities written in PHP which are leftovers from the original UI.  There is a PHP based version of the UI which has not been updated since the UI was converted to React.
   
   -  powershell needs its execution policy set correctly to run the purge log scripts.  If you're not worried about security, then "set-executionpolicy unrestricted" will work.

### Things to know:

   1.  The DB instance is "oms", the username is "oms" and the password is "omsx".  If you want to change these, then you'll need to make lots of changes.  The places to look for these are in db/includes/constants.php, the various application context (app_context.xml, application_context.xml) files in the Java services, and the extractDB.bat

   1.  Tomcat has the CORS filters set up.  If you want to continue running the UI from npm, you'll need to do this.
   ```
   ** Allowed Origins **
   http://localhost:3000  (may vary...)
   ** Allowed Methods **
   GET, POST, PUT
   ** Allowed Headers **
   Content-Type,Cache-Control,X-Requested-With,Accept,Authorization,Origin,Access-Control-Request-Method,Access-Control-Request-Headers
   ```
   
   1.  Tomcat also has Smap suppression set for JSP page compilers, which apparently is required.
   ```
        <init-param>
            <param-name>suppressSmap</param-name>
            <param-value>true</param-value>
        </init-param>
   ```

   1.  The simulator actually retrieves the current weather conditions from the US weather service, i.e., http://w1.weather.gov/xml/current_obs/KILG.xml.  The "KILG" is the code for the Wilmington/New Castle County, DE airport.  This is defined in the config table w/item_name='WEATHER_LOCATION' and can be changed in the System Configuration Admin.  See http://w1.weather.gov/xml/current_obs/seek.php to locate XML weather observation feeds available.
       
   1.  If you don't like my colors, the background and text color are defined in the oms.css file and in various js and html files.  The alarm colors can be changed in the System  Configuration Admin page, as NORMCOLOR, HHCOLOR, HICOLOR, LOCOLOR, LLCOLOR.  The background color is "midnightblue"

### To Install:

   1.  Create environment variables OMS_HOME and OMS_LOGS.  Create an oms user to use as the account under which these process will run.  
   
   1.  Set up a mySQL DB instance and knows the user name and password.  Create the user(s).  Using a single user, i.e., "oms" allows  anyone w/the oms password to change your schema, which is probably not desirable, but unless this is a production system (unlikely), then security is probably not a high priority.  For that matter, the default  password for the OMS schema is not secure.

    ```
          create schema oms;                   
          create user oms identified by "omsx";
    ```
- if security desired

    ```
    #---create user omssys identified by "{systempwd}";
    grant all privileges on oms.* to omssys;
    grant select, update, insert on oms.* to oms;
    grant delete on oms.rel_tag_tag to oms;
    grant delete on oms.user_role to oms;
    grant delete on oms.role_priv to oms;
    GRANT SUPER ON *.* TO oms;
    ```
- else

    ```
    grant all privileges on oms.* to oms;
    GRANT SUPER ON *.* TO oms;
    ```
- end if
            
   1.  To install the database, from the command line.  FWIW, the only {site name} that is available is 'DelawareCity'.  Setting up a site is non-trivial, though it can be done via csv-based files.

       **Windows**:
    ```
           cd /d {oms}\db
           oms.bat {omspwd} {site name}
    ```
	   To redirect all output to a file db.log
    ```
           oms.bat {omspwd} {site name} >db.log 2>&1
    ```
       **Linux**: 
    ```
           cd {oms}/db
           oms.bash  {oms password} {site name}
    ```
	       
	   The log file can be checked to verify that all tables and views have been created and all the records have been inserted.  Look for occurrences of
	   
	       'mysql' which is **not** an error, but a warning that the password shouldn't be entered on the command line.
	       'false' (not case sensitive) There should be two entries found on one line for an insert
	       '0 row' the DB insert will sometimes indicate success, but 0 rows inserted.  This is an error, usually indicating that either a lookup or the select used for the insert has failed.
	      
   1.  The webapp must be deployed to Tomcat.  NB, logging is done to {catalina.base}/logs, so if you deploy to Jetty or some other server, you'll need to update the log4j2.xml to correct the location
   
   1.  To schedule the services, 
-  **Windows**: execute the createScheduledJobs.bat (createScheduledJobs.bat <user> <pwd> <OMShome>)
-  **Linux**  : move the files (sim.init; transfer.init; pmc.init) to the init.d directory, rename them, make them executable, and set up symlinks in the rc3.d directory.  The jobs to purge the logs (purgeOMSLogs.sh; purgeTomcatLogs.sh) and save the DB (extractDB.sh) will need to be added to cron by hand ("45 0 * * * {OMS_HOME}/purgeOMSLogs.sh"; "30 0 * * * {OMS_HOME}/purgeTomcatLogs.sh"; "45 0 * * * {OMS_HOME}/extractDB.sh") 

   1.  To start the services, you can reboot (ugh!) or run the services (Windows) or start the services (/etc/init.d/xxxx start, where xxxx are the files you moved to init.c)
 
   1.  The node_modules were deliberately excluded, so you'll need to do an "npm install"
    
   1.  The UI still runs under npm, so you'll need to start that up ... (**Windows**: cd /d %OMS_HOME%\ui; npm start oms.js; **Linux**: cd $OMS_HOME/ui; npm start oms.js)
   
At this point, you should be able to bring up a browser, enter the appropriate URL (typically, http://localhost:3000), and go.

## Known bugs
   1.  Under transfers, "Admin Executable" and "Admin Template" can be selected consecutively, e.g., after selecting "Admin Executable", you need to select something else before "Admin Template".  If you select it next, there will be no response
   1.  
## Further Information:

   1. You should be able to import the 5 eclipse projects (oms, rest, pmc (scada), sim, transfer) for additional development.  If it's not clear, the "oms" project is shared among the other 4, where "rest" is the Java webapp and the other 3 are (I hope) obvious.