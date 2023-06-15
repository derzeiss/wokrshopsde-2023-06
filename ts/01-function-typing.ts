function allPeople(trainerData: string[], attendeeData: string[]): string[] {
  const newArray: string[] = [];
  return newArray.concat(trainerData, attendeeData);
}

const trainers = ["Joe", "Toni"];
const attendees = ["Max", "Sepp", "Arno", "Otto"];

const allTogether: string[] = allPeople(trainers, attendees);
