const db = require('../../data/dbConfig.js');

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
};

function getTodos(userId) {
  return db('todos').where({ 'todos.user_id': userId }).select('todos.*');
}

async function addTodo(todoObject, userId) {
  await db('todos').insert(todoObject);
  return getTodos(userId);
}

async function deleteTodo(todoId, userId) {
  await db('todos')
    .where({ 'todos.id': todoId, 'todos.user_id': userId })
    .del();

  return getTodos(userId);
}
