import commonAxios from "./commonAxios";

export const postLogin = async (requestBody) => {
  try {
    const res = await commonAxios.post("/login", requestBody);
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("로그인 오류가 발생했습니다.", error.response);
    throw error;
  }
};

export const postRegister = async (requestBody) => {
  try {
    const res = await commonAxios.post("/register", requestBody);
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("유저 등록 오류가 발생했습니다.", error.response);
    throw error;
  }
};

export const getSearch = async (params) => {
  try {
    const res = await commonAxios.get("/search?" + params.toString());
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("유저 조회 오류가 발생했습니다.", error.response);
    throw error;
  }
};

export const getHistory = async (params) => {
  try {
    const res = await commonAxios.get("/history?" + params.toString());
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("히스토리 조회 오류가 발생했습니다.", error.response);
    throw error;
  }
};

export const getAuthority = async () => {
  try {
    const res = await commonAxios.get("/authority");
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("권한 조회 오류가 발생했습니다.", error.response);
    throw error;
  }
};

// register는 통합 후 추가
