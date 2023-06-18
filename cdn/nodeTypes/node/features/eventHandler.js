/**
 * The `EventHandler` class is a wrapper around the `EventEmitter` class from the "events" module.
 * It provides a simplified interface for emitting and handling events.
 */
const EventEmitter = require("events");

class EventHandler {
  constructor() {
    this.eventEmitter = new EventEmitter(); // Create a new instance of EventEmitter
  }

  /**
   * Emit an event with optional arguments.
   * @param {string} event - The name of the event to emit.
   * @param {...any} args - Optional arguments to pass to the event listeners.
   */
  emit(event, ...args) {
    this.eventEmitter.emit(event, ...args); // Emit the specified event with optional arguments
  }

  /**
   * Register a listener for the specified event.
   * @param {string} event - The name of the event to listen to.
   * @param {Function} listener - The callback function to be called when the event is emitted.
   */
  on(event, listener) {
    this.eventEmitter.on(event, listener); // Register a listener for the specified event
  }

  /**
   * Register a one-time listener for the specified event.
   * The listener will be automatically removed after it is called once.
   * @param {string} event - The name of the event to listen to.
   * @param {Function} listener - The callback function to be called when the event is emitted.
   */
  once(event, listener) {
    this.eventEmitter.once(event, listener); // Register a one-time listener for the specified event
  }

  /**
   * Remove a previously registered listener for the specified event.
   * @param {string} event - The name of the event to remove the listener from.
   * @param {Function} listener - The callback function to remove.
   */
  removeListener(event, listener) {
    this.eventEmitter.removeListener(event, listener); // Remove a previously registered listener for the specified event
  }

  /**
   * Remove all listeners for the specified event.
   * @param {string} event - The name of the event to remove all listeners from.
   */
  removeAllListeners(event) {
    this.eventEmitter.removeAllListeners(event); // Remove all listeners for the specified event
  }

  /**
   * Remove all listeners for all events.
   */
  removeAllListeners() {
    this.eventEmitter.removeAllListeners(); // Remove all listeners for all events
  }
}

module.exports = EventHandler;
