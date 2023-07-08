import { REGISTER_CONTRACT_ABI, REGISTER_CONTRACT_ADDRESS } from "@config/constants"
import { prepareWriteContract, writeContract } from "wagmi/actions";

export const useApproveVehicle = () => {

    const approve = async(chasis_no: string) => {
        const { request } = await prepareWriteContract({
            address: REGISTER_CONTRACT_ADDRESS,
            abi: REGISTER_CONTRACT_ABI,
            functionName: "approveVehicle",
            args: [chasis_no],
        });

        const result = await writeContract(request);

        return result;
    }

    return {
        approve,
    }

}