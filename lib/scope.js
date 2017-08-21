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
    this.isCpf = isCpf;
    this.isCnpj = isCnpj;

    /// VALIDAÇÕES

    function isNotEmpty(message) {

        if (!this.campo.valor || !this.campo.valor.length)
            this.errorMessages.push(message || `O Campo ${this.campo.nome} é obrigatório`);

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
            this.errorMessages.push(`Email ${this.campo.valor} inválido.`);

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

    function isCpf() {
        let valid = true;
        if (!this.campo.valor)
            valid = false;

        this.campo.valor = this.campo.valor.replace(/[^\d]+/g, '');

        if (this.campo.valor.length != 11) valid = false;

        var Soma;
        var Resto;
        Soma = 0;
        if (this.campo.valor == "00000000000" ||
            this.campo.valor == "11111111111" ||
            this.campo.valor == "22222222222" ||
            this.campo.valor == "33333333333" ||
            this.campo.valor == "44444444444" ||
            this.campo.valor == "55555555555" ||
            this.campo.valor == "66666666666" ||
            this.campo.valor == "77777777777" ||
            this.campo.valor == "88888888888" ||
            this.campo.valor == "99999999999") valid = false;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(this.campo.valor.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(this.campo.valor.substring(9, 10))) valid = false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(this.campo.valor.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(this.campo.valor.substring(10, 11))) valid = false;

        if (!valid) this.errorMessages.push(`CPF inválido.`);

        this.isSuccess = this.errorMessages.length === 0;
        return this;
    }

    function isCnpj() {
        let valid = true;
        if (!this.campo.valor) valid = false;

        this.campo.valor = this.campo.valor.replace(/[^\d]+/g, '');

        if (this.campo.valor.length != 14) valid = false;

        if (this.campo.valor == "00000000000000" ||
            this.campo.valor == "11111111111111" ||
            this.campo.valor == "22222222222222" ||
            this.campo.valor == "33333333333333" ||
            this.campo.valor == "44444444444444" ||
            this.campo.valor == "55555555555555" ||
            this.campo.valor == "66666666666666" ||
            this.campo.valor == "77777777777777" ||
            this.campo.valor == "88888888888888" ||
            this.campo.valor == "99999999999999") valid = false;

        tamanho = this.campo.valor.length - 2;
        numeros = this.campo.valor.substring(0, tamanho);
        digitos = this.campo.valor.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            valid = false;

        tamanho = tamanho + 1;
        numeros = this.campo.valor.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            valid = false;

        if (!valid) this.errorMessages.push(`CNPJ inválido.`);

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
