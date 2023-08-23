drop table users_access_groups;
alter table access_groups rename roles;
alter table groups_permissions rename roles_permissions;
alter table roles_permissions drop constraint groups_permissions_FK_group;
alter table roles_permissions drop constraint groups_permissions_FK_permissions;
alter table roles_permissions change group_id  role_id bigint;

alter table roles_permissions add
    constraint permissions_FK_roles
        foreign key (role_id) references roles (id);

alter table roles_permissions add
    constraint roles_FK_permissions
        foreign key (permission_id) references permissions (id);

alter table users add column role_id bigint null,
                  add constraint users_FK_roles
                      foreign key (role_id) references roles (id);
