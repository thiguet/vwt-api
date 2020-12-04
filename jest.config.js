// eslint-disable-next-line node/exports-style
module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    roots: ['<rootDir>/test'],
    transform: {
        '\\.(ts)$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    coveragePathIgnorePatterns: ['index.ts', '/node_modules/'],
    testEnvironment: 'node',
};
