import AdNav from "../AdNav/AdNav"
import Select from 'react-select';

const options = [
  { value: 'Option 1', label: 'Option 1' },
  { value: 'Option 2', label: 'Option 2' },
  { value: 'Option 3', label: 'Option 3' },
  { value: 'Option 4', label: 'Option 4' },
];
const Addashboard = () => {
  const handleChange = (selectedOption) => {
    // Access the selected value using selectedOption.value
    console.log('Selected Option:', selectedOption.value);
  };

  return (
    <Select
      options={options}
      isSearchable
      placeholder="Select an option..."
      onChange={handleChange}
    />
  );
  // return (
  //   <div>
  //     <h1>This is admin Dashboard.</h1>
  //   </div>
  // )
}

export default Addashboard
