class CardList {
  constructor(container, func, showDeleteButton, api, showError, nameElem) {
    this._container = container;
    this._nameElem = nameElem;
    this._func = func;
    this._showDeleteButton = showDeleteButton;
    this._api = api;
    this._showError = showError;
  }

  addCard = (element) => {
    this._container.appendChild(element);
  }
  render = (markup, openPopupImg, cards) => {
    this._cards = cards;
    this._cards.forEach((objCard) => {
      const card = this._func(objCard, markup, openPopupImg, this._api, this._showError, this._nameElem);
      this._showDeleteButton(objCard, card);
      this.addCard(card);
    });
  }
}