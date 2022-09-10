import axios from 'axios';
import apiUrl from '../config/api';

export default axios.create({
  baseURL: apiUrl,
});
