const request = require('supertest');
const app = require('../server');

describe('Auth API Tests', () => {
  let token;
  let userID;
  let productID;

    describe('POST /api/auth/signin', () => {
      it('should return a JWT token when providing valid credentials', async () => {
        const response = await request(app)
          .post('/api/auth/signin')
          .send({ username: 'shrutisolanki', password: 'shrutisolanki' })
          console.log(response.body)
        expect(response.body).toHaveProperty('accessToken');
        token = response.body.accessToken;
        userID = response.body.id;
      });
  
      it('should return 404 when providing invalid email', async () => {
        await request(app)
          .post('/api/auth/signin')
          .send({ username: 'shrutisolnki1223', password: 'shrutisolnki543' })
          .expect(404);
      });
  
      it('should return 404 when providing invalid password', async () => {
       await request(app)
          .post('/api/auth/signin')
          .send({ username: 'shrutisolnkiedfsedfds', password: 'shrutisolnkifrdd' })
          .expect(404);
      });
    });
    describe('GET /api/products/', () => {
      it('should return the details of all product', async () => {
        const product = await request(app)
          .get(`/api/products/`)
          .set('x-access-token', token)
          .expect(200);
          productID = product.body[0]._id
      });
  
      it('should return 404 when product not found', async () => {
        await request(app)
          .get('/api/products')
          .expect(403);
      });
    });
    describe('POST /api/cart', () => {
      it('should create a new cart', async () => {
        await request(app)
          .post('/api/cart')
          .send({
            "userId": userID,
            "productId": productID,
            "quantity": 1
          })
          .set('x-access-token', token)
          .expect(200);
      });
    });
    describe('GET /api/cart/:userId', () => {
      it('get cart details of user', async () => {
        const cartDetails = await request(app)
          .get(`/api/cart/${userID}`)
          .set('x-access-token', token)
          .expect(200);
      });
    });
    describe('PUT /api/cart/:itemId', () => {
      it('should update the cart', async () => {
        const cartUpdate = await request(app)
          .put(`/api/cart/${productID}`)
          .send({
            "userId": userID,
            "quantity": 2
          })
          .set('x-access-token', token)
          .expect(200);
      });
    });
    describe('DELETE /api/cart/:itemId', () => {
      it('should delete the cart', async () => {
        await request(app)
          .delete(`/api/cart/${productID}`)
          .send({
            "userId": userID,
          })
          .set('x-access-token', token)
          .expect(200);
      });
    });
});