alter table descriptions_supplies modify measure decimal(19,2) not null default 1;
alter table descriptions_supplies modify measure_unit_type varchar(10) not null;
alter table descriptions_supplies modify total decimal(19,2) not null;