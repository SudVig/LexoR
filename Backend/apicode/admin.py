from django.contrib import admin

# Register your models here.\
from .models import *

admin.site.register(User)
admin.site.register(Snippets)
admin.site.register(Problems)
admin.site.register(Testcase)
admin.site.register(Solved)
