This is the directory for the Java Eclipse project to process the initiation and
completion of transfers and eventually to schedule the payments associated w/the
completion of a transfer.

These tables accessed are

-- transfers
-- config
-- analog_input
-- tank
-- volume
-- {tank car information?}
-- {tank truck information?}
-- {ship information?}

When configuring a transfer, templates are configured using process units rather than 
specific tanks.  As part of the transfer process, new transfers are initiated every night 
at 11:30 (23:30) from transfer templates.

For transfers to refinery units, the tank is chosen that has the most content in it.
For transfers from refinery units, tank chosen is the one that has the least content
in it.
