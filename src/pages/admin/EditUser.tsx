import { useReadContract } from "@/hooks/contract-read";
import { Card, Typography, Input, Button} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useAddUpdateUser } from '../../hooks/contract-write/useAddUpdateUser';
import { toast } from "react-hot-toast";
import { truncate } from "@/utils/Helpers";
import { BRANCHES } from "@/config/constants";
import CustomSelect from "@/components/CustomSelect";

const EditUser = () => {
    
    const navigate = useNavigate();
    const { address, role: Role } = useParams();

    const [role, setRole] = useState<RoleType>(Role === "admin" ? "Admin" : "Agent");

    const [data, setData] = useState<UserData>({
        _address: "",
        name: "",
        living_address: "",
        image_url: "",
        phone: "",
        nid: "",
        created_at: new Date().toISOString(),
        branch: "",
        flag: true,
        admin: false
    });

    const contract = useReadContract().GetUserByAddress(address as string, Role as "admin" | "agent");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const { mutate } = useAddUpdateUser("update", role);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = mutate(data);
        toast.promise(result, { loading: "Loading...", success: "User Updated", error: "Error" });
        result.then((tx) => {
            if (tx?.hash) {
                toast.success(`User Updated: ${truncate(tx.hash, 10)}`);
                navigate(role === "Admin" ? "/owner/manage-admins" : "/manage-agents");
            }
        }).catch((e) => {
            toast.error(e.message);
        })
    }
    useEffect(() => {
        if (!contract.isLoading && contract.data) {
            setData(contract.data);
        }
    }, [contract.data, contract.isLoading]);

    return (
        <Card shadow={true} className="p-4 w-full items-start">
            <Typography variant="h4" color="blue-gray">
                Edit User Data
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Update the user details
            </Typography>
            <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
                <Typography variant="h6" color="blue-gray">
                    Personal Information
                </Typography>
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mt-4">
                    <Input size="lg" name="_address" label="Chain Address" readOnly value={data._address} placeholder="0x1C...." onChange={handleInputChange}/>
                    <Input size="lg" name="name" label="Name" value={data.name} onChange={handleInputChange}/>
                    <Input size="lg" name="living_address" label="Address" value={data.living_address} onChange={handleInputChange}/>
                    <Input size="lg" name="nid" label="NID" value={data.nid} onChange={handleInputChange}/>
                    <Input size="lg" name="phone" label="Phone" value={data.phone} onChange={handleInputChange}/>
                    <CustomSelect label="Select Branch" options={BRANCHES} value={data.branch} onChange={(value) => setData({ ...data, branch: value })}/>
                    <Input size="lg" name="created_at" label="Created At" type="date-time" value={data.created_at} onChange={handleInputChange}/>
                </div>
                <Button fullWidth className="mt-6" type="submit">
                    Submit
                </Button>
            </form>
        </Card>
    );
}

export default EditUser;