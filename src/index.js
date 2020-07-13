import "./style.css";
import "./images/close.svg";
import { cardMarkup, imgPopupMarkup, editPopupMarkup, addCardPopupMarkup, avatarPopupMarkup, options } from './js/data/data.js';
import Api from './js/classes/Api.js';
import PopupUtility from './js/classes/PopupUtility.js';
import CardList from './js/classes/CardList.js';
import Card from './js/classes/Card.js';
import FormValidator from './js/classes/FormValidator.js';
import UserInfo from './js/classes/UserInfo.js';

(function () {

  const api = new Api(options);
  
  const popup = document.querySelector('.popup');
  const nameElem = document.querySelector('.user-info__name');
  const aboutElem = document.querySelector('.user-info__job');
  const addCardButton = document.querySelector('.user-info__button');
  const editButton = document.querySelector('.user-info__edit');
  const avatarImg = document.querySelector('.user-info__photo');

  const editPopup = new PopupUtility(popup, editPopupMarkup);
  const formProfile = editPopup.popupContainer.querySelector('form[name="profile"]');
  const profileFormValidator = new FormValidator(formProfile);

  const avatarPopup = new PopupUtility(popup, avatarPopupMarkup);
  const formAvatar = avatarPopup.popupContainer.querySelector('form[name="changeAvatar"]');
  const avatarformValidator = new FormValidator(formAvatar);

  const addCardPopup = new PopupUtility(popup, addCardPopupMarkup);
  const formAddCard = addCardPopup.popupContainer.querySelector('form[name="add"]');
  const addFormValidator = new FormValidator(formAddCard);

  const placesList = {};
  const userInfo = {};

  /****************************** Функции *************************************/

  const openImgPopup = (cardLink) => {
    const imgPopup = new PopupUtility(popup, imgPopupMarkup);
    imgPopup.addImg(cardLink);
    imgPopup.open();
  }

  const showError = (err) => {
    alert(`Возникла ошибка: ${err}`)
  }

  const newCard = (objCard, cardMarkup, openImgPopup, api, showError, nameElem) => {
    const card = new Card(objCard, cardMarkup, openImgPopup, api, showError, nameElem);
    return card.create();
  }

  const showDeleteButton = (cardObj, cardElem) => {
    if(cardObj.owner.name === nameElem.textContent) {
      cardElem.querySelector('.place-card__delete-icon').classList.add('place-card__delete-icon_my')
    }
  }

  const showButtonText = (form, text) => {
    form.querySelector('button').textContent = text;
  };

  const setupFontSize = (form, sizeToAdd, sizeToRemove) => {
    form.querySelector('button').classList.add(`popup__button_font-size-${sizeToAdd}`);
    form.querySelector('button').classList.remove(`popup__button_font-size-${sizeToRemove}`);
  };

  /****************************** Код Программы *************************************/

  api.getAvatar().then((res) => {
    avatarImg.style.backgroundImage = `url('${res.avatar}')`;
  })
  .catch(err => showError(err));

  api.getUserInfo().then(res => {
    nameElem.textContent = res.name;
    aboutElem.textContent = res.about;
  })
  .catch(err => showError(err));

  placesList.container = new CardList(document.querySelector('.places-list'), newCard, showDeleteButton, api, showError, nameElem);
  api.getInitialCards().then(res => {
    placesList.container.render(cardMarkup, openImgPopup, res);
  })
  .catch(err => showError(err));
 
  /****************************** Слушатели событий *************************************/

  avatarImg.addEventListener('click', () => {
    avatarPopup.open();
    formAvatar.reset();
    showButtonText(formAvatar, 'Сохранить');
    avatarformValidator.checkInitialInputValidity();
    avatarformValidator.resetErrorMsg();
  });

  formAvatar.addEventListener('submit', (event) => {
    event.preventDefault();
    const link = avatarPopup.getLink()
    api.changeAvatar(link)
      .then(showButtonText(formAvatar, 'Загрузка...'))
      .then(() => {
        avatarImg.style.backgroundImage = `url('${link}')`;
        avatarPopup.close();
      })
      .catch(err => showError(err));
  });

  editButton.addEventListener('click', () => {
    userInfo.info = new UserInfo(nameElem, aboutElem);
    showButtonText(formProfile, 'Сохранить');
    editButton.blur();
    editPopup.addUserInfo(userInfo.info.getUserInfo());
    editPopup.open();
    profileFormValidator.checkInitialInputValidity();
  });

  formProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    userInfo.info.setUserInfo(editPopup.getUserInfo());
    api.editUserInfo(editPopup.getUserInfo())
      .then(showButtonText(formProfile, 'Загрузка...'))
      .then(() => {
        userInfo.info.updateUserInfo();
        editPopup.close();
        event.target.reset();
      })
      .catch(err => showError(err));
  });

  addCardButton.addEventListener('click', () => {
    addCardButton.blur();
    setupFontSize(formAddCard, 'l', 's');
    showButtonText(formAddCard, '+');
    addCardPopup.open();
    formAddCard.reset();
    addFormValidator.checkInitialInputValidity();
    addFormValidator.resetErrorMsg();
  });

  formAddCard.addEventListener('submit', (event) => {
    event.preventDefault();
    api.addCard(addCardPopup.getObjCard())
      .then(setupFontSize(formAddCard, 's', 'l'))
      .then(showButtonText(formAddCard, 'Загрузка...'))
      .then(res => {
        const cardElem = newCard(res, cardMarkup, openImgPopup, api, showError, nameElem);
        cardElem.querySelector('.place-card__like-count').textContent = res.likes.length;
        showDeleteButton(res, cardElem);
        placesList.container.addCard(cardElem);
        addCardPopup.close();
      })
    .catch(err => showError(err));
  });
})();

