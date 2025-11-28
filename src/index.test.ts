import { describe, it, expect } from 'vitest';
import { Faker } from './index';

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

    it('should generate consistent email in createUser', () => {
      const faker = new Faker();
      const user = faker.createUser();
      const nameParts = user.name.toLowerCase().split(' ');
      
      // Check if at least one part of the name is in the email
      // (Handling cases where name might have special chars or complex structure)
      const hasMatch = nameParts.some(part => user.email.includes(part.replace(/[^a-z0-9]/g, '')));
      expect(hasMatch).toBe(true);
    });
  });

  describe('createUsers', () => {
    it('should generate the default number of users (1000)', () => {
      const faker = new Faker();
      const users = faker.createUsers();
      expect(users).toHaveLength(1000);
    });

    it('should generate a specific number of users', () => {
      const faker = new Faker();
      const count = 50;
      const users = faker.createUsers(count);
      expect(users).toHaveLength(count);
    });

    it('should generate users with correct properties', () => {
      const faker = new Faker();
      const user = faker.createUser();

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('phoneNumber');
      expect(user).toHaveProperty('location');
      expect(user).toHaveProperty('address');
      expect(user).toHaveProperty('birthdate');
      expect(user).toHaveProperty('jobTitle');
      expect(user).toHaveProperty('companyName');
      expect(user).toHaveProperty('hobbies');
      expect(user).toHaveProperty('educationLevel');
      expect(user).toHaveProperty('skills');
      expect(Array.isArray(user.skills)).toBe(true);
      expect(user.skills).toHaveLength(3);
    });

    it('should generate deterministic results with a seed', () => {
      const seed = 123;
      const faker1 = new Faker({ seed });
      const faker2 = new Faker({ seed });
      
      const users1 = faker1.createUsers(5);
      const users2 = faker2.createUsers(5);
      expect(users1).toEqual(users2);
    });
  });
});
