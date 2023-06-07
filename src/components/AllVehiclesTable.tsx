import { PencilIcon, CheckIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useReadContract } from "@hooks/contract-read";
import { toast } from 'react-hot-toast';
import { useApproveVehicle } from "@hooks/contract-write";
import { getContractErrorMessage } from "@utils/ExceptionHandlers";
import { useEffect, useState } from 'react';

const TABLE_HEAD = [
  "Chasis No",
  "Name",
  "NID",
  "Phone",
  "Status",
  "Plate Number",
  "",
];

export default function AllVehiclesTable() {

  const { isError, isLoading, data} = useReadContract().GetAllVehicles();

  const { approve, isError: approveError, error, isFetching, isFetched, transaction, isSuccess, reset, setChasisNo } = useApproveVehicle();

  useEffect(() => {
    if(isSuccess && !isFetching && isFetched && transaction) {
        reset();
        setChasisNo("");
        toast.success(`${transaction.hash}`);
    }

    if(isError) {
        toast.error("Error fetching data");
    }

    if(approveError) {
        toast.error(getContractErrorMessage(error));
    }

}, [transaction, isError, approveError, isFetching, isLoading]);


  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / rowsPerPage) || 1;

  const paginate = (array: any[], page_size: number, page_number: number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  const paginatedData = paginate(data, rowsPerPage, page);

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
              Recent Transactions
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
                (
                  {
                    chasis_no,
                    user: { nid, phone, name },
                    approved,
                    plateNumber,
                  },
                  index
                ) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={chasis_no + index}>
                      <td className={classes}>
                        <div className="flex items-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {chasis_no}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {nid.toString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phone}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={approved ? "Approved" : "Pending"}
                            color={approved ? "green" : "amber"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={plateNumber}
                            color={plateNumber ? "green" : "amber"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-4">
                            <Tooltip content="Edit User">
                              <IconButton variant="text" color="blue-gray">
                                  <PencilIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                            {
                              !approved && (
                                <Tooltip content="Approve User">
                                  <IconButton variant="text" color="blue-gray" onClick={() => approve(chasis_no)}>
                                      <CheckIcon className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                              )
                            }
                        </div>
                      </td>
                    </tr>
                  );
                }
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
    </Card>
  );
}
