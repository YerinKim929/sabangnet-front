export const idRules = [
  (value) => !!value || "아이디는 필수값입니다.",
  (value) =>
    /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,60}$/.test(value) ||
    "아이디는 3자리 이상의 영문 혹은 영문/숫자를 입력해주세요.",
];

export const passwordRules = [
  (value) => !!value || "비밀번호는 필수값입니다.",
  (value) =>
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{10,100}$/.test(
      value
    ) || "비밀번호는 10자리 이상의 소문자/숫자/특수문자를 입력해주세요.",
];

export const passwordRulesWithoutNorm = [
  (value) => !!value || "비밀번호는 필수값입니다.",
];

export const confirmPasswordRules = (password) => [
  (value) => !!value || "비밀번호 확인이 필요합니다",
  (value) => value === password || "동일한 비밀번호를 입력해주세요.",
];

export const nameRules = [(value) => !!value || "관리자명은 필수값입니다."];

export const emailRules = [
  (value) => !!value || "이메일은 필수값입니다.",
  (value) =>
    /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([-_.]?[A-Za-z0-9])*.[a-zA-Z]{2,3}$/.test(
      value
    ) || "이메일 형식에 맞게 작성해주십시오",
];

export const permissionRules = [
  (value) => !!value || "권한 선택은 필수값입니다.",
];

export const validateField = (value, rules) => {
  for (let rule of rules) {
    const result = rule(value);
    if (result !== true) {
      return result;
    }
  }
  return true;
};

export const validateForm = (fields) => {
  for (let { value, rules } of fields) {
    const result = validateField(value, rules);
    if (result !== true) {
      return result;
    }
  }
  return true;
};

export const enteredForm = (fields) => {
  return fields.every((field) => !!field.value);
};
