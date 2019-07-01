import * as path from 'path';
import * as rollup from 'rollup';
import rollupConfig from '../rollupConfig';

async function build(app: string) {
  const rollupOptions = rollupConfig(
    { cssModules: false, cwd: path.resolve(__dirname, `./fixtures/${app}`), progress: false, output: 'dist' },
    false,
  );
  const bundle = await rollup.rollup(rollupOptions);
  const result = await bundle.generate(rollupOptions.output!);
  return result.output
    .filter(c => !/(node_modules|_virtual)/.test(c.fileName))
    .map(c => {
      let code = '';
      if (c.code) {
        code = c.code.toString();
      } else {
        code = (c as rollup.OutputAsset).source.toString();
      }
      return {
        fileName: c.fileName,
        code,
      };
    });
}

describe('build', () => {
  it('build simple app', async () => {
    const result = await build('simple');
    expect(result).toMatchSnapshot();
  });
});
