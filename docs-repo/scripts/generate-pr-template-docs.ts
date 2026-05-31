import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const TEMPLATES_ROOT = '.github/PULL_REQUEST_TEMPLATE';
const OUTPUT_DIR = 'docs-repo/docs/pr-templates';

type TemplateMetadata = {
  id: string;
  title: string;
  sourcePath: string;
  outputPath: string;
  permalink: string;
};

const titles: Record<string, string> = {
  backend: 'Backend',
  docs: 'Documentación',
  frontend: 'Frontend',
  infra: 'Infraestructura',
  mobile: 'Mobile',
};

function findTemplateFiles(root: string): string[] {
  if (!existsSync(root)) {
    return [];
  }

  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => join(root, entry.name))
    .sort();
}

function titleFor(id: string): string {
  return titles[id] ?? id.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function renderTemplatePage(template: TemplateMetadata, content: string, navOrder: number): string {
  return `---
layout: default
title: ${template.title}
parent: Plantillas de Pull Request
nav_order: ${navOrder}
permalink: ${template.permalink}
---

# Plantilla PR - ${template.title}

Fuente: \`${template.sourcePath}\`.

${content.trim()}
`;
}

function renderIndex(templates: TemplateMetadata[]): string {
  const rows = templates
    .map((template) => `*   **[${template.title}](${template.id}.html):** \`${template.sourcePath}\`.`)
    .join('\n');

  return `---
layout: default
title: Plantillas de Pull Request
parent: Documentación Técnica
nav_order: 6
has_children: true
permalink: /docs/pr-templates/
---

# Plantillas de Pull Request

Esta sección se genera automáticamente a partir de las plantillas operativas versionadas en \`.github/PULL_REQUEST_TEMPLATE/\`.

${rows}

Estas páginas son documentación derivada. Para cambiar una plantilla, edita el archivo fuente correspondiente en \`.github/PULL_REQUEST_TEMPLATE/\` y vuelve a ejecutar el generador.
`;
}

function main(): void {
  const templateFiles = findTemplateFiles(TEMPLATES_ROOT);

  if (templateFiles.length === 0) {
    rmSync(OUTPUT_DIR, { force: true, recursive: true });
    console.log(`No PR templates found under ${TEMPLATES_ROOT}. PR template documentation was not generated.`);
    return;
  }

  const templates = templateFiles.map((sourcePath) => {
    const id = basename(sourcePath, '.md');

    return {
      id,
      title: titleFor(id),
      sourcePath,
      outputPath: join(OUTPUT_DIR, `${id}.md`),
      permalink: `/docs/pr-templates/${id}.html`,
    };
  });

  mkdirSync(OUTPUT_DIR, { recursive: true });

  templates.forEach((template, index) => {
    writeFileSync(template.outputPath, renderTemplatePage(template, readFileSync(template.sourcePath, 'utf8'), index + 1), 'utf8');
  });

  writeFileSync(join(OUTPUT_DIR, 'index.md'), renderIndex(templates), 'utf8');

  console.log(`Generated ${OUTPUT_DIR} with ${templates.length} PR template page(s).`);
}

main();
