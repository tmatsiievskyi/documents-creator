import { TSuggestionItem } from './_types';

export const getSuggestionItems = (): TSuggestionItem[] => {
  return [
    {
      suggestion: 'language',
      values: ['javascript', 'typescript', 'python'],
      description: 'Select programming language',
      validate: (value) => value.length > 0 || 'Language cannot be empty',
      format: (value) => value.toLowerCase(),
    },
    {
      suggestion: 'country',
      values: ['Ukraine', 'Poland', 'France'],
      description: 'Select country',
      format: (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    },
    {
      suggestion: 'framework',
      values: ['react', 'vue', 'angular', 'svelte'],
      description: 'Select framework',
      validate: (value) =>
        ['react', 'vue', 'angular', 'svelte'].includes(value.toLowerCase()) ||
        'Invalid framework',
      format: (value) => value.toLowerCase(),
    },
  ];
};
