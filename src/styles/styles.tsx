import React from "react";

export const Heading: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...rest
}) => (
  <h1
    className={`text-sm font-bold text-gray-400 dark:text-gray-300 ${className}`}
    {...rest}
  />
);

export const HeadingWithAction: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...rest }) => (
  <div
    className={`flex justify-between text-sm font-bold text-bluish-400 dark:text-bluish-100 mb-2 ${className}`}
    {...rest}
  />
);

export const HeadingWithoutAction: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...rest }) => (
  <div
    className={`text-sm font-bold text-bluish-400 dark:text-bluish-100 mb-2 ${className}`}
    {...rest}
  />
);

export const LinkButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...rest }) => (
  <button
    className={`text-sm uppercase font-bold text-bluish-500 hover:text-bluish-800 hover:underline dark:text-bluish-300 dark:hover:text-bluish-600 ${className}`}
    {...rest}
  />
);

export const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...rest }) => (
  <button
    className={`text-white bg-blue-400 hocus:bg-blue-500 px-4 py-2 rounded-lg mr-2 h-12 ${className}`}
    {...rest}
  />
);

export const SecondaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...rest }) => (
  <button
    className={`text-white bg-green-400 hocus:bg-green-500 px-4 py-2 rounded-lg mr-2 h-12 ${className}`}
    {...rest}
  />
);

export const ErrorMessage: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, ...rest }) => (
  <p className={`text-red-500 text-sm font-semibold ${className}`} {...rest} />
);

export const InfoMessage: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, ...rest }) => (
  <p className={`text-blue-500 text-sm font-semibold ${className}`} {...rest} />
);
