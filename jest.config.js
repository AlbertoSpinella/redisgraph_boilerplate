const config =  {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    verbose: true,
    // setupFilesAfterEnv: [""],
    testMatch: [
        "**/__*__/*.test.js"
    ],
    testTimeout: 1200000
};

export default config;