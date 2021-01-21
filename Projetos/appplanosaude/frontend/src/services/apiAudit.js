import axios from 'axios';

const apiAudit = axios.create({
  baseURL: 'https://192.168.1.60:8080/api/PAB/',
});

export default apiAudit;
