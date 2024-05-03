module.exports = {
    plugins: {
      'postcss-preset-mantine': {
        autoRem: true,
        mixins: {
          clearfix: {
            '&::after': {
              content: '""',
              display: 'table',
              clear: 'both',
            },
          },
          circle: (_mixin, size) => ({
            borderRadius: '50%',
            width: size,
            height: size,
          }),
        },
      },
      // ... Other plugins
    },
  };