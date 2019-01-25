//ex1
var manger=confirm("Manger?");
var grandir=null; //null=vide

if (manger) {
    grandir = true
} else {
    grandir=false;
}
    
print(grandir);
//ex2
var discipline=prompt("Quel est ta discipline")
var cours=null;
if (discipline==="meca") {
    cours="meca1";
} else if (discipline === "doc") {
    cours = "doc1"
} else {
    cours = "prog1";
}

alert(cours);
//ex3

switch(discipline) {
    case "meca":
        cours = "meca1";
    case "doc":
        cours="doc1";
    case "neuro":
    default:
        cours="prog1";
}  

alert(cours);
//ex4
var vaiselle = confirm("vaisselle");
var menage = confirm("Menage?");
var contente = vaiselle || menage;


print("Contente: " + contente);

/ex5
var vaiselle = confirm("vaisselle");
var menage = confirm("Menage?");
var massage = confirm("Massage?");
var contente = massage || (menage && vaisselle);

print("Contente: " + contente);




      

   
    