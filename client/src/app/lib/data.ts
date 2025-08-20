import {
  CasesItem,
  Data,
  HeroData,
  PrinciplesItem,
  SolutionsData,
  VacanciesData,
} from "../types/data";

export const getServerData = async (): Promise<Data> => {
  try {
    const path =
      "/api/home-page?populate[features][populate]=icon&populate[solutions][populate]=image&populate[principles][populate]&populate[cases][populate]=image&populate[vacancies][populate]";
    const BASE_URL =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const url = new URL(path, BASE_URL);

    const response = await fetch(url.href);
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const data = result.data;

    const heroData: HeroData = {
      hero_title: data?.hero_title || "",
      hero_description: data?.hero_description || "",
      hero_btn_name: data?.hero_btn_name || "",
      features: data?.features || [],
    };

    const solutionsData: SolutionsData[] = data?.solutions || [];

    const principlesData: {
      principles_title: string;
      items: PrinciplesItem[];
    } = {
      principles_title: data?.principles_title || "",
      items: data?.principles || [],
    };

    const casesData: {
      cases_title: string;
      cases_description: string;
      items: CasesItem[];
    } = {
      cases_title: data?.cases_title || "",
      cases_description: data?.cases_description || "",
      items: data?.cases || [],
    };

    const aboutData: {
      about_title: string;
      about_subtitle: string;
      about_description: string;
    } = {
      about_title: data?.about_title || "",
      about_subtitle: data?.about_subtitle || "",
      about_description: data?.about_description || "",
    };

    const vacanciesData: VacanciesData[] = data?.vacancies || [];

    return {
      heroData,
      solutionsData,
      principlesData,
      casesData,
      aboutData,
      vacanciesData,
    };
  } catch {
    throw new Error("Failed to fetch data");
  }
};
