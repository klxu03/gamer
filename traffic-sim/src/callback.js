const callbacks = {};

function registerCallback(entityId, callback) {
  if (!callbacks[entityId]) {
    callbacks[entityId] = [];
  }
  callbacks[entityId].push(callback);
}

function unregisterCallback(entityId, callback) {
  if (!callbacks[entityId]) return;
  callbacks[entityId] = callbacks[entityId].filter(cb => cb !== callback);
}

function notifyCallbacks(entity) {
  const entityCallbacks = callbacks[entity.id];
  if (entityCallbacks) {
    entityCallbacks.forEach(cb => cb(entity));
  }
}

export { registerCallback, unregisterCallback, notifyCallbacks };