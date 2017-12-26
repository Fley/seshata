import * as CARD from './card.js';

const scoreGame = (game = {}, leftGame = {}, rightGame = {}) => {
  const score = {
    military: scoreMilitary(game.militaryConflicts),
    treasury: scoreTreasury(game.treasury),
    wonder: scoreWonder(game.wonder),
    civilian: scoreCivilian(game.civilianCards),
    scientific: scoreScientific(game),
    commercial: scoreCommercial(game),
    guilds: scoreGuilds(game, leftGame, rightGame)
  };
  return { ...score, total: Object.values(score).reduce(sum, 0) };
};

export default scoreGame;

const sum = (a, b) => a + b;
const sumVictoryPoints = (score, card) => score + (card.victoryPoints || 0);
const addPointsPerCard = (pointPerCard = 1) => (score = 0, cards = []) => score + pointPerCard * cards.length;
const isMilitaryConflictDefeat = militaryConflict => militaryConflict < 0;

export const scoreMilitary = (militaryConflicts = []) => militaryConflicts.reduce(sum, 0);

export const scoreTreasury = (treasury = []) => Math.floor(treasury.reduce(sum, 0) / 3);

export const scoreWonder = (wonder = []) => wonder.reduce(sumVictoryPoints, 0);

export const scoreCivilian = (civilianCards = []) => civilianCards.reduce(sumVictoryPoints, 0);

export const scoreScientific = (game = {}) => {
  const { scientificCards = [], wonder = [], guildCards = [] } = game;
  const scientificJokers = [
    ...wonder.filter(card => card.type === CARD.WONDER_TABLET_COMPASS_GEAR),
    ...guildCards.filter(card => card.type === CARD.GUILD_TABLET_COMPASS_GEAR)
  ];

  const countByTypes = scientificCards.reduce((types, card) => {
    return {
      tablet: types.tablet + (card.type === CARD.SCIENTIFIC_TABLET ? 1 : 0),
      gear: types.gear + (card.type === CARD.SCIENTIFIC_GEAR ? 1 : 0),
      compass: types.compass + (card.type === CARD.SCIENTIFIC_COMPASS ? 1 : 0)
    };
  }, {
      tablet: 0,
      gear: 0,
      compass: 0
    });

  if (scientificJokers.length === 1) {
    const symbols = [
      { type: CARD.SCIENTIFIC_TABLET, count: countByTypes.tablet },
      { type: CARD.SCIENTIFIC_GEAR, count: countByTypes.gear },
      { type: CARD.SCIENTIFIC_COMPASS, count: countByTypes.compass }
    ].sort((a, b) => a.count - b.count);
    if (symbols[2].count - symbols[0].count >= 4 || symbols[1].count === symbols[0].count) {
      // Difference between max and min is greater or equals to 4 OR no room for more lines, add joker to bigger
      symbols[2].count++;
    } else {
      symbols[0].count++;
    }
    return applyScientificScoring(...symbols.map(s => s.count));
  } else if (scientificJokers.length === 2) {
    return Math.max(
      applyScientificScoring(countByTypes.tablet + 2, countByTypes.gear, countByTypes.compass),
      applyScientificScoring(countByTypes.tablet, countByTypes.gear + 2, countByTypes.compass),
      applyScientificScoring(countByTypes.tablet, countByTypes.gear, countByTypes.compass + 2),
      applyScientificScoring(countByTypes.tablet + 1, countByTypes.gear + 1, countByTypes.compass),
      applyScientificScoring(countByTypes.tablet + 1, countByTypes.gear, countByTypes.compass + 1),
      applyScientificScoring(countByTypes.tablet, countByTypes.gear + 1, countByTypes.compass + 1)
    );
  } else {
    return applyScientificScoring(countByTypes.tablet, countByTypes.gear, countByTypes.compass);
  }
};

const applyScientificScoring = (...countByTypes) =>
  countByTypes.reduce((s, count) => s + Math.pow(count, 2), 0) + Math.min(...countByTypes) * 7;

export const scoreCommercial = (game = {}) =>
  !game.commercialCards ? 0 : game.commercialCards.reduce((commercialScore, commercialCard) => {
    switch (commercialCard.type) {
      case CARD.COMMERCIAL_1VP_OWN_RAWGOODS:
        return addPointsPerCard(1)(commercialScore, game.rawgoodsCards);
      case CARD.COMMERCIAL_1VP_OWN_MANUFACTUREDGOODS:
        return addPointsPerCard(1)(commercialScore, game.manufacturedgoodsCards);
      case CARD.COMMERCIAL_1VP_OWN_COMMERICAL:
        return addPointsPerCard(1)(commercialScore, game.commercialCards);
      case CARD.COMMERCIAL_1VP_OWN_WONDER:
        return addPointsPerCard(1)(commercialScore, game.wonder);
      default:
        return commercialScore;
    }
  }, 0);

export const scoreGuilds = (game = {}, leftGame = {}, rightGame = {}) => {
  const neighborGuilds = (game.wonder || []).find(card => card.type === CARD.WONDER_GUILD_EXCHANGE) ?
    [...(leftGame.guildCards || []), ...(rightGame.guildCards || [])] : [];
  return neighborGuilds.reduce(
    (maxScore, additionalGuildCard) => Math.max(maxScore, applysScoreGuilds({
      ...game,
      guildCards: [...(game.guildCards || []), additionalGuildCard]
    }, leftGame, rightGame)),
    applysScoreGuilds(game, leftGame, rightGame)
  );
};

const applysScoreGuilds = (game = {}, leftGame = {}, rightGame = {}) =>
  !game.guildCards ? 0 : game.guildCards.reduce((guildsScore, guildCard) => {
    switch (guildCard.type) {
      case CARD.GUILD_1VP_ALL_WONDER:
        return [game.wonder, leftGame.wonder, rightGame.wonder].reduce(addPointsPerCard(1), guildsScore);
      case CARD.GUILD_1VP_NEIGHBOR_CIVILIAN:
        return [leftGame.civilianCards, rightGame.civilianCards].reduce(addPointsPerCard(1), guildsScore);
      case CARD.GUILD_1VP_NEIGHBOR_COMMERCIAL:
        return [leftGame.commercialCards, rightGame.commercialCards].reduce(addPointsPerCard(1), guildsScore);
      case CARD.GUILD_1VP_NEIGHBOR_DEFEAT:
        return [
          (leftGame.militaryConflicts || []).filter(isMilitaryConflictDefeat),
          (rightGame.militaryConflicts || []).filter(isMilitaryConflictDefeat)
        ].reduce(addPointsPerCard(1), guildsScore);
      case CARD.GUILD_1VP_NEIGHBOR_MILITARY:
        return [leftGame.militaryCards, rightGame.militaryCards].reduce(addPointsPerCard(1), guildsScore);
      case CARD.GUILD_1VP_NEIGHBOR_RAWGOODS:
        return [leftGame.rawgoodsCards, rightGame.rawgoodsCards].reduce(addPointsPerCard(1), guildsScore);
      case CARD.GUILD_1VP_OWN_RAWGOODS_MANUFACTUREDGOODS_GUILD:
        return [game.rawgoodsCards, game.manufacturedgoodsCards, game.guildCards]
          .reduce(addPointsPerCard(1), guildsScore);
      case CARD.GUILD_2VP_NEIGHBOR_MANUFACTUREDGOODS:
        return [leftGame.manufacturedgoodsCards, rightGame.manufacturedgoodsCards]
          .reduce(addPointsPerCard(2), guildsScore);
      default:
        return guildsScore;
    }
  }, 0);