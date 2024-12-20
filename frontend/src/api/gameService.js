const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const gameService = {
    newGame: async () => {
        const response = await fetch(`${API_URL}/game/new/`, {
            method: 'POST',
            body: JSON.stringify({  }),
        });
        const data = await response.json();
        return data.id;
    },

    getGameState: async (gameId) => {
        const response = await fetch(`${API_URL}/game/${gameId}/`);
        return await response.json();
    },

    makeGuess: async (gameId, guess) => {
        const response = await fetch(`${API_URL}/game/${gameId}/guess/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guess }),
        });
        return await response.json();
    },
};