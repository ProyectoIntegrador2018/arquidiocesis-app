import { get, post, put } from './APIv2';

const ROOT_URL = 'https://arquidiocesis-bda.herokuapp.com/api/channels';
/**
 * @typedef {{id: string, data: Object}[]} AllChannelsResponse
 *
 * @typedef {{name: string, description: string , publications: {[key: string]: string} }} AddChannelParams
 * @typedef {{error: boolean, data: string}} AddChannelResponse
 *
 * @typedef {{id: string, name: string, description: string}} EditChannelParams
 * @typedef {{error: boolean}} EditChannelResponse
 */

/**
 * @returns {Promise<AllChannelsResponse>}
 */
async function all() {
  return await get(`${ROOT_URL}/get`);
}

/**
 * @param {AddChannelParams} params
 * @returns {Promise<AddChannelResponse | null>}
 */
async function add(params) {
  const { name, description, publications } = params;
  if (name == null || description == null) {
    return null;
  }

  const data = await post(`${ROOT_URL}/`, {
    channel_name: name,
    channel_description: description,
    channel_publications: publications,
  });
  return data;
}

/**
 * @param {EditChannelParams} params
 * @returns {Promise<EditChannelResponse | null>}
 */
async function edit(params) {
  const { id, name, description } = params;
  if (id == null || name == null || description == null) {
    return null;
  }

  const data = await put(`${ROOT_URL}/${id}`, {
    channel_id: id,
    channel_name: name,
    channel_description: description,
  });
  return data;
}

export default {
  all,
  add,
  edit,
};
