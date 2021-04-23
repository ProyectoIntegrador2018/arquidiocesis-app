import { post, put } from './APIv2';
import { ROOT_URL as BASE_URL } from './APIv2';

const ROOT_URL = `${BASE_URL}channels`;
/**
 *
 * @typedef {{id: string, data: Object}[]} AllGroupsResponse
 *
 * @typedef {ids: string[]} AllChannelsByGroupsParams
 * @typedef {{error: boolean, channels: {id: string, canal_name: string, canal_description: string, canal_publications: string[]}[]}} AllChannelsByGroupsResponse
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

/**
 * @param {AllChannelsByGroupsParams} ids
 * @returns {AllChannelsByGroupsResponse}
 */
async function allByGroup(ids) {
  if (ids == null || ids.length < 1) {
    return null;
  }

  return await post(`${ROOT_URL}/getAll`, {
    channel_ids: ids,
  });
}

export default {
  add,
  edit,
  allByGroup,
};
