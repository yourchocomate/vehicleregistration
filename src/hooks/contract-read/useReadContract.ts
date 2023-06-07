import { useContractEvent } from "wagmi";
import { useContract } from "./useContract";
import { REGISTER_CONTRACT_ABI, REGISTER_CONTRACT_ADDRESS } from "@/config/constants";

export const useReadContract = () => {

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

    const GetAllVehicles = () : {
        isLoading: boolean,
        isError: boolean,
        data: User[]
    } => {
        const { isError, isLoading, data, refetch } = useContract('getAllVehicles', []);

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
            data: data as User[] || []
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
            data: data as UserData[] || []
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
            data: data as UserData[] || []
        }
    }

    return {
        IsAdmin,
        IsAgent,
        IsOwner,
        GetAllVehicles,
        GetAllAdmins,
        GetAllAgents
    }
}