create table employees_movements_tasks (
   employee_movement_id bigint not null,
   task_id bigint not null,
   primary key (employee_movement_id, task_id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

alter table employees_movements_tasks
    add constraint employees_movements_FK_tasks
        foreign key (task_id)
            references assignments (id);

alter table employees_movements_tasks
    add constraint employees_movements_FK_employees_movements
        foreign key (employee_movement_id)
            references employees_movements (id);

alter table employees_movements add column notification_id bigint not null;

alter table employees_movements
    add constraint UK_notification_id
        unique (notification_id);

alter table employees_movements
    add constraint employees_movements_FK_notification
        foreign key (notification_id)
            references notifications (id);