
require('dotenv').config();
const express = require('express');
const app = express();
const contactRoutes = require('./backend/routes/contacts');
const models = require('./backend/models/contact');
const { validateContact, validateUpdate } = require('./backend/middleware/validation');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

// Database connection - Use your custom module
const { connectDB } = require('./backend/data/database');

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for managing contacts',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
      {
        url: 'https://cse341-wj33.onrender.com/contacts', 
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        Contact: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '686ec65ce7b6f972022c8c91'
            },
            firstName: {
              type: 'string',
              example: 'Ken'
            },
            lastName: {
              type: 'string',
              example: 'Mbuyi'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'ken.m@example.com'
            },
            favoriteColor: {
              type: 'string',
              example: 'Teal'
            },
            birthday: {
              type: 'string',
              format: 'date',
              example: '1998-09-10'
            }
          },
          required: ['firstName', 'lastName', 'email']
        },
        NewContact: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              example: 'Ken'
            },
            lastName: {
              type: 'string',
              example: 'Mbuyi'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'ken.m@example.com'
            },
            favoriteColor: {
              type: 'string',
              example: 'Teal'
            },
            birthday: {
              type: 'string',
              format: 'date',
              example: '1998-09-10'
            }
          },
          required: ['firstName', 'lastName', 'email']
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Error message'
            }
          }
        }
      }
    }
  },
  apis: ['./backend/routes/contacts.js']
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(express.json());
//app.use(bodyParser.json());
// Routes
app.use('/contacts', contactRoutes);
//app.use(bodyparser.json());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Contacts API is running!');
});


const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();