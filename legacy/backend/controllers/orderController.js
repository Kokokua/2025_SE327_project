const Order = require('../models/orderModel');
const db = require('../db');

const orderController = {
    createOrder: async (req, res) => {
        try {
            const { userId, items } = req.body;

            const totalPrice = await calculateTotalPrice(items);

            const orderId = await Order.createOrder(userId, items, totalPrice);
            res.status(201).json({
                success: true,
                orderId,
                message: 'Order created successfully'
            });
        } catch (error) {
            console.error('Order creation error:', error);
            res.status(500).json({
                success: false,
                message: 'Error creating order'
            });
        }
    },

    getUserOrders: async (req, res) => {
        try {
            const userId = req.params.userId;
            const orders = await Order.getOrdersByUser(userId);
            res.json({
                success: true,
                data: orders
            });
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching orders'
            });
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const [orders] = await db.query(`
                SELECT 
                  o.id, 
                  o.total_price, 
                  o.created_at,
                  u.id AS user_id,
                  u.username,
                  JSON_ARRAYAGG(
                    JSON_OBJECT(
                      'book_id', oi.book_id,  
                      'title', b.title,
                      'quantity', oi.quantity,
                      'price', oi.price_at_purchase,
                      'image', b.image 
                    )
                  ) AS items
                FROM orders o
                JOIN users u ON o.user_id = u.id
                JOIN order_items oi ON o.id = oi.order_id
                JOIN books b ON oi.book_id = b.id
                GROUP BY o.id
            `);
            res.json({ success: true, data: orders });
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ success: false, message: 'Error fetching orders' });
        }
    },

    deleteOrder: async (req, res) => {
        try {
            await Order.deleteOrder(req.params.orderId);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error deleting order' });
        }
    },

    getOrderStats: async (req, res) => {
        try {
            const [total] = await db.query('SELECT COUNT(*) AS total FROM orders');
            const [recent] = await db.query(`
                SELECT 
                  o.id, 
                  u.username,
                  o.total_price,
                  DATE_FORMAT(o.created_at, '%Y-%m-%d %H:%i:%s') AS created_at
                FROM orders o
                JOIN users u ON o.user_id = u.id
                ORDER BY o.created_at DESC 
                LIMIT 10
              `);

            res.json({
                total: total[0]?.total || 0,
                recent: recent || []
            });
        } catch (err) {
            console.error('Order stats error:', err);
            res.status(500).json({
                error: 'Failed to load order stats',
                details: process.env.NODE_ENV === 'development' ? err.message : null
            });
        }
    },

    getReportStats: async (req, res) => {
        try {
            const [[totalOrders]] = await db.query(
                'SELECT COUNT(*) AS total FROM orders'
            );
            const [[totalSales]] = await db.query(
                'SELECT COALESCE(SUM(total_price), 0) AS total_sales FROM orders'
            );
            const [[totalBooksSold]] = await db.query(
                'SELECT COALESCE(SUM(quantity), 0) AS total_books_sold FROM order_items'
            );
    
            res.json({
                success: true,
                data: {
                    total_orders: totalOrders.total,
                    total_sales: totalSales.total_sales,
                    total_books_sold: totalBooksSold.total_books_sold
                }
            });
        } catch (error) {
            console.error('Report stats error:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching report statistics'
            });
        }
    }
};
async function calculateTotalPrice(items) {
    const total = await Promise.all(items.map(async (item) => {
        const [rows] = await db.query(
            'SELECT COALESCE(discounted_price, price) AS price FROM books WHERE id = ?',
            [item.bookId]
        );
        return rows[0].price * item.quantity;
    }));

    return total.reduce((sum, price) => sum + price, 0);
}

module.exports = orderController;