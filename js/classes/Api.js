class Api {
  constructor(options){
    this._baseUrl = options.baseUrl;
    this._headerAuthorization = options.headers.authorization;
    this._headerContentType = options.headers['Content-Type'];
  }

  _checkIfOk(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._headerAuthorization,
      }
    })
    .then(res => this._checkIfOk(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._headerAuthorization,
      }
    })
    .then(res => this._checkIfOk(res));
  }

  editUserInfo(userInfoObj) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._headerContentType
      },
      body: JSON.stringify({
        name: userInfoObj.name,
        about: userInfoObj.about,
      })
    })
    .then(res => this._checkIfOk(res));
  }

  addCard(cardObj) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._headerContentType
      },
      body: JSON.stringify({
        name: cardObj.name,
        link: cardObj.link,
      })
    })
    .then(res => this._checkIfOk(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._headerContentType
      }
    })
    .then(res => this._checkIfOk(res));
  }
  
  setLike(id) {
    return fetch(`${this._baseUrl}/cards/like/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._headerContentType
      }
    })
    .then(res => this._checkIfOk(res));
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/like/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._headerContentType
      }
    })
    .then(res => this._checkIfOk(res));
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._headerContentType
      },
      body: JSON.stringify({
        avatar: link,
      })
    })
    .then(res => this._checkIfOk(res));
  }

  getAvatar() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._headerContentType
      }
    })
    .then(res => this._checkIfOk(res));
  }
}