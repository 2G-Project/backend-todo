exports.up = function (knex) {
  return knex.schema.createTable('todos', (todos) => {
    todos.increments();

    todos
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    todos.string('text').notNullable;
    todos.boolean('is_complete').defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('todos');
};
