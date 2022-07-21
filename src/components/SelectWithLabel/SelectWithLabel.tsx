import React, { Fragment, useEffect, useState } from "react";
import { ErrorMessage } from "src/styles/styles";
import { Combobox, Transition } from "@headlessui/react";
import { HiCheck, HiSelector } from "react-icons/hi";
import "./SelectWithLabel.scss";
import { Controller } from "react-hook-form";

interface ISelectWithLabelOptions {
  label: string;
  value: string;
}

interface ISelectWithLabelProps {
  label?: string;
  options?: ISelectWithLabelOptions[];
  errorText?: string;
  value?: ISelectWithLabelOptions;
  onChange?: (e: any) => void;
  [x: string]: any;
}

const SelectWithLabel = ({
  label = "",
  options = [],
  errorText = "",
  value,
  onChange = () => {},
  ...props
}: ISelectWithLabelProps) => {
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? options
      : options.filter((person) =>
          person.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="flex flex-1 flex-col mb-2 relative">
      <div className="flex-grow border border-gray-400 focus-within:border-blue-100 rounded-lg text-md outline-1 outline-blue-100 h-12">
        <Combobox
          value={value}
          onChange={(value) => {
            onChange && onChange({ target: { name: props?.id, value } });
          }}
        >
          <div className="relative  h-full">
            <div className="relative w-full h-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 select-control">
              <Combobox.Input
                className="w-full h-full border-none px-2.5 pb-1 pt-5 leading-5 text-gray-900 focus:ring-0 rounded-lg outline-1 outline-blue-100"
                displayValue={(person: any) => person?.label || ""}
                onChange={(event) => setQuery(event.target.value)}
                placeholder=" "
              />
              <label
                htmlFor={props.id}
                className="text-lg absolute text-gray-400 left-3 top--1/2 duration-300 m-0 z-10"
              >
                {label}
              </label>
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <HiSelector
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-3 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <Combobox.Option
                      key={person.value}
                      className={({ active }) =>
                        `relative cursor-default select-none py-3 px-4 ${
                          active ? "bg-teal-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.label}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <HiCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
      {errorText && <ErrorMessage>{errorText}</ErrorMessage>}
    </div>
  );
};

interface ISelectWithLabelWithControlProps extends ISelectWithLabelProps {
  control?: any;
  id?: string;
  rules?: any;
}

export const SelectWithLabelWithControl = ({
  control,
  rules,
  ...props
}: ISelectWithLabelWithControlProps) => {
  return (
    <Controller
      control={control}
      name={props?.id as string}
      rules={rules}
      render={({ field }) => <SelectWithLabel {...props} {...field} />}
    />
  );
};

export default SelectWithLabel;
