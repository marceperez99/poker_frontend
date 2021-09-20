import { ACTIONS, PHASE } from "./constants";

export default {
  D1: {
    phase: PHASE.PreFlop,
    actions: {
      [ACTIONS.RAISE]: "O2",
      [ACTIONS.CALL]: "O1",
    },
  },
  D2: {
    phase: PHASE.PreFlop,
    actions: {
      [ACTIONS.RAISE]: "O2",
      [ACTIONS.CALL]: "O3",
    },
  },
  O1: {
    phase: PHASE.PreFlop,
    actions: {
      [ACTIONS.CHECK]: "O3",
      [ACTIONS.RAISE]: "D2",
    },
  },
  O2: {
    phase: PHASE.PreFlop,
    actions: {
      [ACTIONS.RAISE]: "D2",
      [ACTIONS.CALL]: "O3",
    },
  },
  O3: {
    phase: PHASE.Flop,
    actions: {
      [ACTIONS.BET]: "D4",
      [ACTIONS.CHECK]: "D3",
    },
  },
  O4: {
    phase: PHASE.Flop,
    actions: {
      [ACTIONS.RAISE]: "D4",
      [ACTIONS.CALL]: "O5",
    },
  },
  D3: {
    phase: PHASE.Flop,
    actions: {
      [ACTIONS.CHECK]: "O5",
      [ACTIONS.BET]: "O4",
    },
  },
  D4: {
    phase: PHASE.Flop,
    actions: {
      [ACTIONS.RAISE]: "O4",
      [ACTIONS.CALL]: "O5",
    },
  },
  O5: {
    phase: PHASE.Turn,
    actions: {
      [ACTIONS.BET]: "D6",
      [ACTIONS.CHECK]: "D5",
    },
  },
  O6: {
    phase: PHASE.Turn,
    actions: {
      [ACTIONS.RAISE]: "D6",
      [ACTIONS.CALL]: "O7",
    },
  },
  D5: {
    phase: PHASE.Turn,
    actions: {
      [ACTIONS.CHECK]: "O7",
      [ACTIONS.BET]: "O6",
    },
  },
  D6: {
    phase: PHASE.Turn,
    actions: {
      [ACTIONS.RAISE]: "O6",
      [ACTIONS.CALL]: "O7",
    },
  },
  O7: {
    phase: PHASE.River,
    actions: {
      [ACTIONS.BET]: "D8",
      [ACTIONS.CHECK]: "D7",
    },
  },
  O8: {
    phase: PHASE.River,
    actions: {
      [ACTIONS.RAISE]: "D8",
      [ACTIONS.CALL]: "O9",
    },
  },
  D7: {
    phase: PHASE.River,
    actions: {
      [ACTIONS.CHECK]: "O9",
      [ACTIONS.BET]: "O8",
    },
  },
  D8: {
    phase: PHASE.River,
    actions: {
      [ACTIONS.RAISE]: "O8",
      [ACTIONS.CALL]: "O9",
    },
  },
  O9: {
    phase: PHASE.End,
    actions: {},
  },
};
