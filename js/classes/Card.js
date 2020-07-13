class Card {
  constructor(objCard, markup, func, api, showError, nameElem) {
    this._nameElem = nameElem;
    this._name = objCard.name;
    this._link = objCard.link;
    this._likes = objCard.likes.length;
    this._hasMyLike = objCard.likes.map(likes => likes.name).includes(this._nameElem.textContent);
    this._id = objCard._id;
    this._markup = markup;
    this._func = func;
    this._api = api;
    this._showError = showError; 
  }

  getLink() {
    return this._link;
  }

  _setUpLike() {
    if(this._hasMyLike) {
      this._likeIcon.classList.add('place-card__like-icon_liked');
    }
  }

  create() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-wrap');
    cardContainer.insertAdjacentHTML('afterbegin', this._markup);
    cardContainer.querySelector('.place-card__image').style.backgroundImage = `url(${this._link})`;
    cardContainer.querySelector('.place-card__name').textContent = this._name;
    cardContainer.querySelector('.place-card__like-count').textContent = this._likes;
    this._likeIcon = cardContainer.querySelector('.place-card__like-icon');
    this._deleteIcon = cardContainer.querySelector('.place-card__delete-icon')
    this._img = cardContainer.querySelector('.place-card__image')
    this.cardElement = cardContainer;
    this._setEventListeners();
    this._setUpLike();
    return cardContainer;
  }

  _setEventListeners() {
    this._likeIcon.addEventListener('click', this.handleLike = () => this._like(event, this._id));
    this._deleteIcon.addEventListener('click', this.handleDelete = () => this._delete(event, this._id));
    this._img.addEventListener('click', this.handleImg = () => this._func(this._link));
  }

  _refreshNumberOfLikes(res) {
    this._likes = res.likes.length;
    this.cardElement.querySelector('.place-card__like-count').textContent = this._likes;
  }

  _like(event, id) {
    if(event.target.classList.contains('place-card__like-icon_liked')) {
      this._api.deleteLike(id).then(res => {
        event.target.classList.remove('place-card__like-icon_liked');
        this._refreshNumberOfLikes(res);
      })
      .catch(err => this._showError(err));
    } else {
      this._api.setLike(id).then(res => {
        event.target.classList.add('place-card__like-icon_liked');
        this._refreshNumberOfLikes(res);
      })
      .catch(err => this._showError(err));
    }
  }

  _removeEventListeners() {
    this._likeIcon.removeEventListener('click', this.handleLike);
    this._deleteIcon.removeEventListener('click', this.handleDelete);
    this._img.removeEventListener('click', this.handleImg);
  }

  _delete(event, id) {

    event.stopPropagation();
    if(window.confirm('Вы действительно хотите удалить эту карточку?')) {
      this._api.deleteCard(id).catch(err => this._showError(err));
      this._removeEventListeners();
      event.target.closest('.card-wrap').remove();
      
    }
  }
}