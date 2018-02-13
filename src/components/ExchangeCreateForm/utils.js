export function convertToNum(value) {
  if (value === '') return '';
  const lastCharacter = value.slice(-1);
  const cuttedValue = value.slice(0, -1);
  if (lastCharacter === '.' && isInt(cuttedValue)) return value;
  if (lastCharacter === ',' && isInt(cuttedValue)) return `${value.slice(0, -1)}.`;
  if (isNum(value)) {
    return value;
  } 
  return cutToNumber(value);
}

export function valNum(value) {
  return isNum(value) ? undefined : 'Должно быть числом'
}

function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isInt(n) {
  return n % 1 === 0;
}

function cutToNumber(str) {
  str = str.slice(0, -1);
  if (isNum(str)) {
    return +str;
  } else if (str.length >= 2) {
    return cutToNumber(str);
  } else {
    return '';
  }
}

