CREATE TABLE brands (
  id INT NOT NULL AUTO_INCREMENT,
  vehicles_type_id INT NOT NULL,
  icon VARCHAR(100) NOT NULL,
  name  VARCHAR(100) NOT NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  CONSTRAINT fk_brands_vehicles_type_id FOREIGN KEY (vehicles_type_id) REFERENCES vehicles_type (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

select * from brands;

AJP
Aprilia
Arc
Arch Motorcycle
Bajaj Auto
Benelli
Bimota
BMW Motorrad
Brough Superior
Brutus
Buell
Cagiva
CCM Motorcycles
CCW (Cleveland CycleWerks)
CFMoto
Confederate Motorcycles
Curtiss Motorcycles
Derbi
Ducati
Energica
Erik Buell Racing (EBR)
Evoke Motorcycles
Fantic Motor
FB Mondial
FGR Midalu
Gas Gas
GasGas
Ghezzi-Brian
Greeves Motorcycles
Haojue
Harley-Davidson
Hesketh Motorcycles
Honda
Husqvarna
Hyosung
Indian Motorcycle
Kawasaki
Keeway
KTM
Lightning Motorcycles
Lito
Macbor
Mash
Matchless
Midual
Montesa
Moto Guzzi
Moto Morini
Motus
MV Agusta
Norton
Norton Motorcycles
Orcal
Paton
Peugeot Motocycles
Piaggio
Royal Enfield
Saietta
Saroléa
Sherco
Skyteam
Suzuki
SWM Motorcycles
SW-MOTECH
SYM
Tarform
TGB
Triumph
UM Motorcycles
Vespa
Victory Motorcycles
Vins Motors
Voge
Vor Motori
Voxan
Vyrus
Yamaha
Yamaha Motor Corporation
Zero Motorcycles
Zongshen
Outra










('abarth', 'Abarth'),
('acura', 'Acura'),
('acura', 'Acura'),
('alpine', 'Alpine'),
('ariel', 'Ariel'),
('aston-martin', 'Aston Martin'),
('audi', 'Audi'),
('bentley', 'Bentley'),
('bmw', 'BMW'),
('borgward', 'Borgward'),
('brilliance', 'Brilliance'),
('bugatti', 'Bugatti'),
('buick', 'Buick'),
('byd', 'BYD'),
('cadillac', 'Cadillac'),
('chery', 'Chery'),
('chevrolet', 'Chevrolet'),
('chrysler', 'Chrysler'),
('citroën', 'Citroën'),
('dacia', 'Dacia'),
('daewoo', 'Daewoo'),
('daihatsu', 'Daihatsu'),
('datsun', 'Datsun'),
('dfsk', 'DFSK'),
('Dodge', 'Dodge'),
('Dongfeng', 'Dongfeng'),
('faw', 'FAW'),
('ferrari', 'Ferrari'),
('fiat', 'Fiat'),
('ford', 'Ford'),
('geely', 'Geely'),
('genesis', 'Genesis'),
('gmc', 'GMC'),
('great Wall', 'Great Wall'),
('haval', 'Haval'),
('holden', 'Holden'),
('honda', 'Honda'),
('hyundai', 'Hyundai'),
('infiniti', 'Infiniti'),
('isuzu', 'Isuzu'),
('jac', 'JAC'),
('jaguar', 'Jaguar'),
('jeep', 'Jeep'),
('kia', 'Kia'),
('lada', 'Lada'),
('lamborghini', 'Lamborghini'),
('land-rover', 'Land Rover'),
('lexus', 'Lexus'),
('lincoln', 'Lincoln'),
('mahindra', 'Mahindra'),
('maruti-suzuki', 'Maruti Suzuki'),
('maserati', 'Maserati'),
('mazda', 'Mazda'),
('mcLaren', 'McLaren'),
('mercedes-benz', 'Mercedes-Benz'),
('mini', 'MINI'),
('mitsubishi', 'Mitsubishi'),
('nissan', 'Nissan'),
('pagani', 'Pagani'),
('perodua', 'Perodua'),
('peugeot', 'Peugeot'),
('porsche', 'Porsche'),
('proton', 'Proton'),
('ram', 'RAM'),
('renault', 'Renault'),
('rolls-royce', 'Rolls-Royce'),
('saab', 'Saab'),
('seat', 'SEAT'),
('skoda', 'Skoda'),
('ssangyong', 'Ssangyong'),
('subaru', 'Subaru'),
('suzuki', 'Suzuki'),
('tata', 'Tata'),
('tesla', 'Tesla'),
('toyota', 'Toyota'),
('uaz', 'UAZ'),
('vaz-lada)', 'VAZ (Lada)'),
('volkswagen', 'Volkswagen'),
('volvo', 'Volvo'),
('zotye', 'Zotye'),
('other', 'Other')

