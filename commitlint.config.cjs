const headerPattern =
  /^(feat|fix|docs|test|chore|refactor|style|build|ci|revert)(\([a-z0-9-]+\))?:\s[A-Z].+/;

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'test',
        'chore',
        'refactor',
        'style',
        'build',
        'ci',
        'revert',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 120],
    'body-max-line-length': [2, 'always', 120],
    'body-leading-blank': [2, 'always'],
    'subject-case': [0],
    'header-trim': [2, 'always'],
    'custom-header-format': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'custom-header-format': ({ header }) => {
          return [
            headerPattern.test(header),
            'Commit message must match `type(scope): Subject` or `type: Subject`, and the subject must start with an uppercase letter.',
          ];
        },
      },
    },
  ],
};
