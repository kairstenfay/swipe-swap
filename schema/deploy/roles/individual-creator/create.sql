-- Deploy swipe-swap/schema:roles/individual-creator/create to pg

begin;

create role "individual-creator";

comment on role "individual-creator" is 'For creating new individuals (e.g. usernames)';

commit;
