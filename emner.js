var valgt_fag;
var valgt_emne;
var underemne;
var sso_emne;





$(document).ready(function() {

    init();

    $(".btn-fag").click(clicked_fag); //

    $('#instruction').html(instruction("Klik på et fag få inspiration til emner til din SSO"));
    $('#explanation').html(explanation("Hvert fag har overordnede emner, underemner og herunder sso emner. Når du klikker på et sso emner, får du mulighed for at søge på emnet både på bibliotek.dk og en google søgning på udvalget databaser til det pågældende fag."));



});


function init() {

    var HTML = ""; //<button type='button' class='btn'>"+ jsonData.fag[0].id +"</button>";
    for (var i = 0; i < jsonData.fag.length; i++) {
        HTML += "<button type='button' class='btn btn-default btn-fag'>" + jsonData.fag[i].id + "</button>";
    }
    $(".fag_content").html(HTML);

    //$(".valg_container").css("opacity", ".6");
    //$(".valg_container").eq(0).css("opacity", "1");

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


    var HTML = "<div class='button_container'>";

    for (var i = 0; i < jsonData.fag[indeks].emner.length; i++) {
        HTML += "<button type='button' class='btn btn-default btn-emne'>" + jsonData.fag[indeks].emner[i] + "</button>";

    }



    $(".emne_content").html(HTML + "</div><div class='col-xs-4'></div>"); //<img class='img-responsive bullseye' src='img/bullseye1.svg'>");
    $(".emne_content").slideUp(0).slideDown(300);
    //$(".emne_content").slideUp(0);
    //$(".emne_content").slideDown(500);

    $(".bullseye").css("opacity", 0.3);
    $(".bullseye").eq(0).css("opacity", 1);




    $(".btn-emne").click(clicked_emne); //() {

    $(".btn-emne").each(function() {
        var indeks = $(this).index();

        $(this).fadeOut(100).delay(indeks * 100).fadeIn(100);
    })

}

function clicked_emne() {
    var indeks = $(this).index();

    valgt_emne = indeks;

    toggleClasses(".btn-emne", indeks);

    $(".sso_emne_content").html("");

    //alert(indeks);

    var HTML = "<div class='button_container'>";

    for (var i = 0; i < jsonData.fag[valgt_fag].underemner[indeks].length; i++) {
        console.log("i: " + i);
        HTML += "<button type='button' class='btn btn-default btn-underemne'>" + jsonData.fag[valgt_fag].underemner[indeks][i] + "</button>";
    }

    $(".u_emne_content").html(HTML + "</div><div class='col-xs-4'></div>"); //<img class='img-responsive bullseye' src='img/bullseye2.svg'>");

    //$(".u_emne_content").slideUp(0);
    //$(".u_emne_content").slideDown(500);

    $(".btn-underemne").click(clicked_underemne);
    $(".bullseye").css("opacity", 0.3);
    $(".bullseye").eq(0).css("opacity", .6);
    $(".bullseye").eq(1).css("opacity", 1);
    $(".u_emne_content").slideUp(0).slideDown(300);

    $(".btn-underemne").each(function() {
        var indeks = $(this).index();

        $(this).fadeOut(0).delay(indeks * 100).fadeIn(100);
    })
}

function clicked_underemne() {

    var wiki;
    var wiki_url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&titles=pizza";

    $.getJSON(wiki_url,
        function(data) {
            wiki = data;
            // or use your data here by calling yourFunction(data);
        });

    var indeks = $(this).index();

    toggleClasses(".btn-underemne", indeks);

    //alert(indeks);

    var HTML = "<div class='button_container'>";

    for (var i = 0; i < jsonData.fag[valgt_fag].sso_emner[valgt_emne][indeks].length; i++) {
        console.log("i: " + i);
        HTML += "<div class='btn-ssoemne col-xs-8'>" + jsonData.fag[valgt_fag].sso_emner[valgt_emne][indeks][i] + "</div><div class='search_container col-xs-4'><button class='btn btn-sm btn-info btn-bib'>Søg på bibliotek.dk</button><button class='btn btn-sm btn-info btn-google'>Søg på google</button></div>";
    }

    $(".sso_emne_content").html(HTML); //+ "</div><div class='col-xs-4'></div>"); //<img class='img-responsive bullseye' src='img/bullseye3.svg'>");
    //$(".sso_emne_content").slideUp(0);
    //$(".sso_emne_content").slideDown(500);
    $(".sso_emne_content").slideUp(0).slideDown(300);
    //$(".sso_emne_content").append("");

    $(".btn-bib, .btn-google").hide();

    $(".btn-google").click(clicked_google_search);
    $(".btn-bib").click(clicked_bib_search);


    //$(".btn-underemne").click(clicked_underemne);
    $(".btn-ssoemne").click(clicked_ssoemne);



    $(".bullseye").css("opacity", 0.2);
    $(".bullseye").eq(1).css("opacity", .6);
    $(".bullseye").eq(2).css("opacity", 1);

    //microhint($(".btn-ssoemne").eq(0), "Når du klikker på et SSO emne åbner en ny fane med din søgning <br/> Du kan også skrive din egen søgning ind i søgefeltet");
    $(".btn-ssoemne").each(function() {
        var indeks = $(this).index();

        $(this).fadeOut(0).delay(indeks * 100).fadeIn(100);
    })
}

function clicked_ssoemne() {
    var indeks = $(this).index(".btn-ssoemne");

    $(".btn-bib, .btn-google").hide();

    toggleClasses(".btn-ssoemne", indeks);


    $(".btn-bib").eq(indeks).fadeIn(200);
    $(".btn-google").eq(indeks).fadeIn(200);


}

function clicked_google_search() {
    var indeks = $(this).index(".btn-google");
    //toggleClasses(".btn-ssoemne", indeks);


    console.log("indeks: " + indeks);

    var searchstring = $(".btn-ssoemne").eq(indeks).html();

    var databases = "";

    for (var i = jsonData.fag[valgt_fag].databaser.length - 1; i >= 0; i--) {
        console.log(jsonData.fag[valgt_fag].databaser[i]);

        databases = databases + jsonData.fag[valgt_fag].databaser[i][1] + " OR ";
    }

    databases = databases + "site:denstoredanske.dk "


    searchstring = encodeURI(searchstring);

    setTimeout(function() {
            window.open("http://www.google.dk/?#q=" + searchstring + " site:" + databases);
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

function clicked_bib_search() {

    var indeks = $(this).index(".btn-bib");



    console.log("indeks: " + indeks);

    var searchstring = $(".btn-ssoemne").eq(indeks).html();

    searchstring = searchstring.replace(/\?/g, '')


    // microhint($(this), "Du bliver nu sendt videre til bibliotek.dk med din søgning: '" + searchstring + "'");

    searchstring = encodeURI(searchstring);

    setTimeout(function() {
        window.open("https://bibliotek.dk/linkme.php?cql=" + searchstring);
        //window.open("http://www.google.dk/?#q=" + searchstring);
    }, 0)
}

function toggleClasses(klasse, indeks) {

    $(klasse).removeClass("btn-primary").addClass("btn-default").css("opacity", ".5");
    $(klasse).eq(indeks).addClass("btn-primary").removeClass("btn-default").css("opacity", "1");

}
