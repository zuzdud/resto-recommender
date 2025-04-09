from django.db import models

class ApiRestaurant(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    cuisine = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    rating = models.DecimalField(max_digits=3, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'api_restaurant'

class AuthGroup(models.Model):
    name=models.CharField(unique=True, max_length=150)
    class Meta:
        managed=False
        db_table='auth_group'

class Clients(models.Model):
    name = models.CharField(max_length=15, blank=True, null=True)
    surname = models.CharField(max_length=55, blank=True, null=True)
    password = models.CharField(max_length=255, db_collation='utf8mb4_bin')
    email = models.CharField(unique=True, max_length=255, db_collation='utf8mb4_bin')
    status = models.CharField(max_length=8)
    created_at = models.DateField()
    last_login_at = models.DateTimeField(blank=True, null=True)
    address = models.CharField(max_length=100)
    location = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'clients'
        db_table_comment = 'Tabela do przechowywania dane do logowania o kliencie oraz jeog status, czy jest on zablokowany czy nie. Defaultowo u┐ytkownicy s╣ zablokowani, po zatwierdzeniu maila s╣ oni odblokowywani.'

class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)

class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)

class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Favorites(models.Model):
    client = models.ForeignKey(Clients, models.DO_NOTHING)
    restaurant = models.ForeignKey('Restaurants', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'favorites'
        db_table_comment = 'Tabela przechowuja informacj na  temat ulubionych restauracji klienta.'


class LoginAttempts(models.Model):
    client = models.ForeignKey(Clients, models.DO_NOTHING, blank=True, null=True)
    attempt_time = models.IntegerField(blank=True, null=True)
    success = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'login_attempts'
        db_table_comment = "Tabela przechowuca informacje na temat prb logowania si uytkownikw, zawiera informacje tj. client_id, czas prby logowania, oraz czy udao si zalogowa (jeli jest '1' tzn.  si nie udao, a jeli '0' - udao si zalogowa pomlnie)."


class Preferences(models.Model):
    client = models.ForeignKey(Clients, models.DO_NOTHING)
    cuisine = models.CharField(max_length=100)
    location = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'preferences'
        db_table_comment = 'Tabela zawierajca preferencje utkownikw. Posiada pola tj. typ kuchni oraz lokalizacja.'


class Ratings(models.Model):
    client = models.ForeignKey(Clients, models.DO_NOTHING, blank=True, null=True)
    restaurant = models.ForeignKey('Restaurants', models.DO_NOTHING, blank=True, null=True)
    rating = models.IntegerField()
    comment = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateField()

    class Meta:
        managed = False
        db_table = 'ratings'
        db_table_comment = 'Tablica przechowujca informacje na temat ocen z restauracji. Zawiera informacje na temat wartoci oceny (1.0-5.0) pobytu w restauracji, komentarz oraz dat utworzenia. Jest ona poczona z restauracj, ktra jet oceniana oraz klient, ktry wystawi ocen.'


class Restaurants(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    location = models.TextField()  # This field type is a guess.
    cuisine = models.CharField(max_length=100)
    image = models.TextField(blank=True, null=True)
    external_url = models.TextField(db_collation='utf8mb4_bin', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'restaurants'
        db_table_comment = 'Tabela zawierajca informacje na temat restauracji. Podajemy  w niej nazwŕ restauracji, lokalizacjŕ, gwny typ kuchni jaki serwuj, zdjcie restauracji oraz link do zewntrznej strony restauracji.'
