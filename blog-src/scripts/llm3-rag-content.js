'use strict';

const fs = require('fs');
const path = require('path');

hexo.extend.filter.register('before_post_render', function mergeLlm3AndLlm4(data) {
  const marker = '{% llm3_rag_content %}';
  if (!data.content || !data.content.includes(marker)) return data;

  const sourcePath = path.join(hexo.base_dir, 'content-parts', 'LLM-4-Prompt-Engineering-and-RAG.md');
  const source = fs.readFileSync(sourcePath, 'utf8');
  const heading = '## What RAG Changes';
  const start = source.indexOf(heading);

  if (start === -1) {
    throw new Error(`Could not find "${heading}" in ${sourcePath}`);
  }

  data.content = data.content.replace(marker, source.slice(start).trim());
  return data;
});
