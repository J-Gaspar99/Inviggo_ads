#FRONTEND:
##############
Da biste preuzeli projekat najlakse bi bilo u terminalu
uneti komandu:

git clone https://github.com/J-Gaspar99/Inviggo_ads.git

sledeci korak jeste preuzimanje paketa neophodnih za pokretanje applikacije

Potrebno je pozicionirati se u direktorijum gde se nalazi frontend app

cd Inviggo_ads/inviggo_ads_frontend/inviggo-ads-frontend

Koristiti sledecu komandu za instalaciju paketa:

npm install

Ukoliko dodje do greske prilikom instalacije koristiti komande:
npm audit fix
npm audit fix --force

Komanda za pokretanje aplikacije:

npm start

----------------------------------------------------

#BACKEND:
#############

Baza na ovom projektu je postgresql
Potrebno je instalirati PgAdmin i tamo kreirati 
novu bazu sa istim nazivom kao u podesavanjima aplikacije
pogledati podesavanja i menjati po potrebi.


spring.application.name=inviggo_ads
spring.datasource.driverClassName=org.postgresql.Driver
spring.datasource.platform=postgres
spring.datasource.url=jdbc:postgresql://localhost:5432/inviggo_ads
spring.datasource.username=postgres
spring.datasource.password=postgres

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=create-drop

spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Optional: Enable SQL initialization
spring.sql.init.mode=always
spring.jpa.defer-datasource-initialization=true

server.port=8081
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
spring.jpa.open-in-view=false

jwt.app-name=inviggo-ads
jwt.secret=your-very-long-and-secure-secret-key-at-least-512-bits-long
jwt.expires-in=1800000
jwt.header=Authorization

spring.jpa.properties.hibernate.current_session_context_class=thread


Klasa za pokretanje applikacije:

..\Inviggo_ads\inviggo_ads\src\main\java\com\example\inviggo_ads\InviggoAdsApplication.java

