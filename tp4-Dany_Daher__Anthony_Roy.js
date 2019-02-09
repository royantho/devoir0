// Équipier 1: Dany Daher
// Équipier 2: Anthony Roy

function randomBetween(a,b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

function attaquer (viesCible, degat){
    if (viesCible<degat) return 0;
    else return viesCible-degat;
}

var viesChevalier = randomBetween(100,200);
var viesDragon = randomBetween(300,400);
var degatChevalier = randomBetween(50,70);
var degatDragon = randomBetween(100,200);
var chanceChevalier; do chanceChevalier = Math.random(); while (chanceChevalier<0.5 || chanceChevalier>0.7);

    print("Le combat débute!")

    do {
        viesDragon=attaquer(viesDragon,degatChevalier);
        if (viesDragon!=0){
            print("==================================");
            print("Vies chevalier : " + viesChevalier);
            print("Vies Dragon : " + viesDragon);
        
             if (Math.random()>chanceChevalier) viesChevalier=attaquer(viesChevalier,degatDragon);
            else print("---\nLe chevalier a évité l'attaque!");
        }
        else break
    }
    while   (viesChevalier!=0 && viesDragon!=0);

    print("==================================");
    print("Vies chevalier : " + viesChevalier);
    print("Vies Dragon : " + viesDragon);
    print("---")


if (viesChevalier==0) print ("Le chevalier a perdu!");
else print ("Le chevalier est sorti vainqueur!!");


    
    






