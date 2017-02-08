function scope(status, errorMessage, content) {
    this.errorMessages = errorMessage ? [errorMessage] : [];
    this.statusCode = status;
    this.content = content;
    this.isSuccess = this.errorMessages.length === 0;

    this.get = get;
    this.addMessage = addMessage;
    this.field = field;
    this.campo = null;

    this.isNotNull = isNotNull;
    this.length = length;
    this.isEmail = isEmail;
    this.isInt = isInt;
    this.equals = equals;
    this.isNotEmpty = isNotEmpty;

    /// VALIDAÇÕES

    function isNotEmpty() {
        
       if (!this.campo.valor.length)
         this.errorMessages.push(`O Campo ${this.campo.nome} é obrigatório`);

        this.isSuccess = this.errorMessages.length === 0;
        return this;
        
    }
    
    function isNotNull() {
        if (!this.campo.valor)
            this.errorMessages.push(`O Campo ${this.campo.nome} é obrigatório`);

        this.isSuccess = this.errorMessages.length === 0;
        return this;
    }

    function length(max, min) {
        if (!this.campo.valor) return this;

        min = min || 1;
        if (this.campo.valor.length < min || this.campo.valor.length > max)
            this.errorMessages.push(`O Campo ${this.campo.nome} deve ter entre ${min} e ${max} caracters.`);

        this.isSuccess = this.errorMessages.length === 0;
        return this;
    }

    function isEmail() {
        if (!(/^([\w\d]+[\.\-\_]?[\w\d]{1})+\@[\w\d]+(\.[\w]{2,3}){1,2}$/.test(this.campo.valor)))
            this.errorMessages.push(`Email inválido.`);

        this.isSuccess = this.errorMessages.length === 0;
        return this;
    }

    function isInt() {
        if (isNaN(this.campo.valor))
            this.errorMessages.push(`Campo ${this.campo.nome} inválido`);

        this.isSuccess = this.errorMessages.length === 0;
        return this;
    }

    function equals(compare, message) {
        if (this.campo.valor != compare)
            this.errorMessages.push(message || `Campo ${this.campo.nome} não confere.`);

        this.isSuccess = this.errorMessages.length === 0;
        return this;
    }

    /// AUXILIARES

    function field(valor, nome) {
        this.campo = { nome, valor };
        return this;
    }

    function addMessage(msg) {
        this.errorMessages.push(msg);
        this.isSuccess = this.errorMessages.length === 0;
        return this;
    }

    function get() {
        return {
            errorMessages: this.errorMessages,
            statusCode: this.statusCode,
            content: this.content,
            isSuccess: this.isSuccess
        };
    }
}

global.responseScope = scope;
