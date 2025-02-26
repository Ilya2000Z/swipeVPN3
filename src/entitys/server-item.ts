export interface  serverItem {
    id: number,
    is_free: number,
    ip: string,
    country: string,
    city: string,
    img: string,
}

interface ServersIP {
    id: number;
    isFree: number;
    ip: string;
    country: string;
    city: string;
    img: string;
  }
  
  interface Server {
    ip: string;
  }
  
  interface CityItem {
    city: string;
    servers: Server[];
  }
  
  interface PayCountry {
    country: string;
    cityItem: CityItem[];
    img: string; // Добавлено поле для URL картинки
  }
  
 export interface ResponseIP {
    isFree: ServersIP[];
    pay: PayCountry[];
  }