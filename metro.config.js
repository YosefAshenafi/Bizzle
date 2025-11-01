const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for Reanimated
config.resolver.alias = {
  ...config.resolver.alias,
  'react-native-reanimated': 'react-native-reanimated',
};

// Ensure Reanimated is properly transformed
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;