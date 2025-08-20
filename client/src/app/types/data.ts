export interface HeroData {
  hero_title: string;
  hero_description: string;
  hero_btn_name: string;
  features: { id: number; icon: { url: string }; text: string }[];
}

export interface SolutionsData {
  id: number;
  icon: string;
  image: { url: string };
  name: string;
  description: string;
  main_text: string;
}

export interface PrinciplesItem {
  id: number;
  title: string;
  description: string;
}

export interface PrinciplesData {
  principles_title: string;
  items: PrinciplesItem[];
}

export interface CasesItem {
  id: number;
  title: string;
  description: string;
  image: { url: string };
}

export interface CasesData {
  cases_title: string;
  cases_description: string;
  items: CasesItem[];
}

export interface AboutData {
  about_title: string;
  about_subtitle: string;
  about_description: string;
}

export interface Data {
  heroData: HeroData;
  solutionsData: SolutionsData[];
  principlesData: PrinciplesData;
  casesData: CasesData;
  aboutData: AboutData;
  vacanciesData: VacanciesData[];
}

export interface VacanciesData {
  id: number;
  documentId: string
  title: string;
  Salary: string;
  short_description: string;
  full_description: string;
  location: string;
  full_employment: string;
  vacancy_link: string;
}
