import { usePrepareContractWrite } from "wagmi"
import { REGISTER_CONTRACT_ABI, REGISTER_CONTRACT_ADDRESS } from "@config/constants"
import { useState } from "react";
import { useWriteContract } from "./useWriteContract";

export const useApproveVehicle = () => {

    const [chasisNo, setChasisNo] = useState<string>("");

    // const debouncedChasisNo = useDebounce(chasisNo, 500);

    const { config } = usePrepareContractWrite({
        address: REGISTER_CONTRACT_ADDRESS,
        abi: REGISTER_CONTRACT_ABI,
        functionName: "approveVehicle",
        args: [chasisNo],
        enabled: chasisNo.length > 0
    })

    const contract = useWriteContract(config);

    function approve(chasis_no: string) {
        setChasisNo(chasis_no);
        contract.write?.();
    }

    return {
        setChasisNo,
        approve,
        ...contract
    }

}