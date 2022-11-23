alter table tasks
    drop foreign key tasks_FK_notifications,
    drop column notification_id;
