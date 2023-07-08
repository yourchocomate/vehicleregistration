type RoleType = "Admin" | "Agent";

type UserTableRowBlockProps = {
    index: number,
    nid: string,
    branch: string,
    name: string,
    phone: string,
    living_address: string,
    created_at: string,
    _address: string,
    length: number,
    role: Role,
    type: RoleType,
    admin: boolean,
    mutate: (address: string) => void
}

type AgentList = {
    _address: string;
    name: string;
    branch: string;
    phone: string;
}

type ApplicationsTableRowBlockProps = {
    data: VehicleData,
    index: number,
    length: number,
    role: Role,
    branch: string | undefined,
    agent: string | undefined,
    modalOpen: boolean,
    setModal: (text: any) => void,
    setModalData: (data: VehicleData) => void,
    approve?: (chasis_no: string) => void
}
