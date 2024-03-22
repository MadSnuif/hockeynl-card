# hockeynl-card
HA Card for dutch field hockey-league
This card wil show a home assistant sensor created with https://github.com/joosthoi1/hockey-team-tracker as a neat card. 

## How to install the card
Install the card via HACS is the best solution. Go to HACS tab and  and choose front-end, ... (marked yellow) and choose custom repositories
![HACS Frontend plugin selection screen](image.png)
Choose https://github.com/MadSnuif/hockeynl-card as repository and category Lovelace
Since it for now is a custom repository you have to download it with the button in Home Assistant.
![Card chooser HACS](image-1.png)
It will be added to the correct location for HACS cards.
As stated the card needs to have sensors created with https://github.com/joosthoi1/hockey-team-tracker. You can add your own sensors but you need to understand the underlaying API. A typical sensor would look somthing like:
![An example sensor](image-3.png)



## How to use the card
In Home Assistant add on your page a new card, and choose custom: HockeyNL Card
![alt text](image-4.png)
Add the sensors in code in the card:
for example two team sensors will need:

type: custom:hockeynl-card
entities:
  - sensor.gouda_heren_1
  - sensor.gouda_dames_1


![alt text](image-5.png)

Enjoy the card!
