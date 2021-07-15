alter table supplies
    add constraint UK_supplies_description_id
        unique (supply_description_id);

alter table supplies_movement
    add constraint UK_notification_id
        unique (notification_id);

alter table tasks
    add constraint UK_notification_id
        unique (notification_id);

alter table users_employees_movement
    add constraint UK_employees_movement_id
        unique (employees_movement_id);

alter table employees_movements
    add constraint employees_movements_FK_sectors
        foreign key (sector_id)
            references sectors (id);

alter table employees_movements
    add constraint employees_movements_FK_users
        foreign key (user_id)
            references users (id);

alter table groups_permissions
    add constraint groups_permissions_FK_permissions
        foreign key (permission_id)
            references permissions (id);

alter table groups_permissions
    add constraint groups_permissions_FK_group
        foreign key (group_id)
            references `groups` (id);

alter table notifications_users
    add constraint notifications_users_FK_users
        foreign key (user_id)
            references users (id);

alter table notifications_users
    add constraint notifications_users_FK_notifications
        foreign key (notification_id)
            references notifications (id);

alter table supplies
    add constraint supplies_FK_descriptions_supplies_id
        foreign key (supply_description_id)
            references descriptions_supplies (id);

alter table supplies_movement
    add constraint supplies_movement_FK_notifications
        foreign key (notification_id)
            references notifications (id);

alter table supplies_movement
    add constraint supplies_movement_FK_supplies
        foreign key (supply_id)
            references supplies (id);

alter table supplies_movement
    add constraint supplies_movement_FK_work_stations
        foreign key (work_station_id)
            references work_stations (id);

alter table tasks
    add constraint tasks_FK_notifications
        foreign key (notification_id)
            references notifications (id);

alter table users_employees_movement
    add constraint users_employees_movement_FK_employees_movements
        foreign key (employees_movement_id)
            references employees_movements (id);

alter table users_employees_movement
    add constraint users_employees_movement_FK_users
        foreign key (user_id)
            references users (id);

alter table users_groups
    add constraint users_groups_FK_groups
        foreign key (group_id)
            references `groups` (id);

alter table users_groups
    add constraint user_groups_FK_users
        foreign key (user_id)
            references users (id);

alter table users_tasks
    add constraint users_tasks_FK_tasks
        foreign key (task_id)
            references tasks (id);

alter table users_tasks
    add constraint users_tasks_FK_users
        foreign key (user_id)
            references users (id);

alter table work_stations
    add constraint work_stations_FK_sectors
        foreign key (sector_id)
            references sectors (id);