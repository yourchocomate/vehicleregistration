import { useAddUpdateUser } from "@/hooks/contract-write/useAddUpdateUser";
import { truncate } from "@/utils/Helpers";
import { Button, Card, Checkbox, Input, Select,Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type RoleType = "Admin" | "Agent";

const AddAdmin = () => {

    const navigate = useNavigate();

    const [data, setData] = useState<UserData>({
        _address: "",
        name: "",
        living_address: "",
        image_url: "",
        phone: "",
        nid: "",
        created_at: new Date().toISOString(),
        flag: true
    });

    const [role, setRole] = useState<RoleType>("Agent");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const { mutate, transaction, isSuccess, isLoading, isFetched, isFetching, reset } = useAddUpdateUser("add", role);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(data);
    }

    useEffect(() => {
        if(isSuccess && !isFetching && isFetched && transaction) {
            reset();
            toast.success("Admin added successfully");
            toast.success(`Hash: ${truncate(transaction?.hash, 10)}`);
            setTimeout(() => {
                navigate("/owner/manage-admins");
            }, 2000)
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transaction, isFetching, isLoading, isSuccess]);

    return (
        <Card shadow={true} className="p-4 w-full items-start">
            <Typography variant="h4" color="blue-gray">
                Entry Admin Data
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter the user details
            </Typography>
            <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
                <Typography variant="h6" color="blue-gray">
                    Personal Information
                </Typography>
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mt-4">
                    <Input size="lg" name="_address" label="Chain Address" value={data._address} placeholder="0x1C...." onChange={handleInputChange}/>
                    <Input size="lg" name="name" label="Name" value={data.name} onChange={handleInputChange}/>
                    <Input size="lg" name="living_address" label="Address" value={data.living_address} onChange={handleInputChange}/>
                    <Input size="lg" name="nid" label="NID" value={data.nid} onChange={handleInputChange}/>
                    <Input size="lg" name="phone" label="Phone" value={data.phone} onChange={handleInputChange}/>
                    <Input size="lg" name="created_at" label="Created At" type="date-time" value={data.created_at} onChange={handleInputChange}/>
                    <Checkbox name="role" checked={role === "Admin"} onChange={(e) => setRole(role === "Admin" ? "Agent" : "Admin")} label={role.toString()}/>
                </div>
                <Button fullWidth className="mt-6" type="submit">
                    {isLoading ? "Loading..." : "Submit"}
                </Button>
            </form>
        </Card>
    )
}

export default AddAdmin;