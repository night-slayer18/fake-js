import { Randomizer } from './core/Randomizer';
import { names } from './data/names';
import { domains } from './data/domains';
import { phoneNumbers } from './data/phoneNumbers';
import { locations } from './data/locations';
import { addresses } from './data/addresses';
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
  birthdate: Date;
  jobTitle: string;
  companyName: string;
  hobbies: string;
  educationLevel: string;
  skills: string[];
  [key: string]: any;
}

export type Locale = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ja' | 'zh' | 'hi';

export interface FakerOptions {
  seed?: number | string;
  locale?: Locale;
}

export class Faker {
  private randomizer: Randomizer;
  private locale: Locale;
  private customGenerators: Map<string, () => any> = new Map();

  constructor(options: FakerOptions = {}) {
    this.randomizer = new Randomizer(options.seed);
    this.locale = options.locale || 'en';
  }

  addGenerator(name: string, generator: () => any) {
    this.customGenerators.set(name, generator);
  }

  get custom() {
    const generators: { [key: string]: () => any } = {};
    for (const [name, generator] of this.customGenerators.entries()) {
      generators[name] = generator;
    }
    return generators;
  }

  get date() {
    return {
      past: (years: number = 1, refDate: Date = new Date()): Date => {
        const date = new Date(refDate);
        const range = years * 365 * 24 * 60 * 60 * 1000;
        const pastTime = date.getTime() - this.randomizer.int(0, range);
        return new Date(pastTime);
      },
      future: (years: number = 1, refDate: Date = new Date()): Date => {
        const date = new Date(refDate);
        const range = years * 365 * 24 * 60 * 60 * 1000;
        const futureTime = date.getTime() + this.randomizer.int(0, range);
        return new Date(futureTime);
      },
      between: (from: Date, to: Date): Date => {
        const fromTime = from.getTime();
        const toTime = to.getTime();
        const date = new Date(this.randomizer.int(fromTime, toTime));
        return date;
      },
    };
  }

  get person() {
    return {
      name: () => this.randomizer.pick(names[this.locale]),
      birthdate: (options: { min?: number; max?: number; mode?: 'age' | 'year' } = {}): Date => {
        const minAge = options.min ?? 18;
        const maxAge = options.max ?? 65;
        const mode = options.mode ?? 'age';

        if (mode === 'age') {
          const now = new Date();
          const minDate = new Date(now.getFullYear() - maxAge - 1, 0, 1);
          const maxDate = new Date(now.getFullYear() - minAge, 11, 31);
          return this.date.between(minDate, maxDate);
        } else {
           const minYear = options.min ?? 1950;
           const maxYear = options.max ?? 2000;
           const minDate = new Date(minYear, 0, 1);
           const maxDate = new Date(maxYear, 11, 31);
           return this.date.between(minDate, maxDate);
        }
      },
      educationLevel: () => this.randomizer.pick(educationLevels[this.locale]),
      hobby: () => this.randomizer.pick(hobbies[this.locale]),
    };
  }

  get internet() {
    return {
      email: (name?: string) => {
        const domain = this.randomizer.pick(domains[this.locale]);
        let localPart: string;

        if (name) {
          // Sanitize name: lowercase, remove spaces, remove special chars
          localPart = name.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, '.');
        } else {
          const randomName = this.randomizer.pick(names[this.locale]);
          localPart = randomName.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, '.');
        }

        return `${localPart}@${domain}`;
      },
    };
  }

  get phone() {
    return {
      number: () => this.randomizer.pick(phoneNumbers[this.locale]),
    };
  }

  get location() {
    return {
      city: () => this.randomizer.pick(locations[this.locale]),
      address: () => this.randomizer.pick(addresses[this.locale]),
    };
  }

  get work() {
    return {
      jobTitle: () => this.randomizer.pick(jobTitles[this.locale]),
      companyName: () => this.randomizer.pick(companyNames[this.locale]),
      skill: () => this.randomizer.pick(skills[this.locale]),
      skills: (count: number = 3) => this.randomizer.picks(skills[this.locale], count),
    };
  }

  createUser(id: number = 1): User {
    const name = this.person.name();
    const user: User = {
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

    // Add custom properties
    for (const [key, generator] of this.customGenerators.entries()) {
      user[key] = generator();
    }

    return user;
  }

  createUsers(count: number = 1000): User[] {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
      users.push(this.createUser(i + 1));
    }
    return users;
  }
}
