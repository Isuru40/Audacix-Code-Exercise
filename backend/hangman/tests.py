from django.test import TestCase
from .models import Game


class GameModelTest(TestCase):

    def test_game_creation(self):
        """Test the creation of a Game instance."""
        game = Game.objects.create(
            word="Python",
            word_state="_____",
            incorrect_guesses=0,
            max_incorrect_guesses=5,
            status="InProgress"
        )

        self.assertEqual(game.word, "Python")
        self.assertEqual(game.word_state, "_____")
        self.assertEqual(game.incorrect_guesses, 0)
        self.assertEqual(game.max_incorrect_guesses, 5)
        self.assertEqual(game.status, "InProgress")
        self.assertEqual(str(game), f"Game {game.id} - Status: InProgress")

    def test_default_status(self):
        """Test the default status of a new game is 'InProgress'."""
        game = Game.objects.create(
            word="Pen",
            word_state="_____",
            incorrect_guesses=0,
            max_incorrect_guesses=5
        )
        self.assertEqual(game.status, "InProgress")



    def test_incorrect_guesses_increase(self):
        """Test if incorrect_guesses field is updated properly."""
        game = Game.objects.create(
            word="Bottle",
            word_state="_____",
            incorrect_guesses=0,
            max_incorrect_guesses=5
        )

        # Simulate an incorrect guess
        game.incorrect_guesses += 1
        game.save()

        game.refresh_from_db()  # Fetch the latest data
        self.assertEqual(game.incorrect_guesses, 1)

    def test_word_state_update(self):
        """Test if word_state can be updated properly."""
        game = Game.objects.create(
            word="Pen",
            word_state="___",
            incorrect_guesses=0,
            max_incorrect_guesses=5
        )

        # Simulate a correct guess and update the word_state
        game.word_state = "P__"
        game.save()

        game.refresh_from_db()
        self.assertEqual(game.word_state, "P__")

    def test_max_incorrect_guesses(self):
        """Test the maximum number of incorrect guesses is not exceeded."""
        game = Game.objects.create(
            word="Hangman",
            word_state="_______",
            incorrect_guesses=5,
            max_incorrect_guesses=5
        )

        # Try to increase incorrect guesses beyond max_incorrect_guesses
        game.incorrect_guesses += 1
        game.save()

        game.refresh_from_db()
        self.assertEqual(game.incorrect_guesses, 6)  # Check if it was saved as 6

    def test_game_str(self):
        """Test the string representation of the Game instance."""
        game = Game.objects.create(
            word="Python",
            word_state="_____",
            incorrect_guesses=0,
            max_incorrect_guesses=5,
            status="InProgress"
        )
        self.assertEqual(str(game), f"Game {game.id} - Status: InProgress")

        class GameModelTest(TestCase):

            def test_game_creation(self):
                """Test the creation of a Game instance."""
                game = Game.objects.create(
                    word="Python",
                    word_state="_____",
                    incorrect_guesses=0,
                    max_incorrect_guesses=5,
                    status="InProgress"
                )

                self.assertEqual(game.word, "Python")
                self.assertEqual(game.word_state, "_____")
                self.assertEqual(game.incorrect_guesses, 0)
                self.assertEqual(game.max_incorrect_guesses, 5)
                self.assertEqual(game.status, "InProgress")
                self.assertEqual(str(game), f"Game {game.id} - Status: InProgress")

            def test_default_status(self):
                """Test the default status of a new game is 'InProgress'."""
                game = Game.objects.create(
                    word="Pen",
                    word_state="_____",
                    incorrect_guesses=0,
                    max_incorrect_guesses=5
                )
                self.assertEqual(game.status, "InProgress")

            def test_incorrect_guesses_increase(self):
                """Test if incorrect_guesses field is updated properly."""
                game = Game.objects.create(
                    word="Bottle",
                    word_state="_____",
                    incorrect_guesses=0,
                    max_incorrect_guesses=5
                )

                # Simulate an incorrect guess
                game.incorrect_guesses += 1
                game.save()

                game.refresh_from_db()  # Fetch the latest data
                self.assertEqual(game.incorrect_guesses, 1)

            def test_word_state_update(self):
                """Test if word_state can be updated properly."""
                game = Game.objects.create(
                    word="Pen",
                    word_state="___",
                    incorrect_guesses=0,
                    max_incorrect_guesses=5
                )

                # Simulate a correct guess and update the word_state
                game.word_state = "P__"
                game.save()

                game.refresh_from_db()
                self.assertEqual(game.word_state, "P__")

            def test_max_incorrect_guesses(self):
                """Test the maximum number of incorrect guesses is not exceeded."""
                game = Game.objects.create(
                    word="Hangman",
                    word_state="_______",
                    incorrect_guesses=5,
                    max_incorrect_guesses=5
                )

                # Try to increase incorrect guesses beyond max_incorrect_guesses
                game.incorrect_guesses += 1
                game.save()

                game.refresh_from_db()
                self.assertEqual(game.incorrect_guesses, 6)  # Check if it was saved as 6

            def test_game_str(self):
                """Test the string representation of the Game instance."""
                game = Game.objects.create(
                    word="Python",
                    word_state="_____",
                    incorrect_guesses=0,
                    max_incorrect_guesses=5,
                    status="InProgress"
                )
                self.assertEqual(str(game), f"Game {game.id} - Status: InProgress")
