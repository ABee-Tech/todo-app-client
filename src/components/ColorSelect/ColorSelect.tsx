import SelectWithLabel from "../../components/SelectWithLabel/SelectWithLabel";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { MdOutlineInvertColorsOff } from "react-icons/md";
import { IDropdownSelectOption } from "@types";

interface IColorSelectProps {
  label?: string;
  options?: IDropdownSelectOption[];
  errorText?: string;
  value?: IDropdownSelectOption;
  defaultValue?: IDropdownSelectOption;
  onChange?: (e: any) => void;
  [x: string]: any;
}

const ColorSelect = React.forwardRef(
  (
    {
      label = "",
      options = [],
      errorText = "",
      value,
      defaultValue,
      onChange = () => {},
      ...props
    }: IColorSelectProps,
    ref
  ) => {
    const [color, setColor] = useState<IDropdownSelectOption | undefined>(
      value || defaultValue
    );

    return (
      <div className="w-full h-full flex relative">
        <SelectWithLabel
          {...{ label, options, errorText, value }}
          {...props}
          value={color}
          onChange={(e: any) => {
            setColor(e.target.value);
            onChange &&
              onChange({
                ...e,
                target: { ...e.target, name: props?.id, value: e.target.value },
              });
          }}
        />
        <div className="w-12 h-12 ml-2 rounded-lg overflow-hidden mb-auto bg-grey-700 shadow-md">
          <div
            className="w-full h-full flex justify-center items-center"
            style={{
              backgroundColor: color?.value || "",
            }}
          >
            {!color?.value && (
              <MdOutlineInvertColorsOff
                fontSize={"25px"}
                className={"text-white"}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

interface IColorSelectWithControlProps extends IColorSelectProps {
  control?: any;
  id?: string;
  rules?: any;
}

export const ColorSelectWithControl = ({
  control,
  rules,
  ...props
}: IColorSelectWithControlProps) => {
  return (
    <Controller
      control={control}
      name={props?.id as string}
      rules={rules}
      defaultValue={props?.defaultValue}
      render={({ field }) => <ColorSelect {...props} {...field} />}
    />
  );
};

export default ColorSelect;
