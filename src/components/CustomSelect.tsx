import { Option, Select } from "@material-tailwind/react"

const CustomSelect = ({ options, label, value, onChange, className, ...rest } : { label: string, options: {
    label: string;
    value: string;
}[], value: string, onChange: (e: any) => void, className?: string }) => {
    return (
        <Select
            {...rest}
            className={className}
            value={value}
            label={label}
            animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
            }}
            onChange={onChange}
        >
            {
                options.map((branch, index) => (
                    <Option key={index} value={branch.value}>{branch.label}</Option>
                ))
            }
        </Select>
    )
}

export default CustomSelect;