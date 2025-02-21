module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Features
        'fix', // Bug Fixes
        'docs', // Documentation
        'style', // Styles
        'refactor', // Code Refactoring
        'perf', // Performance Improvements
        'test', // Tests
        'build', // Build System
        'ci', // CI Configuration
        'chore', // Chores
        'revert', // Reverts
      ],
    ],
    'scope-case': [0],
    'subject-case': [0],
  },
};
