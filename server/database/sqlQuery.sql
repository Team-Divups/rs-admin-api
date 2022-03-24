create database rsAdmin;

use rsAdmin;

CREATE TABLE rsAdmin.`user` (
	id INT auto_increment NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT user_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


create table role
(
    roleId   int auto_increment,
    roleName varchar(50)  not null,
    `desc`   varchar(100) null,
    constraint role_pk
        primary key (roleId)
);

create table subscription
(
    appKey        int auto_increment,
    appLogo       varchar(50)  null,
    appName       varchar(50)  not null,
    appUrl        varchar(50)  not null,
    des           varchar(100) null,
    appOwnerEMail varchar(50)  not null,
    SecrectKey    varchar(50)  null,
    constraint subscription_pk
        primary key (appKey)
);

create table review
(
    subID          int auto_increment,
    subName        VARCHAR(50) not null,
    totalReview    int         not null,
    positiveReview int         not null,
    negativeReview int         null,
    constraint review_pk
        primary key (subID)
);



