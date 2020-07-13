class FormValidator {
  constructor(form) {
    this._form = form;
  }
 
  checkInitialInputValidity() {
    Array.from(this._form.elements).forEach(input => {
      const errorMsgElem = this._form.querySelector(`.popup__error[data-for="${input.name}"]`);
      if(!input.classList.contains('button')) {
        this._checkInputValidity(input, 'text', errorMsgElem);
        this._setEventListeners(input, errorMsgElem);
      }
    });
  }

  _setEventListeners(input ,errorMsg) {
    input.addEventListener('input', () => this._checkInputValidity(input, 'text', errorMsg));  
  }

  _checkInputValidity(input, type, errorMsgElem) {
    const form = input.closest('.popup__form');
    if(type === 'text') {
      if(input.validity.valueMissing) {
        errorMsgElem.textContent = 'Это обязательное поле';
      } else if(input.validity.patternMismatch) {
        errorMsgElem.textContent = 'Здесь должна быть ссылка';
      } else if(input.validity.tooShort || input.validity.tooLong) {
        errorMsgElem.textContent = 'Должно быть от 2 до 30 символов';
      } else if(input.validity.valid) {
        errorMsgElem.textContent = '';
      }
    }
    this._setSubmitButtonState(form);
  }

  resetErrorMsg() {
    this._form.querySelectorAll('.popup__error').forEach(error => error.textContent = '');
  }

  _setSubmitButtonState(form) {
    const button = form.querySelector('button');
    if(form.checkValidity()) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
  }
}