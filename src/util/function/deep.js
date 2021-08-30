/**
 * @description: 获取 目标对象自身的属性键组成的数组
 * @param {object} obj  目标对象
 * @return {Array} keys
 */
const ownKeys = (o) => {
  if (Reflect) {
    return Reflect.ownKeys(o);
  }
  return Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o));
};

/**
 * @description: 深拷贝对象
 * @param {object} obj  目标对象
 * @return {object} 拷贝后的对象
 */
export const deepClone = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    // 非对象直接返回
    return obj;
  }
  let newObj = Array.isArray(obj) ? [] : {};
  ownKeys(obj).forEach((key) => {
    newObj[key] = deepClone(obj[key]);
  });
  return newObj;
};

/**
 * @description: 深合并对象
 * @param {object} target  要合并的对象
 * @param {object} source  要合并的对象
 * @return {object} 合并后的对象
 */
export const deepMerge = (target, source) => {
  if (typeof target !== 'object' || typeof source !== 'object') {
    return false;
  }
  target = deepClone(target);
  for (const key in source) {
    if (target.hasOwnProperty(key)) {
      if (typeof source[key] !== 'object') {
        target[key] = source[key];
        continue;
      }
      target[key] = deepMerge(target[key], source[key]);
    } else {
      target[key] = deepClone(source[key]);
    }
  }
  return target;
};

/**
 * @description: 深合并多个对象
 * @param {Array} targets 多个对象接收多个 Object
 * @return {object} 合并后的对象
 */
export const deepMerges = (...targets) =>
  targets.reduce((accumulator, value) => deepMerge(accumulator, value));

export default {
  deepClone,
  deepMerge,
  deepMerges
};
