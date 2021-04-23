import { get, post, put } from './APIv2';
import { ROOT_URL as BASE_URL } from './APIv2';

const ROOT_URL = `${BASE_URL}groups`;
/**
 * @typedef {id: string} AllGroupsByUserParams
 * @typedef {{error: boolean, groups: {id: string, group_channels: string[], group_name: string, group_roles: string[]}[]}} AllGroupsByUserResponse
 *
 * @typedef {{name: string, roles: {[key: string]: string}, channels: string[]}} AddGroupParams
 * @typedef {{error: boolean, data: string}} AddGroupResponse
 *
 * @typedef {{id: string, name: string, description: string}} EditGroupParams
 * @typedef {{error: boolean}} EditGroupResponse
 */

/**
 * @param {AllGroupsByUserParams} userID
 * @returns {Promise<AllGroupsByUserResponse>}
 */
async function allByUser(userID) {
  return await get(`${ROOT_URL}/get/${userID}`);
}

/**
 * @param {AddGroupParams} params
 * @returns {Promise<AddGroupResponse | null>}
 */
async function add(params) {
  const { name, roles, channels } = params;
  if (name == null) {
    return null;
  }

  const data = await post(`${ROOT_URL}/`, {
    group_name: name,
    group_roles: roles,
    group_channels: channels,
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
  allByUser,
  add,
  edit,
};
