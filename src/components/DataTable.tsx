import React from 'react';

interface CropData {
  year: number;
  maxCrop: string;
  minCrop: string;
}

interface DataTableProps {
  data: CropData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <table
      style={{
        borderCollapse: 'collapse',
        width: '70%',
        margin: '20px auto',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <thead>
        <tr style={{ backgroundColor: '#4caf50', color: '#fff' }}>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Year</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Crop with Max Production</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Crop with Min Production</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ year, maxCrop, minCrop }) => (
          <tr
            key={year}
            style={{
              textAlign: 'center',
              backgroundColor: year % 2 === 0 ? '#ffffff' : '#e8f5e9',
            }}
          >
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{year}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{maxCrop}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{minCrop}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;