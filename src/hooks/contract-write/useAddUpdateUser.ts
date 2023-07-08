import {
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESS,
} from "@config/constants";
import {
  prepareWriteContract, writeContract
} from "wagmi/actions";
  
  export const useAddUpdateUser = (method: "add" | "update" | "remove", type: "Admin" | "Agent") => {
  
    const mutate = async(_data: UserData | string) => {
      const { request } = await prepareWriteContract({
        address: REGISTER_CONTRACT_ADDRESS,
        abi: REGISTER_CONTRACT_ABI,
        functionName: method + type,
        args: [_data]
      });

      const result = await writeContract(request);

      return result;
    }
  
    return {
        mutate
    }
  };
  