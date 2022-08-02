import React from 'react';
import { StylesConfig } from 'react-select';
import { Box } from '@chakra-ui/react';

const Svg = (p: JSX.IntrinsicElements['svg']) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    focusable='false'
    role='presentation'
    {...p}
  />
);

export const DropdownIndicator = () => (
  <Box h='24px' w='32px' color='rgb(204, 204, 204)'>
    <Svg>
      <path
        d='M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z'
        fill='currentColor'
        fillRule='evenodd'
      />
    </Svg>
  </Box>
);

export const selectStyles: StylesConfig<any> = {
  control: (provided) => ({
    ...provided,
    minWidth:
      window.innerWidth < 768 ? 100 : window.innerWidth < 1440 ? 150 : 240,
    cursor: 'text',
    maxWidth: 240,
    fontSize: '12px',
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: 1000,
    fontSize: '12px',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const isInOffice = data.label.props.isInOffice;
    return {
      ...styles,
      '&:hover': {
        backgroundColor: isInOffice ? 'none' : 'transparent',
      },
      '&:focus': {
        backgroundColor: isInOffice ? 'none' : 'transparent',
      },
      '&:select': {
        backgroundColor: isInOffice ? 'none' : 'transparent',
      },
    };
  },
};
