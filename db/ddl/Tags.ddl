/**
 * The js_draw_file will (I hope) be included in the relevant pages and then used to draw
 *    the objects.
 * I'm thinking specifically of 
 *	- process units
 *  - tanks
 *  - refinery fields
 */
select "Tags: create tag_type table" action;
drop table if exists tag_type;
create table tag_type( 
  id               integer  not null auto_increment primary key, 
  code             char(3)  not null,
  name             char(30) not null,
  description      char(120),
  js_draw_file     char(120)  comment 'path of file used to draw this object',
  active           char(1) not null default 'Y',
  create_dt        datetime,
  last_modified_dt datetime,
  
  unique key tt_code_ui(code)
) charset=utf8;

delimiter //

drop trigger if exists tt_bi_trg;
CREATE TRIGGER tt_bi_trg BEFORE INSERT ON tag_type for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

drop trigger if exists tt_bu_trg;
CREATE TRIGGER tt_bu_trg BEFORE UPDATE ON tag_type for each row
  set new.last_modified_dt = now();
//

delimiter ;

-- The js_draw_file here will override the file in the tag_type
-- see the comment above.
select "Tags: create tag table" action;
drop table if exists tag;
create table tag (
  id               integer not null auto_increment primary key,
  name             char(10) not null,
  description      char(40),
  tag_type_code    char(3) not null,
  js_draw_file     char(120)  comment 'path of file used to draw this object',
  c1_lat           real(10,6) comment 'NW corner of object',
  c1_long          real(10,6),
  c2_lat           real(10,6) comment 'SE corner of object',
  c2_long          real(10,6),
  active           char(1) not null default 'Y',
  create_dt        datetime,
  last_modified_dt datetime,

  constraint foreign key tag_type_fk (tag_type_code) references tag_type (code),
  unique key tag_name_ui(name)
) charset=utf8;

/**
-- See TagTypes.sql for the various types allowed, but note that a "tank" has at least
-- a level (Analog) and a Temperature (Analog) tag.  The "Tank", like many of the other
-- objects, e.g., Process Unit, Field are virtual objects that have multiple other objects
-- in them.  I am not entirely sure that we need the parent reference, since I'm not sure
-- that a given parent object would need to have multiple chains of children.  Or how to
-- distinguish between them if we did have them.
-- OTOH, this should provide the flexibility to do that if we needed to.
 */
select "Tags:create rel_tag_tag" action;
drop table if exists rel_tag_tag;
create table rel_tag_tag (
  id integer not null auto_increment primary key,
  parent_tag_id integer not null,
  key_id integer comment 'distinguishing field for multiple chains',
  child_tag_id integer not null,
  create_dt datetime,
  last_modified_dt datetime,

  constraint foreign key tag_key_fk (key_id) references reference_code (id),
  constraint foreign key tag_parent_fk (parent_tag_id) references tag (id),
  constraint foreign key tag_child_fk (child_tag_id) references tag (id)
) charset=utf8;

delimiter //

drop trigger if exists tag_bi_trg;
CREATE TRIGGER tag_bi_trg BEFORE INSERT ON tag for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

drop trigger if exists tag_bu_trg;
CREATE TRIGGER tag_bu_trg BEFORE UPDATE ON tag for each row
  set new.last_modified_dt = now();
//

delimiter ;

-- selects all child tags for all field
select "Tags: Create field_tag view" action;
drop view if exists field_tag_vw;
create view field_tag_vw( field_tag_id, child_tag_id) as
select rt.parent_tag_id, rt.child_tag_id
  from rel_tag_tag rt, tag t
 where rt.parent_tag_id = t.id
   and t.tag_type_code = 'FLD';
   
-- selects all child and grandchild tags for all fields 
select "Tags: Create field_tag_deep_vw" action;
drop view if exists field_tag_deep_vw;
create view field_tag_deep_vw( field_tag_id, child_tag_id) as
select ft.field_tag_id, ft.child_tag_id
  from field_tag_vw ft join tag t on ft.child_tag_id = t.id 
 where t.tag_type_code != 'FLD'
union 
select ft1.field_tag_id, ft2.child_tag_id 
  from field_tag_vw ft1 join field_tag_vw ft2 on ft1.child_tag_id = ft2.field_tag_id
  join tag t1 on ft1.child_tag_id = t1.id 
  join tag t2 on ft2.child_tag_id = t2.id 
 where t1.tag_type_code = 'FLD';

   
select "Tags: Create tank_tag view" action;
drop view if exists tank_tag_vw;
create view tank_tag_vw( parent_tag_id, child_tag_id) as
select rt.parent_tag_id, rt.child_tag_id
  from rel_tag_tag rt, tag t
 where rt.parent_tag_id = t.id
   and t.tag_type_code = 'TK';
