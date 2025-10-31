//  API for birthdays
export type Birthday = {
  id: number;
  name: string;
  role: string;
  date: string;
  image: string;
};

// Mock data
const birthdays: Birthday[] = [
  {
    id: 1,
    name: "Andrew",
    role: "IOS Developer",
    date: "Today",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Pranv",
    role: "UI/UX Designer",
    date: "Tomorrow",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    id: 3,
    name: "Antoney",
    role: "Android Developer",
    date: "Tomorrow",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 4,
    name: "Amal km",
    role: "Mern Stack Developer",
    date: "25 Aug 2025",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
  },
];

// Mock API fun
export const fetchBirthdays = async (): Promise<Birthday[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(birthdays), 500); //API delay
  });
};
