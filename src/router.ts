import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: "HP Victus 15"
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - Products
 *     description: Returns a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
// Routing
router.get('/', getProducts)



/**
 * @swagger
 * /products/{id}:
 *  get:
 *      summary: Get Product by ID
 *      tags:
 *          - Products
 *      description: Returns a list of products
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the Product to retrieve
 *          required: true
 *          schema:
 *               type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application.json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad Request - Invalid ID
 *              
 *          
 */
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /products:
 *  post:
 *      summary: Creates a new Product
 *      tags:
 *          - Products
 *      description: Retunr a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "HP Victus 15"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:'#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid inpu data
 *
 * 
 * 
 * 
 */

router.post('/', 
    // Validación
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    handleInputErrors,
    createProduct
)




/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Updates a product with the provided input
 *     tags:
 *       - Products
 *     description: Updates the product identified by the ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "HP Victus 15"
 *               price:
 *                 type: number
 *                 example: 399
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid ID or input data
 *       404:
 *         description: Product not found
 */

router.put('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct
)



/**
 * @swagger
 * /products/{id}:
 *   patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products
 *      description: returns the update avalability 
 *      parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product not found
 */


router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)




/**
 * @swagger
 * /products/{id}:
 *   delete:
 *      summary: Delete a product
 *      tags:
 *          - Products
 *      description: returns a confirmation message 
 *      parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: Product delete
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product not found
 */


router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)

export default router