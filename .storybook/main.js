/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/stories/*.mdx', '../src/components/**/*.stories.@(js|jsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
export default config;
