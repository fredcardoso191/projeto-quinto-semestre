class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-min-password',
            'data-password-validate',
        ]
    }
    //Iniciar validação dos campos
    validate(form) {
        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }


        let inputs = form.getElementsByTagName('input');

        //Converte HTMLCollections para array
        let inputsArray = [...inputs];

        //Loop nos inputs e validação
        inputsArray.forEach(function(input) {
            for (let i = 0; this.validations.length > i; i++){
                //Verifica se a validação atual existe no input
                if (input.getAttribute(this.validations[i]) != null) {
                    //Limpa a string para virar um método
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    let value = input.getAttribute(this.validations[i]);

                    this[method](input, value);
                }
            }
        }, this);
        
    }

    //Verifica se um input tem um nº mínimo de caractéres
    minlength(input, minValue) {
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caractéres`;

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //Verifica se o input de senha tem um nº mínimo de caractéres
    minpassword(input, minValue) {
        let inputLength = input.value.length;

        let errorMessage = `A senha deve ter ${minValue} ou mais caractéres`;
        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //Verifica se um input passou do limite de caractéres
    maxlength(input, maxValue) {
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caractéres`;

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //Valida emails
    emailvalidate(input) {
        //email@email.com ou .com.br
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail válido`;

        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    //Valida se o campo tem apenas letras
    onlyletters(input) {
        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números nem caractéres especiais`;

        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    //Verifica se o input é requirido
    required(input) {
        let inputValue = input.value;
        if (inputValue === '') {
            let errorMessage = `Este campo é obrigatório`;

            this.printMessage(input, errorMessage);
        }
    }

    //Verifica se dois campos (senhas) são iguais
    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

        if (input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    //Valida o campo de senha
    passwordvalidate(input) {
        //Converte string em array
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for (let i = 0; charArr.length > i; i++) {
            if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if (!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if (uppercases === 0 || numbers === 0) {
            let errorMessage = `A senha precisa de um caractere maiúsculo e um número`;

            this.printMessage(input, errorMessage);
        }
    }

    //Imprime mensagens de erro
    printMessage(input, msg) {

        //Verifica quantidade de erros
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if (errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
    }

    //Limpa as validações da tela
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

//Disparar validação
submit.addEventListener('click', function(e) {
    e.preventDefault();
    validator.validate(form);
})