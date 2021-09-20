export const getMove = async (
  hand,
  communityCards,
  strategy,
  phase,
  actions,
  initialChips,
  remainingChips
) => {
  const response = await fetch("http://localhost:5000/get_move", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    body: JSON.stringify({
      player: hand,
      community: communityCards,
      strategy,
      phase,
      actions,
      initialChips,
      remainingChips,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();
  return json.action;
};

export const getWinner = async (player1, player2, community) => {
  const response = await fetch("http://localhost:5000/get_winner", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    body: JSON.stringify({
      player_1: player1,
      player_2: player2,
      community,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();
  return json.winner;
};
