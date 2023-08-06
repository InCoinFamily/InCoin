from django.contrib.auth.models import AbstractUser, UserManager
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator, MinLengthValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from users.settings import USER_ME
from users.validators import UnicodeUsernameValidator, validate_simple_name


class CustomUserManager(UserManager):
    def get_by_natural_key(self, username):
        username_field = "{}__iexact".format(self.model.USERNAME_FIELD)
        return self.get(**{username_field: username})


class User(AbstractUser):
    """Модель пользователей."""

    objects = CustomUserManager()

    username = models.CharField(
        _("username"),
        max_length=25,
        unique=True,
        help_text=_(
            "Required. 2-25 characters. Letters(a-z), digits and ./+/-/_ only."
        ),
        validators=[UnicodeUsernameValidator(), MinLengthValidator(2)],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    email = models.EmailField(
        _("email"),
        max_length=129,
        unique=True,
        validators=[EmailValidator, MinLengthValidator(7)],
    )
    first_name = models.CharField(
        _("first name"),
        max_length=50,
        blank=True,
        validators=[validate_simple_name],
    )
    last_name = models.CharField(
        _("last name"),
        max_length=50,
        blank=True,
        validators=[validate_simple_name],
    )
    avatar = models.ImageField(
        _("avatar"),
        blank=True,
        upload_to="users",
    )

    class Meta(AbstractUser.Meta):
        ordering = ["username"]
        constraints = [
            models.CheckConstraint(
                check=~models.Q(username__iexact=USER_ME),
                name="reserve_USER_ME",
            ),
        ]

    @property
    def is_admin(self):
        """Проверка административных прав у пользователя."""
        return self.is_staff or self.is_superuser

    def clean(self):
        """Валидация модели."""
        if self.username.upper() == USER_ME:
            raise ValidationError(
                {
                    "username": _(
                        "The ME username is reserved. Specify another please."
                    )
                }
            )
        super().clean()

    def __str__(self):
        """Вывод данных пользователя."""
        return f"{self.username} ({self.get_full_name()}), email: {self.email}"
