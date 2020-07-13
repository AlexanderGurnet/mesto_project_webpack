class UserInfo {
  constructor(nameElem, aboutElem) {
    this._name = nameElem.textContent;
    this._about = aboutElem.textContent;
    this._nameElem = nameElem;
    this._aboutElem = aboutElem;
  }

  setUserInfo(objUserInfo) {
    this._name = objUserInfo.name;
    this._about = objUserInfo.about;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
    }
  }

  updateUserInfo() {
    this._nameElem.textContent = this._name;
    this._aboutElem.textContent = this._about;
  }
}