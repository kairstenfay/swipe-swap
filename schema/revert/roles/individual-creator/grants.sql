-- Revert swipe-swap/schema:roles/individual-creator/grants from pg

begin;

revoke select (username)
    on warehouse.individual
  from "individual-creator";

revoke insert 
    on warehouse.individual
  from "individual-creator";

revoke usage
    on schema warehouse
  from "individual-creator";

revoke connect on database :"DBNAME" from "individual-creator";

commit;
