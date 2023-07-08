import {
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESS,
} from "@config/constants";
import {
  prepareWriteContract, writeContract
} from "wagmi/actions";

export const useVehicleEntry = (method: "entry" | "update") => {

  const entry = async(_data: VehicleData) => {
    const { request } =  await prepareWriteContract({
        address: REGISTER_CONTRACT_ADDRESS,
        abi: REGISTER_CONTRACT_ABI,
        functionName: method + "Vehicle",
        args: [_data],
    })

    const contract = await writeContract(request);

    return contract;
  }

  return {
      entry,
  }
};
