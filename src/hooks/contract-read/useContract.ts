import { useContractRead } from "wagmi";
import { REGISTER_CONTRACT_ABI, REGISTER_CONTRACT_ADDRESS } from "@config/constants";

export const useContract = (functionName: string, args?: any[]) => {
    const result = useContractRead({
        address: REGISTER_CONTRACT_ADDRESS,
        abi: REGISTER_CONTRACT_ABI,
        functionName,
        args,
    });

    return result;
}