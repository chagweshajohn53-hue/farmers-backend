
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));
// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true
}));

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_OwW87qKtcCfj@ep-aged-thunder-air0o94u-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL - Production Ready');
});

pool.on('error', (err) => {
  console.error('❌ CRITICAL: PostgreSQL Connection Error:', err.message);
});

// Initialize tables if they don't exist
const initializeTables = async () => {
  try {
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'buyer',
        whatsapp VARCHAR(50),
        location VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Products table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        seller_id INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(255),
        image TEXT DEFAULT 'https://images.unsplash.com/photo-1551754655-cd27e38d2076',
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Payments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        buyer_id INTEGER NOT NULL,
        seller_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        reference VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Disputes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS disputes (
        id SERIAL PRIMARY KEY,
        payment_id INTEGER NOT NULL,
        creator_id INTEGER NOT NULL,
        reason TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'open',
        resolution_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Graduate profiles table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS graduate_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        degree VARCHAR(255) NOT NULL,
        institution VARCHAR(255) NOT NULL,
        year INTEGER NOT NULL,
        bio TEXT,
        skills TEXT[],
        approved BOOLEAN DEFAULT FALSE,
        contact_email VARCHAR(255),
        contact_whatsapp VARCHAR(50),
        certificate_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Config table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS config (
        id SERIAL PRIMARY KEY,
        payment_number VARCHAR(50) DEFAULT '0778606878',
        methods TEXT[] DEFAULT ARRAY['EcoCash', 'InnBucks', 'Mukuru']::TEXT[],
        contact_email VARCHAR(255),
        contact_whatsapp VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Audit logs table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        admin_id INTEGER,
        action VARCHAR(255),
        entity_id INTEGER,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert initial config if not exists
    const configResult = await pool.query('SELECT COUNT(*) FROM config');
    if (parseInt(configResult.rows[0].count) === 0) {
      await pool.query(
        'INSERT INTO config (payment_number, methods) VALUES ($1, $2)',
        ['0778606878', ['EcoCash', 'InnBucks', 'Mukuru']]
      );
    }
    
    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing tables:', error);
  }
};

initializeTables();

const logAction = async (adminId: string, action: string, entityId: string, details: string) => {
  await pool.query(
    'INSERT INTO audit_logs (admin_id, action, entity_id, details) VALUES ($1, $2, $3, $4)',
    [adminId, action, entityId, details]
  );
};

// --- ROUTES ---
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ 
      status: 'ok', 
      database: 'connected' 
    });
  } catch (error) {
    res.json({ 
      status: 'ok', 
      database: 'disconnected' 
    });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, role, whatsapp, location } = req.body;
    
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Create new user
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, role, whatsapp, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role',
      [name, email, password, role || 'buyer', whatsapp, location]
    );
    
    res.status(201).json({ user: newUser.rows[0] });
  } catch (error) { res.status(500).json({ error: 'Registration Failed' }); }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await pool.query(
      'SELECT id, name, email, role FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );
    
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Incorrect credentials' });
    }
    
    res.json({ user: user.rows[0] });
  } catch (error) { res.status(500).json({ error: 'Login Error' }); }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT id, name, email, role, whatsapp, location, created_at FROM users ORDER BY created_at DESC');
    res.json(users.rows);
  } catch (e) { res.status(500).json({ error: 'Fetch failed' }); }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { adminId } = req.body;
    const userId = req.params.id;
    
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    await logAction(adminId, 'DELETE_USER', userId, 'User removed');
    
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: 'Delete failed' }); }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await pool.query(
      'SELECT * FROM products WHERE status = $1 ORDER BY created_at DESC',
      ['active']
    );
    res.json(products.rows);
  } catch (e) { res.status(500).json({ error: 'Fetch error' }); }
});

app.post('/api/products', async (req, res) => {
  try {
    const { sellerId, name, description, price, category, image } = req.body;
    
    const newProduct = await pool.query(
      'INSERT INTO products (seller_id, name, description, price, category, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [sellerId, name, description, price, category, image]
    );
    
    res.status(201).json(newProduct.rows[0]);
  } catch (e) { res.status(400).json({ error: 'Save Error' }); }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { sellerId, role } = req.body;
    const productId = req.params.id;
    
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
    if (product.rows.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    if (product.rows[0].seller_id !== parseInt(sellerId) && role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    await pool.query('DELETE FROM products WHERE id = $1', [productId]);
    
    if (role === 'admin') {
      await logAction(sellerId, 'ADMIN_DELETE_PRODUCT', productId, 'Forced removal');
    }
    
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: 'Delete Error' }); }
});

app.get('/api/payments', async (req, res) => {
  try {
    const payments = await pool.query('SELECT * FROM payments ORDER BY created_at DESC');
    res.json(payments.rows);
  } catch (e) { res.status(500).json({ error: 'Fetch error' }); }
});

app.post('/api/payments', async (req, res) => {
  try {
    const { buyerId, sellerId, productId, amount, paymentMethod, reference } = req.body;
    
    const newPayment = await pool.query(
      'INSERT INTO payments (buyer_id, seller_id, product_id, amount, payment_method, reference) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [buyerId, sellerId, productId, amount, paymentMethod, reference]
    );
    
    res.status(201).json(newPayment.rows[0]);
  } catch (e) { res.status(400).json({ error: 'Save error' }); }
});

app.patch('/api/payments/:id/verify', async (req, res) => {
  const { status, adminId } = req.body;
  const paymentId = req.params.id;
  
  try {
    const payment = await pool.query(
      'UPDATE payments SET status = $1 WHERE id = $2 RETURNING *',
      [status, paymentId]
    );
    
    if (status === 'confirmed' && payment.rows.length > 0) {
      await pool.query('UPDATE products SET status = $1 WHERE id = $2', ['sold', payment.rows[0].product_id]);
    }
    
    await logAction(adminId, 'VERIFY_PAYMENT', paymentId, `Set to ${status}`);
    
    res.json(payment.rows[0]);
  } catch (e) { res.status(400).json({ error: 'Verify Error' }); }
});

app.get('/api/disputes', async (req, res) => {
  try {
    const disputes = await pool.query('SELECT * FROM disputes ORDER BY created_at DESC');
    res.json(disputes.rows);
  } catch (e) { res.status(500).json({ error: 'Fetch error' }); }
});

app.post('/api/disputes', async (req, res) => {
  try {
    const { paymentId, creatorId, reason } = req.body;
    
    const newDispute = await pool.query(
      'INSERT INTO disputes (payment_id, creator_id, reason) VALUES ($1, $2, $3) RETURNING *',
      [paymentId, creatorId, reason]
    );
    
    res.status(201).json(newDispute.rows[0]);
  } catch (e) { res.status(400).json({ error: 'Save failed' }); }
});

app.patch('/api/disputes/:id', async (req, res) => {
  try {
    const { adminId, ...update } = req.body;
    const disputeId = req.params.id;
    
    const updateFields = Object.keys(update);
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    const setClause = updateFields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    const values = Object.values(update);
    
    const dispute = await pool.query(
      `UPDATE disputes SET ${setClause} WHERE id = $${values.length + 1} RETURNING *`,
      [...values, disputeId]
    );
    
    await logAction(adminId, 'UPDATE_DISPUTE', disputeId, JSON.stringify(update));
    
    res.json(dispute.rows[0]);
  } catch (e) { res.status(400).json({ error: 'Update failed' }); }
});

app.get('/api/graduates', async (req, res) => {
  try {
    const graduates = await pool.query(
      'SELECT * FROM graduate_profiles WHERE approved = $1 ORDER BY created_at DESC',
      [true]
    );
    res.json(graduates.rows);
  } catch (e) { res.status(500).json({ error: 'Fetch error' }); }
});

app.post('/api/graduates', async (req, res) => {
  try {
    const { userId, userName, degree, institution, year, bio, skills, approved, contactEmail, contactWhatsApp, certificateUrl } = req.body;
    
    const existingProfile = await pool.query('SELECT * FROM graduate_profiles WHERE user_id = $1', [userId]);
    
    let profile;
    if (existingProfile.rows.length > 0) {
      profile = await pool.query(
        `UPDATE graduate_profiles SET user_name = $1, degree = $2, institution = $3, year = $4, bio = $5, 
         skills = $6, approved = $7, contact_email = $8, contact_whatsapp = $9, certificate_url = $10, updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = $11 RETURNING *`,
        [userName, degree, institution, year, bio, skills, approved, contactEmail, contactWhatsApp, certificateUrl, userId]
      );
    } else {
      profile = await pool.query(
        `INSERT INTO graduate_profiles (user_id, user_name, degree, institution, year, bio, skills, approved, contact_email, contact_whatsapp, certificate_url) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [userId, userName, degree, institution, year, bio, skills, approved, contactEmail, contactWhatsApp, certificateUrl]
      );
    }
    
    res.status(201).json(profile.rows[0]);
  } catch (e) { res.status(400).json({ error: 'Profile error' }); }
});

app.get('/api/config', async (req, res) => {
  try {
    let config = await pool.query('SELECT * FROM config LIMIT 1');
    
    if (config.rows.length === 0) {
      config = await pool.query('INSERT INTO config DEFAULT VALUES RETURNING *');
    }
    
    res.json(config.rows[0]);
  } catch (e) { res.status(500).json({ error: 'Fetch error' }); }
});

app.patch('/api/config', async (req, res) => {
  try {
    const { adminId, ...update } = req.body;
    
    const updateFields = Object.keys(update).filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at');
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    const setClause = updateFields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    const values = Object.values(update);
    
    const config = await pool.query(
      `UPDATE config SET ${setClause}, updated_at = CURRENT_TIMESTAMP RETURNING *`,
      values
    );
    
    await logAction(adminId, 'UPDATE_CONFIG', 'SYSTEM', 'Platform updated');
    
    res.json(config.rows[0]);
  } catch (e) { res.status(400).json({ error: 'Update error' }); }
});

app.get('/api/audit-logs', async (req, res) => {
  try {
    const logs = await pool.query('SELECT * FROM audit_logs ORDER BY created_at DESC');
    res.json(logs.rows);
  } catch (e) { res.status(500).json({ error: 'Fetch logs error' }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Farmers Marketplace Core Live on ${PORT}`));
