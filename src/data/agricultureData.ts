// filepath: /project/workspace/src/data/agricultureData.ts
export interface RealAgricultureData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))"?: number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"?: number;
  "Area Under Cultivation (UOM:Ha(Hectares))"?: number;
}

export interface ProcessedAgricultureData {
  year: number;
  crop: string;
  production: number;
}

interface YearMap {
  [key: number]: {
    maxCrop: string;
    minCrop: string;
    maxProduction: number;
    minProduction: number;
  };
}

interface CropMap {
  [key: string]: {
    totalYield: number;
    count: number;
  };
}

export interface ProcessedData {
  maxMinCrops: { year: number; maxCrop: string; minCrop: string }[];
  averageYield: { crop: string; averageYield: number }[];
}

export const parseAndProcessData = (data: RealAgricultureData[]): ProcessedAgricultureData[] => {
  return data.map(item => ({
    year: parseInt(item.Year.split(', ')[1]),
    crop: item["Crop Name"],
    production: item["Crop Production (UOM:t(Tonnes))"] || 0,
  }));
};

export const processAgricultureData = (data: ProcessedAgricultureData[]): ProcessedData => {
  const yearMap: YearMap = {};
  const cropMap: CropMap = {};

  data.forEach(({ year, crop, production }) => {
    if (!yearMap[year]) {
      yearMap[year] = { maxCrop: crop, minCrop: crop, maxProduction: production, minProduction: production };
    } else {
      if (production > yearMap[year].maxProduction) {
        yearMap[year].maxCrop = crop;
        yearMap[year].maxProduction = production;
      }
      if (production < yearMap[year].minProduction) {
        yearMap[year].minCrop = crop;
        yearMap[year].minProduction = production;
      }
    }

    if (!cropMap[crop]) {
      cropMap[crop] = { totalYield: production, count: 1 };
    } else {
      cropMap[crop].totalYield += production;
      cropMap[crop].count += 1;
    }
  });

  const maxMinCrops = Object.keys(yearMap).map((year) => ({
    year: parseInt(year),
    maxCrop: yearMap[parseInt(year)].maxCrop,
    minCrop: yearMap[parseInt(year)].minCrop,
  }));

  const averageYield = Object.keys(cropMap).map((crop) => ({
    crop,
    averageYield: cropMap[crop].totalYield / cropMap[crop].count,
  }));

  return { maxMinCrops, averageYield };
};