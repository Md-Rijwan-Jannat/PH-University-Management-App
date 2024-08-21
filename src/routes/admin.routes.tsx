import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllOfferedCourses from "../pages/admin/courseManagement/AllOfferedCourses";
import Courses from "../pages/admin/courseManagement/Courses";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import OfferedCourse from "../pages/admin/courseManagement/OfferedCourse";
import RegisteredSemester from "../pages/admin/courseManagement/RegisteredSemester";
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration";
import AdminData from "../pages/admin/userManagement.ts/AdminData";
import CreateAdmin from "../pages/admin/userManagement.ts/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement.ts/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement.ts/CreateStudent";
import FacultyData from "../pages/admin/userManagement.ts/FacultyData";
import StudentDetails from "../pages/admin/userManagement.ts/StudentDetails";
import StudentData from "../pages/admin/userManagement.ts/StudentsData";

/*
Programmatically way
*/
const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Admins",
        path: "admins-data",
        element: <AdminData />,
      },
      {
        name: "Faculties",
        path: "faculties-data",
        element: <FacultyData />,
      },
      {
        name: "Students",
        path: "students-data",
        element: <StudentData />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semester",
        path: "registered-semester",
        element: <RegisteredSemester />,
      },
      {
        name: "Offered Course",
        path: "offered-course",
        element: <OfferedCourse />,
      },
      {
        name: "All Offered Course",
        path: "all-offered-course",
        element: <AllOfferedCourses />,
      },
    ],
  },
];
export const AdminPats = adminPaths;
