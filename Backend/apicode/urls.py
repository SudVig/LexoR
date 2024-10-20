from django.urls import path
from .views import *
from .views import Userview,UserviewbyId,isSolved

urlpatterns = [
    path('user/', Userview.as_view()),
    path('user/<int:id>/', UserviewbyId.as_view()),
    path('snippets/', SnippetsView.as_view()),
    path('snippets/<int:id>/<str:lang>/', SnippetsViewById.as_view(), name='snippets-detail'),
    path('problems/', ProblemsView.as_view()),
    path('problems/<int:id>/', ProblemsViewById.as_view()),
    path('testcases/', TestcaseView.as_view()),
    path('testcases/<int:id>/', TestcaseViewById.as_view()),
    path('solved/', SolvedView.as_view()),
    path('solved/<int:qid>/<int:userid>/', SolvedViewById.as_view()),
    path('verify/<str:username>/<str:password>/', Userverification.as_view(), name='user-verification'),
    path('profile/<int:uid>/', Userprofile.as_view(), name='user-profile'),
     path('problem-status/<int:uid>/', ProblemStatus.as_view(), name='problem-status'),
     path('issolved/<int:uid>/<int:pid>/',isSolved)
]
