/**
 * Creates the various .gitignore files
 *
 * @param  {yeoman-generator} generator The Yeoman generator instance
 */
module.exports = function(generator) {
  generator.fs.copy(
    generator.templatePath("_.gitignore"),
    generator.destinationPath(".gitignore")
  );
};
