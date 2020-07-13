class PopupUtility extends Popup {
  constructor(container, popupMarkup) {
    super(container, popupMarkup);
    this._name = this.popupContainer.querySelector('.popup__input_type_name');
    this._link = this.popupContainer.querySelector('.popup__input_type_link-url');
    this._about = this.popupContainer.querySelector('.popup__input_type_about');
  }

  addImg(imgUrl) {
    this.popupContainer.querySelector('.popup__img').src = imgUrl;
  }

  addUserInfo(objUserInfo) {
    this._name.value = objUserInfo.name;
    this._about.value = objUserInfo.about;
  }
  getObjCard() {
    return {
      name: this._name.value,
      link: this._link.value,
    }
  }

  getUserInfo() {
    return {
      name: this._name.value,
      about: this._about.value,
    }
  }

  getLink() {
    return this._link.value;
  }
}