import {
  UPDATE_MAFIA_ROLES,
  UPDATE_VILLAGE_ROLES,
  UPDATE_PLAYER_NAMES,
  UPDATE_ALLOCATION,
} from "../constants";

export const updateMafia = (mafiaRoles) => ({
  type: UPDATE_MAFIA_ROLES,
  payload: { mafiaRoles },
});

export const updateVillage = (villageRoles) => ({
  type: UPDATE_VILLAGE_ROLES,
  payload: { villageRoles },
});

export const updatePlayers = (playerNames) => ({
  type: UPDATE_PLAYER_NAMES,
  payload: { playerNames },
});

export const updateAllocation = (allocation) => ({
  type: UPDATE_ALLOCATION,
  payload: { allocation },
});
