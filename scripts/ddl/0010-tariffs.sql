CREATE TABLE tariffs (
  id INT NOT NULL AUTO_INCREMENT,
  vehicles_type_id INT NOT NULL,
  start_time INT NOT NULL,
  end_time INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description VARCHAR(100),
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  CONSTRAINT fk_tariffs_vehicles_type_id FOREIGN KEY (vehicles_type_id) REFERENCES vehicles_type (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO tariffs (vehicles_type_id, start_time, end_time, price, description) VALUES
(1, 0, 61, 1.00, 'Primeira hora para bicicletas '),
(1, 62, 121, 2.00, 'Segunda hora para bicicletas'),
(1, 122, 181, 5.00, 'Terceira hora para bicicletas'),
(1, 182, 540, 15.00, 'Diária para bicicletas'),

(2, 0, 61, 3.00, 'Primeira hora para motos'),
(2, 62, 121, 6.00, 'Segunda hora para motos'),
(2, 122, 181, 9.00, 'Terceira hora para motos'),
(2, 182, 540, 30.00, 'Diária para motos'),

(3, 0, 61, 5.00, 'Primeira hora para carros pequenos'),
(3, 62, 121, 10.00, 'Segunda hora para carros pequenos'),
(3, 122, 181, 15.00, 'Terceira hora para carros pequenos'),
(3, 182, 540, 45.00, 'Diária para carros pequenos'),

(4, 0, 61, 5.00, 'Primeira hora para carros grandes'),
(4, 62, 121, 10.00, 'Segunda hora para carros grandes'),
(4, 122, 181, 15.00, 'Terceira hora para carros grandes'),
(4, 182, 540, 60.00, 'Diária para carros grandes');

select * from tariffs;