# Generated by Django 4.1.3 on 2023-05-21 13:39

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("budget", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="spend",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
                verbose_name="Траты пользователя",
            ),
        ),
        migrations.AddField(
            model_name="moneybox",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="moneyboxes",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Цель пользователя",
            ),
        ),
        migrations.AddField(
            model_name="income",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="incomes",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Приходы пользователя",
            ),
        ),
        migrations.AddField(
            model_name="categoryincome",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="category_incomes",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Категория дохода пользователя",
            ),
        ),
        migrations.AddField(
            model_name="category",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="categories",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Категории созданные пользователем",
            ),
        ),
        migrations.AddField(
            model_name="balance",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="balances",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Баланс пользователя",
            ),
        ),
    ]
