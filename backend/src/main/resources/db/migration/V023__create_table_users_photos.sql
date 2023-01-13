create table users_photos (
  user_id bigint not null,
  file_name varchar(150) not null,
  description varchar(150),
  content_type varchar(80) not null,
  size int not null,

  primary key (user_id),
  constraint fk_users_photos_users foreign key (user_id) references users (id)
) engine=InnoDB default charset=utf8;