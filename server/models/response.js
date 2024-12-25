module.exports = class Response {
  constructor(message, data, status) {
    this.message = message;
    this.data = data;
    this.status = status;
  }
};
