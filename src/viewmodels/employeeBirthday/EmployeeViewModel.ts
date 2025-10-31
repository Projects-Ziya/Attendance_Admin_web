import type { Employee } from "../../models/employeeBirthday/Employee"; 

import AndrewJermia from "../../assets/images/employeeBirthday/Andrew Jermia.png";
import AdityaMenachery from "../../assets/images/employeeBirthday/Aditya_Menachery.png";
import KavyaJoseph from "../../assets/images/employeeBirthday/Kavya_Joseph.png";
import MaryZeen from "../../assets/images/employeeBirthday/Mary _Zeen.png";
import AntoneyLewis from "../../assets/images/employeeBirthday/Antoney_Lewis.png";
import DoglasMartin from "../../assets/images/employeeBirthday/Doglas_Martin.png";
import ArjunMenon from "../../assets/images/employeeBirthday/Arjun_Menon.png";
import MeeraNair from "../../assets/images/employeeBirthday/Meera_Nair.png";
import RahulKrishna from "../../assets/images/employeeBirthday/Rahul_Krishna.png";
import SnehaIyer from "../../assets/images/employeeBirthday/Sneha_Iyer.png";
import VishnuRaj from "../../assets/images/employeeBirthday/Vishnu_Raj.png";
import AnjaliThomas from "../../assets/images/employeeBirthday/Anjali_Thomas.png";
import KarthikSuresh from "../../assets/images/employeeBirthday/Karthik _Suresh.png";
import NehaPrakash from "../../assets/images/employeeBirthday/Neha Prakash.png";
import AjayVarma from "../../assets/images/employeeBirthday/Ajay Varma.png";
import DiyaMathew from "../../assets/images/employeeBirthday/Diya Mathew.png";
import PraveenKumar from "../../assets/images/employeeBirthday/Praveen Kumar.png";
import RiyaSebastian from "../../assets/images/employeeBirthday/Riya Sebastian.png";
import SandeepPillai from "../../assets/images/employeeBirthday/Sandeep Pillai.png";

export class EmployeeViewModel {
  todayBirthdays: Employee[] = [];
  tomorrowBirthdays: Employee[] = [];
  upcomingBirthdays: Employee[] = [];

  constructor() {
    this.loadMockData();
  }

  private loadMockData() {
    this.todayBirthdays = [
      { id: 1, name: "Andrew Jermia", department: "Development", position: "iOS Developer", birthday: "10/09/2001", profileImage: AndrewJermia },
      { id: 2, name: "Aditya Menachery", department: "Cloud Services", position: "Cloud Engineer", birthday: "10/09/2001", profileImage: AdityaMenachery },
      { id: 3, name: "Kavya Joseph", department: "Product Design", position: "Product Designer", birthday: "10/09/2001", profileImage: KavyaJoseph },
    ];

    this.tomorrowBirthdays = [
      { id: 4, name: "Mary Zeen", department: "UI/UX Design", position: "UI/UX Designer", birthday: "10/09/2001", profileImage: MaryZeen },
      { id: 5, name: "Antoney Lewis", department: "Development", position: "Android Developer", birthday: "10/09/2001", profileImage: AntoneyLewis },
      { id: 6, name: "Doglas Martin", department: "Development", position: ".Net Developer", birthday: "10/09/2001", profileImage: DoglasMartin },
      { id: 7, name: "Arjun Menon", department: "Development", position: "Software Engineer", birthday: "10/09/2001", profileImage: ArjunMenon },
    ];

    this.upcomingBirthdays = [
      { id: 8, name: "Meera Nair", department: "UI/UX Design", position: "UI/UX Designer", birthday: "10/09/2001", profileImage: MeeraNair },
      { id: 9, name: "Rahul Krishna", department: "QA & Testing", position: "QA Engineer", birthday: "10/09/2001", profileImage: RahulKrishna },
      { id: 10, name: "Sneha Iyer", department: "Development", position: "Front-End Developer", birthday: "10/09/2001", profileImage: SnehaIyer },
      { id: 11, name: "Vishnu Raj", department: "Development", position: "Back-End Developer", birthday: "10/09/2001", profileImage: VishnuRaj },
      { id: 12, name: "Anjali Thomas", department: "HR", position: "HR Manager", birthday: "10/09/2001", profileImage: AnjaliThomas },
      { id: 13, name: "Karthik Suresh", department: "Project Management", position: "Project Manager", birthday: "10/09/2001", profileImage: KarthikSuresh },
      { id: 14, name: "Neha Prakash", department: "UI/UX Design", position: "UX Researcher", birthday: "10/09/2001", profileImage: NehaPrakash },
      { id: 15, name: "Ajay Varma", department: "DevOps", position: "DevOps Engineer", birthday: "10/09/2001", profileImage: AjayVarma },
      { id: 16, name: "Diya Mathew", department: "QA & Testing", position: "Automation Tester", birthday: "10/09/2001", profileImage: DiyaMathew },
      { id: 17, name: "Praveen Kumar", department: "IT Support", position: "IT Support Specialist", birthday: "10/09/2001", profileImage: PraveenKumar },
      { id: 18, name: "Riya Sebastian", department: "Data Science", position: "Data Analyst", birthday: "10/09/2001", profileImage: RiyaSebastian },
      { id: 19, name: "Sandeep Pillai", department: "Cybersecurity", position: "Security Analyst", birthday: "10/09/2001", profileImage: SandeepPillai },
    ];
  }

  sendWish = (employee: Employee) => {
    console.log(`Sending wish to ${employee.name}`);
  };

  sendGroupWishes = () => {
    console.log("Sending group wishes to all birthday employees today");
  };
}
