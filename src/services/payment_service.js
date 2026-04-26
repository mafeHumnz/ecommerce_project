import { Payment } from "../models/payment.js";
import { Order } from "../models/order.js";

export const createPayment = async ({ orderId, userId, method }) => {

  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Orden no encontrada");
  }

  if (order.status === "paid") {
    throw new Error("La orden ya fue pagada");
  }

  const payment = await Payment.create({
    order: orderId,
    user: userId,
    amount: order.total,
    method
  });

  return payment;
};

export const confirmPayment = async ({ paymentId, transactionId }) => {

  const payment = await Payment.findById(paymentId);

  if (!payment) {
    throw new Error("Pago no encontrado");
  }

  if (payment.status === "completed") {
    throw new Error("El pago ya fue procesado");
  }

  // Actualizar pago
  payment.status = "completed";
  payment.transactionId = transactionId;
  payment.paidAt = new Date();

  await payment.save();

  // Actualizar orden
  const order = await Order.findById(payment.order);

  order.status = "paid";
  await order.save();

  return payment;
};

export const failPayment = async (paymentId) => {

  const payment = await Payment.findById(paymentId);

  if (!payment) {
    throw new Error("Pago no encontrado");
  }

  payment.status = "failed";

  await payment.save();

  return payment;
};