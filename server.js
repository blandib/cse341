require('dotenv').config();
const express = require('express');
const app = express();
const contactRoutes = require('./backend/routes/contacts');
const models = require('./backend/models/contact');
const { validateContact, validateUpdate } = require('./backend/middleware/validation');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 8080;

// Database connection - Use custom module
const { connectDB } = require('./backend/data/database');

// ==========  ========== //
// Enable CORS for all routes
app.use(cors());

// HTTPS redirect middleware for production
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});

// Middleware 
app.use(express.json());  
// ==========  ========== //

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
        url: 'https://cse341-wj33.onrender.com', 
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: { 
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization'
        }
      },
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
    },
    security: [{ // Global security requirement
      ApiKeyAuth: []
    }]
  },
  apis: ['./backend/routes/contacts.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/contacts', contactRoutes);

app.get('/', (req, res) => {
  res.send('Contacts API is running!');
});

//  health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
      console.log(`Health check: http://localhost:${port}/health`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
