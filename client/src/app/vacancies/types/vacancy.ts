export interface Vacancy {
  id: string;
  title: string;
  company: string;
  type?: string; // "Повна зайнятість", "Часткова зайнятість", "Віддалена робота"
  location?: string;
  salary?: string;
  shortDescription: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  createdAt: string;
  updatedAt: string;
} 