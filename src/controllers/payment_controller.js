import { createPayment, confirmPayment, failPayment } from "../services/payment_service.js";

export const handleCreatePayment = async (req, res) => {
  try {
    const { orderId, method } = req.body;
    const userId = req.user.id;

    const payment = await createPayment({ orderId, userId, method });

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const handleConfirmPayment = async (req, res) => {
  try {
    const { paymentId, transactionId } = req.body;

    const payment = await confirmPayment({ paymentId, transactionId });

    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const handleFailPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    await failPayment(paymentId);

    res.json({ message: "Pago marcado como fallido" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};