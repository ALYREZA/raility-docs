import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const lunr = require('lunr');

const outDir = path.join(process.cwd(), 'build');

const indexFiles = fs
  .readdirSync(outDir)
  .filter(
    (name) =>
      name === 'search-index.json' || /^search-index-.+\.json$/.test(name),
  );

for (const filename of indexFiles) {
  const filePath = path.join(outDir, filename);
  const indexes = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const rebuilt = indexes.map(({documents}) => ({
    documents,
    index: lunr(function rebuildIndex() {
      this.pipeline.reset();
      this.ref('i');
      this.field('t');
      this.metadataWhitelist = ['position'];

      for (const doc of documents) {
        this.add({
          ...doc,
          i: String(doc.i),
        });
      }
    }).toJSON(),
  }));

  fs.writeFileSync(filePath, JSON.stringify(rebuilt), 'utf8');
  console.log(`Rebuilt Persian search index: ${filename}`);
}
