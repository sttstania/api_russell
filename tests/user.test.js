// tests/user.test.js


process.env.NODE_ENV = 'test'; // Ensure we are in test environment
// -------------------- IMPORTS --------------------
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

// Import the express app
const app = require('../app'); 

// -------------------- VARIABLES --------------------
let mongoServer;
let createdUserId;

// -------------------- TEST SUITE --------------------
describe('User API', function() {
  // Increase timeout for async operations
  this.timeout(10000);

  // -------------------- BEFORE ALL --------------------
  before(async () => {
    // Start in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Connect mongoose to in-memory DB
    await mongoose.connect(uri);
  });

  // -------------------- AFTER ALL --------------------
  after(async () => {
    // Disconnect and stop in-memory MongoDB
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // -------------------- TEST: CREATE USER --------------------
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
    expect(res.body).to.have.property('name', 'Test User');
    expect(res.body).to.have.property('email', 'test@example.com');

    createdUserId = res.body._id; // save for later tests
  });

  // -------------------- TEST: GET ALL USERS --------------------
  it('should get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  });

  // -------------------- TEST: GET USER BY ID --------------------
  it('should get a user by ID', async () => {
    const res = await request(app).get(`/users/${createdUserId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('_id', createdUserId);
  });

  // -------------------- TEST: GET USER BY EMAIL --------------------
  it('should get a user by email', async () => {
    const res = await request(app)
      .get('/users/by-email')
      .query({ email: 'test@example.com' });
    
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('email', 'test@example.com');
  });

  // -------------------- TEST: UPDATE USER (PUT) --------------------
  it('should update a user (PUT)', async () => {
    const res = await request(app)
      .put(`/users/${createdUserId}`)
      .send({
        name: 'Updated User',
        email: 'updated@example.com',
        password: 'newpassword123'
      });
    
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('name', 'Updated User');
    expect(res.body).to.have.property('email', 'updated@example.com');
  });

  // -------------------- TEST: PARTIAL UPDATE USER (PATCH) --------------------
  it('should partially update a user (PATCH)', async () => {
    const res = await request(app)
      .patch(`/users/${createdUserId}`)
      .send({ name: 'Patched User' });
    
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('name', 'Patched User');
  });

  // -------------------- TEST: DELETE USER --------------------
  it('should delete a user', async () => {
    const res = await request(app).delete(`/users/${createdUserId}`);
    expect(res.status).to.equal(204);
  });
});
