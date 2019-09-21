-- Revert swipe-swap/schema:roles/individual-creator/create from pg

begin;

drop role "individual-creator";

commit;
