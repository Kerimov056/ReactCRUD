import { httpClient } from '../utils/HttpClient';
export const getCategories = () =>{
  return httpClient.get("/api/Catagories")
};
export const PostCategories = (data) =>{
  return httpClient.post("/api/Catagories",data)
};

export const DeleteCategories = (id) =>{
  return httpClient.delete(`/api/Catagories/${id}`)
};
export const UpdateCategories = (id, data) =>{
  return httpClient.put(`/api/Catagories/${id}`,data)
};

export const GetByIdCatagory = (id) =>{
  return httpClient.get(`/api/Catagories/${id}`)
};

