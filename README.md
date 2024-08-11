
# Constellations Search Dropdown

This project provides a React.js component for a searchable dropdown that displays constellations. The component allows users to search through a list of constellations and select one from the dropdown menu.

## Features

- **Searchable Dropdown**: Users can type to search and filter constellations.
- **Dynamic Data Loading**: Constellations data is loaded from a JSON file.
- **Display Selected Option**: Shows the selected constellation's name below the dropdown.

## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**

   Ensure you have `node` and `npm` installed. Run:

   ```bash
   npm install
   ```

3. **Install `react-select`**

   This project uses `react-select` for the dropdown functionality. Install it by running:

   ```bash
   npm install react-select
   ```

4. **Run the Development Server**

   Start the development server with:

   ```bash
   npm start
   ```

   The application should be running at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Include the `SearchableDropdown` Component**

   Import and use the `SearchableDropdown` component in your main application file:

   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import SearchableDropdown from './SearchableDropdown';

   function App() {
       return (
           <div className="App">
               <h1>Constellation Search</h1>
               <SearchableDropdown />
           </div>
       );
   }

   ReactDOM.render(<App />, document.getElementById('root'));
   ```

2. **Provide the JSON File**

   Make sure the `constellations_data.json` file is located in the same directory as `SearchableDropdown.js` or adjust the import path accordingly.

## File Structure

- `src/`
  - `SearchableDropdown.js` - The React component for the searchable dropdown.
  - `constellations_data.json` - JSON file containing the constellations data.
  - `App.js` - Main application file that uses the `SearchableDropdown` component.

## JSON File Format

The `constellations_data.json` file should be formatted as an array of objects with the following structure:

```json
[
    {
        "name": "Andromeda",
        "otherField": "value"
    },
    {
        "name": "Orion",
        "otherField": "value"
    }
]
```



## Acknowledgments

- [react-select](https://react-select.com) for the dropdown component.
- The constellations data is based on available astronomical information.
