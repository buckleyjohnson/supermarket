# Database Setup Instructions

This project uses MySQL with two databases:
- `ecommerce`: Contains user management, roles, and time tracking
- `supermarket`: Contains product inventory

## Prerequisites

1. Install MySQL on your system
2. Ensure MySQL server is running
3. Have root access to MySQL

## Setup Instructions

### Option 1: Clean Install (Recommended for new setups)

For a fresh installation that will drop any existing tables:

```bash
mysql -u root -p < db_setup_clean.txt
```

### Option 2: Safe Install (Preserves existing data)

For installations where you want to preserve existing data:

```bash
mysql -u root -p < db_setup.txt
```

## Database User

The scripts create a user with these credentials:
- **Username**: `inv_user`
- **Password**: `Password123!`
- **Privileges**: Full access to `ecommerce` and `supermarket` databases

## Environment Configuration

Make sure your `.env` file contains:

```
DB_HOST=127.0.0.1
DB_USER=inv_user
DB_PASS=Password123!
DB_NAME=supermarket
PORT=4002
```

## Sample Data

The setup script includes sample users and products for testing:

### Sample Users
- **bob@bob.com** - Password: `password123`
  - Roles: Store Manager, Customer
  - Can access manager features and customer features
- **alice@example.com** - Password: `password123`
  - Roles: Customer only
  - Can only access customer features

### Sample Products
1. **Gala Apple** - $1.99 (Produce)
2. **Organic Bananas** - $2.99 (Produce) 
3. **Whole Milk** - $3.49 (Dairy)

## Verify Setup

After running the setup script, you can verify it worked by connecting:

```bash
mysql -u inv_user -p
```

Then check the databases and tables:

```sql
SHOW DATABASES;
USE ecommerce;
SHOW TABLES;
USE supermarket;
SHOW TABLES;
```

## Testing the Application

After setup, you can test the application with these sample accounts:

1. **Login as Manager** (bob@bob.com / password123):
   - Should have access to inventory management
   - Should have access to employee management
   - Should have access to all customer features

2. **Login as Customer** (alice@example.com / password123):
   - Should only have access to customer features
   - Should NOT have access to management pages

The sample products should appear in your product catalog for immediate testing.

## Database Schema

### ecommerce database:
- `users`: User accounts and authentication
- `roles`: User roles (Customer, Cashier, Manager, etc.)
- `user_roles`: Many-to-many relationship between users and roles
- `time_entries`: Employee time tracking

### supermarket database:
- `products`: Product inventory with pricing and categories

## Troubleshooting

If you get password policy errors, make sure your MySQL password policy allows the password `Password123!` or update the script with a stronger password that meets your MySQL requirements.
