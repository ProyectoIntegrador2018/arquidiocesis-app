import { get, post, put } from './APIv2';

const ROOT_URL = 'https://arquidiocesis-bda.herokuapp.com/api/groups';
/**
 * @typedef {{id: string, data: Object}[]} AllGroupsResponse
 *
 * @typedef {{name: string, roles: {[key: string]: string}, channels: string[]}} AddGroupParams
 * @typedef {{error: boolean, data: string}} AddGroupResponse
 *
 * @typedef {{id: string, name: string, description: string}} EditGroupParams
 * @typedef {{error: boolean}} EditGroupResponse
 */

/**
 * @returns {Promise<AllGroupsResponse>}
 */
async function all() {
  return await get(ROOT_URL);
}

/**
 * @param {AddGroupParams} params
 * @returns {Promise<AddGroupResponse | null>}
 */
async function add(params) {
  const { name, roles, channels } = params;
  if (name == null || Object.keys(roles).length < 1 || channels.length < 1) {
    return null;
  }

  const data = await post(`${ROOT_URL}/`, {
    group_name: name,
    group_roles: roles,
    group: channels,
  });
  return data;
}

/**
 * @param {EditGroupParams} params
 * @returns {Promise<EditGroupResponse | null>}
 */
async function edit(params) {
  const { id, name, description } = params;
  if (id == null || name == null || description == null) {
    return null;
  }

  const data = await put(`${ROOT_URL}/${id}`, {
    group_id: id,
    group_name: name,
    group_description: description,
  });
  return data;
}

export default {
  all,
  add,
  edit,
};
