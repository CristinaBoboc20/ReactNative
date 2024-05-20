const baseUrl = "http://163.172.177.98:8081";

const baseHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const login = async (
  email: string,
  password: string
): Promise<{ accessToken: string }> => {
  const result = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { ...baseHeaders },
    body: JSON.stringify({ email, password }),
  });

  const data = await result.json();
  return data;
};

export const register = async (
  email: string,
  password: string
): Promise<{ accessToken: string }> => {
  const result = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: { ...baseHeaders },
    body: JSON.stringify({ email, password }),
  });

  const data = await result.json();
  return data;
};

export const userDetails = async (token: string) => {
  const response = await fetch(`${baseUrl}/user/details/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getAllGames = async (
  token: string
): Promise<{ total: number; games: any[] }> => {
  const response = await fetch(`${baseUrl}/game`, {
    method: "GET",
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const createGame = async (token: string): Promise<any> => {
  const response = await fetch(`${baseUrl}/game`, {
    method: "POST",
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Failed to create game, status:", response.status);
    throw new Error("Failed to create game");
  }

  const data = await response.json();
  return data;
};

export const joinGame = async (id: string, token: string): Promise<any> => {
  const response = await fetch(`${baseUrl}/game/join/${id}`, {
    method: "POST",
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getGameId = async (id: string, token: string): Promise<any> => {
  const response = await fetch(`${baseUrl}/game/${id}`, {
    method: "GET",
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch game with id ${id}`);
  }
  const data = await response.json();
  return data;
};
