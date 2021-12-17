exports.seed = (knex) => {
  return knex("posts").insert([
    {
      post_title: "my dog",
      photo_url: "https://placedog.net/500",
      user_id: 3,
    },
    {
      post_title: "my cat",
      photo_url: "http://placekitten.com/200/300",
      user_id: 1,
    },
    {
      post_title: "my other cat",
      photo_url: "http://placekitten.com/200/300",
      user_id: 1,
    },
    {
      post_title: "my rat",
      photo_url:
        "https://media.istockphoto.com/photos/pet-rat-picture-id492486990?b=1&k=20&m=492486990&s=170667a&w=0&h=tQERyfrmp2o4tZZ9i0ckxnhW0JeqDVs328JICGaU3Hs=",
      user_id: 2,
    },
  ]);
};
