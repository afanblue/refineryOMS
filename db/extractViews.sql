use oms;

select concat('select ''',table_name,''' as action from dual;') notice
     , concat('DROP VIEW IF EXISTS ',table_name,';') drop_vw
     , concat('CREATE VIEW ',table_name,' AS ',view_definition,';') view_ddl
  from information_schema.views
 where table_schema = 'OMS';
 