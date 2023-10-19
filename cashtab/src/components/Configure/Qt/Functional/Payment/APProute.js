const express = require('express');
const appRouter = express.Router();

getReactAppFilePath = () => {
  let paths = __dirname.split('/');

  paths.pop();
  paths.pop();
  paths.push('Client');
  paths.push('build');
  paths.push('index.html');

  return paths.join('/');
};

getReactFolderPath = () => {
  let paths = getReactAppFilePath().split('/');

  paths.pop();

  return paths.join('/');
}

appRouter.use(express.static(getReactFolderPath()));

appRouter.get('/', (req, res) => {
  res.sendFile(getReactAppFilePath());
});

module.exports = appRouter;
