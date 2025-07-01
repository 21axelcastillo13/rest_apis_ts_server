import request from "supertest";
import server from "../../server";
import { response } from "express";

describe('POST /products', () => {
    test('should display validations errors', async () => {
         const response = await request(server).post('/products').send({})
         expect(response.status).toBe(400)
         expect(response.body).toHaveProperty('errors')
         expect(response.body.errors).toHaveLength(4)


         expect(response.status).not.toBe(404)
         expect(response.body.errors).not.toHaveLength(2)
    })

    test('should validate that the price is greater than 0', async () => {
         const response = await request(server).post('/products').send({
            name:"Monitor - test",
            price: 0
         })
         expect(response.status).toBe(400)
         expect(response.body).toHaveProperty('errors')
         expect(response.body.errors).toHaveLength(1)


         expect(response.status).not.toBe(404)
         expect(response.body.errors).not.toHaveLength(2)
    })
    test('should validate that the price is a number and greater than 0', async () => {
         const response = await request(server).post('/products').send({
            name:"Monitor - test",
            price: "Hola"
         })
         expect(response.status).toBe(400)
         expect(response.body).toHaveProperty('errors')
         expect(response.body.errors).toHaveLength(2)


         expect(response.status).not.toBe(404)
         expect(response.body.errors).not.toHaveLength(4)
    })

    test('should create a new product', async ()=> {
        const response = await request(server).post('/products').send({
            name:"Mouse - testing", 
            price:150
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('GET /products', () => {
    test(' check url', async () =>{
         const response = await request(server).get('/products')
         expect(response.status).not.toBe(404)
    })
    test('GET a JSON response whit products', async () => {
        const response = await request(server).get('/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')

        expect(response.body).not.toHaveProperty('errors')
        expect(response.status).not.toBe(404)


    })
})


describe('GET /products', () => {
    test('Should return a 404 response for a non-existent produc', async () => {
        const productId = 2000
        const response = await request(server).get(`/products/${productId}`)

        expect(response.status).toBe(404)
    })
    test('Should check valid id in the url', async () => {
        
        const response = await request(server).get(`/products/not-valid-url`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })
})

describe('PUT /products/:id', () => {
    test('validation when updating product', async () => {
        const response = await request(server).put('/products/1').send({})


        expect(response.status).toBe(400)
        expect(response.body.errors).toBeTruthy()
    })
})