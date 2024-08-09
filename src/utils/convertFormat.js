export function convertTime(str) {
  return (str) ? str.replace("T", " ") : str;
}

export function convertAuthority(str){
  if(!str)
      return str;
  return (str === 'MASTER') ? "통합 관리자" : "일반 관리자"
}

export function convertIsUsed(bool){
  if(bool == undefined)
      return bool;
  return (bool) ? "활성화" : "비활성화"
}

export function removeBlank(map){
  for (let key in map) {
    if(typeof map[key] === 'string'){
      map[key] = map[key].trim();
    }
  }
  return map;
}