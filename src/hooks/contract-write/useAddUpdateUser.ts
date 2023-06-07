import {
    REGISTER_CONTRACT_ABI,
    REGISTER_CONTRACT_ADDRESS,
  } from "@config/constants";
  import {
    usePrepareContractWrite
  } from "wagmi";
  import { useState } from "react";
  import { toast } from "react-hot-toast";
  import { getContractErrorMessage } from "@utils/ExceptionHandlers";
  import { useWriteContract } from "./useWriteContract";
  
  export const useAddUpdateUser = (method: "add" | "update", type: "Admin" | "Agent") => {
  
    const [data, setData] = useState<UserData | null>(null);
  
    const { config } = usePrepareContractWrite({
        address: REGISTER_CONTRACT_ADDRESS,
        abi: REGISTER_CONTRACT_ABI,
        functionName: method + type,
        args: [data],
        enabled: data !== null,
        onError: (err: any) => {
          toast.error(getContractErrorMessage(err));
        },
    })
  
    const contract = useWriteContract(config);
  
    async function mutate(_data: UserData) {
        await setData(_data);
        contract.write?.();
    }
  
    return {
        mutate,
        ...contract
    }
  };
  