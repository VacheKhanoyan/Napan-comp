module.exports = {
  users: {
    role_enum_values: ['optional', 'user', 'admin'],
    roles: {
      USER: 'user',
      ADMIN: 'admin',
      OPTIONAL: 'optional'
    },
    username:{
      MIN_LENGTH: 4,
      MAX_LENGTH: 24 // TODO:
    },
    password:{
      MIN_LENGTH: 6,
      MAX_LENGTH: 80
    },
    email:{
      MIN_LENGTH: 5,
      MAX_LENGTH: 50
    },
    age:{
      MIN_RANGE: 14,
      MAX_RANGE:101
    },
    name: {
      MIN_LENGTH: 4,
      MAX_LENGTH: 50
    },
  },
  images: {
    size: {
      MIN_LENGTH: 0,
      MAX_LENGTH: 100
    },
    title:{
      MIN_LENGTH: 0,
      MAX_LENGTH: 50,
    },
  },
}
