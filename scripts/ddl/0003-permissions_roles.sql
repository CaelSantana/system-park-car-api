CREATE TABLE permissions_roles (
	role_id int NOT NULL,
	permission_id int NOT NULL,
	KEY idx_permissions_roles_role_id (role_id),
	KEY idx_permissions_roles_permission_id (permission_id),
	PRIMARY KEY (role_id, permission_id),
	CONSTRAINT fk_permissions_roles_role_id FOREIGN KEY (role_id) REFERENCES roles (id),
	CONSTRAINT fk_permissions_roles_permission_id FOREIGN KEY (permission_id) REFERENCES permissions (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;