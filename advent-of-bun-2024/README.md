# Advent of Code with Bun
A template repository for solving Advent of Code and experimenting with Bun runtime.

## Getting started
1. Make sure you have installed [Bun](https://bun.sh/docs/installation#installing).
2. Install dependencies:
```bash
bun install
```
3. Create `.env` file based on `.env.example` and insert correct YEAR.
4. (Optional) Set your session token with environment variables to automatically fetch your input. You can obtain the session token from the AoC session cookie.

## Running the Code
To run any solution you have to run the `solve` script. It will create all directories and files for a day, and also it can fetch your input file. Besides that, it watches all the changes you make and shows a result in a terminal.

### Example usage
To scaffold the first day:
```bash
bun solve 1
```
Copy example into `src/01/example.txt`.
Input expected result from example in `src/01/01.test.ts`.
To run tests in watch mode:
```bash
bun test --watch
```
Fix test by implementing function partOne in `src/01/01.ts`

## Structure
For each day a directory in `src` is created with the following structure:
```bash
📂 01
├── 📜 01.ts
├── 📜 01.test.ts
├── 📜 example.txt
└── 📜 input.txt
```
## Closing words
Happy coding! 🎄✨
