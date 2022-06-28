create table role
(
    roleId   int auto_increment,
    roleName varchar(50)  not null,
    `desc`   varchar(100) null,
    constraint role_pk
        primary key (roleId)
);
