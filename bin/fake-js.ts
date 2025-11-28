#!/usr/bin/env node
import { Faker, Locale } from '../src/index';

const args = process.argv.slice(2);
const options: { count: number; seed?: number | string; locale?: Locale } = {
  count: 1,
};

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--count':
      options.count = parseInt(args[++i], 10);
      break;
    case '--seed':
      options.seed = args[++i];
      break;
    case '--locale':
      options.locale = args[++i] as Locale;
      break;
    case '--help':
      console.log(`
Usage: fake-js [options]

Options:
  --count <number>   Number of users to generate (default: 1)
  --seed <value>     Seed for random number generator
  --locale <locale>  Locale to use (en, es)
  --help             Show this help message
`);
      process.exit(0);
  }
}

const faker = new Faker({ seed: options.seed, locale: options.locale });

if (options.count === 1) {
  console.log(JSON.stringify(faker.createUser(), null, 2));
} else {
  console.log(JSON.stringify(faker.createUsers(options.count), null, 2));
}
