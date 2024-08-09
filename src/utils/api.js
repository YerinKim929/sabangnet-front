import commonAxios from "./commonAxios";
import Cookies from "js-cookie";
import { removeBlank } from "./convertFormat";

export const postLogin = async (requestBody) => {
  try { 
    const res = await commonAxios.post("/login", requestBody);
    Cookies.set("accessToken", res.headers.authorization);
    commonAxios.defaults.headers.common[
      "Authorization"
    ] = `${res.headers.authorization}`;
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const postRegister = async (requestBody) => {
  try {
    requestBody = removeBlank(requestBody)

    const res = await commonAxios.post("/register", requestBody);
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const getSearch = async (params) => {
  try {
    const res = await commonAxios.get("/search?" + params.toString());
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const getHistory = async (params) => {
  try {
    const res = await commonAxios.get("/history?" + params.toString());
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const getAuthority = async () => {
  try {
    const res = await commonAxios.get("/authority");
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const deleteUser = async (requestBody) => {
  try {
    requestBody = removeBlank(requestBody)

    const res = await commonAxios.delete("/delete", requestBody);
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const updateOtherUser = async (requestBody) => {
  try {
    requestBody = removeBlank(requestBody)

    const res = await commonAxios.patch("/update/others", requestBody);
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const patchApprove = async (requestBody) => {
  try {
    requestBody = removeBlank(requestBody)

    const res = await commonAxios.patch("/update/approve", {
      ids: requestBody,
    });
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const getMyInfo = async (id) => {
  try {
    id = id.trim()
    
    const res = await commonAxios.get(`/mypage/${id}`);
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const checkPassword = async (requestBody) => {
  try {
    const res = await commonAxios.post("/checkpassword", requestBody);
    return res;
  } catch (error) {
    throw error.response;
  }
};

export const updateProfile = async (requestBody) => {
  try {
    requestBody = removeBlank(requestBody)

    const res = await commonAxios.patch("/update/me", requestBody);
    return res;
  } catch (error) {
    throw error.response;
  }
};

export const updatePassword = async (requestBody) => {
  try {
    const res = await commonAxios.patch("/update/password", requestBody);
    return res;
  } catch (error) {
    throw error.response;
  }
};
