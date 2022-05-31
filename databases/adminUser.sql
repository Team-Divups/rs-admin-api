CREATE TABLE bs_admin.Admin_user (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	designation varchar(100) NOT NULL,
	`role` varchar(100) NOT NULL,
	joined_at DATETIME DEFAULT CURRENT TIMESTAMP NULL,
	CONSTRAINT Admin_user_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb3
COLLATE=utf8mb3_general_ci;
