
-- note that the ID's for the objects defined here should be the same as the ID
-- in the TAG table which is why we don't have the 'autoincrement' specifier.
-- The id is set in the 'before insert' field trigger.

select "Objects: create field" action from dual;
create table field (
  id  integer not null primary key,
  road_image char(128),
  satellite_image char(128),
  create_dt datetime,
  last_modified_dt datetime,
  
  constraint foreign key fld_tag_fk (tag_id) references tag (id)
) charset=utf8;

delimiter //

CREATE TRIGGER fld_bi_trg BEFORE INSERT ON field for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER fld_bu_trg BEFORE UPDATE ON field for each row
  set new.last_modified_dt = now();
//

delimiter ;

-- since field is a hierarchy get a view which shows the parent & all its children
select "Objects: create all_fields" action from dual;
create view all_fields( id, name, parent_id, parent ) as
select f.id, t.name, f.id pid, t.name pname
  from field f, tag t
 where f.id = t.id
   and t.active = 'Y'
   and t.tag_type_code = 'FLD'
   and t.id not in (select child_tag_id from rel_tag_tag)
union
select t.id, t.name, tp.id pid, tp.name pname
  from rel_tag_tag rtt join tag t on rtt.child_tag_id = t.id
       join tag tp on rtt.parent_tag_id = tp.id 
 where t.tag_type_code = 'FLD'
   and tp.tag_type_code = 'FLD';


-- this defines 'hot spots' on a field, ie, RECTANGLES w/in which clicks
-- redirect the user to a specified page.  The rectangle is defined by
-- opposing corners. NB, it is possible to have embedded hot spots, but if
-- you have overlapping hot-spots, you're dependent on the query ordering.
select "Objects: create hot_spot table" action;
create table hot_spot (
  id  integer not null auto_increment primary key,
  field_id integer not null,
  c1Lat real(10,6),
  c1Long real(10,6),
  c2Lat real(10,6),
  c2Long real(10,6),
  page_id integer,
  active char(1),
  optional_id integer,
  create_dt datetime,
  last_modified_dt datetime,

  constraint foreign key hs_field_fk (field_id) references field (id)
) charset=utf8;

delimiter //

CREATE TRIGGER hs_bi_trg BEFORE INSERT ON hot_spot for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER hs_bu_trg BEFORE UPDATE ON hot_spot for each row
  set new.last_modified_dt = now();
//

delimiter ;

-- we assume that the field is an irregular polygon
-- specify the location of the vertices.
-- Sites, however, are based on Google images and must be
-- either squares or rectangles.
select "Objects: create vertices" action from dual;
create table vertices (
  obj_id integer not null,
  seq_no integer not null,
  latitude real(10,6),
  longitude real(10,6),
  create_dt  datetime,
  last_modified_dt datetime,

  constraint foreign key vert_field_fk (obj_id) references tag (id)
) charset=utf8;

delimiter //

CREATE TRIGGER vert_bi_trg BEFORE INSERT ON vertices for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER vert_bu_trg BEFORE UPDATE ON vertices for each row
  set new.last_modified_dt = now();
//

delimiter ;

-- unlike fields, we assume that tanks occupy a square.
select "Objects: create tank" action from dual;
create table tank(
  id integer not null primary key,
  active char(1) not null default 'Y',
  api real(3,1),
  density real(4,3),
  height real(12,4),
  diameter real(12,6),
  units char(1) comment 'feet (f) or meters (m)',
  content_type_code char(4),
  create_dt datetime,
  last_modified_dt datetime,

  constraint foreign key tk_tag_fk(id) references tag (id)
) CHARSET=utf8;

delimiter //

CREATE TRIGGER tank_bi_trg BEFORE INSERT ON tank for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER tank_bu_trg BEFORE UPDATE ON tank for each row
  set new.last_modified_dt = now();
//

delimiter ;


select "Objects: create volume" action from dual;
create table volume (
  tank_id  integer not null  comment 'id of tank',
  level real(4,2),
  volume real(16,4),
  create_dt datetime,
  last_modified_dt datetime,
  
  primary key (tank_id, level),
  constraint foreign key vol_tank_id_fk (tank_id) references tank (id)
) charset=utf8;

delimiter //

CREATE TRIGGER vol_bi_trg BEFORE INSERT ON volume for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER vol_bu_trg BEFORE UPDATE ON volume for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "Objects: create transfer" action from dual;
create table transfer (
  id integer not null auto_increment primary key,
  name char(20) not null,
  status_id integer not null default 0,
  transfer_type_id integer not null,
  source_id integer not null,
  destination_id integer not null,
  exp_start_time datetime,
  exp_end_time datetime,
  exp_volume real(16,4),
  act_start_time datetime,
  act_end_time datetime,
  act_volume real(16,4),
  create_dt datetime,
  last_modified_dt datetime,

  constraint foreign key transfer_type_fk (transfer_type_id) references reference_code(id),
  constraint foreign key transfer_sts_fk (status_id) references reference_code(id),
  constraint foreign key transfer_src_id_fk (source_id) references tag (id),
  constraint foreign key transfer_dest_id_fk (destination_id) references tag (id)
) charset=utf8;

delimiter //

CREATE TRIGGER transfer_bi_trg BEFORE INSERT ON transfer for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER transfer_bu_trg BEFORE UPDATE ON transfer for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "Objects: create process_unit" action;
create table process_unit (
  id integer not null auto_increment primary key,
  name char(20) not null,
  active char(1) not null default 'Y',
  create_dt datetime,
  last_modified_dt datetime
) charset=utf8;

delimiter //

CREATE TRIGGER pu_bi_trg BEFORE INSERT ON process_unit for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER pu_bu_trg BEFORE UPDATE ON process_unit for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "Objects: Create transfer_point table" action;
create table transfer_point (
  id integer not null auto_increment primary key,
  active char(1) not null default 'Y',
  create_dt datetime,
  last_modified_dt datetime
) charset=utf8;

delimiter //

CREATE TRIGGER tp_bi_trg BEFORE INSERT ON transfer_point for each row
begin
  declare newID int;
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER tp_bu_trg BEFORE UPDATE ON transfer_point for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "Objects: Customer table" action;
DROP table if exists customer;
CREATE TABLE customer (
  id integer not null auto_increment primary key,
  name char(32) not null,
  active char(1) not null default 'Y',
  etherkey char(64) not null,
  create_dt datetime,
  last_modified_dt datetime
) charset=utf8;

delimiter //

DROP TRIGGER if exists cust_bi_trg;
CREATE TRIGGER cust_bi_trg BEFORE INSERT ON customer for each row
begin
  declare newID int;
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

DROP TRIGGER if exists cust_bu_trg;
CREATE TRIGGER cust_bu_trg BEFORE UPDATE ON customer for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "Objects: Vessel type table" action;
DROP TABLE if exists vessel;
DROP TABLE if exists vessel_type;
CREATE TABLE vessel_type(
  id integer not null auto_increment primary key,
  name char(16) not null,
  code char(3) not null,
  quantity double not null,
  create_dt datetime,
  last_modified_dt datetime
) charset=utf8;

delimiter //

DROP TRIGGER if exists vsltype_bi_trg;
CREATE TRIGGER vsltype_bi_trg BEFORE INSERT ON vessel_type for each row
begin
  declare newID int;
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

DROP TRIGGER if exists vsltype_bu_trg;
CREATE TRIGGER vsltype_bu_trg BEFORE UPDATE ON vessel_type for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "Objects: Vessel (tank cars, tanker trucks, ships) table" action;
DROP TABLE if exists vessel;
CREATE TABLE vessel(
  id integer not null primary key,
  name char(32) not null,
  active char(1) not null default 'Y',
  type_id integer not null,
  customer_id integer not null,
  create_dt datetime,
  last_modified_dt datetime,
  
  constraint foreign key vsl_cust_fk (customer_id) references customer(id),
  constraint foreign key vsl_type_fk (type_id) references vessel_type(id),
  constraint foreign key vsl_tag_fk  (id) references tag (id)
) charset = utf8;

delimiter //

DROP TRIGGER if exists vsl_bi_trg;
CREATE TRIGGER vsl_bi_trg BEFORE INSERT ON vessel for each row
begin
  declare newID int;
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

DROP TRIGGER if exists vsl_bu_trg;
CREATE TRIGGER vsl_bu_trg BEFORE UPDATE ON vessel for each row
  set new.last_modified_dt = now();
//

delimiter ;

