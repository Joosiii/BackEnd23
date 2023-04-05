# BackEnd23

Dit jaar moesten wij, Joost Verweijen en Tessa Welling backend team project herkansen. Vorig jaar zaten wij al samen in een team met nog 2 andere team genoten. Dit jaar zijn wij weer samen gevoegd om een nieuwe poging te wagen om een mooie webapp te maken die een persoon match aan een leuk diertje. 

## Concept
Ons concept is een matching app voor mensen die een huisdieren zoeken. Je kan een profiel kan aanmaken op basis van jouw intresses. Ontdek potentiële matches via de 'Discovery' pagina, met gebruik van evenetuele filters. Zo vind je misschien wel de liefde van je leven. 

## Install and Run Application
Ten eerste heeft u de volgende programma's nodig om de applciatie te installeren en te runnen:
- NPM
- Node

Onze applicatie maakt ook gebruik van een Database:
- MongoDB

Verder maakt het project gebruik van de volgende dependencies:\
`"array-back": "^6.2.2"`
    `"arrayify": "^1.0.0"`
    `"body-parser": "^1.19.2"`
    `"camelcase": "^6.3.0"`
    `"date-fns": "^2.28.0"`
    `"dotenv": "^16.0.0"`
    `"ejs": "^3.1.6"`
    `"express": "^4.17.3"`
    `"mongodb": "^4.4.1"`
    `"multer": "^1.4.4"`
    `"nodemailer": "^6.7.3"`
    `"server": "^1.0.37"`
    `"slug": "^5.2.0"`

Om onze applicatie op uw eigen apparaat te installeren en uit te voeren moeten er een aantal simpele stappen ondernomen worden. Ten eerste moet de repository gecloned worden, vul de volgende regel in in de GIT Bash.

$ git clone https://github.com/Joosiii/BackEnd23/

Vervolgens installeert u de nodige pakketten via de terminal.

npm install

Hierna kan de applicatie lokaal uitgevoerd worden door de volgende regel in de terminal in te voeren.

node app.js

U krijgt een alert dat de app gehost wordt binnen uw lokale systeem, in dit geval op portnummer 4000. Dit nummer kunt u ten alle tijde wijzigen door de `const port = 4000;` te wijzigen bovenin het app.js bestand.

Om gebruik te maken van de MongoDB database heeft u een eigen .env file nodig waarin u uw eigen gegevens invult. Om te kijken hoe dit moet kunt u de code binnen [VOORBEELDenv](https://github.com/Joosiii/BackEnd23/blob/main/VOORBEELDenv) kopiëren en personaliseren binnen uw eigen file.

De structuur van een document binnen mijn database ziet er als volgende uit:

  {
        "url": "",
        "name": "",
        "age": "",
        "country": "",
        "bio": "",
        "interests": ["", ""],
  }



## Contributors  
* Tessa Willing 
* Joost Verweijen 


## License
Wij hebben gebruik gemaakt van de [MIT License](https://github.com/Joosiii/BlokTech/blob/master/LICENSE).
