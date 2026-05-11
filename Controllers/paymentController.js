// Create payment order (mock)
exports.createPaymentOrder = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Payment order created (mock)',
        order: {
            id: 'order_123',
            amount: 500,
            currency: 'INR'
        }
    });
};

// Verify payment (mock)
exports.verifyPayment = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Payment verified (mock)'
    });
};