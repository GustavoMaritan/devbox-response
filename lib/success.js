function success(status, content) {
    this.statusCode = status;
    this.content = content;
}

global.responseOk = success;