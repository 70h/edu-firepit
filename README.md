# ts-node-konkurenta-task-1

## Užduotis

Jusu uzduotis yra sukurti moduli, kuris kvies klase. Inicijuojant klase bus paduodamas user id (random kolkas). Klases tikslas yra istraukti visa info apie ta user - user info, user photos, photos tags.

Tikslui pasiekti naudosime tik iki 6 pamokos praeitas technologijas, kitaip tariant duomenu bazei naudosime mockintus duomenis - tiesiog paprastus masyvus, kurie atstos musu duomenu baze (savaime suprantama po appso perkrovimo duomenys issivalys)

Duomenu baze sudaryt turi sios lenteles:

1. users (id, first name, last name, pseudo name, status[enum for active/disabled/banned], created at, updated at, deleted at)
2. photos [relation to users] - (id, user id, img url, verified status[verified or not], description[string max length 500], fire count, created at, updated at, deleted at)
3. tags [related to photos] (id, photo id, tag [string], created at, updated at, deleted at)

Jusu klase galutiniame rezultate atiduodant nuotraukas ar tagus ar userio info turi naudoti "faker" biblioteka netikriems duomenims generuoti. Isgavus duomenis juos susideti i sukurtus masyvus. Pridejus duomenis i masyvus, masyvus isprintinti isitikinimui, jog duomenys buvo sekmingai sudeti.
