# Generated by Django 3.0.2 on 2020-01-06 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('controller', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='link',
            field=models.CharField(default='emptylink', max_length=500),
            preserve_default=False,
        ),
    ]