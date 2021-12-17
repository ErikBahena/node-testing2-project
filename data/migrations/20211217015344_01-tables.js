exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("user_id");
      table.string("name", 255).unique().notNullable();
      table.string("email", 255).unique().notNullable();
      table.string("password", 255).notNullable();
    })
    .createTable("posts", (table) => {
      table.increments("post_id");
      table.string("post_title").notNullable();
      table.string("photo_url");

      table
        .integer("user_id")
        .usigned()
        .notNullable()
        .references("user_id")
        .inTable("users");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
