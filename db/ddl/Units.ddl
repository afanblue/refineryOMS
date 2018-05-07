select 'Units: create unit type table' action;
drop table if exists unit_type;
create table unit_type (
  id integer not null auto_increment primary key,
  name  char(20),
  create_dt datetime,
  last_modified_dt datetime
) charset=utf8;

delimiter //

drop trigger if exists unittype_bi_trg;
CREATE TRIGGER unittype_bi_trg BEFORE INSERT ON unit_type for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

°

drop trigger if exists unittype_bu_trg;
CREATE TRIGGER unittype_bu_trg BEFORE UPDATE ON unit_type for each row
  set new.last_modified_dt = now();
//

delimiter ;

drop table if exists unit;
select 'Units: create unit table' action;
-- used to create units values
create table unit (
  id integer not null auto_increment primary key,
  name  char(12),
  code  char(3),
  unit_type_id integer not null,
  create_dt datetime,
  last_modified_dt datetime,
  
  constraint foreign key unit_type_fk (unit_type_id) references unit_type (id)
) charset=utf8;

delimiter //

drop trigger if exists unit_bi_trg;
CREATE TRIGGER unit_bi_trg BEFORE INSERT ON unit for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

drop trigger if exists unit_bu_trg;
CREATE TRIGGER unit_bu_trg BEFORE UPDATE ON unit for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "Units: Create unit_conversion table" action;
drop table if exists unit_conversion;
create table unit_conversion (
  id integer not null auto_increment primary key,
  from_id integer not null,
  to_id integer not null,
  offset double not null default 0.0,
  factor double not null default 1.0,
  create_dt datetime,
  last_modified_dt datetime,

  constraint foreign key uc_to_fk   (to_id)   references unit (id),
  constraint foreign key uc_from_fk (from_id) references unit (id)
) charset=utf8;


delimiter //

drop trigger if exists uc_bi_trg;
CREATE TRIGGER uc_bi_trg BEFORE INSERT ON unit_conversion for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

drop trigger if exists uc_bu_trg;
CREATE TRIGGER uc_bu_trg BEFORE UPDATE ON unit_conversion for each row
  set new.last_modified_dt = now();
//

delimiter ;
