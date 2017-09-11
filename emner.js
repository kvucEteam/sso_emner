var valgt_fag;
var valgt_emne;
var underemne;
var sso_emne;



$(document).ready(function() {

    init();

    $(".btn-fag").click(clicked_fag); //



});


function init() {

    var HTML = ""; //<button type='button' class='btn'>"+ jsonData.fag[0].id +"</button>";
    for (var i = 0; i < jsonData.fag.length; i++) {
        HTML += "<button type='button' class='btn btn-default btn-fag'>" + jsonData.fag[i].id + "</button>";
    }
    $(".fag_container").html(HTML);
}


function clicked_fag() {
    var indeks = $(this).index();
    valgt_fag = indeks;


    //$(".btn-fag").removeClass("btn-primary").addClass("btn-default").css("opacity", ".5");
    //$(this).addClass("btn-primary").removeClass("btn-default").css("opacity", "1");

    toggleClasses(".btn-fag", indeks);

    $(".u_emne_container").html("");
    $(".sso_emne_container").html("");



    //activateClass($(this), indeks);


    var HTML = "";

    for (var i = 0; i < jsonData.fag[indeks].emner.length; i++) {
        HTML += "<button type='button' class='btn btn-default btn-emne'>" + jsonData.fag[indeks].emner[i] + "</button>";
    }

    $(".emne_container").html(HTML);

    $(".btn-emne").click(clicked_emne); //() {

}

function clicked_emne() {
    var indeks = $(this).index();

    valgt_emne = indeks;

    toggleClasses(".btn-emne", indeks);

    $(".sso_emne_container").html("");

    //alert(indeks);

    var HTML = "";

    for (var i = 0; i < jsonData.fag[valgt_fag].underemner[indeks].length; i++) {
        console.log("i: " + i);
        HTML += "<button type='button' class='btn btn-default btn-underemne'>" + jsonData.fag[valgt_fag].underemner[indeks][i] + "</button>";
    }

    $(".u_emne_container").html(HTML);
    $(".btn-underemne").click(clicked_underemne);
}

function clicked_underemne() {
    var indeks = $(this).index();

    toggleClasses(".btn-underemne", indeks);


    //alert(indeks);

    var HTML = "";

    for (var i = 0; i < jsonData.fag[valgt_fag].sso_emner[valgt_emne][indeks].length; i++) {
        console.log("i: " + i);
        HTML += "<button type='button' class='btn  btn-default btn-ssoemne'>" + jsonData.fag[valgt_fag].sso_emner[valgt_emne][indeks][i] + "</button>";
    }

    $(".sso_emne_container").html(HTML);

    $(".sso_emne_container").append("<br/><h3>Klik eller skriv din egen søgning:<br></h3><input type='text'><button class='btn btn-info btn-submit'>Søg på bibliotek.dk</button>");


    //$(".btn-underemne").click(clicked_underemne);
    $(".btn-ssoemne").click(clicked_ssoemne);
    $(".btn-submit").click(clicked_soegning);
    
}

function clicked_ssoemne() {
    var indeks = $(this).index();
    toggleClasses(".btn-ssoemne", indeks);


    var searchstring = $(this).html();

    microhint($(this), "Du bliver nu sendt videre til bibliotek.dk med din søgning: '" + searchstring + "'");

    searchstring = encodeURI(searchstring);

    setTimeout(function() {
        window.open("https://bibliotek.dk/linkme.php?cql=" + searchstring);
    }, 5000)

    //    


}

function clicked_soegning(){


var searchstring = $("input:text").val();

    microhint($(this), "Du bliver nu sendt videre til bibliotek.dk med din søgning: '" + searchstring + "'");

    searchstring = encodeURI(searchstring);

    setTimeout(function() {
        window.open("https://bibliotek.dk/linkme.php?cql=" + searchstring);
    }, 2000)    
}

function toggleClasses(klasse, indeks) {

    $(klasse).removeClass("btn-primary").addClass("btn-default").css("opacity", ".5");
    $(klasse).eq(indeks).addClass("btn-primary").removeClass("btn-default").css("opacity", "1");

}
