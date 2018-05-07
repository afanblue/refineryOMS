-- 
create table privilege (
  id  integer not null auto_increment primary key,
  name char(30) unique key,
  create_dt datetime,
  last_modified_dt datetime
) charset=utf8;

delimiter //

CREATE TRIGGER priv_bi_trg BEFORE INSERT ON privilege for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end;
//

CREATE TRIGGER priv_bu_trg BEFORE UPDATE ON privilege for each row
  set new.last_modified_dt = now();
//

delimiter ;


