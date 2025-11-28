import { describe, it, expect } from 'vitest';
import { Faker, Locale } from './index';
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

describe('Faker Class', () => {
  it('should allow granular access to data', () => {
    const faker = new Faker();
    expect(typeof faker.person.name()).toBe('string');
    expect(typeof faker.internet.email()).toBe('string');
    expect(typeof faker.phone.number()).toBe('string');
  });

  it('should be deterministic with a seed', () => {
    const faker1 = new Faker({ seed: 456 });
    const faker2 = new Faker({ seed: 456 });

    expect(faker1.person.name()).toBe(faker2.person.name());
    expect(faker1.internet.email()).toBe(faker2.internet.email());
    expect(faker1.person.birthdate().getTime()).toBe(faker2.person.birthdate().getTime());
  });

  describe('Localization', () => {
    const locales: Locale[] = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'zh', 'hi'];

    locales.forEach(locale => {
      it(`should generate ${locale} names`, () => {
        const faker = new Faker({ locale });
        const name = faker.person.name();
        expect(names[locale]).toContain(name);
      });

      it(`should generate ${locale} domains`, () => {
        const faker = new Faker({ locale });
        const email = faker.internet.email();
        const domain = email.split('@')[1];
        expect(domains[locale]).toContain(domain);
      });

      it(`should generate ${locale} phone numbers`, () => {
        const faker = new Faker({ locale });
        const phoneNumber = faker.phone.number();
        expect(phoneNumbers[locale]).toContain(phoneNumber);
      });

      it(`should generate ${locale} locations`, () => {
        const faker = new Faker({ locale });
        const city = faker.location.city();
        expect(locations[locale]).toContain(city);
      });

      it(`should generate ${locale} addresses`, () => {
        const faker = new Faker({ locale });
        const address = faker.location.address();
        expect(addresses[locale]).toContain(address);
      });

      it(`should generate ${locale} job titles`, () => {
        const faker = new Faker({ locale });
        const jobTitle = faker.work.jobTitle();
        expect(jobTitles[locale]).toContain(jobTitle);
      });

      it(`should generate ${locale} company names`, () => {
        const faker = new Faker({ locale });
        const companyName = faker.work.companyName();
        expect(companyNames[locale]).toContain(companyName);
      });

      it(`should generate ${locale} hobbies`, () => {
        const faker = new Faker({ locale });
        const hobby = faker.person.hobby();
        expect(hobbies[locale]).toContain(hobby);
      });

      it(`should generate ${locale} education levels`, () => {
        const faker = new Faker({ locale });
        const educationLevel = faker.person.educationLevel();
        expect(educationLevels[locale]).toContain(educationLevel);
      });

      it(`should generate ${locale} skills`, () => {
        const faker = new Faker({ locale });
        const skill = faker.work.skill();
        expect(skills[locale]).toContain(skill);
      });

      it(`should generate consistent emails for ${locale}`, () => {
        const faker = new Faker({ locale });
        const name = faker.person.name();
        const email = faker.internet.email(name);
        
        // Basic check: email should contain some part of the name (sanitized)
        // We split by space to get parts, then sanitize each part
        const nameParts = name.toLowerCase().split(' ');
        const sanitizedParts = nameParts.map(part => 
          part.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '')
        );
        
        // Check if at least one part is present in the email
        const hasMatch = sanitizedParts.some(part => email.includes(part));
        expect(hasMatch).toBe(true);
      });
    });
  });

  describe('Extensibility', () => {
    it('should allow adding custom generators', () => {
      const faker = new Faker();
      faker.addGenerator('customId', () => 'ID-123');
      expect(faker.custom.customId()).toBe('ID-123');
    });

    it('should include custom properties in createUser', () => {
      const faker = new Faker();
      faker.addGenerator('role', () => 'admin');
      const user = faker.createUser();
      expect(user).toHaveProperty('role', 'admin');
    });
  });

  describe('Smart Consistency', () => {
    it('should generate email based on provided name', () => {
      const faker = new Faker();
      const name = 'John Doe';
      const email = faker.internet.email(name);
      expect(email).toContain('john');
      expect(email).toContain('doe');
      expect(email).toMatch(/^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/);
    });
  });

  describe('Dynamic Dates', () => {
    it('should generate a past date', () => {
      const faker = new Faker();
      const date = faker.date.past();
      expect(date.getTime()).toBeLessThan(Date.now());
    });
  });

  describe('createUsers', () => {
    it('should generate the default number of users (1000)', () => {
      const faker = new Faker();
      const users = faker.createUsers();
      expect(users).toHaveLength(1000);
    });
  });
});
