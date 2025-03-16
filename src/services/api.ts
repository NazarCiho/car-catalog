import axios from "axios";

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

// отрммання всіх брендів
export const getAllMakes = async (page: number = 1, pageSize: number = 50): Promise<PaginatedResponse<any>> => {
  console.log('Викликано getAllMakes з параметрами:', { page, pageSize });
  try {
    console.log('Виконуємо запит до:', `${API_BASE}/GetMakesForVehicleType/car?format=json`);
    const response = await axios.get<ApiResponse<any>>(
      `${API_BASE}/GetMakesForVehicleType/car?format=json`
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
    console.log("Отримані марки у CarsList:", makes);
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

// запит для отриання деталей марки
export const getMakeDetails = async (make: string) => {
  try {
    const [details, types] = await Promise.all([
      axios.get<ApiResponse<any>>(`${API_BASE}/GetManufacturerDetails/${make}?format=json`),
      axios.get<ApiResponse<any>>(`${API_BASE}/GetVehicleTypesForMake/${make}?format=json`)
    ]);
    const makeDetails = details.data.Results[0] || {};
    const vehicleTypes = types.data.Results || [];
    console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■details:", makeDetails);

    return {
      ...makeDetails,
      VehicleTypes: vehicleTypes.map((type: any) => type.VehicleTypeName)
    };
  } catch (error) {
    console.error('Error fetching make details:', error);
    throw error;
  }
};

// отримання моделей бренду за рік
export const getModelsForMake = async (make: string, year: number) => {
  try {
    console.log(`Requesting models for ${make}, year ${year}`); 
    const response = await axios.get<ApiResponse<any>>(
      `${API_BASE}/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`
    );
    console.log('API Response:', response.data); 
    return response.data.Results || [];
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};

// отримання брендів за типом транспорту 
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

export const getModelDetails = async (make: string, model: string) => {
  try {
    console.log("getModelDetails, make:", make, "model:", model);
    const response = await axios.get<ApiResponse<any>>(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`
    );
    
    const modelDetails = response.data.Results.find(
      (m: any) => m.Model_Name === model
    );
    console.log("modelDetails:", modelDetails);
    return modelDetails || null;
  } catch (error) {
    console.error('Error fetching model details:', error);
    throw error;
  }
};