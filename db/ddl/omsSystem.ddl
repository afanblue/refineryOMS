use oms

drop schema oms;
create database oms;
use oms;

source ddl/Config.ddl

source ddl/Privileges.ddl

source ddl/UsersRoles.ddl

source ddl/MenusPages.ddl

source ddl/Units.ddl
