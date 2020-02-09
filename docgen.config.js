module.exports = {
  componentsRoot: 'src/components',
  components: '**/[A-Z]*.vue',
  outDir: './docs/components',
  defaultExamples: false,
  templates: {
    component: (renderedUsage, doc) => {
      const { displayName, description, docsBlocks, tags, functional } = doc;
      const { deprecated, author, since, version, see, link } = tags || {};
      return `
---
title: ${displayName}
---
# ${deprecated ? `~~${displayName}~~` : displayName}
${deprecated ? `> **Deprecated** ${deprecated[0].description}\n` : ''}
${description ? '> ' + description : ''}
${functional ? renderedUsage.functionalTag : ''}
${author ? author.map(a => `Author: ${a.description}\n`) : ''}
${since ? `Since: ${since[0].description}\n` : ''}
${version ? `Version: ${version[0].description}\n` : ''}
${see ? see.map(s => `[See](${s.description})\n`) : ''}
${link ? link.map(l => `[See](${l.description})\n`) : ''}
${docsBlocks ? '---\n' + docsBlocks.join('\n---\n') : ''}
${renderedUsage.props}
${renderedUsage.methods}
${renderedUsage.events}
${renderedUsage.slots}
`;
    },
  },
};
