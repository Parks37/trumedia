import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

export const handler: Handler = async (event, context) => {
  const init = {
    method: "GET",
    headers: {
      accept: "application/json",
      apiKey: process.env.TRUMEDIA_API_KEY as string,
    },
  };

  type ResponseError = {
    statusCode?: number;
  };

  // get tempToken
  const tokenFetchResponse = await fetch(
    "https://project.trumedianetworks.com/api/token",
    init
  ).then(async (res) => {
    return res.json() as Promise<ResponseError & { token: string }>;
  });

  if (tokenFetchResponse.statusCode) {
    return {
      statusCode: tokenFetchResponse.statusCode,
      body: JSON.stringify(tokenFetchResponse),
    };
  }

  const tempToken = tokenFetchResponse.token;

  // Get all players
  const playersFetchResponse = await fetch(
    "https://project.trumedianetworks.com/api/nfl/players",
    {
      ...init,
      headers: { ...init.headers, tempToken },
    }
  ).then((res) => {
    return res.json() as Promise<ResponseError & { playerId: string }[]>;
  });

  if (playersFetchResponse.statusCode) {
    return {
      statusCode: playersFetchResponse.statusCode,
      body: JSON.stringify(playersFetchResponse),
    };
  }

  const players = playersFetchResponse;

  let seasons = {};

  for (const player of players) {
    const seasonFetchResponse = await fetch(
      `https://project.trumedianetworks.com/api/nfl/player/${player.playerId}`,
      {
        ...init,
        headers: { ...init.headers, tempToken },
      }
    ).then((res) => {
      return res.json() as Promise<ResponseError>;
    });

    if (seasonFetchResponse.statusCode) {
      return {
        statusCode: seasonFetchResponse.statusCode,
        body: JSON.stringify(seasonFetchResponse),
      };
    }

    seasons = {
      ...seasons,
      [player.playerId]: seasonFetchResponse,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: { seasons, players },
    }),
  };
};
