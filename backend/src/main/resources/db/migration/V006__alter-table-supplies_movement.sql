alter table supplies_movement
    add column employee_responsible_id bigint not null;

alter table supplies_movement
    add constraint supplies_movement_FK_user
        foreign key (employee_responsible_id)
            references users (id);