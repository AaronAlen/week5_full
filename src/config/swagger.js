import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Management REST API',
      version: '1.0.0',
      description:
        'A comprehensive RESTful API for managing student records. Built using Node.js, Express, MongoDB, and Mongoose.',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development Server',
      },
    ],
    tags: [
      {
        name: 'General',
        description: 'General system status and health endpoints',
      },
      {
        name: 'Students',
        description: 'Student CRUD operations and record management',
      },
    ],
    components: {
      schemas: {
        Student: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated MongoDB ObjectId',
              example: '65f1a2b3c4d5e6f7a8b9c0d1',
            },
            name: {
              type: 'string',
              description: 'Full name of the student',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Unique email address of the student',
              example: 'john.doe@example.com',
            },
            age: {
              type: 'integer',
              description: 'Age of the student',
              example: 21,
            },
            course: {
              type: 'string',
              description: 'Enrolled course or program',
              example: 'Computer Science',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-03-28T10:30:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-03-28T10:30:00.000Z',
            },
          },
        },
        StudentInput: {
          type: 'object',
          required: ['name', 'email', 'age', 'course'],
          properties: {
            name: {
              type: 'string',
              description: 'Full name of the student',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Valid email address',
              example: 'john.doe@example.com',
            },
            age: {
              type: 'integer',
              description: 'Age in years',
              example: 21,
            },
            course: {
              type: 'string',
              description: 'Course or department name',
              example: 'Computer Science',
            },
          },
        },
        StudentPatchInput: {
          type: 'object',
          description: 'Provide at least one field to update',
          properties: {
            name: {
              type: 'string',
              description: 'Full name of the student',
              example: 'Johnathan Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Valid email address',
              example: 'johnathan.doe@example.com',
            },
            age: {
              type: 'integer',
              description: 'Age in years',
              example: 22,
            },
            course: {
              type: 'string',
              description: 'Course or department name',
              example: 'Software Engineering',
            },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operation successful',
            },
          },
        },
        StudentResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Student fetched successfully',
            },
            data: {
              $ref: '#/components/schemas/Student',
            },
          },
        },
        StudentListResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Students fetched successfully',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Student',
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Resource not found',
            },
          },
        },
        ValidationErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Validation failed',
            },
            errors: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: ['Email must be valid', 'Age must be a number'],
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './server.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
