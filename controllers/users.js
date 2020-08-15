const path = require('path');
const getFile = require('../helpers');

const getAllUsers = (req, res) => getFile(path.join(__dirname, '../data/users.json'))
  .then((data) => res
    .status(200)
    .send(JSON.parse(data))).catch((error) => res
    .status(500)
    .send({ message: `произошла ошибка ${error}` }));

const getUser = (req, res) => {
  getFile(path.join(__dirname, '../data/users.json')).then((data) => {
    const currentUser = JSON.parse((data)).find((user) => user._id === req.params.id);
    if (!currentUser) {
      res
        .status(404)
        .send({ message: 'Нет пользователя с таким id' });
    }
    res
      .status(200)
      .send(currentUser);
  }).catch((error) => {
    res
      .status(500)
      .send({ message: `произошла ошибка ${error}` });
  });
};

module.exports = {
  getAllUsers,
  getUser,
};
