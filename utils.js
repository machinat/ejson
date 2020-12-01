const isFunction = (fn) => typeof fn === 'function';

const isObject = (fn) => typeof fn === 'object';

const keysOf = (obj) => Object.keys(obj);

const lengthOf = (obj) => Object.keys(obj).length;

const hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

const convertMapToObject = (map) => Array.from(map).reduce((acc, [key, value]) => {
  // reassign to not create new object
  acc[key] = value;
  return acc;
}, {});

const isArguments = obj => obj != null && hasOwn(obj, 'callee');

const isInfOrNaN =
  obj => Number.isNaN(obj) || obj === Infinity || obj === -Infinity;

const checkError = {
  maxStack: (msgError) => new RegExp('Maximum call stack size exceeded', 'g').test(msgError),
};




const handleError = (fn) => function() {
  try {
    return fn.apply(this, arguments);
  } catch (error) {
    const isMaxStack = checkError.maxStack(error.message);
    if (isMaxStack) {
      throw new Error('Converting circular structure to JSON')
    }
    throw error;
  }
};

module.exports = {
  isFunction,
  isObject,
  keysOf,
  lengthOf,
  hasOwn,
  convertMapToObject,
  isArguments,
  isInfOrNaN,
  checkError,
  handleError,
};
