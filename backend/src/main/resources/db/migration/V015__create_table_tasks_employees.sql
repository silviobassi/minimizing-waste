create table assignments_employees (
    assignment_id bigint not null,
    responsible_employee_id bigint not null,
    primary key (assignment_id, responsible_employee_id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

alter table assignments_employees
    add constraint assignment_employees_FK_employees
        foreign key (responsible_employee_id)
            references users (id);

alter table assignments_employees
    add constraint assignment_employees_FK_tasks
        foreign key (assignment_id)
            references assignments (id);