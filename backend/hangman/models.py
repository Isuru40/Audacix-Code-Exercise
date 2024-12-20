from django.db import models

class Game(models.Model):
    WORD_CHOICES = [
        ("Hangman", "Hangman"),
        ("Python", "Python"),
        ("Audacix", "Audacix"),
        ("Bottle", "Bottle"),
        ("Pen", "Pen"),
    ]

    word = models.CharField(max_length=100, choices=WORD_CHOICES)
    incorrect_guesses = models.IntegerField(default=0)
    max_incorrect_guesses = models.IntegerField(default=5)
    word_state = models.CharField(max_length=100)
    status = models.CharField(max_length=10, default="InProgress")

    def __str__(self):
        return f"Game {self.id} - Status: {self.status}"

