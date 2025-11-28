# @night_slayer/fake-js

A lightweight, enterprise-grade fake data generator for development and testing. Now with TypeScript support, seeded randomness, and a flexible API.

## Features

- 🔒 **Type Safe**: Written in TypeScript with full type definitions.
- 🧠 **Smart Consistency**: Emails match names (e.g., "John Doe" -> "john.doe@example.com").
- 🎲 **Deterministic**: Support for seeded randomness for reproducible tests.
- 📦 **Tree Shakeable**: Granular access to data generators.
- ⚡ **Fast**: Lightweight and efficient.

## Installation

```bash
npm install @night_slayer/fake-js
```

## Usage

### Basic Usage

Import the `Faker` class and create an instance to generate data.

```typescript
import { Faker } from '@night_slayer/fake-js';

const faker = new Faker();

// Generate a single user object
const user = faker.createUser();
console.log(user);
/*
{
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com', // Matches name!
  ...
}
*/

// Generate multiple users
const users = faker.createUsers(5);
```

### Deterministic Data (Seeding)

Pass a seed to the constructor to generate the same data every time. This is perfect for unit tests that need to be consistent.

```typescript
const faker = new Faker({ seed: 123 });

console.log(faker.person.name()); // Always the same name for seed 123
```

### Granular Access & Consistency

You can access specific data generators directly. Pass a name to `email()` to generate a consistent email address.

```typescript
const faker = new Faker();

const name = faker.person.name(); // "John Doe"
const email = faker.internet.email(name); // "john.doe@example.com"

console.log(faker.phone.number());
console.log(faker.location.city());
console.log(faker.work.jobTitle());
```

## API Reference

### `new Faker(options?)`

- `options.seed` (optional): A number or string to seed the random number generator.

### Methods

- `createUser(id?: number): User`: Generates a complete user object with consistent data.
- `createUsers(count?: number): User[]`: Generates an array of user objects.

### Modules

- `faker.person`: `name()`, `birthdate()`, `educationLevel()`, `hobby()`
- `faker.internet`: `email(name?)` - Generates an email, optionally matching the provided name.
- `faker.phone`: `number()`
- `faker.location`: `city()`, `address()`
- `faker.work`: `jobTitle()`, `companyName()`, `skill()`, `skills(count)`

## License

MIT
