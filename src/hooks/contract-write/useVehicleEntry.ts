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

export const useVehicleEntry = () => {

  const [data, setData] = useState<User | null>(null);

  console.log(data);

  const { config } = usePrepareContractWrite({
      address: REGISTER_CONTRACT_ADDRESS,
      abi: REGISTER_CONTRACT_ABI,
      functionName: "entryVehicle",
      args: [data],
      enabled: data !== null,
      onError: (err: any) => {
        toast.error(getContractErrorMessage(err));
      },
  })

  const contract = useWriteContract(config);

  async function entry(_data: User) {
      await setData(_data);
      contract.write?.();
  }

  return {
      entry,
      ...contract
  }
};
