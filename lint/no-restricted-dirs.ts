const RESTRICTED_DIRS = ['util', 'utils', 'lib', 'libs']

const plugin = {
  meta: { name: 'no-restricted-dirs' },
  rules: {
    'no-restricted-dirs': {
      meta: {
        type: 'problem',
        messages: {
          restricted:
            "Directory '{{dir}}' is not allowed. Name it after the domain or responsibility it holds.",
        },
      },
      create(context: any) {
        return {
          Program(node: any) {
            const segments = String(
              context.filename ?? context.physicalFilename,
            )
              .split(/[\\/]/)
              .slice(0, -1)
            const dir = segments.find(segment =>
              RESTRICTED_DIRS.includes(segment),
            )
            if (dir) {
              context.report({ node, messageId: 'restricted', data: { dir } })
            }
          },
        }
      },
    },
  },
}

export default plugin
