import { get, post, put } from './APIv2';
import { ROOT_URL as BASE_URL } from './APIv2';

const ROOT_URL = `${BASE_URL}users`;

/**
 * @param {AllGroupsByUserParams} userID
 * @returns {Promise<AllGroupsByUserResponse>}
 */
async function allUsers() {
  const data = await get(`${ROOT_URL}/all`);
  if (data.error === true) throw data.message;

  const users = [];
  for (const k in data.users) {
    if (Object.hasOwnProperty.call(data.users, k)) {
      const user = data.users[k];
      users.push({
        id: k,
        ...user,
      });
    }
  }

  return users;
}

export default {
  allUsers,
};
