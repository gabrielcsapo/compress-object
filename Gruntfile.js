module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-pug');

    grunt.initConfig({
        pug: {
          docs: {
            files: {
              'docs/index.html': 'docs/index.pug'
            }
          }
        }
    });

    grunt.registerTask('default', ['pug']);
}
