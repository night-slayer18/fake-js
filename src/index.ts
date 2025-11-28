import { Randomizer } from './core/Randomizer';
import { names } from './data/names';
import { domains } from './data/domains';
import { phoneNumbers } from './data/phoneNumbers';
import { locations } from './data/locations';
import { addresses } from './data/addresses';
import { birthdates } from './data/birthdates';
import { jobTitles } from './data/jobTitles';
import { companyNames } from './data/companyNames';
import { hobbies } from './data/hobbies';
import { educationLevels } from './data/educationLevels';
import { skills } from './data/skills';

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
  address: string;
  birthdate: string;
  jobTitle: string;
  companyName: string;
  hobbies: string;
  educationLevel: string;
  skills: string[];
}

export interface FakerOptions {
  seed?: number | string;
}

export class Faker {
  private randomizer: Randomizer;

  constructor(options: FakerOptions = {}) {
    this.randomizer = new Randomizer(options.seed);
  }

  get person() {
    return {
      name: () => this.randomizer.pick(names),
      birthdate: () => this.randomizer.pick(birthdates),
      educationLevel: () => this.randomizer.pick(educationLevels),
      hobby: () => this.randomizer.pick(hobbies),
    };
  }

  get internet() {
    return {
      email: (name?: string) => {
        const domain = this.randomizer.pick(domains);
        let localPart: string;

        if (name) {
          // Sanitize name: lowercase, remove spaces, remove special chars
          localPart = name.toLowerCase().replace(/[^a-z0-9]/g, '.');
        } else {
          // Fallback to random name if not provided
          const randomName = this.randomizer.pick(names);
          localPart = randomName.toLowerCase().replace(/[^a-z0-9]/g, '.');
        }

        return `${localPart}@${domain}`;
      },
    };
  }

  get phone() {
    return {
      number: () => this.randomizer.pick(phoneNumbers),
    };
  }

  get location() {
    return {
      city: () => this.randomizer.pick(locations),
      address: () => this.randomizer.pick(addresses),
    };
  }

  get work() {
    return {
      jobTitle: () => this.randomizer.pick(jobTitles),
      companyName: () => this.randomizer.pick(companyNames),
      skill: () => this.randomizer.pick(skills),
      skills: (count: number = 3) => this.randomizer.picks(skills, count),
    };
  }

  createUser(id: number = 1): User {
    const name = this.person.name();
    return {
      id,
      name,
      email: this.internet.email(name),
      phoneNumber: this.phone.number(),
      location: this.location.city(),
      address: this.location.address(),
      birthdate: this.person.birthdate(),
      jobTitle: this.work.jobTitle(),
      companyName: this.work.companyName(),
      hobbies: this.person.hobby(),
      educationLevel: this.person.educationLevel(),
      skills: this.work.skills(3),
    };
  }

  createUsers(count: number = 1000): User[] {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
      users.push(this.createUser(i + 1));
    }
    return users;
  }
}
