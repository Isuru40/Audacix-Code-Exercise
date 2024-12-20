import React, { useEffect, useState, useRef } from 'react';
import { gameService } from '../../api/gameService';
import './Hangman.css';

const Hangman = () => {
    const [gameState, setGameState] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [guess, setGuess] = useState('');
    const [isGuessButtonDisabled, setGuessButtonDisabled] = useState(false);
    const [gameId, setGameId] = useState(null);

    const guessInputRef = useRef(null); // Reference to the input field

    // Focus the input field on page load
    useEffect(() => {
        if (guessInputRef.current) {
            guessInputRef.current.focus(); // Focus the input when the page loads
        }
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Focus the input field after a guess is made
    useEffect(() => {
        if (guessInputRef.current && !loading) {
            guessInputRef.current.focus(); // Refocus after each guess
        }
    }, [guess, gameState, loading]); // Refocus on guess or game state change

    // Disable input and button if the game is won or lost
    useEffect(() => {
        if (gameState?.status === 'Won' || gameState?.status === 'Lost') {
            setGuessButtonDisabled(true); // Disable guess button
            if (guessInputRef.current) {
                guessInputRef.current.disabled = true; // Disable input field
            }
        } else {
            setGuessButtonDisabled(false); // Enable guess button
            if (guessInputRef.current) {
                guessInputRef.current.disabled = false; // Enable input field
            }
        }
    }, [gameState]); // Re-run when game state changes

    const fetchGameStatus = async () => {
        setLoading(true);
        try {
            const id = await gameService.newGame();
            setGameId(id);
            const status = await gameService.getGameState(id);
            setGameState(status);
            setMessage('');
            //setGuessButtonDisabled(updatedGameState.status === 'Lost' || updatedGameState.status === 'Won');
            setGuessButtonDisabled(false); // Reset button state for new game
        } catch (error) {
            setMessage('Failed to fetch game status');
        } finally {
            setLoading(false);
        }
    };

    const makeGuess = async () => {
        if (!guess) return;
        setLoading(true);
        try {
            const updatedGameState = await gameService.makeGuess(gameId, guess);
            setGameState(updatedGameState);
            setGuess('');
            setMessage('');
        } catch (error) {
            setMessage('Failed to make a guess');
        } finally {
            setLoading(false);
        }
    };

    const validateInput = (value) => {
        const regex = /^[A-Za-z]$/;
        return regex.test(value);
    };

    const handleInputChange = (e) => {
        const value = e.target.value.toUpperCase();
        if (validateInput(value) || value === '') {
            setGuess(value);
            setMessage('');
        } else {
            setMessage('Please enter only one alphabetical character.');
        }
    };

    const handleButtonClick = () => {
        if (guess && !isGuessButtonDisabled) {
            makeGuess();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && guess && !isGuessButtonDisabled) {
            makeGuess();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="spinner"></div>
                    <p className="text-xl font-semibold mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4 hangman-container">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Hangman Game</h1>

                {gameState ? (
                    <div className="mb-6 text-center">
                        <div className="word-display mb-4">
                            {gameState.word_state.split('').map((char, index) => (
                                <span key={index} className="character-box">
                                    {char}
                                </span>
                            ))}
                        </div>

                        <p className="text-lg mb-2">
                            Remaining guesses: <span className="font-semibold">{gameState.remaining_incorrect_guesses}</span>
                        </p>

                        <p className="text-lg mb-2">
                            Incorrect guesses: <span className="incorrect-guesses">{gameState.incorrect_guesses}</span>
                        </p>

                        <p className="text-lg mb-4">
                            Game Status: {' '}
                            <span className={`font-semibold ${
                                gameState.status === 'Won' ? 'status-won' :
                                    gameState.status === 'Lost' ? 'status-lost' : ''
                            }`}>
                                {gameState.status}
                            </span>
                        </p>

                        <div className="flex justify-center gap-4">
                            <input
                                type="text"
                                maxLength="1"
                                value={guess}
                                onChange={handleInputChange}
                                ref={guessInputRef} // Attach the ref to the input element
                                onKeyPress={handleKeyPress} // Handle Enter key press
                                className="character-input"
                                placeholder="Enter a letter"
                            />
                            <button
                                onClick={handleButtonClick}  // Trigger auto lookup on button click
                                disabled={isGuessButtonDisabled}
                                className={`game-button button-primary ${loading ? 'button-loading' : ''}`}
                            >
                                Guess Character
                            </button>
                        </div>

                        {(gameState.status === 'Won' || gameState.status === 'Lost') && (
                            <button
                                onClick={fetchGameStatus}
                                className={`game-button ${
                                    gameState.status === 'Won'
                                        ? 'button-success button-lg'
                                        : 'button-secondary button-lg'
                                }`}
                            >
                                Play Again
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="text-center">
                        <button
                            onClick={fetchGameStatus}
                            className="game-button button-secondary button-lg button-pulse"
                        >
                            New Game
                        </button>
                    </div>
                )}

                {message && (
                    <p className="status-message text-red-500">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Hangman;
