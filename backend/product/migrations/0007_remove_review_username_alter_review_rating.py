# Generated by Django 4.2.3 on 2023-09-20 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0006_alter_review_rating'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='userName',
        ),
        migrations.AlterField(
            model_name='review',
            name='rating',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=3),
        ),
    ]
