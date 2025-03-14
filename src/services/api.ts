import axios from "axios";

// Базовий URL API
const API_BASE = "https://vpic.nhtsa.dot.gov/api/vehicles";

interface ApiResponse<T> {
  Count: number;
  Message: string;
  Results: T[];
}

interface PaginatedResponse<T> {
  makes: T[];
  total: number;
  currentPage: number;
  totalPages: number;
}

// Запит для отримання всіх брендів з пагінацією
export const getAllMakes = async (page: number = 1, pageSize: number = 50): Promise<PaginatedResponse<any>> => {
  console.log('Викликано getAllMakes з параметрами:', { page, pageSize });
  try {
    console.log('Виконуємо запит до:', `${API_BASE}/GetAllMakes?format=json`);
    const response = await axios.get<ApiResponse<any>>(
      `${API_BASE}/GetAllMakes?format=json`
    );
    
    console.log('Отримано відповідь від API:', response.data);
    
    if (!response.data || !response.data.Results) {
      throw new Error('Некоректна відповідь від API');
    }

    const allMakes = response.data.Results;
    const total = allMakes.length;
    const startIndex = (page - 1) * pageSize;
    const makes = allMakes.slice(startIndex, startIndex + pageSize);

    console.log('Підготовлено дані для відправки:', {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / pageSize),
      makesCount: makes.length
    });

    return {
      makes,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / pageSize)
    };
  } catch (error) {
    console.error('Помилка при отриманні даних:', error);
    if (axios.isAxiosError(error)) {
      console.error('Деталі помилки Axios:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    throw error;
  }
};

// Запит для отримання деталей бренду
export const getMakeDetails = async (make: string) => {
  try {
    const [details, types] = await Promise.all([
      axios.get<ApiResponse<any>>(`${API_BASE}/GetManufacturerDetails/${make}?format=json`),
      axios.get<ApiResponse<any>>(`${API_BASE}/GetVehicleTypesForMake/${make}?format=json`)
    ]);

    const makeDetails = details.data.Results[0] || {};
    const vehicleTypes = types.data.Results || [];

    return {
      ...makeDetails,
      VehicleTypes: vehicleTypes.map((type: any) => type.VehicleTypeName)
    };
  } catch (error) {
    console.error('Error fetching make details:', error);
    throw error;
  }
};

// Запит для отримання моделей бренду за рік
export const getModelsForMake = async (make: string, year: number) => {
  try {
    const response = await axios.get<ApiResponse<any>>(
      `${API_BASE}/GetModelsForMake/${make}?year=${year}&format=json`
    );
    return response.data.Results;
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};

// Запит для отримання брендів за типом транспорту з пагінацією
export const getMakesByVehicleType = async (
  vehicleType: string,
  page: number = 1,
  pageSize: number = 50
): Promise<PaginatedResponse<any>> => {
  try {
    const response = await axios.get<ApiResponse<any>>(
      `${API_BASE}/GetMakesForVehicleType/${vehicleType}?format=json`
    );
    
    const allMakes = response.data.Results;
    const total = allMakes.length;
    const startIndex = (page - 1) * pageSize;
    const makes = allMakes.slice(startIndex, startIndex + pageSize);

    return {
      makes,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / pageSize)
    };
  } catch (error) {
    console.error('Error fetching makes by vehicle type:', error);
    throw error;
  }
};

export const getManufacturerDetails = async (manufacturer: string) => {
  console.log("getManufacturerDetails");
  const response = await axios.get<ApiResponse<any>>(`${API_BASE}/GetManufacturerDetails/${manufacturer}?format=json`);
  return response.data.Results;
};
