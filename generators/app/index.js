"use strict";

const Generator = require("yeoman-generator");
const chalk = require("chalk");
const _ = require("lodash");
const username = require("username");

const readmeWriter = require("./modules/write/readme");
const composerWriter = require("./modules/write/composer");
const testCaseWriter = require("./modules/write/testCase");
const gitignoreWriter = require("./modules/write/gitignore");
const templateWriter = require("./modules/write/template");

const prompts = require("./modules/prompts");

module.exports = class extends Generator {
  initializing() {
    this.log(`Welcome to the ${chalk.green('PHP Package Scaffolder!')}`);
    this.log(chalk.bgRed(`Before starting, make sure you are in the directory where you want to scaffold the package!`));
    this.props = {};
  }
  
  /**
   * Prompt for the package settings, and set the generator properties
   * for the scaffolding values.
   */
  prompting() {
    this.log(chalk.green("Fetching GitHub info, please wait..."));
    
    return this.user.github.username().then(
      vendor => {
        // set the vendor name here so the answers prompts can use it
        this.props.vendor = {
          name: vendor
        };
      },
      error => {
        this.props.vendor = {
          name: username.sync()
        };
      }
    ).finally(() => {
      return this.prompt(prompts(this)).then(props => {
        _.merge(this.props, props);
          
        // set the rest of the properties based on the answers
        this.props.vendor.slug = _.kebabCase(this.props.vendor.name);
        this.props.package.slug = _.kebabCase(this.props.package.name);
        this.props.package.alias = this.props.package.basename;
      });
    });
  }
   
  /**
   * Scaffold the various files and directories
   */
  writing() {
    readmeWriter(this);
    composerWriter(this);
    testCaseWriter(this);
    gitignoreWriter(this);
    templateWriter(this);
  }
};
    