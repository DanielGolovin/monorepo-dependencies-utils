import type { Config } from "jest";

const config: Config = {
    transform: {
        "^.+\\.ts$": [
            "@swc/jest",
            {
                jsc: {
                    transform: {
                        react: {
                            runtime: "automatic",
                        },
                    },
                },
            },
        ],
    },
    clearMocks: true,
    testMatch: ["**/?(*).+(unit|test).ts?(x)"],
    testEnvironment: "node",
    roots: ["<rootDir>", "<rootDir>/src"],
    moduleDirectories: ["<rootDir>", "node_modules", "src"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
};

export default config;
