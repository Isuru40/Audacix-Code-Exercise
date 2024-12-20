from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .services import GameService

# Create a new game
@api_view(['POST'])
def new_game(request):
    game = GameService.create_game()
    return Response({"id": game.id}, status=status.HTTP_201_CREATED)

# Get the state of the game
@api_view(['GET'])
def game_state(request, game_id):
    game = GameService.get_game_by_id(game_id)
    if not game:
        return Response({"error": "Game not found"}, status=status.HTTP_404_NOT_FOUND)

    game_state = {
        "status": game.status,
        "word_state": game.word_state,
        "incorrect_guesses": game.incorrect_guesses,
        "remaining_incorrect_guesses": game.max_incorrect_guesses - game.incorrect_guesses,
    }
    return Response(game_state)

# Make a guess
@api_view(['POST'])
def make_guess(request, game_id):
    game = GameService.get_game_by_id(game_id)
    if not game:
        return Response({"error": "Game not found"}, status=status.HTTP_404_NOT_FOUND)

    guess = request.data.get("guess", "").upper()
    if len(guess) != 1 or not guess.isalpha():
        return Response({"error": "Please provide a valid single letter."}, status=status.HTTP_400_BAD_REQUEST)

    response = GameService.make_guess(game, guess)
    return Response(response)
