const router = require('express').Router();
const Todos = require('../models/todos-model.js');
const db = require('../../data/dbConfig.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, async (req, res) => {
  const userId = req.jwt.user_id;

  Todos.getTodos(userId)
    .then((todos) => {
      res.status(200).json({ todos });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error getting todos for the user.' });
    });
});

router.post('/', restricted, (req, res) => {
  const userId = req.jwt.user_id;
  const todo = { ...req.body, user_id: userId };

  if (!todo.text) {
    res
      .status(404)
      .json({ message: "You're missing data from a required field" });
  }

  Todos.addTodo(todo, userId)
    .then((todos) => {
      res.status(201).json({ todos });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error adding the todo.' });
    });
});

router.post('/update', restricted, (req, res) => {
  const userId = req.jwt.user_id;
  const todosArr = req.body.todos;

  Todos.deleteCompletedTodos(todosArr, userId)
    .then((todos) => {
      console.log(todos);
      res.status(200).json({ todos });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Failed to update todos.' });
    });
});

router.delete('/:id', restricted, (req, res) => {
  const todoId = req.params.id;
  const userId = req.jwt.user_id;

  Todos.deleteTodo(todoId, userId)
    .then((todos) => {
      res.status(200).json({ message: 'The todo has been deleted.' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Todo not found.' });
    });
});

module.exports = router;
