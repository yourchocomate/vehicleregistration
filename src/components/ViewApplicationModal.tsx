import { Dialog, DialogBody, Typography } from "@material-tailwind/react"
import PlateCanvasImage from "./PlateCanvasImage";
import { makePlateTitle } from "@/utils/Helpers";
import { CAR_TYPE } from "@/config/constants";

const Block = ({label, value}: {label: string, value: string}) => {
    return (
        <div className="flex flex-col items-start justify-center">
            <p className="text-sm">{label}</p>
            <p className="text-sm text-gray-900">{value}</p>
        </div>
    )
}

const ViewApplicationModal = ({open, handleOpen, data, agents} : {
    open: boolean;
    handleOpen: () => void,
    data: VehicleData,
    agents: AgentList[]
}) => {
    return (
        <>
            {
                data && (
                    <Dialog
                        open={open}
                        handler={handleOpen}
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0.9, y: -100 },
                        }}
                        size="lg"
                    >
                        <DialogBody className="h-[40rem] overflow-y-scroll  no-scrollbar">
                            <div className="pt-0 px-8 pb-4 w-full">
                                <div className="mt-8 mb-2 w-full">
                                    <Typography variant="h6" color="blue-gray">
                                        Personal Information
                                    </Typography>
                                    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mt-4">
                                        <Block label="Name" value={data.user.name} />
                                        <Block label="Father's name" value={data.user.father_name} />
                                        <Block label="Address" value={data.user.living_address} />
                                        <Block label="NID" value={data.user.nid.toString()} />
                                        <Block label="Phone" value={data.user.phone} />
                                        <Block label="Sex" value={data.user.sex} />
                                        <Block label="Nationality" value={data.user.nationality} />
                                        <Block label="Guardian name" value={data.user.guardian_name} />
                                        <Block label="Date of birth" value={data.user.dob} />
                                    </div>
                                    <Typography variant="h6" color="blue-gray" className="mt-8">
                                        Vehicle Information
                                    </Typography>
                                    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mt-4">
                                        <Block label="Chasis no" value={data.chasis_no} />
                                        <Block label="Price" value={data.price} />
                                        <Block label="Engine CC" value={data.cc} />
                                        <Block label="Type" value={CAR_TYPE.find(c => c.value === data.car_type.toString())?.label || ""} />
                                        <Block label="Invoice URL" value={data.invoice_url} />
                                        <Block label="Color" value={data.color} />
                                        <Block label="Stamp" value={data.stamp} />
                                        <Block label="Tax" value={data.tax} />
                                        <Block label="Insurance" value={data.insurance} />
                                        <Block label="Signature" value={data.signature} />
                                        <Block label="Branch" value={agents?.find((agent) => agent._address === data.agent)?.branch || ""} />
                                        <Block label="Agent" value={agents?.find((agent) => agent._address === data.agent)?.name + " - " + agents?.find((agent) => agent._address === data.agent)?.branch } />
                                    </div>
                                    <Typography variant="h6" color="blue-gray" className="mt-8">
                                       Plate Information
                                    </Typography>
                                    <div className="w-full p-4">
                                        {
                                            data.plateNumber ? (
                                                <PlateCanvasImage plateNumber={data.plateNumber || "On review"} title={makePlateTitle(agents?.find((agent) => agent._address === data.agent)?.branch || "", data.cc)} />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center">
                                                    <p className="text-sm text-gray-900">Plate number is not generated yet</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </DialogBody>
                    </Dialog>
                )
            }
        </>
    )
}

export default ViewApplicationModal;