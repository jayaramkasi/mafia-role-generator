import {
  UPDATE_MAFIA_ROLES,
  UPDATE_VILLAGE_ROLES,
  UPDATE_PLAYER_NAMES,
  UPDATE_ALLOCATION,
  UPDATE_PLAYER_CHANNELS,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_TOAST,
  HIDE_TOAST
} from "../../constants";

const initialState = {
  mafiaRoles: {
    kamikaze: 0,
    framer: 0,
    silencer: 0,
    godfather: 0,
    mafia: 1
  },
  villageRoles: {
    idiot: 0,
    deputy: 0,
    granny: 0,
    creep: 0,
    gravedigger: 0,
    sniper: 0,
    bulletproof: 1,
    doc: 1,
    cop: 1,
    villager: 1,
    twins: 0
  },
  playerNames: [
    { name: "A" },
    { name: "A" },
    { name: "A" },
    { name: "A" },
    { name: "A" }
  ],
  allocation: [
    { alive: true, allotedRole: "cop" },
    { alive: true, allotedRole: "mafia", type: "M" },
    { alive: true, allotedRole: "cop" },
    { alive: true, allotedRole: "cop" },
    { alive: true, allotedRole: "cop" }
  ],
  alert: {
    show: false,
    header: "",
    body: ""
  },
  toast: {
    variant: "success",
    show: false,
    header: "",
    body: ""
  }
};

const rootReducer = (state = initialState, action) =>
  [
    UPDATE_MAFIA_ROLES,
    UPDATE_PLAYER_NAMES,
    UPDATE_VILLAGE_ROLES,
    UPDATE_ALLOCATION,
    UPDATE_PLAYER_CHANNELS,
    SHOW_ALERT,
    HIDE_ALERT,
    SHOW_TOAST,
    HIDE_TOAST
  ].includes(action.type)
    ? { ...state, ...action.payload }
    : state;

export default rootReducer;
