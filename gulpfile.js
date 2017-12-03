const gulp = require('gulp');

gulp.task('npm.copy', () => {
    const yaml = require('js-yaml');
    const fs = require('fs');
    const path = require('path');
    const PUBLIC_RES = './public/res/package/';

    const confDoc = yaml.safeLoad(fs.readFileSync('./conf/npm.yaml', 'utf8'));

    Object.keys(confDoc).forEach(dist => {
        Object.keys(confDoc[dist]).forEach(folder => {
            const files = confDoc[dist][folder];
            const saveFolder = path.join(PUBLIC_RES, dist, folder);
            gulp.src(files).pipe(gulp.dest(saveFolder));
        })
    });

    return gulp;
});
