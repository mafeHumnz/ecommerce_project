# ecommerce_project

ACTUAL: Probar funcionamiento del endpoint POST "/api/order/" (Crear pedido)

ULTIMO PUNTO: 

Se probo el funcionamiento del endpoint del flujo order (crear pedido)

ERRORS:

- TypeError: Invalid schema configuration: `true` is not a valid type at path `timestamps`

FUNCIONALIDADES NUEVAS:

- Ninguna


SIGUIENTE PASO:

Crear flujo de pagos para usuarios autenticados. Incluye:

- payment_controller.js
- payment_route.js
- Agregar app.use("/api/payment", paymentRoute);