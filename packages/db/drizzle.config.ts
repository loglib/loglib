import { type Config } from 'drizzle-kit';

const config: Config = {
    out: './migrations',
    schema: './src/schema',
    breakpoints: true,
}
export default config