export const create = (type, victoryPoints = 0) => { return { type, victoryPoints }; };

// Goods
export const RAW_GOODS = { ANY: 'RAW_GOODS_ANY' };
export const MANUFACTURED_GOODS = { ANY: 'MANUFACTURED_GOODS_ANY' };
// Scientific cards
export const SCIENTIFIC = {
  TABLET: 'SCIENTIFIC_TABLET',
  COMPASS: 'SCIENTIFIC_COMPASS',
  GEAR: 'SCIENTIFIC_GEAR'
};
// Civilian
export const CIVILIAN = { VP: 'CIVILIAN_VP' };
// Wonder
export const WONDER = {
  ANY: 'WONDER_ANY',
  VP: 'WONDER_VP',
  GUILD_EXCHANGE: 'WONDER_GUILD_EXCHANGE',
  TABLET_COMPASS_GEAR: 'WONDER_TABLET_COMPASS_GEAR'
};
// Commercial cards
export const COMMERCIAL = {
  ANY: 'COMMERCIAL_ANY',
  VP1_OWN_RAWGOODS: 'COMMERCIAL_1VP_OWN_RAWGOODS',
  VP1_OWN_MANUFACTUREDGOODS: 'COMMERCIAL_1VP_OWN_MANUFACTUREDGOODS',
  VP1_OWN_COMMERICAL: 'COMMERCIAL_1VP_OWN_COMMERICAL',
  VP1_OWN_WONDER: 'COMMERCIAL_1VP_OWN_WONDER'
};
// Guilds
export const GUILD = {
  VP1_NEIGHBOR_MILITARY: 'GUILD_1VP_NEIGHBOR_MILITARY',
  VP1_NEIGHBOR_CIVILIAN: 'GUILD_1VP_NEIGHBOR_CIVILIAN',
  VP1_NEIGHBOR_RAWGOODS: 'GUILD_1VP_NEIGHBOR_RAWGOODS',
  VP2_NEIGHBOR_MANUFACTUREDGOODS: 'GUILD_2VP_NEIGHBOR_MANUFACTUREDGOODS',
  VP1_NEIGHBOR_COMMERCIAL: 'GUILD_1VP_NEIGHBOR_COMMERCIAL',
  VP1_ALL_WONDER: 'GUILD_1VP_ALL_WONDER',
  VP1_OWN_RAWGOODS_MANUFACTUREDGOODS_GUILD: 'GUILD_1VP_OWN_RAWGOODS_MANUFACTUREDGOODS_GUILD',
  VP1_NEIGHBOR_DEFEAT: 'GUILD_1VP_NEIGHBOR_DEFEAT',
  TABLET_COMPASS_GEAR: 'GUILD_TABLET_COMPASS_GEAR'
};
// Military
export const MILITARY = { ANY: 'MILITARY_ANY' };