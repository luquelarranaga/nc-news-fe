import axios from "axios";

async function getUserAvatars() {
  const { data } = await axios(
    `https://back-end-nc-news-yvh9.onrender.com/api/users/`,
  );
  const { users } = data;

  const lookUp = users.reduce((acc, user) => {
    acc[user.username] = user.avatar_url;
    return acc;
  }, {});

  return lookUp;
}

export default getUserAvatars;
