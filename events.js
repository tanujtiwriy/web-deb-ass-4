const EventEmitter = require('events');

// Central event bus for event-driven features
const appEvents = new EventEmitter();

appEvents.on('user:registered', (user) => {
  console.log(`[event] user registered: ${user.username} (${user.email})`);
});

appEvents.on('user:login', (user) => {
  console.log(`[event] user logged in: ${user.email}`);
});

appEvents.on('note:created', (note) => {
  console.log(`[event] note created: "${note.title}" by ${note.owner}`);
});

appEvents.on('note:deleted', (noteId) => {
  console.log(`[event] note deleted: ${noteId}`);
});

module.exports = appEvents;