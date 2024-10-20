from django.db import models

# Create your models here.

class User(models.Model):
    uid=models.AutoField(primary_key=True)
    name=models.CharField(max_length=200, null=True)
    email=models.EmailField(max_length=100)
    password=models.CharField(max_length=200)



class Problems(models.Model):

    pid=models.AutoField(primary_key=True)
    pname=models.CharField(max_length=500)
    pdesc=models.CharField(max_length=1000)
    pconstraint=models.CharField(max_length=100)
    plevel=models.CharField(max_length=100,default="")
    pyoutube=models.CharField(max_length=200,default="")
    particle=models.CharField(max_length=200,default="")
    pinput=models.CharField(max_length=200,default="")
    poutput=models.CharField(max_length=200,default="")

class Snippets(models.Model):
    sid=models.AutoField(primary_key=True)
    snippets=models.TextField()
    pid=models.ForeignKey(Problems,on_delete=models.CASCADE,null=True)
    language=models.CharField(max_length=20,null=True)

class Testcase(models.Model):
    tid=models.AutoField(primary_key=True)
    tinput=models.CharField(max_length=200)
    toutput=models.CharField(max_length=200)
    status=models.CharField(max_length=200)
    pid=models.ForeignKey(Problems,on_delete=models.CASCADE)

class Solved(models.Model):
    sid = models.AutoField(primary_key=True) 
    uid = models.ForeignKey(User, on_delete=models.CASCADE) 
    pid = models.ForeignKey(Problems, on_delete=models.CASCADE)
    code = models.TextField(null=True)
    lang = models.CharField(max_length=20,default="")
    solved=models.BooleanField(default=False)


