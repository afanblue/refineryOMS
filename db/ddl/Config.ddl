select 'Config: create config table' action;
-- used to create session values
create table config (
  id integer not null auto_increment primary key,
  item_name  char(30),
  item_value char(50),
  create_dt datetime,
  last_modified_dt datetime
) charset=utf8;

delimiter //

CREATE TRIGGER conf_bi_trg BEFORE INSERT ON config for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER conf_bu_trg BEFORE UPDATE ON config for each row
  set new.last_modified_dt = now();
//

delimiter ;

select 'Config: create watchdog table' action;
-- used to create session values
create table watchdog (
  id integer not null auto_increment primary key,
  name  char(30),
  updated    integer,
  create_dt datetime,
  last_modified_dt datetime
) charset=utf8;

delimiter //

CREATE TRIGGER wdog_bi_trg BEFORE INSERT ON watchdog for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER wdog_bu_trg BEFORE UPDATE ON watchdog for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "Config: Create reference_code table" action;
create table reference_code (
  id integer not null auto_increment primary key,
  category char(30) comment 'category of reference',
  name  char(30) comment 'short name',
  code  char(3) comment 'really short name',
  value integer comment 'associated numerical value',
  description   char(120) comment 'description of reference value',
  active char(1) default 'Y',
  create_dt datetime,
  last_modified_dt datetime,

  index refcd_code_uk (code)
) charset=utf8;


delimiter //

CREATE TRIGGER rc_bi_trg BEFORE INSERT ON reference_code for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER rc_bu_trg BEFORE UPDATE ON reference_code for each row
  set new.last_modified_dt = now();
//

delimiter ;
