// Équipier 1 : Dany Daher
// Équipier 2 : Anthony Roy

var approximationPI=function (p) { //fonction qui attend la valeur p
    var somme=0;
    	for(var r=0; r<p; r++) somme += Math.pow(-1,r)*(4/(1+2*r)); //"somme+=" calcule la somme de la série de f(r)
    	//ou la série commence de 0 et termine a p 		//Math.pow calcule l'alternance -1 et 1. 
    	return somme //somme devient égale à la somme de cette série
}

var approximation = approximationPI(20000); //On pose p=20000
	print(approximation);

