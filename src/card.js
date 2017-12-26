export const create = (type, victoryPoints = 0) => { return { type, victoryPoints }; };

// Goods
export const RAW_GOODS = 'RAW_GOODS';
export const MANUFACTURED_GOODS = 'MANUFACTURED_GOODS';
// Scientific cards
export const SCIENTIFIC_TABLET = 'SCIENTIFIC_TABLET';
export const SCIENTIFIC_COMPASS = 'SCIENTIFIC_COMPASS';
export const SCIENTIFIC_GEAR = 'SCIENTIFIC_GEAR';
// Civilian
export const CIVILIAN_VP = 'CIVILIAN_VP';
// Wonder
export const WONDER_GENERAL = 'WONDER_GENERAL';
export const WONDER_VP = 'WONDER_VP';
export const WONDER_GUILD_EXCHANGE = 'WONDER_GUILD_EXCHANGE';
export const WONDER_TABLET_COMPASS_GEAR = 'WONDER_TABLET_COMPASS_GEAR';
// Commercial cards
export const COMMERCIAL_GENERAL = 'COMMERCIAL_GENERAL';
export const COMMERCIAL_1VP_OWN_RAWGOODS = 'COMMERCIAL_1VP_OWN_RAWGOODS';
export const COMMERCIAL_1VP_OWN_MANUFACTUREDGOODS = 'COMMERCIAL_1VP_OWN_MANUFACTUREDGOODS';
export const COMMERCIAL_1VP_OWN_COMMERICAL = 'COMMERCIAL_1VP_OWN_COMMERICAL';
export const COMMERCIAL_1VP_OWN_WONDER = 'COMMERCIAL_1VP_OWN_WONDER';
// Guilds
export const GUILD_1VP_NEIGHBOR_MILITARY = 'GUILD_1VP_NEIGHBOR_MILITARY';
export const GUILD_1VP_NEIGHBOR_CIVILIAN = 'GUILD_1VP_NEIGHBOR_CIVILIAN';
export const GUILD_1VP_NEIGHBOR_RAWGOODS = 'GUILD_1VP_NEIGHBOR_RAWGOODS';
export const GUILD_2VP_NEIGHBOR_MANUFACTUREDGOODS = 'GUILD_2VP_NEIGHBOR_MANUFACTUREDGOODS';
export const GUILD_1VP_NEIGHBOR_COMMERCIAL = 'GUILD_1VP_NEIGHBOR_COMMERCIAL';
export const GUILD_1VP_ALL_WONDER = 'GUILD_1VP_ALL_WONDER';
export const GUILD_1VP_OWN_RAWGOODS_MANUFACTUREDGOODS_GUILD = 'GUILD_1VP_OWN_RAWGOODS_MANUFACTUREDGOODS_GUILD';
export const GUILD_1VP_NEIGHBOR_DEFEAT = 'GUILD_1VP_NEIGHBOR_DEFEAT';
export const GUILD_TABLET_COMPASS_GEAR = 'GUILD_TABLET_COMPASS_GEAR';
