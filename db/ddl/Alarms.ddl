select "Alarms: Create alarm_message table" action;
create table alarm_message (
  id               integer not null auto_increment primary key,
  abbr             char(4)          comment 'primarily for looking up',
  message          char(128),
  create_dt        datetime,
  last_modified_dt datetime

) charset=utf8;

delimiter //

CREATE TRIGGER almsg_bi_trg BEFORE INSERT ON alarm_message for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER almsg_bu_trg BEFORE UPDATE ON alarm_message for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "Alarms: Create alarm_type table" action;
create table alarm_type (
  id integer not null auto_increment primary key,
  priority         integer not null default 0 comment '0 is lowest, priority increases',
  alarm_msg_id     integer not null           comment 'default alarm message',
  code             char(4),
  create_dt        datetime,
  last_modified_dt datetime,
  
  constraint foreign key altype_msg_fk (alarm_msg_id) references alarm_message(id)
) charset=utf8;


delimiter //

CREATE TRIGGER altyp_bi_trg BEFORE INSERT ON alarm_type for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER altyp_bu_trg BEFORE UPDATE ON alarm_type for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "Alarms: Create alarm table" action;
create table alarm (
  id               integer not null auto_increment primary key,
  alarm_type_id    integer not null comment 'type of alarm',
  tag_type_id      integer not null comment 'type of obj being alarmed',
  tag_id           integer not null comment 'id of object being alarmed',
  alm_occurred     datetime,
  acknowledged     char(1) default 'N',
  active           char(1) default 'Y',
  alarm_msg_id     integer not null,
  create_dt        datetime,
  last_modified_dt datetime,

  constraint foreign key alm_typ_id_fk(alarm_type_id) references alarm_type(id),
  constraint foreign key alm_msg_id_fk(alarm_msg_id) references alarm_message (id),
  constraint foreign key alm_tag_id_fk(tag_id) references tag(id)
) charset=utf8;

create view alarm_info( id, tag_id, alm_occurred, acknowledged, active, alarm_msg_id, priority, code) as
select a.id, a.tag_id, a.alm_occurred, a.acknowledged, a.active
     , ifnull(a.alarm_msg_id, at.alarm_msg_id) alarm_msg_id
     , at.priority, at.code
  from alarm a join alarm_type at on a.alarm_type_id = at.id
       join 
 where a.active='Y';

delimiter //

CREATE TRIGGER alm_bi_trg BEFORE INSERT ON alarm for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER alm_bu_trg BEFORE UPDATE ON alarm for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "Alarms: create alarm_color_list_vw" action;
drop view if exists alarm_color_list_vw;
create view alarm_color_list_vw as
select 1 id, substr(item_name,1,length(item_name)-5) item_name, item_value 
  from config
where item_name like '%COLOR';

select "Alarms: create alarm_color_vw" action;
drop view if exists alarm_color_vw;
create view alarm_color_vw as
select  x.id
     , max(case when x.item_name = "LL" then x.item_value 
            else null end) ll_color
	 , max(case when x.item_name = "LO" then x.item_value 
            else null end) lo_color
	 , max(case when x.item_name = "NORM" then x.item_value 
            else null end) norm_color
	 , max(case when x.item_name = "HI" then x.item_value 
            else null end) hi_color	
	 , max(case when x.item_name = "HH" then x.item_value 
            else null end) hh_color
  from alarm_color_list_vw x
group by x.id;
