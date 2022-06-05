CREATE TABLE bs_admin.admin_user (
	id INT UNSIGNED auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	organization varchar(100) NOT NULL,
	designation varchar(100) NOT NULL,
	`role` VARCHAR(100) NOT NULL,
	joined_date DATE DEFAULT (CURRENT_DATE) NOT NULL,
	CONSTRAINT NewTable_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb3
COLLATE=utf8mb3_general_ci;

ALTER TABLE bs_admin.admin_user ADD comments varchar(100) NOT NULL;
ALTER TABLE bs_admin.admin_user ADD status BOOL DEFAULT 1 NOT NULL;
ALTER TABLE bs_admin.admin_user MODIFY COLUMN status varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL;

