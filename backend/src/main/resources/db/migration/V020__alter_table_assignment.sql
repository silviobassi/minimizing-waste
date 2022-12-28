alter table assignments add column notification_id bigint null;

alter table assignments
    add constraint assignments_FK_notifications
    foreign key (notification_id)
    references notifications (id);