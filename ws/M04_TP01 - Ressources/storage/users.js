const uuid = require('uuid')
const users = [
  {
    uuid: uuid.v4(),
    mail: 'admin@express-brains.local',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$QrMXiyCxsLjv700OAZzDkQ$abhVv5mq+rZ4gS9koYTSS7MXdWWOBU+eAJY/oZ56wsw',
    role: 'admin',
  },
  {
    uuid: uuid.v4(),
    mail: 'user@express-brains.local',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$jzQB9YoLnTyZpL66ZxWcYA$KaL4B8QM0Ni87d8bhK1bRM8O1lwU1f9H/SPSX9S4rlQ',
    role: 'user',
  },
]

module.exports = {
  addUser: function (mail, password) {
    users.push({ uuid: uuid.v4(), mail: mail, password: password, role: 'user' })
  },
  findByEmail: function (email) {
    return users.find((user) => user.mail === mail)
  },
  findAll: function () {
    return users
  },
}
