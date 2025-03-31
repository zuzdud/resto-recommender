# Generated by Django 5.1.7 on 2025-03-30 12:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('cuisine', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=255)),
                ('rating', models.DecimalField(decimal_places=2, max_digits=3)),
            ],
        ),
    ]
