import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "E-commerce API",
    version: "1.0.0",
    description: "API REST para un e-commerce con autenticación JWT, roles de usuario y administración, carrito, órdenes y pagos.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "Token inválido o expirado",
          },
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                msg: { type: "string" },
                param: { type: "string" },
                location: { type: "string" },
              },
            },
          },
        },
      },
      UserRegister: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "Juan Pérez" },
          email: { type: "string", format: "email", example: "juan@example.com" },
          password: { type: "string", format: "password", example: "supersecret" },
        },
      },
      UserLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "juan@example.com" },
          password: { type: "string", format: "password", example: "supersecret" },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string", example: "Login exitoso" },
          data: {
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: {
                  id: { type: "string", example: "648..." },
                  name: { type: "string", example: "Juan Pérez" },
                  email: { type: "string", example: "juan@example.com" },
                  role: { type: "string", example: "user" },
                },
              },
              token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..." },
            },
          },
        },
      },
      Product: {
        type: "object",
        properties: {
          _id: { type: "string", example: "648..." },
          name: { type: "string", example: "Camiseta" },
          description: { type: "string", example: "Algodón 100%" },
          price: { type: "number", example: 19.99 },
          stock: { type: "number", example: 50 },
          category: { type: "string", example: "648..." },
          image: { type: "string", example: "https://.../image.png" },
          isActive: { type: "boolean", example: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      ProductCreate: {
        type: "object",
        required: ["name", "price", "stock", "category"],
        properties: {
          name: { type: "string", example: "Camiseta" },
          description: { type: "string", example: "Algodón 100%" },
          price: { type: "number", example: 19.99 },
          stock: { type: "number", example: 50 },
          category: { type: "string", example: "648..." },
          image: { type: "string", example: "https://.../image.png" },
          isActive: { type: "boolean", example: true },
        },
      },
      ProductUpdate: {
        type: "object",
        properties: {
          name: { type: "string", example: "Camiseta actualizada" },
          description: { type: "string", example: "Algodón peinado" },
          price: { type: "number", example: 24.99 },
          stock: { type: "number", example: 40 },
          category: { type: "string", example: "648..." },
          image: { type: "string", example: "https://.../image-new.png" },
          isActive: { type: "boolean", example: false },
        },
      },
      Category: {
        type: "object",
        properties: {
          _id: { type: "string", example: "648..." },
          name: { type: "string", example: "Ropa" },
          slug: { type: "string", example: "ropa" },
          description: { type: "string", example: "Categoría de prendas" },
          isActive: { type: "boolean", example: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      CategoryCreate: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", example: "Ropa" },
          slug: { type: "string", example: "ropa" },
          description: { type: "string", example: "Categoría de prendas" },
        },
      },
      CategoryUpdate: {
        type: "object",
        properties: {
          name: { type: "string", example: "Ropa actualizada" },
          slug: { type: "string", example: "ropa" },
          description: { type: "string", example: "Categoría mejorada" },
        },
      },
      CartItem: {
        type: "object",
        properties: {
          _id: { type: "string", example: "648..." },
          product: {
            type: "object",
            properties: {
              _id: { type: "string", example: "648..." },
              name: { type: "string", example: "Camiseta" },
              price: { type: "number", example: 19.99 },
              stock: { type: "number", example: 50 },
              category: { type: "string", example: "648..." },
              isActive: { type: "boolean", example: true },
            },
          },
          quantity: { type: "number", example: 2 },
        },
      },
      CartResponse: {
        type: "object",
        properties: {
          _id: { type: "string", example: "648..." },
          user: { type: "string", example: "648..." },
          items: {
            type: "array",
            items: { $ref: "#/components/schemas/CartItem" },
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      CartAddRequest: {
        type: "object",
        required: ["productId", "quantity"],
        properties: {
          productId: { type: "string", example: "648..." },
          quantity: { type: "number", example: 2 },
        },
      },
      CartUpdateRequest: {
        type: "object",
        required: ["quantity"],
        properties: {
          quantity: { type: "number", example: 3 },
        },
      },
      OrderItem: {
        type: "object",
        properties: {
          product: { type: "string", example: "648..." },
          name: { type: "string", example: "Camiseta" },
          price: { type: "number", example: 19.99 },
          quantity: { type: "number", example: 2 },
        },
      },
      OrderResponse: {
        type: "object",
        properties: {
          _id: { type: "string", example: "648..." },
          user: { type: "string", example: "648..." },
          items: {
            type: "array",
            items: { $ref: "#/components/schemas/OrderItem" },
          },
          totalAmount: { type: "number", example: 39.98 },
          status: { type: "string", example: "pending" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      PaymentCreateRequest: {
        type: "object",
        required: ["orderId", "method"],
        properties: {
          orderId: { type: "string", example: "648..." },
          method: { type: "string", example: "card" },
        },
      },
      PaymentConfirmRequest: {
        type: "object",
        required: ["paymentId", "transactionId"],
        properties: {
          paymentId: { type: "string", example: "648..." },
          transactionId: { type: "string", example: "txn_123456" },
        },
      },
      PaymentResponse: {
        type: "object",
        properties: {
          _id: { type: "string", example: "648..." },
          order: { type: "string", example: "648..." },
          user: { type: "string", example: "648..." },
          amount: { type: "number", example: 39.98 },
          method: { type: "string", example: "card" },
          status: { type: "string", example: "pending" },
          transactionId: { type: "string", example: "txn_123456" },
          paidAt: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Registrar un nuevo usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserRegister" },
            },
          },
        },
        responses: {
          "201": {
            description: "Usuario registrado exitosamente",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" },
              },
            },
          },
          "400": {
            description: "Solicitud inválida",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
        security: [],
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Iniciar sesión de usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserLogin" },
            },
          },
        },
        responses: {
          "200": {
            description: "Login exitoso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" },
              },
            },
          },
          "400": {
            description: "Credenciales inválidas o datos incompletos",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
        security: [],
      },
    },
    "/api/products": {
      post: {
        tags: ["Products"],
        summary: "Crear un producto nuevo (admin)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductCreate" },
            },
          },
        },
        responses: {
          "201": {
            description: "Producto creado exitosamente",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "400": {
            description: "Solicitud inválida",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "401": {
            description: "No autorizado",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } },
            },
          },
          "403": {
            description: "Acceso denegado para el rol actual",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } },
            },
          },
        },
      },
      get: {
        tags: ["Products"],
        summary: "Listar productos",
        responses: {
          "200": {
            description: "Lista de productos",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { type: "array", items: { $ref: "#/components/schemas/Product" } },
                  },
                },
              },
            },
          },
          "401": {
            description: "Token inválido o ausente",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } },
            },
          },
        },
      },
    },
    "/api/products/{id}": {
      get: {
        tags: ["Products"],
        summary: "Obtener producto por ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del producto",
          },
        ],
        responses: {
          "200": {
            description: "Producto encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } },
          },
          "401": {
            description: "No autorizado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
          "404": {
            description: "Producto no encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
        },
      },
      put: {
        tags: ["Products"],
        summary: "Actualizar un producto (admin)",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del producto",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductUpdate" },
            },
          },
        },
        responses: {
          "200": {
            description: "Producto actualizado exitosamente",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } },
          },
          "400": {
            description: "Solicitud inválida",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
          "401": {
            description: "No autorizado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
          "403": {
            description: "Acceso denegado para el rol actual",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
        },
      },
      delete: {
        tags: ["Products"],
        summary: "Eliminar un producto (admin)",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del producto",
          },
        ],
        responses: {
          "200": {
            description: "Producto eliminado exitosamente",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
          "401": {
            description: "No autorizado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
          "403": {
            description: "Acceso denegado para el rol actual",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
          "404": {
            description: "Producto no encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
        },
      },
    },
    "/api/categories": {
      post: {
        tags: ["Categories"],
        summary: "Crear una categoría (admin)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CategoryCreate" },
            },
          },
        },
        responses: {
          "201": {
            description: "Categoría creada exitosamente",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } },
          },
          "400": {
            description: "Solicitud inválida",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
          "401": {
            description: "No autorizado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
          "403": {
            description: "Acceso denegado para el rol actual",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
        },
      },
      get: {
        tags: ["Categories"],
        summary: "Listar categorías (admin)",
        responses: {
          "200": {
            description: "Lista de categorías",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { type: "array", items: { $ref: "#/components/schemas/Category" } },
                  },
                },
              },
            },
          },
          "401": { description: "No autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Acceso denegado para el rol actual", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/categories/{id}": {
      put: {
        tags: ["Categories"],
        summary: "Actualizar categoría (admin)",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, description: "ID de la categoría" },
        ],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/CategoryUpdate" } } },
        },
        responses: {
          "200": { description: "Categoría actualizada exitosamente", content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } } },
          "400": { description: "Solicitud inválida", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "No autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Acceso denegado para el rol actual", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Categoría no encontrada", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      delete: {
        tags: ["Categories"],
        summary: "Eliminar categoría (admin)",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, description: "ID de la categoría" },
        ],
        responses: {
          "200": { description: "Categoría eliminada exitosamente", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "No autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Acceso denegado para el rol actual", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Categoría no encontrada", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/cart": {
      get: {
        tags: ["Cart"],
        summary: "Obtener carrito del usuario autenticado",
        responses: {
          "200": { description: "Carrito del usuario", content: { "application/json": { schema: { $ref: "#/components/schemas/CartResponse" } } } },
          "401": { description: "No autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Acceso denegado para el rol actual", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/cart/add": {
      post: {
        tags: ["Cart"],
        summary: "Agregar un producto al carrito",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/CartAddRequest" } } },
        },
        responses: {
          "200": { description: "Carrito actualizado", content: { "application/json": { schema: { $ref: "#/components/schemas/CartResponse" } } } },
          "400": { description: "Solicitud inválida", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "No autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Acceso denegado para el rol actual", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/cart/remove/{productId}": {
      delete: {
        tags: ["Cart"],
        summary: "Eliminar un producto del carrito",
        parameters: [
          { name: "productId", in: "path", required: true, schema: { type: "string" }, description: "ID del producto a remover" },
        ],
        responses: {
          "200": { description: "Carrito actualizado", content: { "application/json": { schema: { $ref: "#/components/schemas/CartResponse" } } } },
          "401": { description: "No autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Acceso denegado para el rol actual", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Item no existe", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/cart/update/{productId}": {
      put: {
        tags: ["Cart"],
        summary: "Actualizar la cantidad de un producto del carrito",
        parameters: [
          { name: "productId", in: "path", required: true, schema: { type: "string" }, description: "ID del producto" },
        ],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/CartUpdateRequest" } } },
        },
        responses: {
          "200": { description: "Carrito actualizado", content: { "application/json": { schema: { $ref: "#/components/schemas/CartResponse" } } } },
          "400": { description: "Solicitud inválida", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "No autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Acceso denegado para el rol actual", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Item no existe", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/cart/clear": {
      delete: {
        tags: ["Cart"],
        summary: "Limpiar el carrito del usuario autenticado",
        responses: {
          "200": { description: "Carrito vaciado", content: { "application/json": { schema: { type: "object", properties: { message: { type: "string", example: "Carrito vaciado" } } } } } },
          "401": { description: "No autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Acceso denegado para el rol actual", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/orders": {
      post: {
        tags: ["Orders"],
        summary: "Crear una orden a partir del carrito del usuario",
        responses: {
          "201": { description: "Orden creada", content: { "application/json": { schema: { $ref: "#/components/schemas/OrderResponse" } } } },
          "400": { description: "Solicitud inválida", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "No autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Acceso denegado para el rol actual", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/payments": {
      post: {
        tags: ["Payments"],
        summary: "Crear un pago para una orden",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/PaymentCreateRequest" } } },
        },
        responses: {
          "201": { description: "Pago creado", content: { "application/json": { schema: { $ref: "#/components/schemas/PaymentResponse" } } } },
          "400": { description: "Solicitud inválida", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "No autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Acceso denegado para el rol actual", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/payments/confirm": {
      post: {
        tags: ["Payments"],
        summary: "Confirmar un pago existente",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/PaymentConfirmRequest" } } },
        },
        responses: {
          "200": { description: "Pago confirmado", content: { "application/json": { schema: { $ref: "#/components/schemas/PaymentResponse" } } } },
          "400": { description: "Solicitud inválida", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "No autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Acceso denegado para el rol actual", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Pago no encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/payments/fail/{paymentId}": {
      post: {
        tags: ["Payments"],
        summary: "Marcar un pago como fallido",
        parameters: [
          { name: "paymentId", in: "path", required: true, schema: { type: "string" }, description: "ID del pago" },
        ],
        responses: {
          "200": { description: "Pago marcado como fallido", content: { "application/json": { schema: { type: "object", properties: { message: { type: "string", example: "Pago marcado como fallido" } } } } } },
          "400": { description: "Solicitud inválida", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "No autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Acceso denegado para el rol actual", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Pago no encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
