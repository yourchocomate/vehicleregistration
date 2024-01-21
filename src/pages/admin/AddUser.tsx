import CustomSelect from "@/components/CustomSelect";
import { BRANCHES } from "@/config/constants";
import { useApp } from "@/hooks";
import { useAddUpdateUser } from "@/hooks/contract-write/useAddUpdateUser";
import { truncate } from "@/utils/Helpers";
import { Button, Card, Checkbox, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {

    const navigate = useNavigate();

    const { role: user } = useApp();

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

    const [role, setRole] = useState<RoleType>("Agent");

    const { mutate } = useAddUpdateUser("add", role);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = mutate(data);
        toast.promise(result, { loading: "Loading...", success: "User Added", error: "Error" });
        result.then((tx) => {
            if (tx?.hash) {
                toast.success(`User Added: ${truncate(tx.hash, 10)}`);
                navigate(role === "Admin" ? "/owner/manage-admins" : "/manage-agents");
            }
        })
    }

    return (
        <Card shadow={true} className="p-4 w-full items-start">
            <Typography variant="h4" color="blue-gray">
                Entry { user === "admin" ? "Agent" : "User" } Data
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
                    <CustomSelect label="Select Branch" options={BRANCHES} value={data.branch} onChange={(value) => setData({ ...data, branch: value })}/>
                    <Input size="lg" name="created_at" label="Created At" type="date-time" value={data.created_at} onChange={handleInputChange}/>
                    {
                        user === "owner" && (
                            <Checkbox name="role" checked={role === "Admin"} onChange={() => setRole(role === "Admin" ? "Agent" : "Admin")} label={role.toString()}/>
                        )
                    }
                </div>
                <Button fullWidth className="mt-6" type="submit">
                    Submit
                </Button>
            </form>
        </Card>
    )
}

export default AddAdmin;