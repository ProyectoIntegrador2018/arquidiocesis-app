import { get, post, put, del } from './APIv2';

const ROOT_URL = 'https://arquidiocesis-bda.herokuapp.com/api/posts';
/**
  @typedef {{text: string, authorID: string, fileIDs: string[], channelOwnerID: string}} AddPostParams
  @typedef {{error: boolean, data: string} | null} AddPostResponse
  
  @typedef {string} GetOnePostParams
  @typedef {{id: string, post_author: string, post_text: string, post_files: string[], post_comments: string[]} | null} GetOnePostResponse

  @typedef {{id: string, text?: string, fileIDs?: string[]}} EditPostParams
  @typedef {{error: boolean} | null} EditPostResponse

  @typedef {string} DeletePostParams
  @typedef {{error: boolean, message: string}} DeletePostResponse
*/

/**
 * @param {AddPostParams} params
 * @returns {Promise<AddPostResponse>}
 */
async function add(params) {
  const { text, authorID, fileIDs, channelOwnerID } = params;
  if (
    text == null ||
    authorID == null ||
    fileIDs == null ||
    channelOwnerID == null
  ) {
    console.warn('[HTTP] Invalid POST request in PostsAPI.add: missing params');
    return null;
  }

  return await post(`${ROOT_URL}/`, {
    post_text: text,
    post_author: authorID,
    post_files: fileIDs,
    channel_owner_id: channelOwnerID,
  });
}

/**
 * @param {GetOnePostParams} id
 * @returns {GetOnePostResponse}
 */
async function getOne(id) {
  if (id == null) {
    console.warn('[HTTP] Invalid GET request in PostsAPI.getOne: missing id');
    return null;
  }
  return await get(`${ROOT_URL}/${id}`);
}

/**
 *
 * @param {EditPostParams} params
 * @returns {EditPostResponse}
 */
async function edit(params) {
  const { id, text, fileIDs } = params;
  if (id == null) {
    console.warn('[HTTP] Invalid PUT request in PostsAPI.edit: missing params');
    return null;
  }

  return await put(`${ROOT_URL}/edit/${id}`, {
    post_id: id,
    post_text: text,
    post_files: fileIDs,
  });
}

/**
 * @param {DeletePostParams} id
 * @returns {DeletePostResponse}
 */
async function remove(id) {
  if (id == null) {
    console.warn(
      '[HTTP] Invalid DELETE request in PostsAPI.remove: missing id'
    );
    return null;
  }
  return await del(`${ROOT_URL}/delete/${id}`);
}

export default {
  add,
  getOne,
  edit,
  remove,
};
