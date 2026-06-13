# E-commerce API

API REST para un e-commerce construida con Node.js, Express y MongoDB. Este proyecto implementa un backend modular con autenticación JWT, control de roles y operaciones completas para usuarios, productos, categorías, carrito, órdenes y pagos.

## Arquitectura en capas

- **Routes**: definen endpoints y encadenan middlewares, validadores y controladores.
- **Controllers**: reciben la petición, invocan lógica de negocio y devuelven una respuesta HTTP.
- **Services**: contienen la lógica de negocio real, las operaciones con MongoDB y las reglas de la aplicación.
- **Models**: esquemas de Mongoose que representan entidades en la base de datos.
- **Middlewares**: manejo de autenticación, autorización y validación de requests.

## Tecnologías utilizadas

- Node.js
- Express 5
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- express-validator
- dotenv
- Docker / Docker Compose

## Instalación

### Local

1. Clonar el repositorio
   ```bash
   git clone <tu-repo> ecommerce_project
   cd ecommerce_project
   ```
2. Instalar dependencias
   ```bash
   npm install
   ```
3. Configurar variables de entorno
   ```bash
   cp .env.example .env
   ```
4. Ejecutar localmente
   ```bash
   npm run dev
   ```

### Docker

1. Construir y levantar contenedores
   ```bash
   docker compose up --build
   ```
2. La API quedará disponible en:
   - `http://localhost:3000`

> El servicio de MongoDB se expone en `27017` y la aplicación Node.js en `3000`.

## Variables de entorno

El proyecto utiliza variables de entorno en `.env`.

- `PORT` - Puerto de ejecución del servidor (por defecto `3000`).
- `MONGO_URI` - URI de conexión a MongoDB.
- `SECRET_KEY` - Clave secreta para firmar JWT.

Ejemplo:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/mi_base
SECRET_KEY=tu_clave_secreta
```

## Autenticación JWT

La API usa JWT para proteger rutas.

1. El usuario inicia sesión con `/api/auth/login`.
2. Si las credenciales son válidas, el servidor genera un token JWT con `generateToken(user._id)`.
3. El token se firma con `SECRET_KEY` y expira en `24h`.
4. Las rutas protegidas leen el header `Authorization: Bearer <token>`.
5. El middleware `protect` verifica el token, busca el usuario y lo adjunta a `req.user`.

```js
const decoded = jwt.verify(token, process.env.SECRET_KEY);
const user = await User.findById(decoded.id).select("-password");
```

## Roles

La aplicación distingue dos roles:

- `user`: puede acceder a carrito, órdenes y pagos.
- `admin`: puede crear, actualizar y eliminar productos y categorías.

Middlewares de autorización:

- `isAdmin` valida `req.user.role === "admin"`.
- `isUser` valida `req.user.role === "user"`.

## Estructura del proyecto

```text
src/
  app.js                  # Configuración de Express y rutas
  server.js               # Arranque del servidor y conexión DB
  config/
    database.js           # Conexión a MongoDB
  controllers/
    auth_controller.js
    cart_controller.js
    category_controller.js
    order_controller.js
    payment_controller.js
    product_controller.js
  middlewares/
    auth_middleware.js    # Control de roles
    protect_middleware.js # Verifica JWT y carga usuario
    validate_middleware.js# Maneja errores de validación
  models/
    cart.js
    category.js
    order.js
    payment.js
    product.js
    user.js
  routes/
    auth_route.js
    cart_route.js
    category_route.js
    order_route.js
    payment_route.js
    product_route.js
  services/
    auth_service.js
    cart_service.js
    category_service.js
    order_service.js
    payment_service.js
    product_service.js
  utils/
    generateToken.js
  validators/
    auth_validator.js
    cart_validator.js
    category_validator.js
    payment_validator.js
    product_validator.js
```

## Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Products

- `POST /api/products` (admin)
- `GET /api/products`
- `GET /api/products/:id`
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)

### Categories

- `POST /api/categories` (admin)
- `GET /api/categories` (admin)
- `PUT /api/categories/:id` (admin)
- `DELETE /api/categories/:id` (admin)

### Cart

- `GET /api/cart` (user)
- `POST /api/cart/add` (user)
- `DELETE /api/cart/remove/:productId` (user)
- `PUT /api/cart/update/:productId` (user)
- `DELETE /api/cart/clear` (user)

### Orders

- `POST /api/orders` (user)

### Payments

- `POST /api/payments` (user)
- `POST /api/payments/confirm` (user)
- `POST /api/payments/fail/:paymentId` (user)

## Ejemplos de request / response

### Registro de usuario

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "supersecret"
}
```

```json
HTTP/1.1 201 Created
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": "648...",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "user"
  }
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "supersecret"
}
```

```json
HTTP/1.1 200 OK
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": "648...",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  }
}
```

### Listar productos

```http
GET /api/products
Authorization: Bearer <token>
```

```json
HTTP/1.1 200 OK
{
  "success": true,
  "data": [
    {
      "_id": "648...",
      "name": "Camiseta",
      "description": "Algodón 100%",
      "price": 19.99,
      "stock": 50,
      "category": "648...",
      "image": "",
      "isActive": true,
      "createdAt": "2026-06-13T10:00:00.000Z",
      "updatedAt": "2026-06-13T10:00:00.000Z"
    }
  ]
}
```

### Agregar item al carrito

```http
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "648...",
  "quantity": 2
}
```

```json
HTTP/1.1 200 OK
{
  "_id": "648...",
  "user": "648...",
  "items": [
    {
      "_id": "648...",
      "product": {
        "_id": "648...",
        "name": "Camiseta",
        "price": 19.99,
        "stock": 50,
        "category": "648...",
        "isActive": true
      },
      "quantity": 2
    }
  ],
  "createdAt": "2026-06-13T10:05:00.000Z",
  "updatedAt": "2026-06-13T10:06:00.000Z"
}
```

### Crear orden

```http
POST /api/orders
Authorization: Bearer <token>
```

```json
HTTP/1.1 201 Created
{
  "_id": "648...",
  "user": "648...",
  "items": [
    {
      "product": "648...",
      "name": "Camiseta",
      "price": 19.99,
      "quantity": 2
    }
  ],
  "totalAmount": 39.98,
  "status": "pending",
  "createdAt": "2026-06-13T10:07:00.000Z",
  "updatedAt": "2026-06-13T10:07:00.000Z"
}
```

### Iniciar pago

```http
POST /api/payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "648...",
  "method": "card"
}
```

```json
HTTP/1.1 201 Created
{
  "_id": "648...",
  "order": "648...",
  "user": "648...",
  "amount": 39.98,
  "method": "card",
  "status": "pending"
}
```

## Códigos de error comunes

- `400 Bad Request`
  - Campos obligatorios faltantes
  - Validación de formato incorrecta
  - Credenciales inválidas
  - Recurso no encontrado dentro del flujo de negocio (`Producto no existe`, `Orden no encontrada`, `Carrito vacío`)
- `401 Unauthorized`
  - Token ausente
  - Token inválido o expirado
  - Usuario no encontrado
- `403 Forbidden`
  - Acceso denegado para rol incorrecto
  - `No eres un administrador.`
  - `No eres un usuario.`
- `404 Not Found`
  - Recurso no encontrado al buscar producto, categoría, pago u orden
- `500 Internal Server Error`
  - Errores inesperados de servidor o base de datos

## Notas importantes

- El middleware `protect` usa JWT y carga el usuario en `req.user`.
- Las rutas de escritura sobre productos y categorías están reservadas a administradores.
- El carrito y las órdenes solo pueden ser manipulados por usuarios con rol `user`.
- El servicio de pago actual es un flujo simulado: `createPayment` crea un pago pendiente, `confirmPayment` marca pago/orden como completado y `failPayment` marca un pago como fallido.

---

Proyecto diseñado para servir como backend para un e-commerce modular y fácilmente extensible. Para soporte adicional, revisar los archivos en `src/` y extender lógica de validación, manejo de stock, direcciones de envío y pasarelas de pago reales.

flowchart TD
  subgraph Client[Client/API Consumer]
    A[HTTP Requests] --> B(Routes)
  end

  subgraph Routes[Routes Layer]
    B --> R1[/api/auth/*/]
    B --> R2[/api/products/*/]
    B --> R3[/api/categories/*/]
    B --> R4[/api/cart/*/]
    B --> R5[/api/orders/*/]
    B --> R6[/api/payments/*/]
  end

  subgraph Middlewares[Middleware Layer]
    B --> M1[protect]
    B --> M2[auth_middleware]
    B --> M3[validateRequest]
    M1 --> M2
    M3 --> C
  end

  subgraph Controllers[Controllers Layer]
    C[Controller Functions] --> C1[auth_controller]
    C --> C2[product_controller]
    C --> C3[category_controller]
    C --> C4[cart_controller]
    C --> C5[order_controller]
    C --> C6[payment_controller]
  end

  subgraph Services[Business Logic Layer]
    C1 --> S1[auth_service]
    C2 --> S2[product_service]
    C3 --> S3[category_service]
    C4 --> S4[cart_service]
    C5 --> S5[order_service]
    C6 --> S6[payment_service]
  end

  subgraph Models[Data Layer]
    S1 --> MUser[User Model]
    S2 --> MProduct[Product Model]
    S3 --> MCategory[Category Model]
    S4 --> MCart[Cart Model]
    S5 --> MOrder[Order Model]
    S6 --> MPayment[Payment Model]
  end

  subgraph Database[MongoDB]
    DB[(MongoDB)]
    MUser --> DB
    MProduct --> DB
    MCategory --> DB
    MCart --> DB
    MOrder --> DB
    MPayment --> DB
  end

  subgraph JWT[JWT Authentication Flow]
    AuthReq[Login/Register] --> TokenGen[generateToken()]
    TokenGen --> Token[JWT Token]
    Token --> Client
    Client -->|Authorization: Bearer <token>| M1
    M1 --> VerifyJWT[jwt.verify()]
    VerifyJWT --> UserLookup[User.findById()]
    UserLookup --> C
  end




