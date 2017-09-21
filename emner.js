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
    $(".fag_content").html(HTML + '<hr>');
}


function clicked_fag() {
    var indeks = $(this).index();
    valgt_fag = indeks;


    //$(".btn-fag").removeClass("btn-primary").addClass("btn-default").css("opacity", ".5");
    //$(this).addClass("btn-primary").removeClass("btn-default").css("opacity", "1");

    toggleClasses(".btn-fag", indeks);

    $(".u_emne_content").html("");
    $(".sso_emne_content").html("");
    //activateClass($(this), indeks);


    var HTML = "<div class='col-xs-8 button_container'>";

    for (var i = 0; i < jsonData.fag[indeks].emner.length; i++) {
        HTML += "<button type='button' class='btn btn-default btn-emne'>" + jsonData.fag[indeks].emner[i] + "</button>";
    }

    $(".emne_content").html(HTML + "</div><div class='col-xs-4'><img class='img-responsive bullseye' src='img/bullseye1.svg'>");

    //$(".emne_content").slideUp(0);
    //$(".emne_content").slideDown(500);

    $(".bullseye").css("opacity", 0.3);
    $(".bullseye").eq(0).css("opacity", 1);




    $(".btn-emne").click(clicked_emne); //() {

}

function clicked_emne() {
    var indeks = $(this).index();

    valgt_emne = indeks;

    toggleClasses(".btn-emne", indeks);

    $(".sso_emne_content").html("");

    //alert(indeks);

    var HTML = "<div class='col-xs-8 button_container'>";

    for (var i = 0; i < jsonData.fag[valgt_fag].underemner[indeks].length; i++) {
        console.log("i: " + i);
        HTML += "<button type='button' class='btn btn-default btn-underemne'>" + jsonData.fag[valgt_fag].underemner[indeks][i] + "</button>";
    }

    $(".u_emne_content").html(HTML+ "</div><div class='col-xs-4'><img class='img-responsive bullseye' src='img/bullseye2.svg'>");

    //$(".u_emne_content").slideUp(0);
    //$(".u_emne_content").slideDown(500);

    $(".btn-underemne").click(clicked_underemne);
    $(".bullseye").css("opacity", 0.3);
    $(".bullseye").eq(0).css("opacity", .6);
    $(".bullseye").eq(1).css("opacity", 1);
}

function clicked_underemne() {
    var indeks = $(this).index();

    toggleClasses(".btn-underemne", indeks);

    //alert(indeks);

    var HTML = "<div class='col-xs-8 button_container'>";

    for (var i = 0; i < jsonData.fag[valgt_fag].sso_emner[valgt_emne][indeks].length; i++) {
        console.log("i: " + i);
        HTML += "<button type='button' class='btn  btn-default btn-ssoemne'>" + jsonData.fag[valgt_fag].sso_emner[valgt_emne][indeks][i] + "</button>";
    }

    $(".sso_emne_content").html(HTML+ "</div><div class='col-xs-4'><img class='img-responsive bullseye' src='img/bullseye3.svg'>");
    //$(".sso_emne_content").slideUp(0);
    //$(".sso_emne_content").slideDown(500);

    $(".sso_emne_content").append("<input type='text'>    <button class='btn btn-sm btn-info btn-submit'>Søg på bibliotek.dk</button>");


    //$(".btn-underemne").click(clicked_underemne);
    $(".btn-ssoemne").click(clicked_ssoemne);
    $(".btn-submit").click(clicked_soegning);

    microhint($(".btn-ssoemne").eq(0), "Når du klikker på knappen åbner en ny fane med din søgning <br/> Du kan også skrive din egen søgning ind i søgefeltet");
    
$(".bullseye").css("opacity", 0.2);
$(".bullseye").eq(1).css("opacity", .6);
    $(".bullseye").eq(2).css("opacity", 1);
}

function clicked_ssoemne() {
    var indeks = $(this).index();
    toggleClasses(".btn-ssoemne", indeks);


    var searchstring = $(this).html();


    searchstring = encodeURI(searchstring);

    setTimeout(function() {
        window.open("http://www.google.dk/?#q=site:bibliotek.dk OR site:denstoredanske.dk " + searchstring);
    }, 0)
/*
    var Databases = "";
    $("input:checked").each(function(index, element) {

        //console.log();
        Databases += ((index > 0) ? "+OR+" : "") + " site:" + $(this).attr("value");
        //console.log("Databases: " + Databases);
    });
    //console.log("Search - Databases: " + Databases);

    var URL = 'http://www.google.dk/?#q=';

    if (SearchText.length > 0) {
        URL += "+" + SearchText.replace(/\ +/g, "+");
        $("#SearchTextParent").removeClass("ErrorColor"); // NEW
        // $("#SearchText").attr("placeholder", SearchPlaceholderMemory);  // Inset old placeholder text again.
        // $("#SearchText").next().fadeOut("slow");  // OLD
    } else {
        // $("#SearchText").next().text("Skriv nogle søgeord her!").fadeIn("slow");  // OLD
        $("#SearchTextParent").addClass("ErrorColor"); // NEW
        // $("#SearchText").attr("placeholder","Skriv nogle søgeord her!").fadeIn("slow");  // NEW
        return 0;
    }

    //console.log("jsonData.DropDowns[0].obj.options[0]: " + JSON.stringify(jsonData.DropDowns[0].obj.options[0].value));
    URL += Databases;

    //console.log("Search - URL: " + URL);

    window.open(URL, '_blank');
*/
    //    


}

function clicked_soegning(){


var searchstring = $("input:text").val();

    microhint($(this), "Du bliver nu sendt videre til bibliotek.dk med din søgning: '" + searchstring + "'");

    searchstring = encodeURI(searchstring);

    setTimeout(function() {
        //window.open("https://bibliotek.dk/linkme.php?cql=" + searchstring);
        window.open("http://www.google.dk/?#q=" + searchstring);
    }, 0)    
}

function toggleClasses(klasse, indeks) {

    $(klasse).removeClass("btn-primary").addClass("btn-default").css("opacity", ".5");
    $(klasse).eq(indeks).addClass("btn-primary").removeClass("btn-default").css("opacity", "1");

}
