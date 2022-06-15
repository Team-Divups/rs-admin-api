CREATE TABLE bs_admin.subscription (
	id INT auto_increment NOT NULL,
	subid char(5) NOT NULL,
	name varchar(100) NOT NULL,
	subcategory varchar(100) NULL,
	mode varchar(100) NOT NULL,
	owner varchar(100) NOT NULL,
	location varchar(100) NULL,
	`date` DATE DEFAULT CURRENT_DATE NULL,
	CONSTRAINT subscription_pk PRIMARY KEY (id,subid)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb3
COLLATE=utf8mb3_general_ci;

ALTER TABLE bs_admin.subscription ADD applogo TEXT NULL;
