from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *


from .serializers import User_serializer  # Assuming you have a serializer defined for User
from rest_framework.decorators import api_view

class Userview(APIView):

    def get(self, request):
        all_users = User.objects.all()
        list_of_user = User_serializer(all_users, many=True).data
        return Response(list_of_user)

    def post(self, request):
        name = request.data.get("name")
        email = request.data.get("email")
        password = request.data.get("password")

        # Basic validation
        if not name or not email or not password:
            return Response(
                {"success": False, "message": "All fields are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check for existing user
        if User.objects.filter(email=email).exists():
            return Response(
                {"success": False, "message": "User with this email already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

      
        # Create a new user instance
        new_user = User(name=name, email=email, password=password)
        new_user.save()

        # Serialize the new user
        serialized_user = User_serializer(new_user)

        return Response({
            "success": True,
            "message": "User created successfully.",
            "data": serialized_user.data
        }, status=status.HTTP_201_CREATED)

    def get(self, request):
        all_users = User.objects.all()
        list_of_user = User_serializer(all_users, many=True).data
        return Response(list_of_user)

    def post(self, request):
        name = request.data.get("name")
        email = request.data.get("email")
        password = request.data.get("password")

        if not name or not email or not password:
            return Response(
                {"success": False, "message": "All fields are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

  
        if User.objects.filter(email=email).exists():
            return Response(
                {"success": False, "message": "User with this email already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Hash the password
        

        # Create a new user
        new_user = User(name=name, email=email, password=password)
        new_user.save()

        # Prepare response data
        response_data = {
            "success": True,
            "message": "User created successfully.",
            "data": {
                "uid": new_user.uid,  # Assuming uid is a field in your User model
                "name": new_user.name,
                "email": new_user.email,
            }
        }

        return Response(response_data, status=status.HTTP_201_CREATED)



class UserviewbyId(APIView):

    def get(self, request,id):

        user=User.objects.get(uid=id)
        # user_details={
        #     "uid":user.uid,
        #     "name":user.name,
        #     "email":user.email,
        #     "password":user.password
        # }

        user_details=User_serializer(user).data
        return Response(user_details)
    
    def patch(self, request,id):
        user=User.objects.filter(uid=id)
        user.update(name=request.data["name"],email=request.data["email"],password=request.data["password"])
        return Response("done")
    
    def delete(self,request,id):
        user=User.objects.get(uid=id)
        user.delete()
        return Response("Deleted")


class SnippetsView(APIView):
    def get(self, request):
        all_snippets = Snippets.objects.all()
        list_of_snippets = SnippetsSerializer(all_snippets, many=True).data
        return Response(list_of_snippets)

    def post(self, request):
        new_snippet = Snippets(snippets=request.data["snippets"])
        new_snippet.save()
        return Response("Snippet Saved")

class SnippetsViewById(APIView):
    def get(self, request, id,lang):
        snippet = Snippets.objects.get(pid=id,language=lang)
        snippet_details = SnippetsSerializer(snippet).data
        return Response(snippet_details)

    def patch(self, request, id):
        snippet = Snippets.objects.filter(sid=id)
        snippet.update(snippets=request.data["snippets"])
        return Response("Snippet Updated")

    def delete(self, request, id):
        snippet = Snippets.objects.get(sid=id)
        snippet.delete()
        return Response("Snippet Deleted")

# Similar views for Problems, Testcase, and Solved can be created similarly.
class ProblemsView(APIView):
    def get(self, request, uid=None):
        all_problems = Problems.objects.all()
        list_of_problems = ProblemsSerializer(all_problems, many=True).data

        if uid:
            for problem_data in list_of_problems:
                solved = Solved.objects.filter(pid__pid=problem_data['pid'], uid=uid).first()
                problem_data['iscorrect'] = solved.iscorrect if solved else False

        return Response(list_of_problems, status=status.HTTP_200_OK)

    def post(self, request):
        new_problem = Problems(
            pname=request.data["pname"],
            pdesc=request.data["pdesc"],
            pconstraint=request.data["pconstraint"],
            pyoutube=request.data["pyoutube"],
            particle=request.data["particle"],
            plevel=request.data["plevel"],
            pinput=request.data["pinput"],
            poutput=request.data["poutput"]
        )
        new_problem.save()
        return Response("Problem Saved")

class ProblemsViewById(APIView):
    def get(self, request, id):
        problem = Problems.objects.get(pid=id)
        problem_details = ProblemsSerializer(problem).data

        return Response(problem_details)

    def patch(self, request, id):
        problem = Problems.objects.filter(pid=id)
        problem.update(
            pname=request.data["pname"],
            pdesc=request.data["pdesc"],
            pconstraint=request.data["pconstraint"],
            pyoutube=request.data["pyoutube"],
            particle=request.data["particle"],
            plevel=request.data["plevel"],
            pinput=request.data["pinput"],
            poutput=request.data["poutput"]
            
        )
        return Response("Problem Updated")

    def delete(self, request, id):
        problem = Problems.objects.get(pid=id)
        problem.delete()
        return Response("Problem Deleted")

# Repeat similar pattern for Testcase and Solved
class TestcaseView(APIView):
    def get(self, request):
        all_testcases = Testcase.objects.all()
        list_of_testcases = TestcaseSerializer(all_testcases, many=True).data
        return Response(list_of_testcases)

    def post(self, request):
        serializer = TestcaseSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response("saved", status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TestcaseViewById(APIView):
    def get(self, request, id):
        testcase = Testcase.objects.filter(pid=id)
        testcase_details = TestcaseSerializer(testcase,many=True).data
        return Response(testcase_details)

    def patch(self, request, id):
        testcase = Testcase.objects.filter(tid=id)
        testcase.update(
            tinput=request.data["tinput"],
            toutput=request.data["toutput"],
            status=request.data["status"],
            pid=request.data["pid"]
        )
        return Response("Testcase Updated")

    def delete(self, request, id):
        testcase = Testcase.objects.get(tid=id)
        testcase.delete()
        return Response("Testcase Deleted")

class SolvedView(APIView):
    def get(self, request):
        all_solved = Solved.objects.all()
        list_of_solved = SolvedSerializer(all_solved, many=True).data
        return Response(list_of_solved)

    def post(self, request):
        pid = request.data.get("pid")
        uid = request.data.get("uid")

        existing_record = Solved.objects.filter(pid=pid, uid=uid).first()

        if existing_record:

            serializer = SolvedSerializer(existing_record, data=request.data)
            if serializer.is_valid():
                serializer.save() 
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer = SolvedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SolvedViewById(APIView):

    def get(self, request, qid,userid):
        solved = Solved.objects.get(pid=qid,uid=userid)
        solved_details = SolvedSerializer(solved).data
        print(solved_details)
        return Response(solved_details)
    
    def delete(self, request, id):
        solved = Solved.objects.get(sid=id)
        solved.delete()
        return Response("Solved Deleted")

class Userverification(APIView):
    def get(self, request, username, password):
        try:
            user = User.objects.get(email=username, password=password)
            print(user)
            user_details = User_serializer(user).data
            return Response({'exists': True, 'user': user_details}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'exists': False}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class Userprofile(APIView):
    def get(self, request, uid):
        solved_easy_count=0
        solved_medium_count=0
        solved_hard_count=0
        # Attempt to retrieve user details
        try:
            user = User.objects.get(uid=uid)
        except User.DoesNotExist:
            return Response({
                "success": False,
                "message": "User not found."
            }, status=status.HTTP_404_NOT_FOUND)  # 404 for user not found

        user_details = User_serializer(user).data
        total_problems = Problems.objects.count()
        easy_count = Problems.objects.filter(plevel="Easy").count()
        medium_count = Problems.objects.filter(plevel="Medium").count()
        hard_count = Problems.objects.filter(plevel="Hard").count()
        solved_problems = Solved.objects.filter(uid=uid).select_related('pid')
        

        solved_problems_details = []
        for solved in solved_problems:
            problem = solved.pid  # Access related problem directly
            solved_problems_details.append({
                'solved_id':solved.sid,
                'problem_id': problem.pid,
                'problem_name': problem.pname,
                'problem_description': problem.pdesc,
                'solved_code': solved.code,
                'language': solved.lang,
                'is_solved': solved.solved,
                'plevel':problem.plevel
            })
            if(problem.plevel=="Easy"):
                solved_easy_count+=1
            if(problem.plevel=="Medium"):
                solved_medium_count+=1
            if(problem.plevel=="Hard"):
                solved_hard_count+=1

        # Prepare the response data
        response_data = {
            "success": True,
            "message": "User profile retrieved successfully.",
            "user": user_details,
            "statistics": {
                "total_problems": total_problems,
                "easy_count": easy_count,
                "medium_count": medium_count,
                "hard_count": hard_count,
                "solved_count": solved_problems.count(),
                "solved_easy_count":solved_easy_count,
                "solved_medium_count":solved_medium_count,
                "solved_hard_count":solved_hard_count # Count of solved problems
            },
            "solved_problems": solved_problems_details,
            
        }

        return Response(response_data, status=status.HTTP_200_OK)

    def handle_exception(self, exc):
        """ Override the default exception handler """
        return Response({
            "success": False,
            "message": str(exc)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProblemStatus(APIView):
    def get(self, request, uid):
        # Attempt to retrieve user details
        try:
            user = User.objects.get(pk=uid)  # Use pk for primary key lookup
        except User.DoesNotExist:
            return Response({
                "success": False,
                "message": "User not found."
            }, status=status.HTTP_404_NOT_FOUND)  # 404 for user not found

        # Retrieve all problems
        problems = Problems.objects.all()
        solved_problems = Solved.objects.filter(uid=user).values_list('pid', flat=True)

        problem_status_details = []
        for problem in problems:
            print(problem)
            problem_status_details.append({
                'pid': problem.pid,
                'pname': problem.pname,
                'pdesc': problem.pdesc,
                'pconstraints': problem.pconstraint,
                'plevel': problem.plevel,
                'pinput': problem.pinput,
                'poutput': problem.poutput,
                'particle':problem.particle,
                'pyoutube':problem.pyoutube,
                'issolved': problem.pid in solved_problems
            })

        # Prepare the response data
        response_data = {
            "success": True,
            "message": "Problem status retrieved successfully.",
            "problems": problem_status_details,
        }

        return Response(response_data, status=status.HTTP_200_OK)

    def handle_exception(self, exc):
        """ Override the default exception handler """
        return Response({
            "success": False,
            "message": str(exc)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def isSolved(request, uid, pid):
    if request.method == 'GET':
        try:
            user = User.objects.get(pk=uid)  # Use pk for primary key lookup
        except User.DoesNotExist:
            return Response({
                "success": False,
                "message": "User not found."
            }, status=status.HTTP_404_NOT_FOUND)  # 404 for user not found

        # Check if the problem is solved
        solved_problems = Solved.objects.filter(uid=user).values_list('pid', flat=True)
        return Response({
            "success": True,
            "issolved": pid in solved_problems
        })

    return Response({"success": False, "message": "Method not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



