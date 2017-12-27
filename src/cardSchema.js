import Joi from 'joi';
import * as CARD from './card';

const civilianCardSchema = Joi.object().keys({
  type: Joi.string().only(CARD.CIVILIAN).required(),
  victoryPoints: Joi.number().integer().positive().required()
});
const wonderCardSchema = Joi.object().keys({
  type: Joi.string().only(CARD.WONDER).required(),
  victoryPoints: Joi.number().integer().positive().when(
    'type', { is: Joi.string().only(CARD.WONDER.VP), then: Joi.required() }
  )
});
const scientificCardSchema = Joi.object().keys({
  type: Joi.string().only(CARD.SCIENTIFIC).required()
});
const commercialCardSchema = Joi.object().keys({
  type: Joi.string().only(CARD.COMMERCIAL).required()
});
const rawgoodsCardSchema = Joi.object().keys({
  type: Joi.string().only(CARD.RAW_GOODS).required()
});
const manufacturedgoodsCardSchema = Joi.object().keys({
  type: Joi.string().only(CARD.MANUFACTURED_GOODS).required()
});
const militaryCardSchema = Joi.object().keys({
  type: Joi.string().only(CARD.MILITARY).required()
});
const guildCardSchema = Joi.object().keys({
  type: Joi.string().only(CARD.GUILD).required()
});

export const gameSchema = Joi.object().keys({
  militaryConflicts: Joi.array().items(Joi.number().integer()),
  treasure: Joi.array().items(Joi.number().integer().positive()),
  civilianCards: Joi.array().items(civilianCardSchema),
  wonder: Joi.array().items(wonderCardSchema),
  scientificCards: Joi.array().items(scientificCardSchema),
  guildCards: Joi.array().items(guildCardSchema),
  commercialCards: Joi.array().items(commercialCardSchema),
  rawgoodsCards: Joi.array().items(rawgoodsCardSchema),
  manufacturedgoodsCards: Joi.array().items(manufacturedgoodsCardSchema),
  militaryCards: Joi.array().items(militaryCardSchema)
});