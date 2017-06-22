$(document).ready(function() { //alla creazione del DOM chiamo subito generate()
    generate();

    function generate() { //generate() contiene un array

        var cit = ['AI CONSULTENTI ERICSSON - Ova state là e vi beccate gli insulti da consulenti schisci', 'I sevvev di posta vifiutano la mail di selene. E\' come calimevo', 'condividi questo messaggio con i tuoi amici e paventi cvistiani. Fovtunatamente non ne ho. HIHIHIHIHI', 'Santa Tvoia! Adesso ammazzo qualcuno', 'Orwell è il pvimo che viesce ad intevagive con le pompe senza toccavlo', "Devo bestemmiave?", 'Ova mi incazzo', 'Io dopo vi pvendo e vi sbuccio col pelapatate', 'Vuoi andave alle Maldive? Io onestamente pvefevivei una pompa in idvomassaggio', 'Con questa vi va alla gvandissima', 'Pev favove puoi vedevla con Lavinia?', 'Stiamo spavando con un cannone ad un moscevino', 'Ho scopevto che anche i delfini si dvogano e si scambiano la canna', 'Stanno indietvo come le palle del mio cane', 'Sandva la tua opinione pevsonale è ivvilevante', 'Ho bisogno di confvontavmi con qualcuno di estvemamente intelligente, peccato che il mio cane non possa vispondere al telefono', 'E’ più stupido di una scoveggia di topo', 'Vagazzi venite un attimo?', 'Mi ci gioco la metà dei miei debiti. Cioè chi vince può pagave metà dei miei debiti', 'Ho deciso io?! Allova è pevfetto!', 'sono una pevsona gentile quando voglio, con il cane e con *****', 'Modestamente sono un genio', 'Hanno fatto il mangime vegano pev gatti. Chiedevò il tvasfevimento su Mavte'];


        randomQuote = cit[Math.floor(Math.random() * cit.length)]; //ne prende un elemento


        $('#quote').text(randomQuote);
    }


    $("#ball").on("click", function() { //al click sul bottone richiama generate
        generate();
    });
});
