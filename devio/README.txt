This is the directory for the Java Eclipse project for the collection of data
for the scada application to transfer.  Note that it is different from the
Simulation (sim) application, which generates approximately fake data for
various field values.

It queries the NWS site 
	http://w1.weather.gov/xml/current_obs/KILG.xml 
for the Delaware City (New Castle County Airport) current weather data.

It also references some of the other UI tables to determine what temperatures and
what levels to update.

These tables are

-- device
-- address
-- rel_tag_tag