import abi from './abi.json';

export const REGISTER_CONTRACT_ADDRESS = import.meta.env.VITE_REGISTER_CONTRACT_ADDRESS;
export const REGISTER_CONTRACT_ABI = abi;

export const BRANCHES = [
    {
        label: "Dhaka",
        value: "dhaka"
    },
    {
        label: "Chittagong",
        value: "chittagong"
    },
    {
        label: "Sylhet",
        value: "sylhet"
    },
    {
        label: "Rajshahi",
        value: "rajshahi"
    },
    {
        label: "Khulna",
        value: "khulna"
    },
    {
        label: "Barishal",
        value: "barishal"
    },
    {
        label: "Rangpur",
        value: "rangpur"
    },
    {
        label: "Mymensingh",
        value: "mymensingh"
    },
];

export const ADMINLIST_TABLE_HEAD = [
    "Chain Address",
    "Branch",
    "Name",
    "NID",
    "Phone",
    "Address",
    "Created At",
    "Action",
];

export const CAR_TYPE = [
    { value: "1", label: "Motor Cycle" },
    { value: "2", label: "Motor Car" },
]