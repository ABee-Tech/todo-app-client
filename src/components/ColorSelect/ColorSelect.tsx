import SelectWithLabel from "../../components/SelectWithLabel/SelectWithLabel";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { MdOutlineInvertColorsOff } from "react-icons/md";

export interface IColorSelectOptions {
  label: string;
  value: string;
}

interface IColorSelectProps {
  label?: string;
  options?: IColorSelectOptions[];
  errorText?: string;
  value?: IColorSelectOptions;
  onChange?: (e: any) => void;
}

const ColorSelect = ({
  label = "",
  options = [],
  errorText = "",
  value,
  onChange = () => {},
  ...props
}: IColorSelectProps) => {
  const [color, setColor] = useState<IColorSelectOptions>(
    value || { label: "", value: "" }
  );

  return (
    <div className="w-full h-full flex relative">
      <SelectWithLabel
        {...{ label, options, errorText, value }}
        {...props}
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          onChange && onChange(e);
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
};

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
      render={({ field }) => <ColorSelect {...props} {...field} />}
    />
  );
};

export default ColorSelect;
