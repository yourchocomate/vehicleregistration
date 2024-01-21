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
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAddUpdateUser } from "@/hooks/contract-write/useAddUpdateUser";
import { toast } from "react-hot-toast";
import UserTableRow from '@/components/blocks/UserTableRow';
import { getContractErrorMessage } from "@/utils/ExceptionHandlers";
import { truncate } from "@/utils/Helpers";
import { ADMINLIST_TABLE_HEAD } from "@/config/constants";
import { useApp, useDebounce } from "@/hooks";

const ManageAdmins = () => {

    const navigate = useNavigate();
    const { role } = useApp();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(5);

    const [filtered, setFiltered] = useState<UserData[]>([]);
    const { isLoading, data: fetchedData} = useReadContract().GetAllAdmins();
    const { mutate } = useAddUpdateUser("remove", "Admin");

    const data = filtered.length > 0 ? filtered : fetchedData;
    const totalPages = Math.ceil(data.length / rowsPerPage) || 1;
    const paginate = (array: UserData[], page_size: number, page_number: number) => {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    };

    const paginatedData = paginate(data, rowsPerPage, page);
    const debouncedSearch = useDebounce(search, 500);

    const handleMutate = async(chain_address: string) => {
        const contract = mutate(chain_address);
        toast.promise(contract, { loading: 'Removing...', success: 'Removed successfully', error: "Couldn't remove" });
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
    
    useEffect(() => {
        if(debouncedSearch !== "") {
            const filtered = fetchedData.filter((user) => {
                return user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || user.nid.toLowerCase().includes(debouncedSearch.toLowerCase()) || user._address.toLowerCase().includes(debouncedSearch.toLowerCase());
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
        <div className="w-full overflow-hidden">
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
                        onClick={() => navigate("/add-user")}
                        className="md:ml-4"
                        >
                        Add User
                        </Button>
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
                        {ADMINLIST_TABLE_HEAD.map((head) => (
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
                        paginatedData.map(({
                                _address,
                                name,
                                branch,
                                nid,
                                phone,
                                living_address,
                                admin,
                                created_at
                            },index) => (
                                <UserTableRow
                                    key={index + nid}
                                    index={index}
                                    branch={branch}
                                    _address={_address}
                                    length={data.length}
                                    name={name}
                                    nid={nid}
                                    phone={phone}
                                    living_address={living_address}
                                    created_at={created_at}
                                    mutate={handleMutate}
                                    admin={admin}
                                    role={role}
                                    type="Admin"
                                />
                            )
                        ))}
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
        </div>
    )
}

export default ManageAdmins;