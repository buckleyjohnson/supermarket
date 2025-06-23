Before running:

mysql -u root -p < db_setup_clean.txt


create database named supermarket with the table: products
create database named ecommerce with the tables: roles, time_entries,
user_roles, users

look in the db_tables.txt for queries to create them.
run script that creates db's and tables: mysql -u root -p < db_setup.txt

To run: There are 4 servers to start.
open inventory-ui folder and run: npm run serve
open client, inventory-service, auth-service folders and run: npm run dev

create .env file in auth-services folder:
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=ecommerce
JWT_SECRET=somelongrandomstring
PORT=4001






Phase	Goal	What you build	Why in this order?
0—Monolith “walking skeleton”	One React + Express app that lets users sign up, sign in, see products, add to cart, and a Store Manager can CRUD products.	You almost have this already. Finish the CRUD routes for products and a basic cart/checkout mock.	You need a fully-functioning baseline before you split anything; otherwise you’ll be debugging both features and infrastructure at the same time.
1—Extract Auth + User Management service	Stand-alone service: /auth (login, refresh, roles) and /employees (CRUD, time entries). Client obtains JWT from this service; every other service just verifies the token.	Why Auth first? It’s small, has almost no external dependencies, but every other domain needs it. Moving it out forces you to learn service-to-service auth, CORS, and per-service environment config without touching high-throughput features.	
2—Extract Inventory + Supply-Chain service	Routes: /inventory, /stock-audit, /purchase-orders. Own tables: products, inventory_movements, purchase_orders. Emits events like StockLow whenever quantity drops below min.	Inventory logic is clearly bounded; the POS or e-commerce frontend only needs a read-model (e.g. “current stock” and “price”) which you can expose via an API gateway or a read replica.	
3—POS service (optional)	If you want a true micro-front-end, create a tiny Express (or Fastify) service that the in-store tablets hit. It only talks to /inventory and /auth, and pushes completed sales to a Sales-Events topic.	Demonstrates that you can add services without re-deploying everything else.	
4—Reporting / Analytics	A service with no UI—just nightly jobs that read events from Sales-Events, StockMovements, TimeEntries and dump aggregates into reports.* tables. Provide REST endpoints or GraphQL so the React admin dashboard can fetch charts.	This shows a compute-heavy, write-rare read-often workload separated from the OLTP databases.	
5—Marketing / CRM	Separate service responsible for customers, loyalty_programs, email/web-push campaigns. Listens to Sales events to earn points, calls Auth to check roles.	Optional stretch goal that lets you demo inter-service events and background jobs.	
Cut scope where you need.
Even a two-service architecture (Auth + EverythingElse) still demonstrates micro-services for the assignment.
Minimal stack per service

Layer	Pick for class demo	Notes
HTTP	Express (already using)	Stick to what you know; fast enough.
DB	MySQL per service (schemas: auth_db, inventory_db, …) or one cluster with logical separation.	Separate schemas are enough—no need for multiple MySQL instances unless you want to show isolation.
Messaging (events)	RabbitMQ (or simple Redis pub/sub)	One instance for the whole project; only phases 3-5 need it.
Auth	JWT signed by Auth service; each backend validates signature and role claims.	Your Axios interceptor already attaches the token—just point it to the new Auth host.
API Gateway (optional)	Nginx or Express reverse-proxy	Lets the React app still call /api/* while you move services around.
Repository layout

supermarket/
├─ services/
│   ├─ auth-service/
│   ├─ inventory-service/
│   ├─ pos-service/         # optional
│   └─ reporting-service/   # optional
├─ gateway/                 # api-gateway or nginx conf
└─ client/                  # React front-end
Monorepo keeps onboarding simple; each service has its own package.json, Dockerfile, README.md.

Dev-loop tips

Docker-compose per service stack: MySQL + Node; expose port 4001, 4002…
.env conventions:
PORT=4002
JWT_SECRET=...
DB_URL=mysql://user:pass@mysql:3306/inventory_db
Shared TypeScript types (packages/types/) published via path alias so both client and server share DTO definitions.
Postman collection or ./scripts/curl-examples.sh for each service—your instructor can run them quickly.
What to demo in your presentation
Slide / demo step	Shows you learned
1. Login via Auth service (JWT returned).	Cross-service authentication.
2. POS tablet calls POS service → Inventory service deducts stock.	Service-to-service communication.
3. Manager dashboard fetches employee hours from Auth service.	Separate domains / DBs.
4. Trigger low-stock event → Inventory places PO → Supplier view sees order.	Event-driven flow.
5. Reporting service chart (monthly sales, labour hours, profit).	Async analytics workload.
TL;DR recommendation

Two services minimum for the assignment:
auth-service (users, roles, employee hours)
core-service (products, cart, inventory, POS endpoints)
Three services if you want a clearer micro-services story:
auth-service
inventory-service
pos-service (or shop-service)
Keep each service tiny: REST + MySQL. Add RabbitMQ only if you do reporting or marketing. Build the basics in a monolith first, then carve out Auth—it’s small, critical, and teaches you all the plumbing you’ll need for further splits.

With this plan you can finish the functional requirements, tick the “micro-services” learning objective, and still have time left to polish UI and tests.



Now I want to consider the next steps of this "Supermarket" project. 
Here are some details : Functional Requirements:
    1. Point of Sale, 
    2. Inventory Management, 
    3. Customer relationship Management . 
    4. Supply Chain Management 
    5. Employee Management 
    6. Reporting and Analytics.  
 
The different roles will have certain actions:

Customer actions: 
    Browse product, 
    add items to the shopping cart.  
    Pay for the purchases. 
    Receive a receipt, 
    Participate in loyalty Programs.
    Provide feedback or complaints. 
    Return or exchange an item.  
Cashier Actions: 
    Scan Product barcodes. 
    Enter Quantities. 
    Apply discounts. 
    Process payments.  
    handle transactions. 
    Generate receipts. 
    Process returns and refunds. 
    handle customer inquiries at the checkout.  
Store Manager Actions: 
    Oversee daily store operations. 
    Manage staff schedules. 
    Monitor sales performance. 
    Handle customer escalations. 
    Generate store-level reports. 
    Manage inventory levels and orders. 
Inventory Manager Actions: 
    Track incoming and outgoing stock. 
    Manage inventory levels. 
    Generate purchase orders. 
    Conduct stock audits.
    Analyze inventory data.  
Supplier Actions: 
    Receive purchase orders from the supermarket. 
    Deliver goods according to the agreed terms. 
    Manage invoices and payments. 
Marketing manager actions: 
    Manage loyalty programs. 
    Create and execute marketing campaigns. 
    Analyze customer data.  magage customer communications. 
    Stocking/Warehouse Staff Actions: 
    Receive deliveries. Unload and organize stock. 
    Replenish shelves. Manager storage areas.  
System Administrator Actions: 
    Manage user accounts and access. 
    Troubleshoot system issues.  Ensure data security....
    
Those are the details of this project which is part of a React training class.   
So far I have 2 servers: "server", and "client". 
 I have added the tables relating to the users. users, roles, user_roles, time_entries.  
 I also have a table "supermarket_db" which has information related to the product such as name, description, price_cents, category and so forth.  
 I also have a form with text inputs that allows a user to add items. 
 There is a component that shows the data.  So what I am asking now is a general idea as to how I 
 should proceed from here, and how many servers I should set up. 
 I could put all the backend stuff on the "server" but part of what we learned in this class was 
 micro services so I think I should set up at least one more server to demonstrate the micro services. 



# React + TypeScript + Vite

//test time summary endpoint:--returns {json}
curl -G \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsInJvbGVzIjpbIkN1c3RvbWVyIiwiU3RvcmUgTWFuYWdlciJdLCJpYXQiOjE3NTAwOTEyMzksImV4cCI6MTc1MDY5NjAzOX0.TToTPah5YWxauVgTeSm6RPTE85awWw6TBddxPca8QuA" \
  --data-urlencode "user=1"  \
  --data-urlencode "from=2025-06-01" \
  --data-urlencode "to=2025-06-30"   \
  http://localhost:4000/api/employees/time/summary