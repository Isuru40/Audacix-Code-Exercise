from .models import Game
import random

# List of words for the game
WORD_CHOICES = ["Hangman", "Python", "Audacix", "Bottle", "Pen"]

class GameService:
    @staticmethod
    def get_all_games():
        return Game.objects.all()

    @staticmethod
    def get_game_by_id(game_id):
        return Game.objects.filter(id=game_id).first()

    @staticmethod
    def create_game():
        word = random.choice(WORD_CHOICES)
        game = Game.objects.create(
            word=word,
            word_state="_" * len(word),
            incorrect_guesses=0,
            max_incorrect_guesses=(len(word) + 1) / 2
        )
        return game

    @staticmethod
    def make_guess(game, guess):
        word = game.word.upper()
        word_state = list(game.word_state)

        correct_guess = False
        if guess in word:
            for i, letter in enumerate(word):
                if letter == guess:
                    word_state[i] = guess
            game.word_state = "".join(word_state)
            correct_guess = True
        else:
            game.incorrect_guesses += 1

        # Update game status
        if game.incorrect_guesses >= game.max_incorrect_guesses:
            game.status = "Lost"
        elif "_" not in game.word_state:
            game.status = "Won"

        game.save()
        return {
            "status": game.status,
            "word_state": game.word_state,
            "incorrect_guesses": game.incorrect_guesses,
            "remaining_incorrect_guesses": game.max_incorrect_guesses - game.incorrect_guesses,
            "correct_guess": correct_guess,
        }
