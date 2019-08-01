-- Revert swipe-swap/schema:warehouse/schema from pg

begin;

drop schema warehouse;

commit;

