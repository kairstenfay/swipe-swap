-- Revert swipe-swap/schema:roles/public from pg

begin;

grant usage on schema sqitch to public;

commit;
