// replace with realapi
export const fetchActivities = async () => {
  const activities = [
    {
      name: "Matt",
      action: "Added New Project",
      project: "attendance Dashboard",
      time: "05:30 PM",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Jay",
      action: "Commented on an Uploaded Document",
      time: "05:00 PM",
      img: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      name: "Donald",
      action: "Approved Task Projects",
      time: "05:00 PM",
      img: "https://randomuser.me/api/portraits/women/20.jpg",
    },
    {
      name: "George",
      action: "Requesting Access to module Tickets",
      time: "06:00 PM",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Aron Zeen",
      action: "Downloaded App Reports",
      time: "06:30 PM",
      img: "https://randomuser.me/api/portraits/men/51.jpg",
    },
    {
      name: "Gendry Daniel",
      action: "Completed New Project",
      project: "HMS",
      time: "05:30 PM",
      img: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ];

  
  return new Promise((resolve) => {
    setTimeout(() => resolve(activities), 500);
  });
};
