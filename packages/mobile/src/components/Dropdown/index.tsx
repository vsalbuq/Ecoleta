import React, { FunctionComponent } from 'react';
import RNPickerSelect, { PickerStyle } from 'react-native-picker-select';

interface IOption {
  label: string;
  value: string;
}

const Dropdown: FunctionComponent<{
  options: IOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  style?: PickerStyle;
}> = ({ options, onChange, placeholder, style }) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => {
        onChange(value);
        console.log(value);
      }}
      items={options.map((option) => {
        return { label: option.label, value: option.value };
      })}
      placeholder={{ key: 1, label: placeholder || 'Select an option' }}
      style={style}
    />
  );
};

export default Dropdown;
