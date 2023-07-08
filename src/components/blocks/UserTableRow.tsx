import { copyTextToClipboard, truncate } from "@/utils/Helpers";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/solid';
import { Link } from "react-router-dom";

const UserTableRow : React.FC<UserTableRowBlockProps> = ({index, nid, name, branch, phone, living_address, created_at, _address, length, mutate, role, admin, type}) => {

    const isLast = index === length - 1;
    const classes = isLast
        ? "p-4"
        : "p-4 border-b border-blue-gray-50";
    console.log(role)
    return (
        <tr>
            <td className={classes}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                onClick={() => copyTextToClipboard(_address)}
                >
                {truncate(_address, 16)}
                </Typography>
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
                <div className="flex items-center">
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                >
                    {name}
                </Typography>
                </div>
            </td>
            <td className={classes}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                >
                {nid}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                >
                {phone}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                >
                {living_address}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                >
                {created_at}
                </Typography>
            </td>
            <td className={classes}>
                <div className="flex items-center gap-4">
                    {
                        ["admin", "owner"].includes(role as string) && (
                            <>
                                <Link to={type === "Admin" ? "/owner/edit-user/admin/"+_address : "/edit-user/agent/"+_address}>
                                    <Tooltip content="Edit User">
                                        <IconButton variant="text" color="green">
                                            <PencilIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                                <Tooltip content="Edit User">
                                    <IconButton variant="text" color="red" onClick={() => mutate(_address)}>
                                        <TrashIcon className="h-4 w-4" />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )
                    }
                    {
                        !admin && (
                            <Link to={"/agent/entries/"+_address}>
                                <Tooltip content="View entries by agent">
                                    <IconButton variant="text" color="green">
                                        <EyeIcon className="h-4 w-4" />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        )
                    }
                </div>
            </td>
        </tr>
    );
};

export default UserTableRow;