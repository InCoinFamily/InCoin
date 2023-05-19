from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone

User = get_user_model()

COMMON_VALIDATOR = [MinValueValidator(1), MaxValueValidator(1_000_000)]

MONEYBOX_VALIDATOR = [MinValueValidator(1), MaxValueValidator(10_000_000)]


def validate_date(value):
    if value > timezone.now():
        raise ValidationError('Дата не может быть больше текущей')
    return value


class Category(models.Model):
    '''Модель категорий для трат.'''

    title = models.CharField('Название категории', max_length=50, unique=True)
    # slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(
        'Описание категории трат', max_length=500, blank=True, null=True
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='categories',
        verbose_name='Категории созданные пользователем'
    )

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.title


class Balance(models.Model):
    '''Модель актуального состояния средств.'''

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='balances',
        verbose_name='Баланс пользователя'
    )
    balance = models.IntegerField('Баланс', default=0)

    class Meta:
        verbose_name = 'Баланс'
        verbose_name_plural = 'Балансы'

    def __str__(self):
        return f'Баланс пользователя {self.user}'


class Currency(models.Model):
    '''Модель валют.'''

    title = models.CharField(
        'Полное название валюты',
        unique=True,
        max_length=50
    )
    code = models.CharField(
        'Буквенный код валюты',
        unique=True,
        max_length=3
    )

    class Meta:
        verbose_name = 'Валюта'
        verbose_name_plural = 'Валюты'
        default_related_name = 'currencies'

    def __str__(self):
        return self.title


class Spend(models.Model):
    '''Модель расходов и трат.'''

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='Траты пользователя'
    )
    title = models.CharField('Наименование расхода', max_length=70)
    created = models.DateTimeField(
        'Время создания записи',
        validators=[validate_date]
    )
    amount = models.PositiveIntegerField(
        'Израсходованная сумма',
        validators=COMMON_VALIDATOR
    )
    description = models.TextField(
        'Комментарий к расходу', max_length=500, blank=True, null=True
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        verbose_name='Категория расхода',
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'Расход средств'
        verbose_name_plural = 'Расходы средств'
        default_related_name = 'spends'

    def __str__(self):
        return self.title


class Income(models.Model):
    '''Модель прихода средств.'''

    title = models.CharField('Наименование прихода', max_length=50)
    description = models.TextField(
        'Комментарий к приходу', max_length=500, blank=True, null=True
    )
    amount = models.PositiveIntegerField(
        'Оприходованная сумму', validators=COMMON_VALIDATOR
    )
    created = models.DateTimeField(
        'Время создания записи',
        validators=[validate_date]
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='incomes',
        verbose_name='Приходы пользователя'
    )

    class Meta:
        verbose_name = 'Приход средств'
        verbose_name_plural = 'Приходы средств'

    def __str__(self):
        return self.title


class MoneyBox(models.Model):
    '''Модель копилка.'''

    title = models.CharField('Цель накопления', max_length=254)
    total = models.PositiveIntegerField(
        'Сумма, которую необходимо накопить',
        validators=MONEYBOX_VALIDATOR
    )
    accumulation = models.PositiveIntegerField(
        'Уже накоплено', validators=MONEYBOX_VALIDATOR
    )
    accumulated = models.BooleanField(
        'Средств хватает чтобы закрыть цель', default=False
    )
    achieved = models.BooleanField(
        'Цель достигнута/не достигнута', default=False
    )
    description = models.TextField(
        'Комментарий к приходу', max_length=500, blank=True, null=True
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='moneyboxes',
        verbose_name='Цель пользователя'
    )

    class Meta:
        verbose_name = 'Цель накопления'
        verbose_name_plural = 'Цели накопления'

    def __str__(self):
        return self.title