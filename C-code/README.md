# Projeto  AUP - Adote Uma Praça
Se for começar do zero:
* instale o atom https://atom.io/
* sudo dnf install node npm postgresql-server
* sudo service postgresql start
* sudo su postgres
* http://www.postgresql.org/message-id/006201c74b23$17cce130$9b0014ac@wbaus090
* (/var/lib/pgsql/data/pg_hba.conf) http://gis.stackexchange.com/a/122697
* sudo npm -g install express express-generator knex pg bower
* createdb -U postgres -W aup
* express aup
* cd aup
* npm install knex --save
* knex init
* knex migrate:make esquema_inicial
* cd public
* bower init
* bower install angular-ui-router angular-bootstrap --save
* *em construção*

O avião estará no ar pouco depois disso. só configurar o knex para este banco.

O projeto tem um lado servidor e um lado cliente. O lado cliente fica dentro
da pasta **public**.
