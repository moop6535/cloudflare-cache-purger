#!/usr/bin/env node

const inquirer = require('inquirer'),
      request = require('request'),
      fs = require('fs');

const procDir = __dirname;    
const configFile = `${procDir}/../config.json`;

const app = {
  prompt: function(input) {    
    if(input == 'add') {
      const questions = [{
        type: 'input',
        name: 'addDomain',
        message: 'Enter domain name:',      
      },
      {
        type: 'input',
        name: 'addEmail',
        message: 'Enter email:',
      },
      {
        type: 'input',
        name: 'addKey',
        message: 'Enter api key:',      
      },
      {
        type: 'input',
        name: 'addZone',
        message: 'Enter zone id:',
      }
    ];
      return inquirer.prompt(questions).then(this.add.bind(this));
    }
    else {
      let rawdata = fs.readFileSync(configFile);
      let rawDomains = JSON.parse(rawdata);
      let domains = [];
      Object.keys(rawDomains).forEach(key => {
        domains.push(key);
      });
      if (domains.length < 1) {
        console.log('**No domains in config**');
        console.log('add cf domains: cloudflare-cache-purger add');
        process.exit();
      }
      const questions = [{
        type: 'list',
        name: 'domain',
        message: 'Select domain to purge:',
        choices: domains,
      }];
      return inquirer.prompt(questions).then(this.clear.bind(this));
    }
  },

  add: function(answers) {
    let newEntry = {
      "email":answers.addEmail,
      "key":answers.addKey,
      "zone":answers.addZone
    }    
    fs.readFile(configFile, (err, data) => {
      var obj = JSON.parse(data);
      obj[answers.addDomain] = newEntry;
      fs.writeFileSync(configFile, JSON.stringify(obj,null,2));
      console.log(`${answers.addDomain} added to the list`);
    })
  },
  
  clear: function(answers) {
    const config = require(configFile);
    const options = {
      url: `https://api.cloudflare.com/client/v4/zones/${config[answers.domain].zone}/purge_cache`,
      body: JSON.stringify({ 'purge_everything': true }),
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Email': `${config[answers.domain].email}`,
        'X-Auth-Key': `${config[answers.domain].key}`,
      }
    };
    request.del(options, (err, res, body) => {
      if (err) { return console.log(err); }
      console.log(JSON.parse(body));
    });
  }  
};

module.exports = app;