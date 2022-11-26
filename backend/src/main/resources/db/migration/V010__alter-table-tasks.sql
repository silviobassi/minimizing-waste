alter tables tasks
    add column employee_movement_id bigint not null,
    add constraint tasks_FK_employees_movement
        foreign key (employee_movement_id)
            references employees_movement (id);
