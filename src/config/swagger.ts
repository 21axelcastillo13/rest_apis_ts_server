import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";


const options : swaggerJSDoc.Options = {
    swaggerDefinition:{
        openapi: '3.0.2',
        tags:[{
            name: 'Products',
            description:'Operaciones de Api relacionadas a productos'
        }],
        info: {
            title:'REST API Node.js / Express / TypeScript',
            version:'1.0.0',
            description:'API Docs for products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://portal.ujcv.edu.hn:4433/portal_alumno/imagenes/logo_new.png');
            height: 120px;
            width: auto;
        }
        .swagger-ui .topbar {
                background:linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(29,25,52,1) 50%, rgba(0,130,202,1) 100%);
            
        }


    `,
    customSiteTitle: 'Documentacion REST API Express / Typescript '
}
//linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(29,25,52,1) 50%, rgba(0,130,202,1) 100%)
export default swaggerSpec
export {
    swaggerUiOptions
}