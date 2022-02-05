const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createCardValidation, cardIdValidation } = require('../middlewares/cardValidation');

const {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
} = require('../controllers/cards');

router.get('/', auth, getCards);
router.post('/', auth, createCardValidation, createCard);
router.delete('/:cardId', auth, cardIdValidation, deleteCard);
router.put('/:cardId/likes', auth, cardIdValidation, likeCard);
router.delete('/:cardId/likes', auth, cardIdValidation, dislikeCard);

module.exports = router;
