import { Router } from 'express';

import __name__Controller from '../../modules/__name__(kebabCase)';
import { auth } from '../../middlewares/auth';

// TODO update documentation
class __name__Routes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  public async config() {
    /**
     * @swagger
     *  /v1/__name__s:
     *    get:
     *      summary: get all custom fields of the Bd
     *      tags: ['__name__s']
     *      responses:
     *        200:
     *          description: get all custom fields successfully, recibe a object with the registers
     *        401:
     *          description: unauthorized
     *        400:
     *          description: unexpected error
     */
    this.router.get(
      '/',
      auth,
      // TODO add others middlewares
      __name__Controller.getAll,
    );

    /**
     * @swagger
     *  /v1/__name__s/{id}:
     *    get:
     *     summary: get one Custom Field by id
     *     tags: ["__name__s"]
     *     responses:
     *       200:
     *         description: get Custom Field successfully
     *       401:
     *         description: not authorized
     *       400:
     *         description: Bad Request
     *     parameters: [
     *       {
     *         name: id,
     *         in: path,
     *         description: id of the Custom Field,
     *         required: true,
     *         schema: {
     *           type: string
     *         }
     *       },
     *      ]
     */
    this.router.get(
      '/:id',
      auth,
      auth,
      // TODO add others middlewares
      __name__Controller.getOne,
    );

    /**
     * @swagger
     *  /v1/__name__s:
     *    post:
     *      summary: added a Custom Fields
     *      tags: ["__name__s"]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/__name__s'
     *      responses:
     *        200:
     *          description: Custom Field add successfully
     *        401:
     *          description: not authorized
     *        400:
     *          description: Bad Request
     */
    this.router.post(
      '',
      auth,
      auth,
      // TODO add others middlewares
      __name__Controller.create,
    );

    /**
     * @swagger
     *  /v1/__name__s/{id}:
     *    put:
     *      summary: put Custom Field in the DB all parameters of body are optional
     *      tags: ["__name__s"]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/__name__s'
     *      responses:
     *        200:
     *          description: update Custom Field successfully
     *        401:
     *          description: not authorized
     *        400:
     *          description: Bad Request
     *      parameters: [
     *        {
     *           name: id,
     *           in: path,
     *           description: id of the Custom Field,
     *           required: true,
     *             schema: {
     *               type: string,
     *             }
     *         },
     *        ]
     */
    this.router.put(
      '/:id',
      auth,
      auth,
      // TODO add others middlewares
      __name__Controller.update,
    );

    /**
     * @swagger
     *  /v1/__name__s/{id}:
     *    delete:
     *      summary: delete a Custom Field
     *      tags: ["__name__s"]
     *      responses:
     *        200:
     *          description: Custom Field deleted succesfully
     *        401:
     *          description: not authorized
     *      parameters: [
     *       {
     *          name: id,
     *          in: path,
     *          description: id of the Custom Field,
     *          required: true,
     *            schema: {
     *              type: string,
     *            }
     *       },
     *      ]
     */
    this.router.delete(
      '/:id',
      auth,
      auth,
      // TODO add others middlewares
      __name__Controller.delete,
    );

    /**
     * @swagger
     * tags:
     *  name: __name__s
     *  description: they allow you to receive specific data depending on the need of your company, configure them to obtain more detailed data of your matter
     * components:
     *  schemas:
     *    __name__s:
     *      type: object
     *      required:
     *        -name
     *        -type
     *      properties:
     *        id:
     *          type: number
     *        name:
     *          type: string
     *          description: string max length --> 150 characters
     *        description:
     *          type: string
     *          description: column type text
     *        status:
     *          type: integer
     *          description: column type integer
     *        type:
     *          type: string
     *          description: string permited values --> ['TEXT', 'LARGE_TEXT', 'NUMBER', 'PHONE', 'DATE', 'MONETARY', 'CHECKBOX', 'EMAIL', 'RADIO', 'MULTIPLE_OPTIONS', 'FILE_UPLOAD']
     *        deleted:
     *          type: boolean
     *          description: false for custom fields active,  true for deleted
     *      example:
     *        name: what is your gender
     *        type: MULTIPLE_OPTIONS
     *    Error:
     *      type: object
     *      required:
     *        -status
     *        -message
     *      properties:
     *        status:
     *          type: integer
     *          description: HTTP status code
     *          example: 400
     *        message:
     *          type: object
     *          description: Error description
     *          example: { "name": "UnexpectedError", "message": "Cannot read properties of undefined (reading 'toString')", "context": "AppError" }
     */
  }
}

const routes = new __name__Routes();

export default routes.router;
