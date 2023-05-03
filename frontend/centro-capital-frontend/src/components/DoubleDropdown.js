import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  {
    label: 'Rate',
    options: [
      { label: 'Employment Rate', value: 'employment' },
      { label: 'Unemployment Rate', value: 'unemployment' },
    ],
  },
  {
    label: 'Total',
    options: [
      { label: 'Civilian Population Total', value: 'civpop' },
      { label: 'Employment Total', value: 'employmentTotal' },
      { label: 'Labor Force Total', value: 'laborforce' },
      { label: 'Unemployment Total', value: 'unemploymentTotal' },
    ],
  },
];

const DoubleDropdown = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onSelect({ target: { value: selectedOption.value } }); // pass an event object with the selected value
  };

  return (
    <div style={{ width: 300 }}>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Select a metric"
      />
    </div>
  );
};

export default DoubleDropdown;
