import { useVehicleEntry } from "@/hooks/contract-write";
import { truncate } from "@/utils/Helpers";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const VehicleEntry = () => {

    const navigate = useNavigate();
    const { address } = useAccount();

    const [data, setData] = useState<User>({
        chasis_no: Math.floor(Math.random() * 10000000000).toString(),
        user: {
            name: "John Doe",
            father_name: "James Doe",
            living_address: "123 Main St",
            sex: "Male",
            phone: "1234567890",
            nationality: "US",
            guardian_name: "Jane Doe",
            dob: "01-01-1990",
            nid: 12345365476,
        },
        price: "1000",
        invoice_url: "http://example.com/invoice",
        color: "Red",
        stamp: "ABC",
        tax: "10",
        insurance: "Yes",
        signature: "0x1234567890abcdef",
        approved: false,
        entryBy: address
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            user: {
                ...data.user,
                [name]: value
            }
        });
    }

    const { entry, transaction, isSuccess, isLoading, isFetched, isFetching, reset } = useVehicleEntry();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        entry(data);
    }

    useEffect(() => {
        if(isSuccess && !isFetching && isFetched && transaction) {
            reset();
            toast.success("Vehicle entry successful");
            toast.success(`Hash: ${truncate(transaction?.hash, 10)}`);
            setTimeout(() => {
                navigate("/");
            }, 2000)
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transaction, isFetching, isLoading, isSuccess]);

    return (
        <Card shadow={true} className="p-4 w-full items-start">
            <Typography variant="h4" color="blue-gray">
                Entry Vehicle Data
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to register.
            </Typography>
            <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
                <Typography variant="h6" color="blue-gray">
                    Personal Information
                </Typography>
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mt-4">
                    <Input size="lg" name="name" label="Name" value={data.user.name} onChange={handleUserInputChange}/>
                    <Input size="lg" name="father_name" label="Father's name" value={data.user.father_name} onChange={handleUserInputChange}/>
                    <Input size="lg" name="living_address" label="Address" value={data.user.living_address} onChange={handleUserInputChange}/>
                    <Input size="lg" name="nid" label="NID" value={data.user.nid} onChange={handleUserInputChange}/>
                    <Input size="lg" name="phone" label="Phone" value={data.user.phone} onChange={handleUserInputChange}/>
                    <Input size="lg" name="sex" label="Sex" value={data.user.sex} onChange={handleUserInputChange}/>
                    <Input size="lg" name="nationality" label="Nationality" value={data.user.nationality} onChange={handleUserInputChange}/>
                    <Input size="lg" name="guardian_name" label="Guardian name" value={data.user.guardian_name} onChange={handleUserInputChange}/>
                    <Input size="lg" name="dob" label="Date of Birth" value={data.user.dob} onChange={handleUserInputChange}/>
                </div>
                <Typography variant="h6" color="blue-gray" className="mt-8">
                    Vehicle Information
                </Typography>
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mt-4">
                    <Input size="lg" name="chasis_no" label="Chasis No" value={data.chasis_no} onChange={handleInputChange}/>
                    <Input size="lg" name="price" label="Price" value={data.price} onChange={handleInputChange}/>
                    <Input size="lg" name="invoice_url" label="Invoice URL" value={data.invoice_url} onChange={handleInputChange}/>
                    <Input size="lg" name="color" label="Color" value={data.color} onChange={handleInputChange}/>
                    <Input size="lg" name="stamp" label="Stamp" value={data.stamp} onChange={handleInputChange}/>
                    <Input size="lg" name="tax" label="Tax" value={data.tax} onChange={handleInputChange}/>
                    <Input size="lg" name="insurance" label="Insurance" value={data.insurance} onChange={handleInputChange}/>
                    <Input size="lg" name="signature" label="Signature" value={data.signature} onChange={handleInputChange}/>
                </div>
                <Button fullWidth className="mt-6" type="submit">
                    {isLoading ? "Loading..." : "Submit"}
                </Button>
            </form>
        </Card>
    )
}

export default VehicleEntry;