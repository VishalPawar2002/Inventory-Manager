import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

// Interceptor for handling common responses and errors
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // You can handle errors globally here
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export const getProducts = () => API.get('/products').then(response => response.data);
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export default API;
