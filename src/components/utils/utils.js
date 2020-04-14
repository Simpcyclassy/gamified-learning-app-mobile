/*jshint esversion: 6 */
const addKeys = (val, key) => ({key, ...val});

const utils = {
  addKeys: addKeys,
};

export default utils;
