export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  { id: "for-whom", label: "Для кого", href: "#solutions" },
  { id: "how-it-works", label: "Принцип роботи", href: "#how-it-works" },
  { id: "economics", label: "Економіка", href: "#economics" },
  { id: "cases", label: "Кейси", href: "#cases" },
  {
    id: "company",
    label: "Компанія",
    children: [
      { id: "about", label: "Про нас", href: "#about" },
      { id: "blog", label: "Блог", href: "/blog" },
      { id: "vacancies", label: "Вакансії", href: "/vacancies" },
    ],
  },
];
