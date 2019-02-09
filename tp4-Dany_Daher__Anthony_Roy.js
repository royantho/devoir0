function randomBetween(a,b) {
    var num = Math.floor(Math.pow(10,a.toString().length)*Math.random());
        do num=Math.floor(Math.pow(10,a.toString().length)*Math.random());
        while (num<a || num>b);
        return num;
}
var randomNumber = randomBetween(5,10);
//print(randomNumber)

function attaquer (viesCible, degat){
    if (viesCible>degat) viesCible=viesCible-degat;
    else viesCible=0;
    return viesCible;
}
//viesCible = attaquer (60,40);

var viesChevalier = randomBetween(100,200);//print(viesChevalier);
var viesDragon = randomBetween(300,400);//print(viesDragon);
var degatChevalier = randomBetween(50,70);//print("degatChevalier" + degatChevalier);
var degatDragon = randomBetween(100,200);//print("degatDragon" + degatDragon);
var chanceChevalier; do chanceChevalier = Math.random(); while (chanceChevalier<0.5 || chanceChevalier>0.7);

//print(chanceChevalier);
    
    print("Le combat débute!")

while   (viesChevalier!=0 && viesDragon!=0)
    {
    viesDragon=attaquer(viesDragon,degatChevalier);
    print("==================================");
    print("Vies chevalier :" + viesChevalier);
    print("Vies Dragon :" + viesDragon);
        if (Math.random()>chanceChevalier) viesChevalier=attaquer(viesChevalier,degatDragon);
        else print("---\nLe chevalier a évité l'attaque!");
}


print("==================================");
print("Vies chevalier :" + viesChevalier);
print("Vies Dragon :" + viesDragon);

if (viesChevalier==0) print ("Le dragon est sorti vainqueur!! \u2694");
else print ("Le chevalier est sorti vainqueur!! \u2694");


    
    







    
    






