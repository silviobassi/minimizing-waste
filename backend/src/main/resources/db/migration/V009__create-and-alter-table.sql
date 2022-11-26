drop table employees_movements_tasks;

#alter table tasks_employees_movement
    #drop constraint employees_movements_FK_employees_movements,
    #drop constraint employees_movements_FK_tasks;

create table tasks_employees_movement (
   task_id bigint not null,
   employee_movement_id bigint not null,
   primary key (task_id, employee_movement_id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

alter table tasks_employees_movement
    add constraint employees_movement_FK_employees_movement
        foreign key (employee_movement_id)
            references employees_movement (id);

alter table tasks_employees_movement
    add constraint tasks_FK_tasks
        foreign key (task_id)
            references tasks (id);
