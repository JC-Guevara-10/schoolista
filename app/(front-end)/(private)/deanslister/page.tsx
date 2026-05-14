import { requireRoleOrRedirect } from "@/lib/serverAuth";
import AdminView from "./views/AdminView";
import RegistrarView from "./views/RegistrarView";
import StudentView from "./views/StudentView";
import NotAllowed from "@/components/shared/NotAllowed";

const page = async () => {
  const user = await requireRoleOrRedirect(["ADMIN", "STUDENT", "REGISTRAR"]);
  const role = user.user_metadata?.role || user.app_metadata?.role || user.role;

  if (role === "ADMIN") {
    return <AdminView />;
  } else if (role === "STUDENT") {
    return <StudentView />;
  } else if (role === "REGISTRAR") {
    return <RegistrarView />;
  }

  return <NotAllowed />;
};
 export default page;