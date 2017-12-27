import * as CARD from './card';
import * as scoring from './scoring';

describe('Scoring', () => {

  describe('General scoring', () => {

    it('should compute the total score with details', () => {
      const game = {
        militaryConflicts: [1, 2, 3, -1],
        civilianCards: [
          CARD.create(CARD.CIVILIAN.VP, 1),
          CARD.create(CARD.CIVILIAN.VP, 2),
          CARD.create(CARD.CIVILIAN.VP, 3),
          CARD.create(CARD.CIVILIAN.VP, 4)
        ]
      };
      const leftGame = {};
      const rightGame = {};
      expect(scoring.scoreGame(game, leftGame, rightGame)).toMatchObject({
        military: 5,
        treasury: 0,
        wonder: 0,
        civilian: 10,
        scientific: 0,
        commercial: 0,
        guilds: 0,
        total: 15
      });
    });
  });

  describe('Score military conflicts', () => {
    it('should compute the military score when the game has military conflict', () => {
      const score = scoring.scoreMilitary([1, 2, 3, 4, -2, -5, -1]);
      expect(score).toBe(2);
    });

    it('should compute the military score to zero when no parameter is given', () => {
      expect(scoring.scoreMilitary()).toBe(0);
      expect(scoring.scoreMilitary(undefined)).toBe(0);
      expect(scoring.scoreMilitary([])).toBe(0);
    });
  });

  describe('Score treasury contents', () => {
    it('should compute the treasury score when the game has treasury', () => {
      const score = scoring.scoreTreasury([3, 3, 3, 3, 3, 6, 6, 6, 6, 1, 1, 1, 1, 1]);
      expect(score).toBe(14);
    });

    it('should compute the treasury score to zero when no parameter is given', () => {
      expect(scoring.scoreTreasury()).toBe(0);
      expect(scoring.scoreTreasury(undefined)).toBe(0);
      expect(scoring.scoreTreasury([])).toBe(0);
    });
  });

  describe('Score wonder', () => {
    it('should compute the wonder score when the game has wonder', () => {
      const wonder = [
        CARD.create(CARD.WONDER.VP, 3),
        CARD.create(CARD.WONDER.VP, 6),
        CARD.create(CARD.WONDER.VP, 4),
        CARD.create(CARD.WONDER.GENERAL)
      ];
      expect(scoring.scoreWonder(wonder)).toBe(13);
    });

    it('should compute the wonder score to zero when no parameter is given', () => {
      expect(scoring.scoreWonder()).toBe(0);
      expect(scoring.scoreWonder(undefined)).toBe(0);
      expect(scoring.scoreWonder([])).toBe(0);
    });
  });

  describe('Score civilian sctructures', () => {
    it('should compute the civilian score when the game has civilian structures', () => {
      const score = scoring.scoreCivilian([
        CARD.create(CARD.CIVILIAN.VP, 3),
        CARD.create(CARD.CIVILIAN.VP, 5),
        CARD.create(CARD.CIVILIAN.VP, 6),
        CARD.create(CARD.CIVILIAN.VP, 8)
      ]);
      expect(score).toBe(22);
    });

    it('should compute the civilian score to zero when no parameter is given', () => {
      expect(scoring.scoreCivilian()).toBe(0);
      expect(scoring.scoreCivilian(undefined)).toBe(0);
      expect(scoring.scoreCivilian([])).toBe(0);
    });
  });

  describe('Score scientific cards', () => {
    const T = CARD.create(CARD.SCIENTIFIC.TABLET);
    const G = CARD.create(CARD.SCIENTIFIC.GEAR);
    const C = CARD.create(CARD.SCIENTIFIC.COMPASS);
    const gameWithNoJoker = {
      scientificCards: [
        C, C, C, C,
        G, G, G,
        T, T
      ]
    };
    const gameWithOneJoker = { guildCards: [CARD.create(CARD.GUILD_TABLET_COMPASS_GEAR)] };
    const gameWithTwoJokers = {
      guildCards: [CARD.create(CARD.GUILD_TABLET_COMPASS_GEAR)],
      wonder: [CARD.create(CARD.WONDER.TABLET_COMPASS_GEAR)]
    };

    it('should compute the scientific score without joker', () => {
      expect(scoring.scoreScientific(gameWithNoJoker)).toBe(43);
    });

    it('should compute the scientific score with ONE joker, there are 4 tablets more than other symbols', () => {
      expect(scoring.scoreScientific({
        ...gameWithOneJoker,
        scientificCards: [
          T, T, T, T, T,
          G, G,
          C
        ]
      })).toBe(48);
    });

    it('should compute the scientific score with ONE joker, there is room for more lines', () => {
      expect(scoring.scoreScientific({
        ...gameWithOneJoker,
        scientificCards: [
          T, T, T,
          G, G,
          C
        ]
      })).toBe(31);
    });

    it('should compute the scientific score with ONE joker, there no room for another line', () => {
      expect(scoring.scoreScientific({
        ...gameWithOneJoker,
        scientificCards: [
          T, T, T,
          G,
          C
        ]
      })).toBe(25);
    });

    it('should compute the scientific score with TWO joker, there are 3 tablets more than other symbols', () => {
      expect(scoring.scoreScientific({
        ...gameWithTwoJokers,
        scientificCards: [
          T, T, T, T,
          G, G, G,
          C
        ]
      })).toBe(55);
    });

    it('should compute the scientific score with TWO joker, there is room for one more line', () => {
      expect(scoring.scoreScientific({
        ...gameWithTwoJokers,
        scientificCards: [
          T, T, T,
          G, G,
          C
        ]
      })).toBe(38);
    });

    it('should compute the scientific score with TWO joker, there is room for two more line', () => {
      expect(scoring.scoreScientific({
        ...gameWithTwoJokers,
        scientificCards: [
          T, T, T,
          G, G, G,
          C
        ]
      })).toBe(48);
    });

    it('should compute the scientific score with TWO joker, there no room for another line', () => {
      expect(scoring.scoreScientific({
        ...gameWithTwoJokers,
        scientificCards: [
          T, T, T,
          G,
          C
        ]
      })).toBe(34);
    });

    it('should compute the scientific score to zero when no parameter is given', () => {
      expect(scoring.scoreScientific()).toBe(0);
      expect(scoring.scoreScientific(undefined)).toBe(0);
      expect(scoring.scoreScientific({})).toBe(0);
    });
  });

  describe('Score commercial structures', () => {
    const game = {
      rawgoodsCards: [CARD.create(CARD.RAW_GOODS.ANY), CARD.create(CARD.RAW_GOODS.ANY), CARD.create(CARD.RAW_GOODS.ANY)],
      manufacturedgoodsCards: [CARD.create(CARD.MANUFACTURED_GOODS.ANY), CARD.create(CARD.MANUFACTURED_GOODS.ANY)],
      commercialCards: [CARD.create(CARD.COMMERCIAL.GENERAL)],
      wonder: [CARD.create(CARD.WONDER.GENERAL), CARD.create(CARD.WONDER.GENERAL), CARD.create(CARD.WONDER.GENERAL)]
    };

    it('should compute the commercial score with all special commercial cards', () => {
      expect(scoring.scoreCommercial({
        ...game,
        commercialCards: [
          ...game.commercialCards,
          CARD.create(CARD.COMMERCIAL.VP1_OWN_COMMERICAL),
          CARD.create(CARD.COMMERCIAL.VP1_OWN_MANUFACTUREDGOODS),
          CARD.create(CARD.COMMERCIAL.VP1_OWN_RAWGOODS),
          CARD.create(CARD.COMMERCIAL.VP1_OWN_WONDER)
        ]
      })).toBe(13);
    });

    it('should compute zero as commercial score with no special commercial cards', () => {
      expect(scoring.scoreCommercial(game)).toBe(0);
    });

    it('should compute the commercial score to zero when no parameter is given', () => {
      expect(scoring.scoreCommercial()).toBe(0);
      expect(scoring.scoreCommercial(undefined)).toBe(0);
      expect(scoring.scoreCommercial({})).toBe(0);
    });
  });

  describe('Score guilds', () => {
    const game = {
      militaryConflicts: [1, 2, 3, 4, -1, -2, -4],
      militaryCards: [CARD.create(CARD.MILITARY), CARD.create(CARD.MILITARY)],
      civilianCards: [
        CARD.create(CARD.CIVILIAN.VP, 1),
        CARD.create(CARD.CIVILIAN.VP, 2),
        CARD.create(CARD.CIVILIAN.VP, 3),
        CARD.create(CARD.CIVILIAN.VP, 4)
      ],
      rawgoodsCards: [CARD.create(CARD.RAW_GOODS.ANY), CARD.create(CARD.RAW_GOODS.ANY), CARD.create(CARD.RAW_GOODS.ANY)],
      manufacturedgoodsCards: [CARD.create(CARD.MANUFACTURED_GOODS.ANY), CARD.create(CARD.MANUFACTURED_GOODS.ANY)],
      commercialCards: [CARD.create(CARD.COMMERCIAL.GENERAL)],
      wonder: [CARD.create(CARD.WONDER.GENERAL), CARD.create(CARD.WONDER.GENERAL), CARD.create(CARD.WONDER.GENERAL)]
    };
    const leftGame = {
      militaryCards: [CARD.create(CARD.MILITARY), CARD.create(CARD.MILITARY)],
      civilianCards: [
        CARD.create(CARD.CIVILIAN.VP, 1),
        CARD.create(CARD.CIVILIAN.VP, 2),
        CARD.create(CARD.CIVILIAN.VP, 3),
        CARD.create(CARD.CIVILIAN.VP, 4)
      ],
      rawgoodsCards: [CARD.create(CARD.RAW_GOODS.ANY), CARD.create(CARD.RAW_GOODS.ANY)],
      manufacturedgoodsCards: [CARD.create(CARD.MANUFACTURED_GOODS.ANY)],
      commercialCards: [CARD.create(CARD.COMMERCIAL.GENERAL)],
      guildCards: [CARD.create(CARD.GUILD.VP1_NEIGHBOR_CIVILIAN)]
    };
    const rightGame = {
      militaryConflicts: [1, 2, 3, 4, -1, -2, -4],
      rawgoodsCards: [CARD.create(CARD.RAW_GOODS.ANY), CARD.create(CARD.RAW_GOODS.ANY), CARD.create(CARD.RAW_GOODS.ANY)],
      wonder: [CARD.create(CARD.WONDER.GENERAL), CARD.create(CARD.WONDER.GENERAL), CARD.create(CARD.WONDER.GENERAL)],
      guildCards: [CARD.create(CARD.GUILD.VP1_ALL_WONDER)]
    };


    it('should compute the guilds score with all the guilds', () => {
      expect(scoring.scoreGuilds({
        ...game,
        guildCards: [
          CARD.create(CARD.GUILD.VP1_ALL_WONDER),
          CARD.create(CARD.GUILD.VP1_NEIGHBOR_CIVILIAN),
          CARD.create(CARD.GUILD.VP1_NEIGHBOR_COMMERCIAL),
          CARD.create(CARD.GUILD.VP1_NEIGHBOR_DEFEAT),
          CARD.create(CARD.GUILD.VP1_NEIGHBOR_MILITARY),
          CARD.create(CARD.GUILD.VP1_NEIGHBOR_RAWGOODS),
          CARD.create(CARD.GUILD.VP1_OWN_RAWGOODS_MANUFACTUREDGOODS_GUILD),
          CARD.create(CARD.GUILD.VP2_NEIGHBOR_MANUFACTUREDGOODS),
          CARD.create(CARD.GUILD.TABLET_COMPASS_GEAR)
        ]
      }, leftGame, rightGame)).toBe(37);
    });

    it('should compute the highest possible guilds score with exchange guild card', () => {
      expect(scoring.scoreGuilds({
        ...game,
        wonder: [...game.wonder, CARD.create(CARD.WONDER.GUILD_EXCHANGE)]
      }, leftGame, rightGame)).toBe(7);
    });

    it('should compute zero as guilds score with no guilds cards', () => {
      expect(scoring.scoreGuilds(game, leftGame, rightGame)).toBe(0);
    });

    it('should compute the guilds score to zero when no parameter is given', () => {
      expect(scoring.scoreGuilds()).toBe(0);
      expect(scoring.scoreGuilds(undefined)).toBe(0);
    });
  });

});