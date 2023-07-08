import { Chip, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon, CheckIcon, EyeIcon } from '@heroicons/react/24/solid';
import { copyTextToClipboard, plateTranslator } from "@/utils/Helpers";
import { Link } from "react-router-dom";

const ApplicationsTableRow = ({
    data,
    index,
    length,
    role,
    branch,
    agent,
    modalOpen,
    setModal,
    setModalData,
    approve

} : ApplicationsTableRowBlockProps) => {
    const isLast = index === length - 1;
    const classes = isLast
        ? "p-4"
        : "p-4 border-b border-blue-gray-50";

    const viewBtnHandler = () => {
        if(!modalOpen) {
            setModal(true);
            setModalData(data);
        }
    }

    return (
        <tr key={data.chasis_no + index}>
            <td className={classes}>
                <div className="flex items-center">
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                    onClick={() => copyTextToClipboard(data.chasis_no)}
                >
                    {data.chasis_no}
                </Typography>
                </div>
            </td>
            <td className={classes}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                >
                {data.user.name}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                >
                {data.user.nid.toString()}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                >
                {data.user.phone}
                </Typography>
            </td>
            <td className={classes}>
                <div className="w-max">
                <Chip
                    size="sm"
                    variant="ghost"
                    value={data.approved ? "Approved" : "Pending"}
                    color={data.approved ? "green" : "amber"}
                />
                </div>
            </td>
            <td className={classes}>
                <div className="w-max" onClick={() => copyTextToClipboard(data.plateNumber || "On Review")}>
                    <Chip
                        size="sm"
                        variant="ghost"
                        value={plateTranslator(data.plateNumber || "")}
                        color={data.plateNumber ? "green" : "amber"}
                    />
                </div>
            </td>
            <td className={classes}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                >
                {branch}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                >
                {agent}
                </Typography>
            </td>
            <td className={classes}>
                <div className="flex items-center gap-4">
                    {
                       ((["agent","admin","owner"].includes(role as string)) && approve) && (
                        <>
                            {
                                !data.approved && (
                                <Tooltip content="Approve Application">
                                    <IconButton variant="text" color="blue-gray" onClick={() => approve(data.chasis_no)}>
                                        <CheckIcon className="h-4 w-4" />
                                    </IconButton>
                                </Tooltip>
                                )
                            }
                         </>
                       )
                    }
                    {
                       ((["agent","admin","owner"].includes(role as string))) && (
                            <Link to={`/edit-entry/${data.chasis_no}`}>
                                <Tooltip content="Edit">
                                    <IconButton variant="text" color="blue-gray">
                                        <PencilIcon className="h-4 w-4" />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                       )
                    }
                     <Tooltip content="View">
                        <IconButton variant="text" color="green" onClick={viewBtnHandler}>
                            <EyeIcon className="h-4 w-4" />
                        </IconButton>
                    </Tooltip>
                </div>
            </td>
        </tr>
    );
}

export default ApplicationsTableRow;