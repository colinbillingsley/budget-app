from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    monthly_income = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    spending_limit = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    currency = models.CharField(max_length=3, default='USD')
    subscription_status = models.CharField(max_length=20, choices=[('Free', 'Free'), ('Premium', 'Premium')], default='Free')

    def __str__(self):
        return self.user.username