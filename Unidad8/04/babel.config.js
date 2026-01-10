module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'babel-plugin-transform-typescript-metadata', // Este plugin es el que arregla tu error
      ['@babel/plugin-proposal-decorators', { legacy: true }],
    ],
  };
};