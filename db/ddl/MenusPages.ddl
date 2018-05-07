use oms

select "MenusPages: Create page table" action;
create table page (
  id integer not null auto_increment primary key,
  name char(30),
  uri char(128),
  view_priv_id integer comment 'privilege required to view this page',
  exec_priv_id integer comment 'privilege required to execute this page',
  active char(1) default 'Y',
  create_dt datetime,
  last_modified_dt datetime,

  constraint foreign key page_vw_priv_fk (view_priv_id) references privilege (id),
  constraint foreign key page_ex_priv_fk (exec_priv_id) references privilege (id)
) charset=utf8;

delimiter //

CREATE TRIGGER page_bi_trg BEFORE INSERT ON page for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER page_bu_trg BEFORE UPDATE ON page for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "MenusPages: Create menu table" action;
create table menu (
  id integer not null auto_increment primary key,
  menu_type_id integer,
  category_id integer,
  text char(40),
  page_id integer,
  order_no  integer,
  active char(1) default 'Y',
  create_dt datetime,
  last_modified_dt datetime,

  constraint foreign key menu_typ_fk(menu_type_id) references reference_code(id),
  constraint foreign key menu_cat_fk(category_id) references menu(id),
  constraint foreign key menu_page_fk(page_id) references page (id)
) charset=utf8;

delimiter //

CREATE TRIGGER menu_bi_trg BEFORE INSERT ON menu for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER menu_bu_trg BEFORE UPDATE ON menu for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "MenusPages: Create vertical_menu_vw" action;
CREATE VIEW vertical_menu_vw (id, menu_type_id, category_id, text, page_id, order_no, active) as
select m.id, m.menu_type_id, m.category_id, m.text, m.page_id, m.order_no, m.active 
  from menu m join reference_code rc on m.menu_type_id = rc.id 
 where rc.category="MENU_TYPE" and rc.code="VT";



select "MenusPages: Create horizontal_menu_vw" action;
CREATE VIEW horizontal_menu_vw(id, menu_type_id, category_id, text, page_id, order_no, active) as
select m.id, m.menu_type_id, m.category_id, m.text, m.page_id, m.order_no, m.active 
  from menu m join reference_code rc on m.menu_type_id = rc.id 
 where rc.category="MENU_TYPE" and rc.code="HT";


select "MenuPages: create dynamic_menu_items_vw" action;
create view dynamic_menu_items_vw as 
select distinct t.name text, t.id order_no, concat('oms/processunit/',t.id) uri
     , p.name viewpriv, p.name execpriv, m.text category, replace(t.name,' ','') menuname
  from tag t, privilege p, menu m
 where t.tag_type_code = 'PU' and t.active = 'Y'
   and p.name = 'View Process Units'
   and m.text = 'Process Units'
union
select distinct t.name text, t.id order_no, concat('oms/field/',t.id) uri
     , p.name viewpriv, p.name execpriv, m.text category, replace(t.name,' ','') menuname
  from tag t, privilege p, menu m
 where t.tag_type_code = 'FLD' and t.active = 'Y'
   and p.name = 'View Fields'
   and m.text = 'Field Displays';

delimiter ; 
