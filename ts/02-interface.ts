// 01) Create an interface for the attendees data set
// 02) Hobbies should be optional all others are required
// 03) Allow only Visual Studio Code or IntelliJ as editor

interface Attendee {
  name: string;
  company: string;
  age: number;
  hasTypeScriptExperience: boolean;
  hobbies?: string[];
  editor: "Visual Studio Code" | "IntelliJ";
}

const attendeeList: Attendee[] = [
  {
    name: "Otto",
    company: "Google",
    age: 33,
    hasTypeScriptExperience: false,
    hobbies: ["Playing Guitar", "Dancing"],
    editor: "Visual Studio Code",
  },
  {
    name: "Maria",
    company: "Tesla",
    age: 24,
    hasTypeScriptExperience: true,
    hobbies: ["Traveling", "Reading Books"],
    editor: "IntelliJ",
  },
  {
    name: "Sina",
    company: "Spiegel Online",
    age: 39,
    hasTypeScriptExperience: true,
    editor: "Visual Studio Code",
  },
];
