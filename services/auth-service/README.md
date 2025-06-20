Login with user:
curl -X POST http://localhost:4000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"alice@example.com","password":"SuperSecret123"}'


Register user:
curl -X POST http://localhost:4000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"alice@example.com","password":"SuperSecret123"}'

Register user as Store Manager:

INSERT IGNORE INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM   users u
JOIN   roles r ON r.name = 'Store Manager'
WHERE  u.email = 'alice@example.com';


For db tables refer to db_tables.txt




Login with user:
curl -X POST http://localhost:4000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"alice@example.com","password":"SuperSecret123"}'


Register user:
curl -X POST http://localhost:4000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"alice@example.com","password":"SuperSecret123"}'

Register user as Store Manager:

INSERT IGNORE INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM   users u
JOIN   roles r ON r.name = 'Store Manager'
WHERE  u.email = 'alice@example.com';


For db tables refer to db_tables.txt
