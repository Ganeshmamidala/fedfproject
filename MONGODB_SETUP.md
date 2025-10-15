# MongoDB Setup Guide

## Prerequisites

1. **Install MongoDB**:
   - Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
   - For Windows: Download the MSI installer and follow the installation wizard
   - Make sure to install MongoDB as a service (checked by default)
   - Install MongoDB Compass (GUI tool) if you want a visual interface

2. **Verify Installation**:
   ```bash
   mongod --version
   ```

## Starting MongoDB

### Windows

MongoDB should start automatically as a service. To verify:

```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# Start MongoDB service if not running
Start-Service -Name MongoDB

# Or use net start
net start MongoDB
```

### Manual Start (if not installed as service)

```bash
mongod --dbpath "C:\data\db"
```

## Database Setup

1. **Connect to MongoDB**:
   ```bash
   mongosh
   # or
   mongo
   ```

2. **Create Database** (automatically created when you insert data):
   ```javascript
   use placement_tracking
   ```

3. **Create Collections** (optional - created automatically by Mongoose):
   ```javascript
   db.createCollection("users")
   db.createCollection("students")
   db.createCollection("employers")
   db.createCollection("jobs")
   db.createCollection("applications")
   ```

## Using MongoDB Compass (GUI)

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. You should see your `placement_tracking` database after running the application

## Environment Configuration

Make sure your `.env` file has the correct MongoDB URI:

```env
MONGODB_URI=mongodb://localhost:27017/placement_tracking
```

## Testing Connection

Run the server and check for the connection message:

```bash
npm run server:dev
```

You should see:
```
✅ Connected to MongoDB
📦 Database: placement_tracking
Server running on port 5000
```

## Troubleshooting

### MongoDB Service Not Starting

1. Check if port 27017 is available:
   ```powershell
   netstat -ano | findstr :27017
   ```

2. Check MongoDB logs:
   - Windows: `C:\Program Files\MongoDB\Server\{version}\log\mongod.log`

3. Restart the service:
   ```powershell
   Restart-Service -Name MongoDB
   ```

### Connection Error

If you get "MongoNetworkError: connect ECONNREFUSED":
1. Make sure MongoDB service is running
2. Check if firewall is blocking port 27017
3. Verify the connection string in `.env`

### Database Not Created

MongoDB creates databases and collections lazily (when first document is inserted).
- Register a user through the app
- The database and collections will be created automatically

## Sample Data (Optional)

You can add sample data using MongoDB Compass or the shell:

```javascript
use placement_tracking

// Sample student
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$10$...", // hashed password
  role: "student"
})
```

## Backup and Restore

### Backup
```bash
mongodump --db placement_tracking --out ./backup
```

### Restore
```bash
mongorestore --db placement_tracking ./backup/placement_tracking
```

## Next Steps

After MongoDB is running:
1. Start the backend server: `npm run server:dev`
2. Start the frontend: `npm run dev`
3. Navigate to http://localhost:5173
4. Register a new user to test the database connection
