function error(status, errorMessage, content) {
    this.errorMessages = errorMessage ? [errorMessage] : [];
    this.statusCode = status;
    this.content = content;
    this.addMessage = addMessage;
    this.isSuccess = isSuccess;

    function addMessage(msg) {
        this.errorMessages.push(msg);
    }

    function isSuccess() {
        return this.errorMessages.length === 0;
    }
}

global.responseError = error;