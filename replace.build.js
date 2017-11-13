var replace = require('replace-in-file');
var buildDate = Date.now();
const options = {
  files: 'src/environments/environment.ts',
  from: /{BUILD_DATE}/g,
  to: buildDate,
  allowEmptyPaths: false,
};

try {
  let changedFiles = replace.sync(options);
  console.log('Build date set: ' + buildDate);
}
catch (error) {
  console.error('Error occurred:', error);
}
