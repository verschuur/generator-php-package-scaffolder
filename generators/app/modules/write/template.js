/**
 * Copies the MyPackageTemplate.php file from the generator templates to the target dir
 * @param  {yeoman-generator} generator The Yeoman generator instance
 */
module.exports = function(generator) {
  generator.fs.copyTpl(
    generator.templatePath("src/_Template.php"),
    generator.destinationPath("src/" + generator.props.package.basename + ".php"),
    {
        PACKAGE_NAMESPACE: generator.props.package.namespace,
        CLASS_NAME: generator.props.package.basename,
    }
  );
};