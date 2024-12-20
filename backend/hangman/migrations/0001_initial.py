# Generated by Django 4.2.7 on 2024-12-18 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Game",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "word",
                    models.CharField(
                        choices=[
                            ("Hangman", "Hangman"),
                            ("Python", "Python"),
                            ("Audacix", "Audacix"),
                            ("Bottle", "Bottle"),
                            ("Pen", "Pen"),
                        ],
                        max_length=100,
                    ),
                ),
                ("incorrect_guesses", models.IntegerField(default=0)),
                ("max_incorrect_guesses", models.IntegerField(default=5)),
                ("word_state", models.CharField(max_length=100)),
                ("status", models.CharField(default="InProgress", max_length=10)),
            ],
        ),
    ]
