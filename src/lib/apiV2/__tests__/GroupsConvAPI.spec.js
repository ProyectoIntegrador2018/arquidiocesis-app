/**
 * @jest-environment jsdom
 */
jest.mock('../GroupsConvAPI.js');

import GroupsConvAPI from '../GroupsConvAPI';

describe('GroupsConvAPI', () => {
  test('get all groups', async () => {
    expect(Object.keys(await GroupsConvAPI.all()).length).toBe(2);
  });

  test('add a new group', async () => {
    const obj = {
      name: 'New Group',
      roles: ['New Role'],
      channels: ['New Channel'],
      description: '',
    };
    expect(obj).toEqual(await GroupsConvAPI.add(obj));
  });

  test('edit an existing group', async () => {
    const editedName = {
      id: 0,
      name: 'New Name 1',
    };
    const editedNameAndDesc = {
      id: 1,
      name: 'New Name 2',
      description: 'New Description',
    };
    const firstEdited = await GroupsConvAPI.edit(editedName);
    const secondEdited = await GroupsConvAPI.edit(editedNameAndDesc);
    expect(editedName.name).toEqual(firstEdited.name);
    expect(editedNameAndDesc.name).toEqual(secondEdited.name);
    expect(editedNameAndDesc.description).toEqual(secondEdited.description);
  });
});
