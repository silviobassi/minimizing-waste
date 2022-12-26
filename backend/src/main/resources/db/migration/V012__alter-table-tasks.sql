alter table assignments
    drop constraint tasks_FK_employees_movement;

alter table assignments
    drop column employee_movement_id;

alter table assignments
    add column work_station_id bigint not null,
    add column employee_responsible_id bigint not null,
    add column approval_description text null;

alter table  assignments
    rename column validated to approved;

alter table assignments
    add constraint tasks_FK_work_stations
        foreign key (work_station_id)
            references work_stations (id),
    add constraint tasks_FK_users
        foreign key (employee_responsible_id)
            references users (id);