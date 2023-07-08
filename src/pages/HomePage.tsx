import { useAccount, useConnect } from "wagmi";
import { toast } from "react-hot-toast";
import { useApp } from "@/hooks";
import AllApplications from "@pages/user/AllApplications";
import AllApplicationsAgent from "@pages/agent/AllApplications";
import Dashboard from "./admin/Dashboard";
import { Spinner } from "@material-tailwind/react";
import Welcome from "./Welcome";

const HomePage = () => {
  const { pendingConnector } = useConnect();
  const { isConnecting, isDisconnected } = useAccount();
  const { role } = useApp();

  if (isConnecting || isDisconnected) return <Welcome />;
  if (pendingConnector) toast.loading("Pending Connector");
  if (!role) return <Spinner color="blue" />;
  
  return (
    <div className="w-full overflow-hidden">
      {
        role === "admin" || role === "owner" ? (
          <Dashboard />
        ) : role === "agent"  ? (
          <AllApplicationsAgent />
        ) : (
          <AllApplications />
        )
      }
    </div>
  );
};

export default HomePage;