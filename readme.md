CloudFlare Cache Purger
========================

Quickly & easily clear CloudFlare cache! Use cases are primarily if you manage more than 1 CloudFlare account and/or a lot of different domains.

Install
=========
`npm i -g cloudflare-cache-purger`


Get Started:
=========
**To add a new entry (domain/zone):**    
`cloudflare-cache-purger add`

Prompt:   
`? Enter domain name:` <DOMAIN NAME>

`? Enter email:` <CF ACCOUNT EMAIL>

`? Enter api key:` <CF API KEY>

`? Enter zone id:` <CF ZONE ID OF DOMAIN>

Of course you can always add the data directly to the config.json


**To Purge Domain's CloudFlare Cache:**
`cloudflare-cache-purger`

and select the domain from the list.