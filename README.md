# @night_slayer/fake-js

A lightweight, enterprise-grade fake data generator for development and testing. Now with TypeScript support, seeded randomness, and a flexible API.

## Features

- 🔒 **Type Safe**: Written in TypeScript with full type definitions.
- 🧠 **Smart Consistency**: Emails match names (e.g., "John Doe" -> "john.doe@example.com").
- 📅 **Dynamic Dates**: Generates realistic past, future, and birth dates.
- 🎲 **Deterministic**: Support for seeded randomness for reproducible tests.
- 🌍 **Localization**: Support for 10+ locales (en, es, fr, de, it, pt, ru, ja, zh, hi).
- 🛠️ **CLI Tool**: Generate data directly from the command line.
- 🔌 **Extensible**: Add custom data generators easily.
- 📦 **Tree Shakeable**: Granular access to data generators.
- ⚡ **Fast**: Lightweight and efficient.
- 📚 **Rich Data**: Over 100+ items per category for each locale.

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
  email: 'john.doe@example.com',
  birthdate: 1990-05-15T00:00:00.000Z,
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

### Localization

Initialize `Faker` with a `locale` to generate localized data.

```typescript
// Generate Spanish data
const faker = new Faker({ locale: 'es' });

console.log(faker.person.name()); // "Juan Perez"
console.log(faker.location.city()); // "Madrid"
```

Supported locales: `en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `ja`, `zh`, `hi`.

### Granular Access & Consistency

You can access specific data generators directly.

```typescript
const faker = new Faker();

// Smart Consistency
const name = faker.person.name();
const email = faker.internet.email(name); // "john.doe@example.com"

// Dynamic Dates
const past = faker.date.past();   // Random date in past year
const future = faker.date.future(); // Random date in future year
const birthdate = faker.person.birthdate({ min: 18, max: 65 }); // Age 18-65

console.log(faker.phone.number());
console.log(faker.location.city());
```

### Extensibility

Add your own custom data generators.

```typescript
const faker = new Faker();

faker.addGenerator('customId', () => `ID-${Math.random()}`);

const user = faker.createUser();
console.log(user.customId); // "ID-0.123..."
```

### CLI Usage

Generate data directly from your terminal.

```bash
# Generate 5 users with French locale
npx fake-js --count 5 --locale fr

# Save to file
npx fake-js --count 100 > users.json
```

## API Reference

### `new Faker(options?)`

- `options.seed` (optional): A number or string to seed the random number generator.
- `options.locale` (optional): The locale to use (default: 'en').

### Methods

- `createUser(id?: number): User`: Generates a complete user object with consistent data.
- `createUsers(count?: number): User[]`: Generates an array of user objects.

### Modules

- `faker.person`: `name()`, `birthdate(options?)`, `educationLevel()`, `hobby()`
- `faker.internet`: `email(name?)`
- `faker.date`: `past(years?)`, `future(years?)`, `between(from, to)`
- `faker.phone`: `number()`
- `faker.location`: `city()`, `address()`
- `faker.work`: `jobTitle()`, `companyName()`, `skill()`, `skills(count)`

## License

MIT
