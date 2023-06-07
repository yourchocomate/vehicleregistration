interface VehicleUser {
    name: string;
    father_name: string;
    living_address: string;
    sex: string;
    phone: string;
    nationality: string;
    guardian_name: string;
    dob: string;
    nid: number,
}

type User = {
    chasis_no: string;
    user: VehicleUser;
    price: string;
    invoice_url: string;
    color: string;
    stamp: string;
    tax: string;
    insurance: string;
    signature: string;
    approved?: boolean;
    entryBy?: string;
    plateNumber?: string;
}
