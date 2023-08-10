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
delete from users_access_groups;
delete from assignments_employees;
delete from oauth2_registered_client;
delete from assignments_employees;
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
alter table users_access_groups auto_increment = 1;
alter table groups_permissions auto_increment = 1;
alter table assignments_employees auto_increment = 1;

insert into users (name, cpf, email, whats_app, password, office, occupation, literate, created_at, avatar_url) values
('Silvio Bassi', '25782713801', 'silviobassi2@gmail.com', '17996079654', '$2a$12$0wznF6KN2P79LF0qgVNsQeVJTkSA.BFl6ZRaUBGvZUqHO1/BdWfoS', 'Azulejista', 'Instalador de Porcelanato',
 'Ensino Médio', utc_timestamp, null),
('Pedro Bassi', '99999999999', 'pedrobassi@gmail.com', '99999999999', '$2a$12$0wznF6KN2P79LF0qgVNsQeVJTkSA.BFl6ZRaUBGvZUqHO1/BdWfoS', 'Pedreiro', 'Assentamento de Tijolos',
 'Curso Superior Completo', utc_timestamp, null),
('Ana Paula Bassi', '99999999999', 'paulaanabassi@hotmail.com', '17997843606', '$2a$12$0wznF6KN2P79LF0qgVNsQeVJTkSA.BFl6ZRaUBGvZUqHO1/BdWfoS', 'Azulejista', 'Rejuntamento de Porcelanato',
 'Curso Superior Incompleto', utc_timestamp, null);

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


insert into notifications (created_at, title, goal, reason)
values (utc_timestamp, 'Recurso Requisitado', 'Atender Colaborador', 'Alocado em Local Errado');
insert into notifications (created_at, title, goal, reason)
values (utc_timestamp, 'Recurso Vencido', 'Devolver Recurso ao Fornecedor', 'Inutilidade na execução de serviços');
insert into notifications (created_at, title, goal, reason)
values (utc_timestamp, 'Recurso imcompatível', 'Realocar supplies compatível', 'Não pode ser utilizado devido a ocorrência');
insert into notifications (created_at, title, goal, reason)
values (utc_timestamp, 'Recurso imcompatível', 'Realocar supplies compatível', 'Não pode ser utilizado devido a ocorrência');
insert into notifications (created_at, title, goal, reason)
values (utc_timestamp, 'Recurso imcompatível', 'Realocar supplies compatível', 'Não pode ser utilizado devido a ocorrência');

insert into supplies (supply_type, name, bulk, manipulation, supply_description_id) values
('EQUIPAMENTO', 'Betoneira', 'GRANDE', null, 2);
insert into supplies (supply_type, name, bulk, manipulation, supply_description_id) values
('MATERIAL', 'Argamassa', null, 'TRANSMUTÁVEL', 1);
insert into supplies (supply_type, name, bulk, manipulation, supply_description_id) values
('EQUIPAMENTO', 'Bob Cat', 'GRANDE', null, 3);
insert into supplies (supply_type, name, bulk, manipulation, supply_description_id) values
('MATERIAL', 'cimento', null, 'TRANSMUTÁVEL', 4);
insert into supplies (supply_type, name, bulk, manipulation, supply_description_id) values
('MATERIAL', 'Porcelanato', null, 'IMUTÁVEL', 5);

insert into supplies_movement (create_at, not_busy, movable, allocated_quantity, notification_id, work_station_id, supply_id, employee_responsible_id)
values (utc_timestamp(), true, false,1, 3, 5, 1, 2);
insert into supplies_movement (create_at, not_busy, movable, allocated_quantity, notification_id, work_station_id, supply_id, employee_responsible_id)
values (utc_timestamp(), false, false, 1, 2, 3, 2, 1);
insert into supplies_movement (create_at, not_busy, movable, allocated_quantity, notification_id, work_station_id, supply_id, employee_responsible_id)
values (utc_timestamp(), false, true, 1, 1, 2, 3,2);
insert into supplies_movement (create_at, not_busy, movable, allocated_quantity, notification_id, work_station_id, supply_id, employee_responsible_id)
values (utc_timestamp(), true, true, 1, 5, 2, 2, 1);

insert into assignments (title, start_date, end_date, deadline, completed, approved, nature, work_station_id, approval_description, notification_id)
values ('Revestimento de Banheiros', utc_timestamp(), utc_timestamp(), utc_timestamp(), true, false, 'OBRAS', 1,
        'Rejuntar novamente os banheiros, pois estão mau rejuntados. Trocar um revestimento que estã descascado em uma das pontas', 1);
insert into assignments (title, start_date, end_date, deadline, completed, approved, nature, work_station_id, approval_description, notification_id)
values ('Instalação de Porcelanato', utc_timestamp(), null, utc_timestamp(), false, false, 'OBRAS', 2,
        '3 Porcelanatos marcados devem ser trocados, pois estão sem argamassa', 2);
insert into assignments (title, start_date, end_date, deadline, completed, approved, nature, work_station_id, approval_description, notification_id)
values ('Organização de Materiais Espalhados', utc_timestamp(), utc_timestamp(), utc_timestamp(), true, true, 'LIMPEZA', 2,
        'Trabalho Coeso e cumprimento das metas técnicas estabelecidas', 3);
insert into assignments (title, start_date, end_date, deadline, completed, approved, nature, work_station_id, approval_description, notification_id)
values ('Organização de Materiais Espalhados', utc_timestamp(), utc_timestamp(), utc_timestamp(), true, true, 'LIMPEZA', 2,
        'Trabalho Coeso e cumprimento das metas técnicas estabelecidas', 4);

insert into assignments_employees (assignment_id, responsible_employee_id) VALUES (1, 1), (2, 1), (3, 2);

insert into permissions (name, description) values ('EDIT_USER', 'Permite editar usuários');
insert into permissions (name, description) values ('CONSULT_USER', 'Permite consultar usuários');
insert into permissions (name, description) values ('EDIT_ASSIGNMENTS', 'Permite editar tarefas');
insert into permissions (name, description) values ('EDIT_SUPPLIES', 'Permite editar tarefas');
insert into permissions (name, description) values ('CONSULT_SUPPLIES', 'Permite consultar tarefas');
insert into permissions (name, description) values ('EDIT_SECTORS', 'Permite editar tarefas');
insert into permissions (name, description) values ('CONSULT_SECTORS', 'Permite consultar tarefas');
insert into permissions (name, description) values ('EDIT_WORK_STATIONS', 'Permite editar estações de trabalho');
insert into permissions (name, description) values ('CONSULT_WORK_STATIONS', 'Permite consultar estações de trabalho');
insert into permissions (name, description) values ('APPROVE_ASSIGNMENTS', 'Permite aprovar tarefas');
insert into permissions (name, description) values ('COMPLETE_ASSIGNMENTS', 'Permite completar tarefas');
insert into permissions (name, description) values ('GIVE_BACK_ASSIGNMENTS', 'Permite devolver recursos');
insert into permissions (name, description) values ('VACATE_ASSIGNMENTS', 'Permite disponibilizar recursos');
insert into permissions (name, description) values ('CONSULT_ASSIGNMENTS', 'Permite consultar tarefas');

insert into access_groups (name) values ('Encarregado');
insert into access_groups (name) values ('Administrador');
insert into access_groups (name) values ('Colaborador');

insert into users_access_groups (user_id, access_group_id) values (1, 2), (2, 1), (3, 3);

insert into groups_permissions (group_id, permission_id) values (1, 5), (1, 7), (1, 9),(1, 10),(1, 12), (1,13), (1, 14),
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),(2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12), (2, 13), (2, 14), (3, 11), (3, 14);

INSERT INTO minimizing_waste.oauth2_registered_client
(id, client_id, client_id_issued_at, client_secret, client_secret_expires_at, client_name, client_authentication_methods, authorization_grant_types, redirect_uris, scopes, client_settings, token_settings)
VALUES('1', 'minimizing-web', '2023-02-03 13:36:44', '$2a$10$nuH5YQJrevTT.rsmCMJl1OVH4OmqjZu231f5sf09bMG8pcsWR.MWa', NULL, 'Minimizing Web', 'client_secret_basic', 'refresh_token,authorization_code', 'http://127.0.0.1:8080/swagger-ui/oauth2-redirect.html,http://127.0.0.1:5173/authorize', 'READ,WRITE', '{"@class":"java.util.Collections$UnmodifiableMap","settings.client.require-proof-key":false,"settings.client.require-authorization-consent":true}', '{"@class":"java.util.Collections$UnmodifiableMap","settings.token.reuse-refresh-tokens":false,"settings.token.id-token-signature-algorithm":["org.springframework.security.oauth2.jose.jws.SignatureAlgorithm","RS256"],"settings.token.access-token-time-to-live":["java.time.Duration",900.000000000],"settings.token.access-token-format":{"@class":"org.springframework.security.oauth2.server.authorization.settings.OAuth2TokenFormat","value":"self-contained"},"settings.token.refresh-token-time-to-live":["java.time.Duration",86400.000000000],"settings.token.authorization-code-time-to-live":["java.time.Duration",300.000000000]}');

#INSERT INTO minimizing_waste.oauth2_registered_client
#(id, client_id, client_id_issued_at, client_secret, client_secret_expires_at, client_name, client_authentication_methods, authorization_grant_types, redirect_uris, scopes, client_settings, token_settings)
#VALUES('1', 'minimizing-web', '2023-02-03 13:36:44', '$2a$10$nuH5YQJrevTT.rsmCMJl1OVH4OmqjZu231f5sf09bMG8pcsWR.MWa', NULL, 'Minimizing Web', 'client_secret_basic', 'refresh_token,authorization_code', 'http://localhost:3000/authorize,https://oidcdebugger.com/debug', 'READ,WRITE', '{"@class":"java.util.Collections$UnmodifiableMap","settings.client.require-proof-key":false,"settings.client.require-authorization-consent":true}', '{"@class":"java.util.Collections$UnmodifiableMap","settings.token.reuse-refresh-tokens":false,"settings.token.id-token-signature-algorithm":["org.springframework.security.oauth2.jose.jws.SignatureAlgorithm","RS256"],"settings.token.access-token-time-to-live":["java.time.Duration",900.000000000],"settings.token.access-token-format":{"@class":"org.springframework.security.oauth2.server.authorization.settings.OAuth2TokenFormat","value":"self-contained"},"settings.token.refresh-token-time-to-live":["java.time.Duration",86400.000000000],"settings.token.authorization-code-time-to-live":["java.time.Duration",300.000000000]}');


