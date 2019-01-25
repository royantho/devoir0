var motdepasse = prompt("Mot de passe.");
var length = motdepasse.length;
var char0 = motdepasse.charAt(0);
var char10 = motdepasse.charAt(length-1);
var estValide = null;
var estIdentique = null;
var confirmation = null;
print("Mot de passe: " + motdepasse);
if((length >= 5) && (length <= 10) && (char0 != char10) && (char0 >= "0" && char0 <= "9")&& !(char10 >= "a" && char10 <= "z") && !(char10 >= "0" && char10 <= "9") && !(char10 >= "A" && char10 <= "Z") )
{
    estValide = true;
    confirmation = prompt("Confirmez votre mot de passe");
    if(motdepasse == confirmation)
    {
        estIdentique = true;
        print("Vous avez bien configuré votre mot de passe");
    }
    else
    {
        estIdentique = false;
        print("Vous n'avez pas réécrit le même mot de passe");
    }

}
else
{
    estValide = false;
    print("Votre mot de passe ne respecte pas les critères de sécurité");
}
