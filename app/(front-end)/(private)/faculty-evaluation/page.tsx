import NotAllowed from "@/components/shared/NotAllowed";
import AdminDashboard from "./components/admin/admin-dashboard";
import StudentDashboard from "./components/student/student-dashboard";
import { requireRoleOrRedirect } from "@/lib/serverAuth";

export const page = async () => {
  const user = await requireRoleOrRedirect(["ADMIN", "STUDENT"]);
  const role = user.user_metadata?.role || user.app_metadata?.role || user.role;


  if (role === "ADMIN") {
    return <AdminDashboard />;
  }
  else if (role === "STUDENT") {
    return <StudentDashboard />;
  }

  return <NotAllowed />;
};

export default page;
