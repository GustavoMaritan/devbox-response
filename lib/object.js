function object(status, errorMessage, content) {
    this.errorMessages = errorMessage ? [errorMessage] : [];
    this.statusCode = status;
    this.addMessage = addMessage;
    this.isSuccess = isSuccess;
    this.content = content;

    function addMessage(msg) {
        this.errorMessages.push(msg);
    }
    function isSuccess() {
        return !(this.errorMessages.length > 0);
    }
}

global.response = object;