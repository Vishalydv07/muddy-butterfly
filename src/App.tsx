import  { useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import BarChart from './components/BarChart';
import { parseAndProcessData, processAgricultureData, ProcessedData, RealAgricultureData } from './data/agricultureData';

function App() {
  const [data, setData] = useState<ProcessedData | null>(null);

  useEffect(() => {
    fetch('/agricultureData.json')
      .then((r) => r.json())
      .then((realData: RealAgricultureData[]) => {
        const processedData = processAgricultureData(parseAndProcessData(realData));
        setData(processedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!data) return <div>Loading...</div>;

  const { maxMinCrops, averageYield } = data;

  return (
    <div >
      <h1 style={{ marginLeft:'210px',padding: '1rem', fontFamily: 'Arial, sans-serif' }}>Indian Agriculture Data Analysis</h1>
      <DataTable data={maxMinCrops} />
      <BarChart data={averageYield} />
    </div>
  );
}

export default App;