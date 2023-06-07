import { PencilIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useReadContract } from "@hooks/contract-read";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  "Name",
  "NID",
  "Phone",
  "Address",
  "Created At",
  "",
];

export default function AllAdminsTable() {

  const navigate = useNavigate();

  const { isError, isLoading, data} = useReadContract().GetAllAdmins();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / rowsPerPage) || 1;

  const paginate = (array: UserData[], page_size: number, page_number: number) => {
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
              All Admins
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last transactions
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <Button
              onClick={() => {navigate("/owner/add-user")}}
              className="md:ml-4"
            >
              Add User
            </Button>
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
                    name,
                    nid,
                    phone,
                    living_address,
                    created_at
                  },
                  index
                ) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={nid + index}>
                      <td className={classes}>
                        <div className="flex items-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
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
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {living_address}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {created_at}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-4">
                            <Tooltip content="Edit User">
                              <IconButton variant="text" color="blue-gray">
                                  <PencilIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
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
