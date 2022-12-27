alter table users add column whats_app varchar(255) after email;

drop table users_groups;

create table users_access_groups (
    user_id bigint not null,
    access_group_id bigint not null,
    primary key (user_id, access_group_id)
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;

alter table users_access_groups
    add constraint users_access_groups_FK_users
        foreign key (user_id)
            references users (id);

alter table users_access_groups
    add constraint users_access_groups_FK_access_groups
        foreign key (access_group_id)
            references access_groups (id);