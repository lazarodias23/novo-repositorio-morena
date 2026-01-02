
export enum Category {
  DIAMOND = 'Diamond',
  GOLD = 'Gold',
  PREMIUM = 'Premium'
}

export enum ServiceType {
  INCALL = 'Incall',
  OUTCALL = 'Outcall',
  TRAVEL = 'Viagens',
  DINNER = 'Jantares',
  EVENTS = 'Eventos'
}

export type Region = 'Cachoeirinha' | 'Serra Gaúcha' | 'Torres' | 'Florianópolis' | 'Cachoeira do Sul';

export interface Model {
  id: string;
  name: string;
  age: number;
  category: Category;
  height: string;
  weight: string;
  hair: string;
  location: string;
  region: Region;
  city: string;
  price: string;
  description: string;
  photos: string[];
  mainPhoto: string;
  whatsapp: string;
  verified: boolean;
  services: ServiceType[];
  isHero?: boolean;
  isAgencyCarousel?: boolean;
  isActive?: boolean;
}

export interface Club {
  id: string;
  name: string;
  location: string;
  address: string;
  description: string;
  photos: string[];
  mainPhoto: string;
  rating: number;
  mapsUrl: string;
  openingHours: string;
  isActive?: boolean;
}
