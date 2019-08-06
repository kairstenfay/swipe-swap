-- Verify swipe-swap/schema:roles/individual-creator/grants on pg

begin;

select 1/pg_catalog.has_database_privilege('individual-creator', :'DBNAME', 'connect')::int;
select 1/pg_catalog.has_schema_privilege('individual-creator', 'warehouse', 'usage')::int;
select 1/pg_catalog.has_table_privilege('individual-creator', 'warehouse.individual', 'insert')::int;
select 1/pg_catalog.has_column_privilege('individual-creator', 'warehouse.individual', 'username', 'select')::int;

select 1/(not pg_catalog.has_table_privilege('individual-creator', 'warehouse.individual', 'update,delete'))::int;

rollback;
