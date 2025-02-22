import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import DashboardClient from "@/components/shared/DashboardClient";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions); // ✅ Fetch session on the server
  //console.log("Session Data:", session); // ✅ Debugging session data

  return <DashboardClient session={session} />;
};

export default DashboardPage;
