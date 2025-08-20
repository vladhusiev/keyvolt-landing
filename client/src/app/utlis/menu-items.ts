interface MenuItem {
  id: string;
  label: string;
  href: string;
}

export const menuItems: MenuItem[] = [
  { id: "for-whom", label: "Для кого", href: "#solutions" },
  { id: "how-it-works", label: "Принцип роботи", href: "#how-it-works" },
  { id: "economics", label: "Економіка", href: "#economics" },
  { id: "cases", label: "Кейси", href: "#cases" },
  { id: "about", label: "Про Нас", href: "#about" },
  { id: "vacancies", label: "Вакансії", href: "/vacancies" },
];
