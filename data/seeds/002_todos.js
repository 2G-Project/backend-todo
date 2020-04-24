exports.seed = function (knex) {
  return knex('todos').insert([
    { user_id: 1, text: 'This is todotext1', is_complete: 1 },
    { user_id: 1, text: 'This is todotext2' },
    { user_id: 1, text: 'This is todotext3' },
  ]);
};
