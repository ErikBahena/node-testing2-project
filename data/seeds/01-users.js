exports.seed = (knex) => {
  return knex("users").insert([
    {
      name: "erikb",
      email: "erik@gmail.com",
      password: "erikb",
    },
    {
      name: "billy",
      email: "billy@gmail.com",
      password: "billy",
    },
    {
      name: "bob",
      email: "bob@gmail.com",
      password: "bob",
    },
  ]);
};
