
export function setItem(key,value){
  if(typeof value === 'object'){
    value = JSON.stringify(value);
    value = 'obj-'+ value;
  }else{
    value = 'str-'+ value;
  }
  localStorage.setItem(key, value);
}

export function getItem(key) {
  let value = localStorage.getItem(key);
  if (!value) {
    return;
  }
  if (value.indexOf('obj-') === 0) {
    value = value.slice(4);
    return JSON.parse(value);
  } else if (value.indexOf('str-') === 0) {
    return value.slice(4);
  }
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function clearStorage() {
  localStorage.clear();
}