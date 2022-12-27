set foreign_key_checks = 0;

delete from users;
delete from work_stations;
delete from sectors;
delete from descriptions_supplies;
delete from supplies;
delete from notifications;
delete from supplies_movement;
delete from assignments;
delete from permissions;
delete from access_groups;
delete from groups_permissions;


set foreign_key_checks = 1;

alter table users auto_increment = 1;
alter table work_stations auto_increment = 1;
alter table sectors auto_increment = 1;
alter table descriptions_supplies auto_increment = 1;
alter table supplies auto_increment = 1;
alter table notifications auto_increment = 1;
alter table supplies_movement auto_increment = 1;
alter table assignments auto_increment = 1;
alter table permissions auto_increment = 1;
alter table access_groups auto_increment = 1;
alter table groups_permissions auto_increment = 1;

insert into users (name, cpf, email, whats_app, password, office, occupation, literate, created_at) values
('Silvio Bassi', '25782713801', 'silviobassi2@gmail.com', '17996079654', '123', 'Azulejista', 'Instalador de Porcelanato',
 'Ensino Médio', utc_timestamp),
('Pedro Bassi', '99999999999', 'pedrobassi@gmail.com', '99999999999', '123', 'Pedreiro', 'Assentamento de Tijolos',
 'Curso Superior Completo', utc_timestamp),
('Ana Paula Bassi', '99999999999', 'paulaanabassi@hotmail.com', '17997843606', '123', 'Azulejista', 'Rejuntamento de Porcelanato',
 'Curso Superior Incompleto', utc_timestamp);

insert into sectors (name) values ('Obras');
insert into sectors (name) values ('Administrativo');
insert into sectors (name) values ('Técnico');
insert into sectors (name) values ('Estoque');
insert into sectors (name) values ('Segurança do Trabalho');

insert into work_stations (name, localization, sector_id) values ('Alvenaria', 'Bloco 12, Apto 34', 1);
insert into work_stations (name, localization, sector_id) values ('Acabamento', 'Bloco 10, Apto 23', 1);
insert into work_stations (name, localization, sector_id) values ('Pintura', 'Bloco 19, Apto 78', 1);
insert into work_stations (name, localization, sector_id) values ('Recursos Humanos', 'Terreo, Quadra B', 2);
insert into work_stations (name, localization, sector_id) values ('Engenharia', 'Escritório B', 3);
insert into work_stations (name, localization, sector_id) values ('Treinamento', 'Quadra C, Sala 25', 5);

insert into descriptions_supplies (packing, quantity, measure, total, measure_unit_type) values
('Não Aplicável', 2, 20, 40, 'KG');
insert into descriptions_supplies (packing, quantity, measure, total, measure_unit_type) values
('Saco Kraft', 1, 1, 1, 'UNIDADE');
insert into descriptions_supplies (packing, quantity, measure, total, measure_unit_type) values
('Não Aplicável', 2, 1, 2, 'UNIDADE');
insert into descriptions_supplies (packing, quantity, measure, total, measure_unit_type) values
('Saco Kraft', 30, 50, 1500, 'KG');
insert into descriptions_supplies (packing, quantity, measure, total, measure_unit_type) values
('Caixa', 30, 2, 60, 'M2');


insert into notifications (title, goal, reason)
values ('Recurso Requisitado', 'Atender Colaborador', 'Alocado em Local Errado');
insert into notifications (title, goal, reason)
values ('Recurso Vencido', 'Devolver Recurso ao Fornecedor', 'Inutilidade na execução de serviços');
insert into notifications (title, goal, reason)
values ('Recurso imcompatível', 'Realocar supplies compatível', 'Não pode ser utilizado devido a ocorrência');
insert into notifications (title, goal, reason)
values ('Recurso imcompatível', 'Realocar supplies compatível', 'Não pode ser utilizado devido a ocorrência');
insert into notifications (title, goal, reason)
values ('Recurso imcompatível', 'Realocar supplies compatível', 'Não pode ser utilizado devido a ocorrência');

insert into supplies (supply_type, name, bulk, manipulation, supply_description_id) values
('equipment', 'Betoneira', 'GRANDE', null, 2);
insert into supplies (supply_type, name, bulk, manipulation, supply_description_id) values
('material', 'Argamassa', null, 'TRANSMUTÁVEL', 1);
insert into supplies (supply_type, name, bulk, manipulation, supply_description_id) values
('equipment', 'Bob Cat', 'GRANDE', null, 3);
insert into supplies (supply_type, name, bulk, manipulation, supply_description_id) values
('material', 'cimento', null, 'TRANSMUTÁVEL', 4);
insert into supplies (supply_type, name, bulk, manipulation, supply_description_id) values
('material', 'Porcelanato', null, 'IMUTÁVEL', 5);

insert into supplies_movement (create_at, not_busy, movable, allocated_quantity, notification_id, work_station_id, supply_id, employee_responsible_id)
values (utc_timestamp(), true, false,1, 3, 5, 1, 2);
insert into supplies_movement (create_at, not_busy, movable, allocated_quantity, notification_id, work_station_id, supply_id, employee_responsible_id)
values (utc_timestamp(), false, false, 1, 2, 3, 2, 1);
insert into supplies_movement (create_at, not_busy, movable, allocated_quantity, notification_id, work_station_id, supply_id, employee_responsible_id)
values (utc_timestamp(), false, true, 1, 1, 2, 3,2);
insert into supplies_movement (create_at, not_busy, movable, allocated_quantity, notification_id, work_station_id, supply_id, employee_responsible_id)
values (utc_timestamp(), false, true, 1, 4, 2, 1, 3);
insert into supplies_movement (create_at, not_busy, movable, allocated_quantity, notification_id, work_station_id, supply_id, employee_responsible_id)
values (utc_timestamp(), true, true, 1, 5, 2, 2, 1);

insert into assignments (title, start_date, end_date, deadline, completed, approved, nature, work_station_id, approval_description)
values ('Revestimento de Banheiros', utc_timestamp(), utc_timestamp(), utc_timestamp(), true, false, 'OBRAS', 1,
        'Rejuntar novamente os banheiros, pois estão mau rejuntados. Trocar um revestimento que estã descascado em uma das pontas');
insert into assignments (title, start_date, end_date, deadline, completed, approved, nature, work_station_id, approval_description)
values ('Instalação de Porcelanato', utc_timestamp(), null, utc_timestamp(), false, false, 'OBRAS', 2,
        '3 Porcelanatos marcados devem ser trocados, pois estão sem argamassa');
insert into assignments (title, start_date, end_date, deadline, completed, approved, nature, work_station_id, approval_description)
values ('Organização de Materiais Espalhados', utc_timestamp(), utc_timestamp(), utc_timestamp(), true, true, 'LIMPEZA', 2,
        'Trabalho Coeso e cumprimento das metas técnicas estabelecidas');

insert into permissions (name, description) values ('CONSULT_SUPPLIES', 'Permite Consultar Recursos');
insert into permissions (name, description) values ('EDIT_SUPPLIES', 'Permite Editar Recursos');
insert into permissions (name, description) values ('CREATE_SUPPLIES', 'Permite Criar Recursos');

insert into access_groups (name) values ('Encarregado');
insert into access_groups (name) values ('Administrador');
insert into access_groups (name) values ('Colaborador');

insert into groups_permissions (group_id, permission_id) values (1, 1);
insert into groups_permissions (group_id, permission_id) values (1, 2);
insert into groups_permissions (group_id, permission_id) values (2, 1);
insert into groups_permissions (group_id, permission_id) values (2, 2);
insert into groups_permissions (group_id, permission_id) values (2, 3);
insert into groups_permissions (group_id, permission_id) values (3, 1);