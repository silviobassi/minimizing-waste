alter table employees_movement
    drop constraint employees_movements_FK_sectors;

alter table employees_movement
    drop column sector_id;

alter table employees_movement
        add column work_station_id bigint not null;

alter table employees_movement
        add constraint employees_movement_FK_work_stations
                foreign key (work_station_id)
                        references work_stations (id);