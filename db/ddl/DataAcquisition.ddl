/**
 * for analog and digital inputs, the assumption made is that the input
 * processor (pmc.php) runs every minute.  The scan rate defines how often
 * the tag checks for an input.  The scan offset defines where in the interval
 * defined by the scan_int the value is checked. 
 * 
 * Note: the scan offset must be less than the scan int.
 *     : if the scan interval is not a factor of 60, results are unpredictable
 *
 * Example: Int: 60, offset: 5. the value is checked once per hour @ 5 minutes past the hour
 *        : Int: 10, offset: 2, the value is checked @ 2, 12, 22, 32, 42, and 52 minutes past
 *        : Int: 15, offset: 7, the value is checked @ 7, 22, 37, 52 minutes past
          : Int: 1,  offset: 0, the value is checked every minute 
 */
select 'DataAcquisition: Create analog input table' action;
create table analog_input (
  tag_id           integer not null primary key,
  type_code        char(3) not null    comment 'analog tag type',
  scan_int         integer default 60  comment 'iterations between scans',
  scan_offset      integer default 0   comment 'iteration offset from 0',
  current_scan     integer default 0   comment 'current scan interation',
  zero_value       double  default 0   comment 'min point of input',
  max_value        double  default 100 comment 'max value of input',
  hist_type_code   char(3)             comment 'Boxcar/Linear/<null>',
  percent          double  default 2.0 comment 'percent variation allowed before hist logging',
  slope            double  default 0.0 comment 'slope of history value',
  raw_value        double              comment 'raw value (before scaling)',
  scan_value       double              comment 'value of most recent scan',
  scan_time        datetime            comment 'time of most recent scan',
  prev_value       double              comment 'value of previous scan',
  prev_time        datetime            comment 'time of previous scan',
  last_hist_value  double              comment 'last value stored in history file',
  last_hist_time   datetime            comment 'last time data stored in history file',
  hh               real(12,4)          comment 'high-high alarm limit',
  hi               real(12,4)          comment 'high alarm limit',
  lo               real(12,4)          comment 'low alarm limit',
  ll               real(12,4)          comment 'low-low alarm limit',
  create_dt        datetime,
  last_modified_dt datetime,
  
  index ai_type_nuk(type_code),
  constraint foreign key ai_tag_fk (tag_id) references tag (id)
) charset=utf8;

delimiter //
 
CREATE TRIGGER ai_bi_trg BEFORE INSERT ON analog_input for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER ai_bu_trg BEFORE UPDATE ON analog_input for each row
  set new.last_modified_dt = now();
//

delimiter ;

select 'DataAcquisition: Tank temperature view' action;
create view tank_temperature_vw (tank_id, temperature_id)
as 
select t.id, ai.tag_id
  from tank t, rel_tag_tag rtt, analog_input ai
 where t.id = rtt.parent_tag_id
   and rtt.child_tag_id = ai.tag_id
   and ai.type_code = 'T';

select 'DataAcquisition: Tank level view' action;
create view tank_level_vw (tank_id, level_id)
as 
select t.id, ai.tag_id
  from tank t, rel_tag_tag rtt, analog_input ai
 where t.id = rtt.parent_tag_id
   and rtt.child_tag_id = ai.tag_id
   and ai.type_code = 'L';

select 'DataAcquisition: Create digital input table' action;
create table digital_input (
  tag_id           integer not null primary key,
  scan_int         integer default 60   comment 'iterations between scans',
  scan_offset      integer default 0    comment 'iteration offset from 0',
  current_scan     integer default 0    comment 'current scan interation',
  hist_type_code   char(3)              comment 'one of the values of HIST_TYPE_VW',
  scan_value       double               comment 'value of most recent scan (0/1)',
  scan_time        datetime             comment 'time of most recent scan',
  alarm_state      double               comment 'value of alarm, null => no alarm',
  alarm_code       double               comment 'alarm code of alarm state',
  prev_value       double               comment 'value of previous scan',
  prev_scan_time   datetime             comment 'time of previous scan',
  last_hist_value  double               comment 'last value stored in history file',
  last_hist_time   datetime             comment 'last time data stored in history file',
  value_view       char(30)             comment 'view used to interpret value',
  create_dt        datetime,
  last_modified_dt datetime,
  
  constraint foreign key di_tag_fk (tag_id) references tag (id)
) charset=utf8;

delimiter //
 
CREATE TRIGGER di_bi_trg BEFORE INSERT ON digital_input for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER di_bu_trg BEFORE UPDATE ON digital_input for each row
  set new.last_modified_dt = now();
//

delimiter ;

/**
 * The outputs (digital and analog) are processed every cycle, so the
 * scan_int and scan_offset are not necessary. 
 *
 * The 
 */
select 'DataAcquisition: Create analog output table' action;
create table analog_output (
  tag_id           integer not null primary key,
  history_type_id  integer       comment 'future? everything is future',
  scan_value       double        comment 'value to output',
  scan_time        datetime      comment 'time output done',
  zero_value       double        comment 'minimum value output',
  max_value        double        comment 'maximum value output',
  prev_value       double        comment 'value of previous output',
  prev_time        datetime      comment 'time of previous output',
  last_hist_value  double        comment 'last value stored in history file',
  last_hist_time   datetime      comment 'last time data stored in history file',
  create_dt        datetime,
  last_modified_dt datetime,
  
  constraint foreign key ao_tag_fk (tag_id) references tag (id),
  constraint foreign key ao_htype_fk(history_type_id) references reference_code(id)
) charset=utf8;


delimiter //
 
CREATE TRIGGER ao_bi_trg BEFORE INSERT ON analog_output for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER ao_bu_trg BEFORE UPDATE ON analog_output for each row
  set new.last_modified_dt = now();
//

delimiter ;

select 'DataAcquisition: Create digital output table' action;
create table digital_output (
  tag_id           integer not null primary key,
  history_type_id  integer      comment 'future? everything is future',
  scan_value       double       comment 'value to output (0/1)',
  scan_time        datetime     comment 'time of most recent scan',
  alarm_state      double       comment 'value of alarm, null => no alarm',
  prev_value       double       comment 'value of previous output',
  prev_time        datetime     comment 'time of previous output',
  last_hist_value  double       comment 'last value stored in history file',
  last_hist_time   datetime     comment 'last time data stored in history file',
  value_view       char(30)     comment 'view to interpret value',
  create_dt        datetime,
  last_modified_dt datetime,
  
  constraint foreign key do_tag_fk (tag_id) references tag (id)
) charset=utf8;


delimiter //
 
CREATE TRIGGER do_bi_trg BEFORE INSERT ON digital_output for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER do_bu_trg BEFORE UPDATE ON digital_output for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "DataAcquisition: create table history" action;
create table history (
  id               integer not null auto_increment primary key,
  tag_id           integer not null,
  scan_value       double comment 'Digital values are 0 & 1',
  scan_time	       datetime,			
  create_dt        datetime,
  last_modified_dt datetime,
  
  index hist_tag_nuk(tag_id),
  index hist_stime_nuk(scan_time),
  
  constraint foreign key hist_tag_fk (tag_id) references tag (id)
) charset=utf8;


delimiter //
 
CREATE TRIGGER hist_bi_trg BEFORE INSERT ON history for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER hist_bu_trg BEFORE UPDATE ON history for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "DataAcquisition: create table plot_group" action;
drop table if exists plot_group;
create table plot_group (
  id               integer not null auto_increment primary key,
  name             char(16),
  id1              integer not null,
  id2              integer not null,
  id3              integer,
  id4              integer,
  active           char(1) not null default 'Y',
  create_dt        datetime,
  last_modified_dt datetime,
  
  constraint foreign key pg_tag1_fk (id1) references analog_input (tag_id),
  constraint foreign key pg_tag2_fk (id2) references analog_input (tag_id),
  constraint foreign key pg_tag3_fk (id3) references analog_input (tag_id),
  constraint foreign key pg_tag4_fk (id4) references analog_input (tag_id)
) charset=utf8;


delimiter //
 
drop trigger if exists plt_grp_bi_trg;
CREATE TRIGGER pltgrp_bi_trg BEFORE INSERT ON plot_group for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

drop trigger if exists plt_grp_bu_trg;
CREATE TRIGGER pltgrp_bu_trg BEFORE UPDATE ON plot_group for each row
  set new.last_modified_dt = now();
//

delimiter ;
