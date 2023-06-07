import { useAccount, useConnect } from "wagmi";
import { toast } from "react-hot-toast";
import AllVehiclesTable from "@components/AllVehiclesTable";
import { useApp } from "@/hooks";

const HomePage = () => {
  const { pendingConnector } = useConnect();
  const { isConnecting, isDisconnected } = useAccount();

  const { role } = useApp();

  // const registerVehicle = useRegisterVehicle();

  // useEffect(() => {
  //   registerVehicle.setData({
  //     chasis_no: Math.floor(Math.random() * 10000000000).toString(),
  //     user: {
  //       name: "John Doe",
  //       father_name: "James Doe",
  //       living_address: "123 Main St",
  //       sex: "Male",
  //       phone: "1234567890",
  //       nationality: "US",
  //       guardian_name: "Jane Doe",
  //       dob: "01-01-1990",
  //       nid: 12345365476,
  //     },
  //     price: "1000",
  //     invoice_url: "http://example.com/invoice",
  //     color: "Red",
  //     stamp: "ABC",
  //     tax: "10",
  //     insurance: "Yes",
  //     signature: "0x1234567890abcdef",
  //     approved: false,
  //     entryBy: address,
  //   });
  // }, []);

  if (isConnecting) return <div>Connecting…</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  if (pendingConnector) toast.loading("Pending Connector");
  console.log(role);
  return (
    <div className="w-full overflow-hidden">
      {
        role === "admin" || role === "owner" && (
          <AllVehiclesTable />
        )
      }
    </div>
  );
};

export default HomePage;
