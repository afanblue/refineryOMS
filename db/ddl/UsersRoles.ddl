use oms

select "UsersRoles: Add user table" action;
-- Create the tables and views associated w/users and roles.
-- Note: the privilege table must be defined before this can be run.
create table user (
  id  integer not null auto_increment primary key,
  alias  char(30) comment 'nickname' unique key,
  first_name char(30),
  middle_name char(30),
  last_name char(60),
  email char(129),
  password char(40),
  state  char(1) comment 'account request state: Active,Pending',
  status char(1) comment 'account active state: Yes, No',
  create_dt datetime,
  last_modified_dt datetime
) charset=utf8;

delimiter //
 
CREATE TRIGGER user_bi_trg BEFORE INSERT ON user for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER user_bu_trg BEFORE UPDATE ON user for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "UsersRoles: add role table" action;
-- roles have 1 level of hierarchy.  Parents assume all the privileges of their immediate offspring.
create table role (
  id  integer not null auto_increment primary key,
  active char(1) default 'Y',
  name char(30)  unique key,
  create_dt datetime,
  last_modified_dt datetime,

  constraint foreign key role_parent_fk (parent_id) references role (id)
) charset=utf8;

delimiter //

CREATE TRIGGER role_bi_trg BEFORE INSERT ON role for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER role_bu_trg BEFORE UPDATE ON role for each row
  set new.last_modified_dt = now();
//
 
delimiter ;

select "UsersRoles: Add role_priv table" action;
create table role_priv (
  role_id integer not null,
  priv_id integer not null,
  create_dt datetime,
  last_modified_dt datetime,
  
  constraint foreign key rp_role_fk (role_id) references role (id),
  constraint foreign key rp_priv_fk (priv_id) references privilege (id)
) charset=utf8;

delimiter //

CREATE TRIGGER rp_bi_trg BEFORE INSERT ON role_priv for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER rp_bu_trg BEFORE UPDATE ON role_priv for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "UsersRoles: Add user_role table" action;
create table user_role (
  user_id integer not null,
  role_id integer not null,
  create_dt datetime,
  last_modified_dt datetime,
  
  constraint foreign key ur_role_fk (role_id) references role (id),
  constraint foreign key ur_user_fk (user_id) references user (id)
) charset=utf8;

delimiter //

CREATE TRIGGER ur_bi_trg BEFORE INSERT ON user_role for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER ur_bu_trg BEFORE UPDATE ON user_role for each row
  set new.last_modified_dt = now();
//

delimiter ;

select "UsersRoles: Create user_priv view" action;
create view user_priv (user, privilege) as
select u.alias, p.name privilege
  from user u, role r, user_role ur, privilege p, role_priv rp
 where ur.user_id=u.id and ur.role_id=r.id and rp.role_id=r.id
   and rp.priv_id=p.id
union
select u.alias, p.name privilege
  from user u, role r, user_role ur, privilege p, role_priv rp
 where ur.user_id=u.id and rp.role_id=r.id and rp.priv_id=p.id
   and r.parent_id in (select r.id from user u, role r, user_role ur
                           where ur.user_id=u.id and ur.role_id=r.id);
