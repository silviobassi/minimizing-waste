create table descriptions_supplies (
    id bigint not null auto_increment,
    packing varchar(255),
    quantity bigint not null,
    measure decimal(19,2),
    measure_unit_type varchar(255),
    total decimal(19,2),
    primary key (id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table employees_movements (
    id bigint not null auto_increment,
    create_at datetime(6),
    update_at datetime(6),
    allocated bit not null,
    user_id bigint not null,
    sector_id bigint not null,
    primary key (id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table `groups` (
    id bigint not null auto_increment,
    name varchar(255),
    primary key (id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table groups_permissions (
    group_id bigint not null,
    permission_id bigint not null,
    primary key (group_id, permission_id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table notifications (
    id bigint not null auto_increment,
    title varchar(255),
    reason varchar(255),
    goal varchar(255),
    primary key (id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table notifications_users (
    notification_id bigint not null,
    user_id bigint not null
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table permissions (
    id bigint not null auto_increment,
    name varchar(255),
    description varchar(255),
    primary key (id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table sectors (
    id bigint not null auto_increment,
    name varchar(255),
    primary key (id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table supplies (
    id bigint not null auto_increment,
    supply_type varchar(31) not null,
    name varchar(255),
    bulk varchar(255),
    manipulation varchar(255),
    supply_description_id bigint not null,
    primary key (id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table supplies_movement (
    id bigint not null auto_increment,
    create_at datetime(6),
    not_busy bit not null,
    movable bit not null,
    allocated_quantity bigint,
    notification_id bigint not null,
    work_station_id bigint not null,
    supply_id bigint not null,
    primary key (id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table tasks (
    id bigint not null auto_increment,
    title varchar(255),
    start_date datetime(6),
    end_date datetime(6),
    deadline integer not null,
    completed bit not null,
    validated bit not null,
    nature varchar(255),
    notification_id bigint not null,
    primary key (id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table users (
    id bigint not null auto_increment,
    name varchar(255),
    cpf varchar(255),
    email varchar(255),
    password varchar(255),
    office varchar(255),
    occupation varchar(255),
    literate bit not null,
    primary key (id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table users_employees_movement (
    user_id bigint not null,
    employees_movement_id bigint not null
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table users_groups (
    user_id bigint not null,
    group_id bigint not null,
    primary key (user_id, group_id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table users_tasks (
    user_id bigint not null,
    task_id bigint not null
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table work_stations (
    id bigint not null auto_increment,
    name varchar(255) not null,
    localization varchar(255),
    sector_id bigint not null,
    primary key (id)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;