CREATE TABLE  utilisateur(
    id int NOT NULL,
    email varchar(50) NOT NULL,
	password varchar(50) NOT NULL,
    PRIMARY KEY (id) 
);

CREATE TABLE  client(
    id int NOT NULL,
    nom varchar(50) NOT NULL,
	prenom varchar(50) NOT NULL,
    telephone varchar(10) NOT NULL,
    code_postale varchar(10) NOT NULL,
    ville varchar(50) NOT NULL,
    adresse varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    motdepasse varchar(50) NOT NULL,
	raison_sociale varchar(50),
	secteur_activite varchar(50),
    siren varchar(50),
	piece_identite varchar(50) NOT NULL,
    PRIMARY KEY (id) 
);


CREATE TABLE  voiture(
	id int NOT NULL,
	marque varchar(50) NOT NULL,
    model varchar(50) NOT NULL,
    couleur varchar(50) NOT NULL,
    puissance varchar(50) NOT NULL,
    carburant varchar(50) NOT NULL,
	prix int  NOT NULL,
	PRIMARY KEY (id) 
);

CREATE TABLE  options(
	id int NOT NULL,
	descrip varchar(100) NOT NULL,
    prix int NOT NULL,
	PRIMARY KEY (id) 
);


CREATE TABLE  codepromo(
	id int NOT NULL,
	valeur int NOT NULL,
    date_debut date NOT NULL,
	date_fin date NOT NULL,
	PRIMARY KEY (id) 
);

CREATE TABLE  client_voiture_location(
	id int NOT NULL,
	idclient int NOT NULL,
    idvoiture int NOT NULL,
	datedebutlocation date NOT NULL,
	datefinlocation date NOT NULL,
    descrip varchar(100) NOT NULL,
    idpromo int,
	PRIMARY KEY (id),
    FOREIGN KEY (idclient) REFERENCES client(id),
    FOREIGN KEY (idvoiture) REFERENCES voiture(id),
    FOREIGN KEY (idvoiture) REFERENCES voiture(id)
);

CREATE TABLE  client_voiture_accident(
	id int NOT NULL,
	idclient int NOT NULL,
    idvoiture int NOT NULL,
	dateaccident date NOT NULL,
    descrip varchar(100) NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (idclient) REFERENCES client(id),
    FOREIGN KEY (idvoiture) REFERENCES voiture(id)
);


