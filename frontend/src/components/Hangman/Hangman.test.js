import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Hangman from './Hangman';
import { gameService } from '../../api/gameService';
import expect from "expect";

jest.mock('../../api/gameService');

describe('Hangman Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the component correctly', () => {
        render(<Hangman />);
        expect(screen.getByText(/Hangman Game/i)).toBeInTheDocument();
    });

    test('shows loading spinner during fetchGameStatus', async () => {
        gameService.newGame.mockResolvedValue('123');
        gameService.getGameState.mockResolvedValue({
            word_state: '____',
            remaining_incorrect_guesses: 5,
            incorrect_guesses: [],
            status: 'In Progress',
        });

        render(<Hangman />);

        fireEvent.click(screen.getByText(/New Game/i));
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());
    });

    test('updates game state after starting a new game', async () => {
        // Mock API responses
        gameService.newGame.mockResolvedValue('123');
        gameService.getGameState.mockResolvedValue({
            word_state: '____',
            remaining_incorrect_guesses: 6,
            incorrect_guesses: [],
            status: 'In Progress',
            correct_guess: 0
        });

        // Render the Hangman component
        render(<Hangman />);

        // Simulate clicking "New Game" to initialize the game
        fireEvent.click(screen.getByText(/New Game/i));

        await waitFor(() => {
            expect(screen.getByText(/Remaining guesses:/i).textContent).toMatch(/Remaining guesses: 6/i);
        });

        // // Verify the updated game state fields are displayed
        expect(screen.getByText(/Game Status:/i).textContent).toMatch(/Game Status:  In Progress/i);

    });

    test('validates input correctly after starting a new game', async () => {
        // Mock game service responses
        gameService.newGame.mockResolvedValue('123');
        gameService.getGameState.mockResolvedValue({
            word_state: '____',
            remaining_incorrect_guesses: 5,
            incorrect_guesses: [],
            status: 'In Progress',
        });

        // Render the Hangman component
        render(<Hangman />);

        // Click the 'New Game' button to initialize the game
        fireEvent.click(screen.getByText(/New Game/i));

        // Wait for the input to be rendered
        await waitFor(() => {
            expect(screen.getByRole('textbox')).toBeInTheDocument();
        });

        const input = screen.getByRole('textbox'); // Select the input field

        // Simulate valid input
        fireEvent.change(input, { target: { value: 'A' } });
        expect(input.value).toBe('A');

        // Simulate invalid input
        fireEvent.change(input, { target: { value: '1' } });
        expect(screen.getByText(/Please enter only one alphabetical character/i)).toBeInTheDocument();
    });

    test('disables the guess button when game is over', async () => {
        gameService.newGame.mockResolvedValue('123');
        gameService.getGameState.mockResolvedValue({
            word_state: '____',
            remaining_incorrect_guesses: 0,
            incorrect_guesses: [],
            status: 'Lost',
        });

        render(<Hangman />);

        fireEvent.click(screen.getByText(/New Game/i));

        await waitFor(() => {
            const guessButton = screen.getByRole('button', { name: /Guess Character/i });
            expect(guessButton).toBeDisabled();

          //  expect(screen.getByRole('button', { name: /Guess Character/i })).toBeDisabled();
        });
    });

    test('handles game service errors gracefully', async () => {
        gameService.newGame.mockRejectedValue(new Error('Network error'));

        render(<Hangman />);

        fireEvent.click(screen.getByText(/New Game/i));

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch game status/i)).toBeInTheDocument();
        });
    });
});
