locations = "";

userconnexion = document.cookie = 'user=Pierre';;
var searchfreecars;


if(document.getElementById("dated")){
    $(document).on('click', '#datef', function(e) {
        if(document.getElementById("dated").value != ""){
    
            var dateee = new Date(document.getElementById("dated").value);
            dateee.setDate(dateee.getDate() + 1)
            document.getElementById("datef").setAttribute('min', format(dateee));
        }
    })
    
}

function format(inputDate) {
    let date, month, year;
  
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return year+'-'+month+'-'+date;
  }



var get = function(url, success, error) {
    var xhr = new window.XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState ===4){
            if(xhr.status===200){
                success(xhr.responseText)
            }else{
                error(xhr)
            }
            
        }
    }
    xhr.open('GET', url, true);
    xhr.send();        
}
function lirecookie(){
    if (document.cookie.length > 0){
        let tablecookie = document.cookie.split(';');
        let nomcookie = "userconnexion=";
        let valeurcookie = "";
        for (i=0;i<tablecookie.length;i++){
                if(tablecookie[i].indexOf(nomcookie) != -1){
                    return true;
                }
        }
        
    }
    return false;
}

function searchfreecars(elmt){
    if(lirecookie()){
        var dated = document.getElementById("dated").value;
        var datef = document.getElementById("datef").value;
        if(dated != "" && datef != ""){
            var requestws = "http://localhost:80/LoactionVoiture/php/controller/getallavailablecarsbetweentwodates.php?dated="+dated+"&datef="+datef;
            get(requestws, function (response){
                var res = response.substring(1);
                console.log(res);
                var object = JSON.parse(res);
                var cars = object["body"]
                console.log("obj="+object);
                var i=0;
                var output = "";
                cars.forEach(function(obj) {
                    i++;
                output +=
                    "<div class='card col-12 col-lg-4' style='width: 18rem;'>"+
                    "<img class='card-img-top' src='img/"+obj.marque +"-"+obj.model+".jpg' alt='Card image cap' >"+
                    "<div class='card-body'>"+
                        "<div class='alignement'>"+
                            "<h5 class='card-title'>"+obj.marque +" "+obj.model +" "+ obj.couleur+"</h5><span class='badge badge-secondary'>"+obj.prix+" <span class='bi bi-currency-euro'></span> / day</span>"+
                        "</div>"+    
                        "<p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>"+
                        "<button class='btn btn-primary' data-id="+obj.id+" data-prix="+obj.prix+"  data-toggle='modal' data-target='#optionsModal'>Réserver</button>"+
                    "</div>"+
                "</div>";
                });
                document.getElementById('containerResultResacp').innerHTML = "";
                document.getElementById('containerResultResacp').innerHTML += output;
        
            }, function(error){
            alert('Aucune voiture disponible pour ces dates');
            })
        }else{
            alert('Veuillez saisir les dates');
        }
        
    }else{
        window.location = "login.html";
    }

}

function connexion(){
    var email = document.getElementById("email").value;
    var passwd = document.getElementById("passwd").value;
    var requestws = "http://localhost:80/LoactionVoiture/php/controller/getuserbyemailandpassword.php?email="+email+"&password="+passwd;
    get(requestws, function (response){
        var res = response.substring(1);
        var object = JSON.parse(res);
        var user = object["body"];
        if(user.length>0){
            document.cookie = "userconnexion=OK; expires=Mon, 06 Oct 2025 00:00:00 GMT; path=/";
            window.location = "reservation.html";
            
        }
    }, function(error){
        alert("nom d'itilisateur/mot de passe incorrect");
    })
}

function deconnexion(){
    //document.cookie = userconnexion + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "userconnexion=; Max-Age=-99999999;"; 
    window.location = "login.html";
}     



function searchallrents(elmt) {
    
    if(lirecookie()){
        var dateresa = document.getElementById("dateresa").value;
        var clientname = document.getElementById("nomclient").value;
        var requestws = "http://localhost:80/LoactionVoiture/php/controller/getallrenthistorybyclinetnameanddateresa.php?nom="+clientname+"&dated="+dateresa;

        get(requestws, function (response){
            var res = response.substring(1);
            console.log(res);
            var object = JSON.parse(res);
            var cars = object["body"];
            locations = cars;
            console.log("obj="+object);
            var i=0;
            document.getElementById(elmt).innerHTML = "";
            var res = "";
            res += "<table class='table' >"+
            "<thead class='thead-dark'>"+
            "  <tr>"+
            "    <th scope='col'>#</th>"+
            "   <th scope='col'>marque</th>"+
            "   <th scope='col'>model</th>"+
            "   <th scope='col'>Client</th>"+
            "    <th scope='col'>Date début location</th>"+
            "    <th scope='col'>Date fin location</th>"+
            "    <th scope='col'>action</th>"+
            "  </tr>"+
            "</thead>"+
            "<tbody>";
            cars.forEach(function(obj) {
                i++;
                res += " <tr>"+
                "<th scope='row'>"+i+"</th>"+
                "<td>"+obj.marque+"</td>"+
                "<td>"+obj.model+"</td>"+
                "<td>"+obj.nom+"</td>"+
                "<td>"+obj.datedebutlocation+"</td>"+
                "<td>"+obj.datefinlocation+"</td>"+
                "<td>"+
                    "<a class='edit' title='Edit' data-id ='"+(i-1)+"' data-toggle='modal' data-target='#exampleModal2'><i class='material-icons'>&#xE254;</i></a>"+
                    "<a class='delete' data-id ='"+(i-1)+"' title='Delete' data-toggle='modal' data-target='#exampleModal4'><i class='material-icons'>&#xE872;</i></a>"+
                    "<a class='delete' data-id ='"+(i-1)+"' title='Accident' data-toggle='modal' data-target='#exampleModal3' ><i class='material-icons car_crash'>&#xebf2;</i></a>"+
                "</td>"+
              "</tr>";
            });

            document.getElementById(elmt).innerHTML += res;
        }, function (error){
            document.getElementById(elmt).innerHTML = "";
            alert("Aucun resultat trouvé");
        })
    }else{
        window.location = "login.html";
    }
    
    
}


    $(document).on('show.bs.modal','#exampleModal2', function (e) {
        if(lirecookie()){
            var id = $(e.relatedTarget).data('id');
            document.getElementById('modalMarque').value = locations[id].marque;
            document.getElementById('modalMarque').disabled = true;
    
            document.getElementById('modalModel').value = locations[id].model;
            document.getElementById('modalModel').disabled = true;
    
            document.getElementById('modalClient').value = locations[id].nom;
            document.getElementById('modalClient').disabled = true;
    
            document.getElementById('modalDateDebut').value = locations[id].datedebutlocation;
            document.getElementById('modalid').value = locations[id].id;
            
    
            document.getElementById('modalDateFin').value = locations[id].datefinlocation;
    
            $(document).on('click', '#ModalBtnModi', function(e) {
                const request = new XMLHttpRequest();
                var dated =  document.getElementById('modalDateDebut').value;
                var datef =  document.getElementById('modalDateFin').value;
                var id = document.getElementById('modalid').value;
                var req = "http://localhost:80/LoactionVoiture/php/controller/updaterenthistory.php?id="+id+"&dated="+dated+"&datef="+datef;
                console.log(req);
                //var id = document.getElementById('exampleModal2').data('id');
                request.open("GET", req );
                request.send();
                request.onload = ()=>{
                    if(request=="Error"){
                        alert("Cette voiture n'est pas disponible pour cette date");
                    }else{
                        console.log(request);
                        $('#exampleModal2').modal('hide');
                        location.reload(); 
                    }
                   
                } 
                 
                
            });
        }else{
            window.location = "login.html";
        }
    })




$(document).on('show.bs.modal','#exampleModal3', function (e) {
    if(lirecookie()){
        var id = $(e.relatedTarget).data('id');
        document.getElementById('modaltwoMarque').value = locations[id].marque;
        document.getElementById('modaltwoMarque').disabled = true;

        document.getElementById('modaltwoModel').value = locations[id].model;
        document.getElementById('modaltwoModel').disabled = true;

        document.getElementById('modaltwoClient').value = locations[id].nom;
        document.getElementById('modaltwoClient').disabled = true;

        document.getElementById('modaltwoDateAccident').value = locations[id].datedebutlocation;
        document.getElementById('modaltwoid').value = locations[id].id;
        document.getElementById('modaltwoidclient').value = locations[id].idclient;
        document.getElementById('modaltwoidvoiture').value = locations[id].idvoiture;
        
        $(document).on('click', '#ModalBtnAjtAcc', function(e) {
            const request = new XMLHttpRequest();
            var dateacc =  document.getElementById('modaltwoDateAccident').value;
            var idc =  document.getElementById('modaltwoidclient').value;
            var idv =  document.getElementById('modaltwoidvoiture').value;
            var desc =  document.getElementById('modaltwoDescription').value;
            var req = "http://localhost:80/LoactionVoiture/php/controller/insertaccident.php?idc="+idc+"&idv="+idv+"&datea="+dateacc+"&desc="+desc
            console.log(req);
            request.open("GET", req );
            request.send();
            request.onload = ()=>{
                console.log(request);
            } 
            $('#exampleModal3').modal('hide');
            location.reload();   
        });
    }else{
        window.location = "login.html";
    }
})

$(document).on('show.bs.modal','#exampleModal4', function (e) {
    if(lirecookie()){
        var id = $(e.relatedTarget).data('id');
        document.getElementById('modalMarquefordelete').value = locations[id].marque;
        document.getElementById('modalMarquefordelete').disabled = true;

        document.getElementById('modalModelfordelete').value = locations[id].model;
        document.getElementById('modalModelfordelete').disabled = true;

        document.getElementById('modalClientfordelete').value = locations[id].nom;
        document.getElementById('modalClientfordelete').disabled = true;

        document.getElementById('modalDateDebutfordelete').value = locations[id].datedebutlocation;
        document.getElementById('modalDateDebutfordelete').disabled = true;

        document.getElementById('modalDateFinfordelete').value = locations[id].datefinlocation;
        document.getElementById('modalDateFinfordelete').disabled = true;

        document.getElementById('modalfoorid').value = locations[id].id;
        

        $(document).on('click', '#ModalBtnsuppr', function(e) {
            
            const request = new XMLHttpRequest();
            var id = document.getElementById('modalfoorid').value;
            var req = "http://localhost:80/LoactionVoiture/php/controller/deleterenthistory.php?id="+id;
            console.log(req);
            request.open("GET", req );
            request.send();
            request.onload = ()=>{
                console.log(request);
            } 
            $('#exampleModal4').modal('hide');
            location.reload();   
            
        });
    }else{
        window.location = "login.html";
    }
})

$(document).on('show.bs.modal','#optionsModal', function (e) {
    if(lirecookie()){
        var labelajoutclient = document.getElementById('labelajoutclient');
        var blockInfoClient = document.getElementById('blockInfoClient');
        labelajoutclient.style.cursor = 'pointer';
        var labelclientexistant = document.getElementById('labelclientexistant');
        var blockInfoClientexistant = document.getElementById('blockInfoClientexistant');
        labelclientexistant.style.cursor = 'pointer';
        var statlabelclientexistant = 1;
        var statlabajoutclient = 1;
        labelajoutclient.onclick = function() {
            if(statlabajoutclient%2!=0){
                blockInfoClient.classList.remove("hidediv");
                if(statlabelclientexistant%2==0){
                    blockInfoClientexistant.classList.add("hidediv");
                    statlabelclientexistant++;
                }
            }else{
                blockInfoClient.classList.add("hidediv");
            }
            statlabajoutclient++;
        };

        var ckboxIsEntreprise = document.getElementById('ckboxIsEntreprise');
        var entrepriseBlock = document.getElementById('entrepriseBlock');


        ckboxIsEntreprise.onclick = function() {
            if(ckboxIsEntreprise.checked){
                entrepriseBlock.classList.remove("hidediv");
            }else{
                entrepriseBlock.classList.add("hidediv");
            }
        };

        labelclientexistant.onclick = function() {
            if(statlabelclientexistant%2!=0){
                blockInfoClientexistant.classList.remove("hidediv");
                if(statlabajoutclient%2==0){
                    blockInfoClient.classList.add("hidediv");
                    statlabajoutclient++;
                }
            }else{
                blockInfoClientexistant.classList.add("hidediv");
            }
            statlabelclientexistant++;
        };

        var requestws = "http://localhost:80/LoactionVoiture/php/controller/getalloptions.php";
        get(requestws, function (response){
            var res = response.substring(1);
            console.log(res);
            var object = JSON.parse(res);
            var options = object["body"];
            console.log("obj="+object);
            var i=0;
            document.getElementById('options').innerHTML = "";
            var res = "";
            options.forEach(function(obj) {
                i++;
                res += "<div class='form-check'>"+
                            "<input class='form-check-input' type='checkbox' idopt="+obj.id+" name='optionscheckbox' value='"+obj.prix+"' id='flexCheckDefault'>"+
                            "<label class='form-check-label' for='flexCheckDefault'>"+
                                obj.descrip+" ("+obj.prix+"$/day)"+
                            "</label>"+
                        "</div>"
            });

            res += "<div style='float:right; ><span color:blue;cursor:pointer' id='liencodepromo' >Ajouter code promo</span></div>";
            res += "<div class='col-12 col-lg-12 hidediv' id='divpromo' >"+
                        "<div class='row top-buffer justify-content-center'>"+
                            "<label class='col-5'>Code promo</label>"+
                            "<input class='col-5 col-offset-1' type='text' id='codepromo'/>"+
                        "</div>"+
                    "</div>"; 
            document.getElementById('options').innerHTML += res;
            var dated = document.getElementById('dated').value;
            var datef = document.getElementById('datef').value;
            const date1 = new Date(dated);
            const date2 = new Date(datef);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = (Math.ceil(diffTime / (1000 * 60 * 60 * 24))); 
            var idvoit = $(e.relatedTarget).data('id');
            var prix = $(e.relatedTarget).data('prix');
            var blockliencodepromo = document.getElementById('liencodepromo');
            var divliencodepromo = document.getElementById('divpromo');
            var statliencodepromot = 1;
            blockliencodepromo.onclick = function() {
                if(statliencodepromot%2!=0){ 
                    divliencodepromo.classList.remove("hidediv");
                }else{
                    divliencodepromo.classList.add("hidediv");
                }
                statliencodepromot++;
            } ;     
            document.getElementById('total').innerHTML = "";
            document.getElementById('total').innerHTML += "<h5><b>Total : <span id='montant'>"+(diffDays*prix)+"</span> euros</b></h5>"; 
            $(document).on('click', '#addoptionsbtn', function(e) {  
                document.getElementById('addoptionsbtn').disabled = true;
                var checkboxes = document.getElementsByName("optionscheckbox");
                var total = diffDays*prix;
                for (var i=0; i<checkboxes.length; i++) {
                    checkboxes[i].disabled = true;
                    if (checkboxes[i].checked) {
                        total += checkboxes[i].value*diffDays;
                    }
                }
                var cdprom = document.getElementById('codepromo').value;
                if(cdprom!="" ){
                    processcodepromo(cdprom,total);
                }else{
                    document.getElementById('total').innerHTML = "";
                    document.getElementById('total').innerHTML = "<h5><b>Total : <span id='montant'>"+total+"</span> euros</b></h5>";
                }

            }); 

            $(document).on('click', '#validerlocaction', function(e) {  
                var blockInfoClient = document.getElementById('blockInfoClient');
                var blockInfoClientexistant = document.getElementById('blockInfoClientexistant');
                if(!blockInfoClient.classList.contains('hidediv')){
                    var nom = document.getElementById('modalInfoClientNom').value;
                    var prenom = document.getElementById('modalInfoClientNom').value;
                    var email = document.getElementById('modalInfoClientPrenom').value;
                    var adresse = document.getElementById('modalInfoClientAdresse').value;
                    var ville = document.getElementById('modalInfoClientVille').value;
                    var cp = document.getElementById('modalInfoClientCP').value;
                    var permis = document.getElementById('modalInfoClientpermis').value;
                    var isentreprise = document.getElementById('ckboxIsEntreprise');
                    if(isentreprise.checked){
                        var siren = document.getElementById('modalInfoClientsiren').value;
                        var sa = document.getElementById('modalInfoClientsa').value;
                        var rs = document.getElementById('modalInfoClientrs').value;
                        if(nom !="" && prenom !="" && email !="" && adresse !="" && ville !="" && cp !="" && permis !=""  && siren !=""  && sa !=""  && rs !="" ){
                            insertclientEntrepriseforlocation(nom, prenom, email, adresse, ville, cp, permis, idvoit, dated, datef,rs, sa, siren);
                        }else{
                            alert ("veuillez renseigner tout les champs svp");
                        }
                    }
                    else if(nom !="" && prenom !="" && email !="" && adresse !="" && ville !="" && cp !="" && permis !="" ){
                        insertclientforlocation(nom, prenom, email, adresse, ville, cp, permis, idvoit, dated, datef);
                    }else{
                        alert ("veuillez renseigner tout les champs svp");
                    }

                }else if(!blockInfoClientexistant.classList.contains('hidediv')){
                    var email = document.getElementById('modalInfoClientexistantemail').value;
                    if(email!= ""){
                        var req = "http://localhost:80/LoactionVoiture/php/controller/getclientbyemail.php?email="+email;
                        get(req, function (response){
                            var res = response.substring(1);
                            console.log(res);
                            var object = JSON.parse(res);
                            var client = object["body"];
                            var idclient = client[0].id;
                            var idvoiture = idvoit;
                            var idlocation = insertlocationforclientalredyexiste(idclient, idvoiture, dated, datef);  
                        }, function (error){
                            alert('cet email n\'est pas reconnu');
                        })
                    }else{
                        alert("Email du client erroné ou innexistant");
                    }
                    
                }

            }); 
        })
    }else{
        window.location = "login.html";
    }
    
})

function insertlocationforclientalredyexiste(idclient, idvoiture, dated, datef){
    var req= 'http://localhost:80/LoactionVoiture/php/controller/insertlocation.php?idc='+idclient+'&idv='+idvoiture+'&dated='+dated+'&datef='+datef;
    get(req , function (response){
        var checkboxes = document.getElementsByName("optionscheckbox");
        for (var i=0; i<checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var idption = checkboxes[i].attributes.idopt.value;
                insertoptionsforlocation(response, idption);
            }
        }
        $('#optionsModal').modal('hide');
        location.reload(); 
    }, function(error){
        console.log("Erreur"+error);
    })
}

function insertoptionsforlocation(idl, ido){
    var req= 'http://localhost:80/LoactionVoiture/php/controller/insertoption.php?idl='+idl+'&ido='+ido;
    get(req , function (response){
        console.log("insertion location terminé");
    }, function(error){
        console.log(error);
    })
}

function processcodepromo(codepromo, total){
    var req= 'http://localhost:80/LoactionVoiture/php/controller/getcodepromobyid.php?codepromo='+codepromo;
    get(req , function (response){
        var res = response.substring(1);
        console.log(res);
        var object = JSON.parse(res);
        var codepromoobject = object["body"];
        var reduction = codepromoobject[0].valeur;
        document.getElementById('total').innerHTML = "";
        document.getElementById('total').innerHTML = "<h5><b>Total : <span id='montant'>"+(total-reduction)+"</span> euros</b></h5>";
    }, function(error){
        document.getElementById('total').innerHTML = "";
        document.getElementById('total').innerHTML = "<h5><b>Total : <span id='montant'>"+total+"</span> euros</b></h5>";
       alert ('code promo non valide');

    })
}

function insertclientforlocation(nom, pren, email, adresse, ville, cp, permis, idvoit, dated, datef){
    var req= 'http://localhost:80/LoactionVoiture/php/controller/insertclient.php?nom='+nom+'&pren='+pren+'&email='+email+'&adresse='+adresse+'&ville='+ville+'&cp='+cp+'&permis='+permis;
    get(req , function (response){
        console.log("insertion client terminé");
        insertlocationforclientalredyexiste(response,idvoit,dated, datef);
    }, function(error){
        console.log(error);
    })
}

function insertclientEntrepriseforlocation(nom, pren, email, adresse, ville, cp, permis, idvoit, dated, datef, rs, sa, siren){
    var req= 'http://localhost:80/LoactionVoiture/php/controller/insertentreprise.php?nom='+nom+'&pren='+pren+'&email='+email+'&adresse='+adresse+'&ville='+ville+'&cp='+cp+'&permis='+permis+'&rs='+rs+'&sa='+sa+'&siren='+siren;
    get(req , function (response){
        console.log("insertion client terminé");
        insertlocationforclientalredyexiste(response,idvoit,dated, datef);
    }, function(error){
        console.log(error);
    })
}


function getcnt(object){
    var resultats = [];
     object.forEach(function(obj) {
        resultats.push(obj.cnt);
    })
     return resultats;
}

function getvoiture(object){
    var resultats = [];
     object.forEach(function(obj) {
        resultats.push(obj.voiture);
    })
     return resultats;
}

function getlistcafromca(object){
    var resultats = [];
     object.forEach(function(obj) {
        resultats.push(obj.ca );
    })
     return resultats;
}

function getlistnomfromca(object){
    var resultats = [];
     object.forEach(function(obj) {
        resultats.push(obj.nom);
    })
     return resultats;
}


function getlistmoisfromca(object){
    var resultats = [];
     object.forEach(function(obj) {
        resultats.push(obj.mois);
    })
    return resultats;
}



var firstchart = function (){
    if(lirecookie()){
        get('http://localhost:80/LoactionVoiture/php/controller/getca.php', function (response){
            rep = response.substring(1);
            var object = JSON.parse(rep);
            obj = object["body"];
            const labels =  getlistmoisfromca(obj);  
            const data1 = {
                labels: labels,
                datasets: [{
                    label: "chiffre d'affaire par mois",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data:  getlistcafromca(obj) ,
                }]
            };    
            const config1 = {
                type: 'line',
                data: data1,
                options: {}
            };
            const myChart = new Chart(
                document.getElementById('myChart'),
                config1
            );    
        }, function(er){
            console.log(er);
        })
    }else{
        window.location = "login.html";
    }
}




var secondchart = function (){
    if(lirecookie()){
        get('http://localhost:80/LoactionVoiture/php/controller/gettopclients.php', function (response){
            rep = response.substring(1);
            var object = JSON.parse(rep);
            obj = object["body"];

            const labels2 = getlistnomfromca(obj);
            const data2 = {
                labels: labels2,
                datasets: [{
                    label: 'Top 7 des clients',
                    data: getlistcafromca(obj),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            };
            const config2 = {
                type: 'bar',
                data: data2,
                options: {
                    scales: {
                    y: {
                        beginAtZero: true
                    }
                    }
                },
            };
            const myChart2 = new Chart(
                document.getElementById('myChart2'),
                config2
            );  
        })
    }else{
        window.location = "login.html";
    }
}

var tirthchart = function (){
    if(lirecookie()){
        get('http://localhost:80/LoactionVoiture/php/controller/getaccidentbycars.php', function (response){
            rep = response.substring(1);
            var object = JSON.parse(rep);
            obj = object["body"];
            const data3 = {
                labels: getvoiture(obj),
                datasets: [{
                label: 'type de voiture existant',
                data: getcnt(obj),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
                }]
            }
            const config3 = {
                type: 'doughnut',
                data: data3,
            };
            const myChart3 = new Chart(
                document.getElementById('myChart3'),
                config3
            );
        })
    }else{
        window.location = "login.html";
    }
}
if(document.getElementById('myChart2')){
    firstchart();
    secondchart();
    tirthchart();
}


