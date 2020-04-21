exports.seed = function (knex) {
  return knex('todos').insert([
    { user_id: 1, text: 'this is todotext1' },
    { user_id: 1, text: 'this is todotext2' },
    { user_id: 1, text: 'this is todotext3' },
  ]);
};
