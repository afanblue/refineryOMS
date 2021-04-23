This is the directory for the Java Eclipse project to simulate the collection of data
for the scada application to transfer.

It queries the NWS site 
	http://w1.weather.gov/xml/current_obs/KILG.xml 
for the Delaware City (New Castle County Airport) current weather data.

It also references some of the other UI tables to determine what temperatures and
what levels to update.

These tables are

-- transfers
-- {ship information?}
-- config
-- analog_input
-- digital_input
-- tank
-- rel_tag_tag