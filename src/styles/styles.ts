import tw from "twin.macro";
import styled from "styled-components";

export const Heading = styled.h1`
  ${tw`text-sm font-bold text-gray-400`}
`;

export const HeadingWithAction = styled.div`
  ${tw`flex justify-between text-sm font-bold text-bluish-400 mb-2`}
`;

export const HeadingWithoutAction = styled.div`
  ${tw`text-sm font-bold text-bluish-400 mb-2`}
`;

export const LinkButton = styled.button`
  ${tw`text-sm uppercase font-bold text-bluish-500 hover:text-bluish-800 hover:underline`}
`;

export const PrimaryButton = styled.button`
  ${tw`text-white bg-blue-400 hocus:bg-blue-500 px-4 py-2 rounded-lg mr-2 h-12`}
`;

export const SecondaryButton = styled.button`
  ${tw`text-white bg-green-400 hocus:bg-green-500 px-4 py-2 rounded-lg mr-2 h-12`}
`;

export const ErrorMessage = styled.p`
  ${tw`text-red-500 text-sm font-semibold`}
`;

export const InfoMessage = styled.p`
  ${tw`text-blue-500 text-sm font-semibold`}
`;
