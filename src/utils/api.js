import axios from "axios";

const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:JxBUuLS3";

export const getCustomers = () => axios.get(`${API_URL}/customer`);
export const getCustomer = (id) => axios.get(`${API_URL}/customer/${id}`);
export const addCustomer = (data) => axios.post(`${API_URL}/customer`, data);
export const editCustomer = (id, data) =>
  axios.patch(`${API_URL}/customer/${id}`, data);
export const deleteCustomer = (id) => axios.delete(`${API_URL}/customer/${id}`);

export const getProjects = () => axios.get(`${API_URL}/project_list`);
export const addProject = (data) => axios.post(`${API_URL}/project_list`, data);
export const editProject = (id, data) =>
  axios.patch(`${API_URL}/project_list/${id}`, data);
export const deleteProject = (id) =>
  axios.delete(`${API_URL}/project_list/${id}`);

export const getProjectTypes = () => axios.get(`${API_URL}/project_type`);
export const addProjectType = (data) =>
  axios.post(`${API_URL}/project_type`, data);
export const editProjectType = (id, data) =>
  axios.patch(`${API_URL}/project_type/${id}`, data);
export const deleteProjectType = (id) =>
  axios.delete(`${API_URL}/project_type/${id}`);
