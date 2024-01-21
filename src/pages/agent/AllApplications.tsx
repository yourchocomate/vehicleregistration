import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useReadContract } from "@hooks/contract-read";
import { toast } from 'react-hot-toast';
import { useApproveVehicle } from "@hooks/contract-write";
import { getContractErrorMessage } from "@utils/ExceptionHandlers";
import { useEffect, useState } from 'react';
import { truncate } from "@/utils/Helpers";
import ApplicationsTableRow from "@components/blocks/ApplicationsTableRow";
import { useApp, useDebounce } from "@/hooks";
import { useAccount } from "wagmi";
import ViewApplicationModal from "@/components/ViewApplicationModal";

const TABLE_HEAD = [
  "Chasis No",
  "Name",
  "NID",
  "Phone",
  "Status",
  "Plate Number",
  "Branch",
  "Agent",
  "",
];

const AllApplications = () => {

    const { address } = useAccount();
    const { role } = useApp();

    const [search, setSearch] = useState<string>("");
    const [filtered, setFiltered] = useState<VehicleData[]>([]);

    const { isLoading, data: fetchedData} = useReadContract().GetAllVehiclesByAgent(address as string);
    const { data: agents } = useReadContract().GetAgentList();
  
    const { approve } = useApproveVehicle();
  
    const handleApprove = async(chasis_no: string) => {
      const contract = approve(chasis_no);
      toast.promise(contract, { loading: 'Approving...', success: 'Approved successfully', error: "Couldn't approve" });
      contract.then((tx) => {
          if(tx) {
            toast.success(`Hash: ${truncate(tx?.hash, 10)}`, {
              icon: "👏",
              duration: 10000,
            });
          }
      }).catch((error) => {
          toast.error(getContractErrorMessage(error));
      });
    }
  
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(5);
  
    const data = filtered.length > 0 ? filtered : fetchedData;
    const totalPages = Math.ceil(data.length / rowsPerPage) || 1;
    const debouncedSearch = useDebounce(search, 500);
  
    const paginate = (array: any[], page_size: number, page_number: number) => {
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    };
  
    const paginatedData = paginate(data, rowsPerPage, page);

    const [modal, setModal] = useState<boolean>(false);
    const [modalData, setModalData] = useState<VehicleData | null>(null);

    const handleModalOpen = () => {
      setModal(!modal);
      setModalData(null);
    }
    
    useEffect(() => {
      if(debouncedSearch !== "") {
          const filtered = fetchedData.filter((vh) => {
              return vh.chasis_no.toLowerCase().includes(debouncedSearch.toLowerCase()) || vh.user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || vh.user.nid.toString().includes(debouncedSearch.toLowerCase()) ||  vh.user.phone.toLowerCase().includes(debouncedSearch.toLowerCase());
          });
          if(filtered.length > 0) {
              setFiltered(filtered);
          } else {
              setFiltered([]);
          }
      } else {
          setFiltered([]);
      }
  }, [debouncedSearch, fetchedData.length]);
  
    return (
      <Card shadow={true} className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="text-center md:text-left"
              >
                All Applications
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details about the last transactions
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6}>
                    <Spinner color="pink" />
                  </td>
                </tr>
              ) : (
                paginatedData.map(
                  (vh, index) => (
                    <ApplicationsTableRow
                      data={vh}
                      key={index}
                      index={index}
                      length={paginatedData.length}
                      branch={agents?.find((agent) => agent._address === vh.agent)?.branch}
                      agent={agents?.find((agent) => agent._address === vh.agent)?.name}
                      role={role}
                      approve={handleApprove}
                      modalOpen={modal}
                      setModal={setModal}
                      setModalData={setModalData}
                    />
                  )
                )
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" color="blue-gray" size="sm" onClick={() => {
              if(page === 1) return;
              setPage(page - 1);
          }}>
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {
              Array.from(Array(totalPages).keys()).map((index) => (
                <Button
                  key={index}
                  variant={index + 1 === page ? "outlined" : "text"}
                  color="blue-gray"
                  size="sm"
                  className={index + 1 === page ? "bg-blue-gray-50" : ""}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))
            }
          </div>
          <Button variant="outlined" color="blue-gray" size="sm" onClick={() => {
              if(page === totalPages) return;
              setPage(page + 1);
          }}>
            Next
          </Button>
        </CardFooter>
        <ViewApplicationModal open={modal} handleOpen={handleModalOpen} data={modalData as VehicleData}  agents={agents}/>
      </Card>
    );
}

export default AllApplications;