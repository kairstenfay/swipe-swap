-- Deploy swipe-swap/schema:roles/individual-creator/grants to pg
-- requires: roles/individual-creator/create
-- requires: warehouse/individual

begin;

-- This change is designed to be sqitch rework-able to make it easier to update
-- the grants for this role.

grant connect on database :"DBNAME" to "individual-creator";

grant usage
   on schema warehouse
   to "individual-creator";

grant select (username)
   on warehouse.individual
   to "individual-creator";

grant insert
   on warehouse.individual
   to "individual-creator";

commit;
