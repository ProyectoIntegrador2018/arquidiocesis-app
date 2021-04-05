import { post, put } from './APIv2';

const ROOT_URL = 'https://arquidiocesis-bda.herokuapp.com/api/channels';

/**
 *
 * @typedef {{id: string, data: Object}[]} AllGroupsResponse
 *
 */

/**
 * @param {AddGroupParams} params
 * @returns {Promise<AddGroupResponse | null>}
 */
async function add(params) {
  const { name, description, publications } = params;
  if (name == null) {
    return null;
  }

  const data = await post(`${ROOT_URL}/`, {
    canal_name: name,
    canal_description: description,
    canal_publications: publications,
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
  add,
  edit,
};
