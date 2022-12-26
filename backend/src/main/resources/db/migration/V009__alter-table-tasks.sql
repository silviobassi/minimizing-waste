alter table assignments
    add column employee_movement_id bigint,
    add constraint tasks_FK_employees_movement
        foreign key (employee_movement_id)
            references employees_movement (id);