import {
  UPDATE_MAFIA_ROLES,
  UPDATE_VILLAGE_ROLES,
  UPDATE_PLAYER_NAMES,
  UPDATE_ALLOCATION,
  UPDATE_PLAYER_CHANNELS,
  SHOW_TOAST,
  HIDE_TOAST
} from "../constants";

export const updateMafia = mafiaRoles => ({
  type: UPDATE_MAFIA_ROLES,
  payload: { mafiaRoles }
});

export const updateVillage = villageRoles => ({
  type: UPDATE_VILLAGE_ROLES,
  payload: { villageRoles }
});

export const updatePlayers = playerNames => ({
  type: UPDATE_PLAYER_NAMES,
  payload: { playerNames }
});

export const updateAllocation = allocation => ({
  type: UPDATE_ALLOCATION,
  payload: { allocation }
});

export const updatePlayerChannels = playerChannels => ({
  type: UPDATE_PLAYER_CHANNELS,
  payload: { playerChannels }
});

export const showToast = (body, autoHide, header) => ({
  type: SHOW_TOAST,
  payload: {
    toast: {
      show: true,
      autoHide,
      header,
      body
    }
  }
});

export const hideToast = () => ({
  type: HIDE_TOAST,
  payload: {
    toast: {
      show: false,
      header: "",
      body: ""
    }
  }
});
