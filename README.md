# Application Full-Stack de gestion des employés

Ce projet est une application Full-Stack permettant de gérer les employés d’une entreprise
(CRUD complet) avec une API REST sécurisée par JWT et un frontend Angular.

- Backend : Spring Boot 3, MySQL, Spring Security (JWT)
- Frontend : Angular 17+, HttpClient, Routing, AuthGuard

---

## Fonctionnalités

### Backend

- Gestion de l’entité `Employee` :
  - id
  - firstName
  - lastName
  - email
  - salary
- API REST CRUD :
  - `GET /api/employes`
  - `GET /api/employes/{id}`
  - `POST /api/employes`
  - `PUT /api/employes/{id}`
  - `DELETE /api/employes/{id}`
- Authentification avec JWT :
  - `POST /api/auth/login`
- Validation des données (Jakarta Validation)
- Sécurité Spring Security, application stateless

### Frontend

- Page de connexion (Login) avec enregistrement du token JWT
- Liste des employés (tableau) avec actions :
  - Ajouter
  - Modifier
  - Supprimer
  - Détails
  - Déconnexion
- Formulaire d’ajout / modification d’employé
- Page de détails d’un employé
- Routage protégé par AuthGuard :
  - `/login`
  - `/employes`
  - `/employes/nouveau`
  - `/employes/modifier/:id`
  - `/employes/:id`

---

## Architecture du projet

Organisation générale (à adapter si besoin) :

- `service/` : projet Spring Boot (backend)
  - `src/main/java/ma/fstt/service/...`
  - `src/main/resources/application.properties`
- `client/` : projet Angular (frontend)
  - `src/app/...`

---

## Technologies utilisées

### Backend

- Java 17
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Security (JWT)
- MySQL
- Jakarta Validation
- Lombok
- Maven

### Frontend

- Angular 17+
- TypeScript
- Angular Router
- HttpClient
- Interceptor pour JWT
- AuthGuard

---

## Prérequis

- JDK 17
- Maven
- Node.js et npm
- Angular CLI (`npm install -g @angular/cli`)
- MySQL (ou XAMPP)

---

## Installation et exécution

### 1. Cloner le dépôt

```bash
git clone https://github.com/moussa-mohand2005/Application-Full-Stack-de-gestion-des-employ-s.git
cd Application-Full-Stack-de-gestion-des-employ-s
```

### 2. Configuration de la base de données (backend)

Créer une base de données MySQL :

```sql
CREATE DATABASE gestion_employes CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

Configurer `service/src/main/resources/application.properties` :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gestion_employes
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update

spring.jpa.show-sql=true

app.jwt.secret=change-me-secret-key
app.jwt.expiration=86400000
```

Adapter `username` / `password` selon votre environnement.

### 3. Lancer le backend

```bash
cd service
mvn spring-boot:run
```

Le backend sera disponible sur `http://localhost:8080`.

### 4. Lancer le frontend

Dans un autre terminal :

```bash
cd client
npm install
ng serve
```

Le frontend sera disponible sur `http://localhost:4200`.

---

## Authentification

Un utilisateur par défaut est défini côté backend :

- Nom d’utilisateur : `admin`
- Mot de passe : `admin`

### Endpoint de login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin"
}
```

Réponse :

```json
{
  "token": "JWT_TOKEN_ICI",
  "type": "Bearer"
}
```

Le frontend sauvegarde ce token et l’envoie automatiquement dans le header `Authorization`
pour tous les appels protégés.

### Header d’autorisation

Pour consommer l’API avec Postman ou un autre client :

```http
Authorization: Bearer JWT_TOKEN_ICI
```

---

## API REST

### Authentification

- `POST /api/auth/login`  
  Authentifie l’utilisateur et renvoie un JWT.

### Employés (protégé par JWT)

- `GET /api/employes`  
  Retourne la liste de tous les employés.

- `GET /api/employes/{id}`  
  Retourne un employé par son identifiant.

- `POST /api/employes`  
  Crée un nouvel employé.

- `PUT /api/employes/{id}`  
  Met à jour un employé existant.

- `DELETE /api/employes/{id}`  
  Supprime un employé.

---

## Structure principale du code (backend)

- `model/Employee.java` : entité JPA
- `repository/EmployeeRepository.java` : accès aux données
- `service/EmployeeService.java` : logique métier
- `controller/EmployeeController.java` : endpoints CRUD
- `controller/AuthController.java` : login et génération du JWT
- `config/SecurityConfig.java` : configuration Spring Security
- `filter/JwtFilter.java` : extraction et validation du token
- `util/JwtUtil.java` : utilitaires JWT
- `dto/LoginRequest.java`, `dto/LoginResponse.java` : objets de transfert

