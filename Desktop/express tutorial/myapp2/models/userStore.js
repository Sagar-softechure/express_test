let users = [
    { name: 'John', age: 20 },
    { name: 'Jane', age: 21 },
  ];
  
  
  module.exports = {
    getAll: () => users,
    addUser: (user) => users.push(user),
    singleUser : (id) => users[id],
  };
  