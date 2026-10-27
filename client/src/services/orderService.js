import api from './api';

export const orderService = {
  async createOrder(orderData) {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  async getMyOrders() {
    const response = await api.get('/orders/myorders');
    return response.data;
  },

  async getOrderById(id) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async getAllOrders() {
    const response = await api.get('/orders');
    return response.data;
  },

  async updateOrderStatus(id, updateData) {
    const response = await api.put(`/orders/${id}/status`, updateData);
    return response.data;
  },
};

export default orderService;
