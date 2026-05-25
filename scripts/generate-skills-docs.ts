import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

const SKILLS_ROOT = '.agents/skills';
const OUTPUT_DIR = 'docs/inteligencia-artificial';
const OUTPUT_FILE = join(OUTPUT_DIR, 'skills.md');

type SkillMetadata = {
  name: string;
  description: string;
  sourcePath: string;
};

function findSkillFiles(root: string): string[] {
  if (!existsSync(root)) {
    return [];
  }

  const results: string[] = [];

  function walk(directory: string): void {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const fullPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (entry.isFile() && entry.name === 'SKILL.md') {
        results.push(fullPath);
      }
    }
  }

  walk(root);
  return results.sort();
}

function parseFrontmatter(content: string, filePath: string): Record<string, string> {
  const normalized = content.replace(/\r\n/g, '\n');

  if (!normalized.startsWith('---\n')) {
    throw new Error(`${filePath} must start with YAML front matter.`);
  }

  const closingIndex = normalized.indexOf('\n---', 4);

  if (closingIndex === -1) {
    throw new Error(`${filePath} has an opening front matter delimiter but no closing delimiter.`);
  }

  const frontmatter = normalized.slice(4, closingIndex).trim();
  const metadata: Record<string, string> = {};

  for (const line of frontmatter.split('\n')) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf(':');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    let value = trimmedLine.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    metadata[key] = value;
  }

  return metadata;
}

function readSkillMetadata(filePath: string): SkillMetadata {
  const content = readFileSync(filePath, 'utf8');
  const frontmatter = parseFrontmatter(content, filePath);
  const name = frontmatter.name?.trim();
  const description = frontmatter.description?.trim();

  const missingFields = [
    !name ? 'name' : null,
    !description ? 'description' : null,
  ].filter(Boolean);

  if (missingFields.length > 0) {
    throw new Error(
      `${filePath} is missing required front matter field(s): ${missingFields.join(', ')}.`
    );
  }

  return {
    name,
    description,
    sourcePath: filePath,
  };
}

function escapeMarkdownTableCell(value: string): string {
  return value
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, '<br>')
    .trim();
}

function renderSkillsPage(skills: SkillMetadata[]): string {
  const rows = skills
    .map((skill) => {
      const name = escapeMarkdownTableCell(skill.name);
      const description = escapeMarkdownTableCell(skill.description);

      return `| **${name}** | ${description} |`;
    })
    .join('\n');

  return `---
layout: default
title: Skills
parent: Inteligencia Artificial
nav_order: 10
---

# Skills

Esta página se genera automáticamente durante el despliegue de GitHub Pages a partir del front matter de los archivos \`.agents/skills/*/SKILL.md\`.

| Skill | Descripción |
| :--- | :--- |
${rows}

## Generación Local de la Documentación

Si agregas o modificas una skill en \`.agents/skills/*/SKILL.md\` y deseas actualizar esta lista de skills localmente, puedes ejecutar el siguiente comando desde la raíz del repositorio:

\`\`\`bash
npx tsx scripts/generate-skills-docs.ts
\`\`\`

Este comando leerá el front matter de todas las skills y actualizará esta página de forma automática.
`;
}

function main(): void {
  const skillFiles = findSkillFiles(SKILLS_ROOT);

  if (skillFiles.length === 0) {
    rmSync(OUTPUT_FILE, { force: true });
    console.log(`No SKILL.md files found under ${SKILLS_ROOT}. Skills documentation was not generated.`);
    return;
  }

  const skills = skillFiles.map(readSkillMetadata);

  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, renderSkillsPage(skills), 'utf8');

  console.log(`Generated ${OUTPUT_FILE} with ${skills.length} skill(s).`);
}

main();
