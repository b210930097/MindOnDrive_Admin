module.exports = {
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  '**/*.(ts|tsx|js)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' \n')}`,
    `yarn prettier --write ${filenames.join(' \n')}`,
  ],

  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' \n')}`,
};
