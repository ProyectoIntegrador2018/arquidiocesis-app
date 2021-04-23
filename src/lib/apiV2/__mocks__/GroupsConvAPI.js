const groups = {
  0: {
    name: 'Group1',
    roles: [],
    channels: ['channel-1', 'channel-2'],
    description: 'Desc1',
  },
  1: {
    name: 'Group2',
    roles: ['role-1'],
    channels: ['channel-3', 'channel-4'],
    description: 'Desc2',
  },
};

async function all() {
  return groups;
}

async function add(params) {
  const { name, roles, channels } = params;
  const id = Object.keys(groups).length;
  groups[id] = {
    name,
    roles,
    channels,
    description: '',
  };
  return groups[id];
}

async function edit(params) {
  const { id, name, description } = params;
  if (name != null) {
    groups[id].name = name;
  }

  if (description != null) {
    groups[id].description = description;
  }

  return groups[id];
}

export default {
  all,
  add,
  edit,
};
