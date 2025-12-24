module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@app': './app',
          '@components': './app/components',
          '@screens': './app/screens',
          '@navigation': './app/navigation',
          '@api': './app/api',
          '@crypto': './app/crypto',
          '@utils': './app/utils',
          '@types': './app/types',
          '@config': './app/config',
          '@hooks': './app/hooks',
          '@contexts': './app/contexts',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
