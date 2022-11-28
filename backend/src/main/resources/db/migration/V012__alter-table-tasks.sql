alter table tasks
    drop constraint tasks_FK_employees_movement;

alter table tasks
    drop column employee_movement_id;

alter table tasks
    add column work_station_id bigint not null,
    add column employee_responsible_id bigint not null,
    add column approval_description text null;

alter table  tasks
    rename column validated to approved;

alter table tasks
    add constraint tasks_FK_work_stations
        foreign key (work_station_id)
            references work_stations (id),
    add constraint tasks_FK_users
        foreign key (employee_responsible_id)
            references users (id);