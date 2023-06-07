import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useReadContract } from '@hooks/contract-read';
export const useGetRole = () => {
    const [role, setRole] = useState<Role | undefined>(undefined);
    const { address } = useAccount();
    const { IsAdmin, IsAgent, IsOwner } = useReadContract();
    const { data: isAdmin, isError: isAdminError, isLoading: isAdminLoading } = IsAdmin(address || '');
    const { data: isAgent, isError: isAgentError, isLoading: isAgentLoading } = IsAgent(address || '');
    const { data: isOwner, isError: isOwnerError, isLoading: isOwnerLoading } = IsOwner();
    useEffect(() => {
        if (isAdminError || isAgentError) {
            setRole(undefined);
        }
        else if (isAdminLoading || isAgentLoading) {
            setRole(undefined);
        } else if (isOwnerError || isOwnerLoading) {
            setRole(undefined);
        }
        else if (isOwner === address) {
            setRole('owner');
        } 
        else if (isAdmin === true) {
            setRole('admin');
        }
        else if (isAgent === true) {
            setRole('agent');
        }
        else {
            setRole('user');
        }
    }, [isAdmin, isAgent, isOwner, isAdminError, isAgentError, isOwnerError, isAdminLoading, isAgentLoading, isOwnerLoading]);
    return {
        role
    };
}