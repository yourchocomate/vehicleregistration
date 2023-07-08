import { useAccount, useContractEvent } from "wagmi";
import { useContract } from "./useContract";
import { REGISTER_CONTRACT_ABI, REGISTER_CONTRACT_ADDRESS } from "@/config/constants";

export const useReadContract = () => {

    const { address } = useAccount();

    const IsAdmin = (address: string) => {
        const result = useContract('isAdmin', [address]);
        return result;
    }

    const IsAgent = (address: string) => {
        const result = useContract('isAgent', [address]);
        return result;
    }

    const IsOwner = () => {
        const result = useContract('owner');
        return result;
    }

    const GetVehicleData = (chasis: string) : {
        isLoading: boolean,
        isError: boolean,
        data: VehicleData
    } => {
        const { isError, isLoading, data, refetch } = useContract('viewVehicleData', [chasis]);

        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "ApproveVehicle",
            listener(log) {
                console.log(log)
                refetch();
            }
        });

        return {
            isError,
            isLoading,
            data: data as VehicleData
        }
    }

    const GetAllVehiclesByAgent = (agent: string) : {
        isLoading: boolean,
        isError: boolean,
        data: VehicleData[]
    } => {
        const { isError, isLoading, data, refetch } = useContract('getVehiclesByAgent', [agent]);

        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "EntryVehicle",
            listener(log) {
                console.log(log)
                refetch();
            }
        });
        
        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "ApproveVehicle",
            listener(log) {
                console.log(log)
                refetch();
            }
        });

        return {
            isError,
            isLoading,
            data: (data as VehicleData[] || []).filter(d => !d.entryBy.includes('0x00000000'))
        }
    }

    const GetAllVehiclesOfUser = () : {
        isLoading: boolean,
        isError: boolean,
        data: VehicleData[]
    } => {
        const { isError, isLoading, data, refetch } = useContract('getVehiclesByEntrer', [], address);

        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "EntryVehicle",
            listener() {
                refetch();
            }
        });

        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "UpdateVehicle",
            listener() {
                refetch();
            }
        });
        
        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "ApproveVehicle",
            listener() {
                refetch();
            }
        });

        console.log(data)

        return {
            isError,
            isLoading,
            data: (data as VehicleData[] || []).filter(d => !d.entryBy.includes('0x00000000'))
        }
    }

    const GetAllAdmins = () : {
        isLoading: boolean,
        isError: boolean,
        data: UserData[]
    } => {
        const { isError, isLoading, data, refetch } = useContract('getAdmins', []);

        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "AddAdmin",
            listener(log) {
                console.log(log)
                refetch();
            }
        });
        
        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "RemoveAdmin",
            listener(log) {
                console.log(log)
                refetch();
            }
        });

        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "UpdateAdmin",
            listener(log) {
                console.log(log)
                refetch();
            }
        });

        return {
            isError,
            isLoading,
            data: (data as UserData[] || []).filter(user => !user._address.includes('0x00000000'))
        }
    }

    const GetAllAgents = () : {
        isLoading: boolean,
        isError: boolean,
        data: UserData[]
    } => {
        const { isError, isLoading, data, refetch } = useContract('getAgents', []);

        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "AddAgent",
            listener(log) {
                console.log(log)
                refetch();
            }
        });
        
        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "RemoveAgent",
            listener(log) {
                console.log(log)
                refetch();
            }
        });

        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "UpdateAgent",
            listener(log) {
                console.log(log)
                refetch();
            }
        });

        return {
            isError,
            isLoading,
            data: (data as UserData[] || []).filter(user => !user._address.includes('0x00000000'))
        }
    }

    const GetUserByAddress = (address: string, role: "admin" | "agent") : {
        isLoading: boolean,
        isError: boolean,
        data: UserData
    } => {
        const { isError, isLoading, data } = useContract(role === "admin" ? "getAdmin" : "getAgent", [address]);
        return {
            isError,
            isLoading,
            data: data as UserData
        }
    }

    const GetAgentList = () : {
        isLoading: boolean,
        isError: boolean,
        data: AgentList[]
    } => {
        const { isError, isLoading, data, refetch } = useContract('getAgentList', []);

        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "AddAgent",
            listener(log) {
                console.log(log)
                refetch();
            }
        });
        
        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "RemoveAgent",
            listener(log) {
                console.log(log)
                refetch();
            }
        });

        useContractEvent({
            abi: REGISTER_CONTRACT_ABI,
            address: REGISTER_CONTRACT_ADDRESS,
            eventName: "UpdateAgent",
            listener(log) {
                console.log(log)
                refetch();
            }
        });

        return {
            isError,
            isLoading,
            data: (data as AgentList[] || []).filter(user => !user._address.includes('0x00000000'))
        }
    }
    return {
        IsAdmin,
        IsAgent,
        IsOwner,
        GetAllVehiclesByAgent,
        GetAllAdmins,
        GetAllAgents,
        GetUserByAddress,
        GetAllVehiclesOfUser,
        GetAgentList,
        GetVehicleData
    }
}