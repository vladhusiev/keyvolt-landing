"use client";

import { useEffect, useState } from "react";

export interface SolutionsData {
  id: number;
  icon: string;
  image: { url: string };
  name: string;
  description: string;
  main_text: string;
}

export interface HeroData {
  hero_title: string;
  hero_description: string;
  hero_btn_name: string;
  features: { id: number; icon: { url: string }; text: string }[];
}

export interface PrinciplesItem {
  id: number;
  title: string;
  description: string;
}

export interface CasesItem {
  id: number;
  title: string;
  description: string;
  image: { url: string };
}

export interface Data extends HeroData {
  solutions: SolutionsData[];
  principles_title: string;
  principles: PrinciplesItem[];
  cases_title: string;
  cases_description: string;
  cases: CasesItem[];
  about_title: string;
  about_subtitle: string;
  about_description: string;
}

interface UseDataReturn {
  data: Data | null;
  isLoading: boolean;
  error: string | null;
}

export const useData = (): UseDataReturn => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const path = "/api/home-page?populate[features][populate]=icon&populate[solutions][populate]=image&populate[principles][populate]&populate[cases][populate]=image";
        const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const url = new URL(path, BASE_URL);

        const response = await fetch(url.href);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
