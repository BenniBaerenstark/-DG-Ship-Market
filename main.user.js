// ==UserScript==
// @name         -DG- Ship Market
// @namespace    http://tampermonkey.net/
// @version      0.99
// @description  Tool for LastWar
// @author       Revan
// @match        http*://*.last-war.de/main.php*
// @match        http*://*.last-war.de/main-mobile.php*
// @grant        none
// @downloadURL  https://github.com/BenniBaerenstark/-DG-Ship-Market/raw/main/main.user.js
// @updateURL    https://github.com/BenniBaerenstark/-DG-Ship-Market/edit/main/main.user.js
// ==/UserScript==

(function() {

    var input
    var select
    var table

    'use strict';
    window.onclick = e => {
        if(e.target.innerText == "Neues Handelsangebot stellen"){
            neuerHandelClicked()
        }
        if(e.target.className == "fas fa-handshake"){
            neuerHandelClicked()
        }
    }




    function neuerHandelClicked(){
        setTimeout(function(){
           input = document.createElement("INPUT");
           input.setAttribute("style", "width: 50px;");
           input.type = "number"
           input.value = 1

            var max = document.createElement("span");
            max.setAttribute("style", "cursor: pointer");
            max.innerHTML = "Max"
            max.addEventListener("click", maxShip, false);

           var btn = document.createElement("a");
           btn.classList.add("formButtonNewMessage")
           btn.innerHTML = "Set"
           btn.setAttribute("style", "float: none");
           btn.addEventListener("click", setTrade, false);

            var values = getShipNames();
            select = document.createElement("select");
            select.name = "shipSelect";
            select.id = "shipSelect"
            for (const val of values) {
                var option = document.createElement("option");
                option.value = val;
                option.text = val.charAt(0).toUpperCase() + val.slice(1);
                select.appendChild(option);
            }
            select.addEventListener ("change", function () {
                updateTable()
            })

            var div = document.createElement("div");
            div.id = "container"
           
           var parent_length = document.getElementsByClassName("formButtonNewMessage").length
           var parent = document.getElementsByClassName("formButtonNewMessage")[parent_length-1].parentElement
           parent.appendChild(div)
           div.appendChild(max)
           div.appendChild(input)
           div.appendChild(select)
           div.appendChild(btn)
           table = infoTable()
           parent.appendChild(table)
           updateTable()
        }, 500);
    }

    function infoTable(){
        //var shipNr = select.selectedIndex
        var table = document.createElement("table")

        var firstRow = document.createElement("tr")
        var name_Titel = document.createElement("th")
        name_Titel.innerText = " "
        firstRow.appendChild(name_Titel)
        var sClass = document.createElement("th")
        sClass.innerText = "Klasse"
        firstRow.appendChild(sClass)
        var attDef = document.createElement("th")
        attDef.innerText = "Att / Def"
        firstRow.appendChild(attDef)
        var drive_Titel = document.createElement("th")
        drive_Titel.innerText = "Antrieb"
        firstRow.appendChild(drive_Titel)
        var freight_Titel = document.createElement("th")
        freight_Titel.innerText = "Fracht"
        firstRow.appendChild(freight_Titel)
        var lKom_Titel = document.createElement("th")
        lKom_Titel.innerText = "L-Kom"
        firstRow.appendChild(lKom_Titel)
        var tt_Titel = document.createElement("th")
        tt_Titel.innerText = "TT"
        firstRow.appendChild(tt_Titel)
        table.appendChild(firstRow)

        var secondRow = document.createElement("tr")
        var name_String = document.createElement("th")
        //name_String.innerText = ships[shipNr][name]
        name_String.id = "name_String"
        secondRow.appendChild(name_String)
        var sClass_String = document.createElement("td")
        //sClass_String.innerText = ships[shipNr][shipClass]
        sClass_String.id = "sClass_String"
        secondRow.appendChild(sClass_String)
        var attDef_Value = document.createElement("td")
        //attDef_Value.innerText = ships[shipNr][att] + " / " + ships[shipNr][def]
        attDef_Value.id = "attDef_Value"
        secondRow.appendChild(attDef_Value)
        var drive_Value = document.createElement("td")
        //drive_Value.innerText = ships[shipNr][drive] + " " + ships[shipNr][drive_s] + "%"
        drive_Value.id = "drive_Value"
        secondRow.appendChild(drive_Value)
        var freight_Value = document.createElement("td")
        //freight_Value.innerText = ships[shipNr][freight]
        freight_Value.id = "freight_Value"
        secondRow.appendChild(freight_Value)
        var lKom_Value = document.createElement("td")
        //if(ships[shipNr][lkom]) lKom_Value.innerText = symbol_true
        //else lKom_Value.innerText = symbol_false
        lKom_Value.id = "lKom_Value"
        secondRow.appendChild(lKom_Value)
        var tt_Value = document.createElement("td")
        //if(ships[shipNr][tt]) tt_Value.innerText = symbol_true
        //else tt_Value.innerText = symbol_false
        tt_Value.id = "tt_Value"
        secondRow.appendChild(tt_Value)

        table.appendChild(secondRow)

        return table
    }

    function updateTable(){
        var shipNr = select.selectedIndex
        var temp

        document.getElementById("name_String").innerText = ships[shipNr][name]
        document.getElementById("sClass_String").innerText = ships[shipNr][shipClass]
        document.getElementById("attDef_Value").innerText = ships[shipNr][att] + " / " + ships[shipNr][def]
        document.getElementById("drive_Value").innerText = ships[shipNr][drive] + " " + ships[shipNr][drive_s] + "%"
        document.getElementById("freight_Value").innerText = ships[shipNr][freight]
        if(ships[shipNr][lkom]) temp = symbol_true
        else temp = symbol_false
        document.getElementById("lKom_Value").innerText = temp
        if(ships[shipNr][tt]) temp = symbol_true
        else temp = symbol_false
        document.getElementById("tt_Value").innerText = temp

    }

    function maxShip(){
        var percentTrade = 1+(lose/100)
        var shipNr = select.selectedIndex
        var max = Math.floor(Roheisen/(ships[shipNr][fe]*percentTrade))
        var maxKr = Math.floor(Kristall/(ships[shipNr][kr]*percentTrade))
        if(maxKr < max) max = maxKr
        var maxFb = Math.floor(Frubin/(ships[shipNr][fb]*percentTrade))
        if(maxFb < max) max = maxFb
        var maxOr = Math.floor(Orizin/(ships[shipNr][or]*percentTrade))
        if(maxOr < max) max = maxOr
        var maxFz = Math.floor(Frurozin/(ships[shipNr][fz]*percentTrade))
        if(maxFz < max) max = maxFz
        var maxGo = Math.floor(Gold/(ships[shipNr][go]*percentTrade))
        if(maxGo < max) max = maxGo
        input.value = max

    }




    var ships = new Array()
    const name = 0
    const att = 1
    const def = 2
    const drive = 3
    const drive_s = 4
    const freight = 5
    const lkom = 6
    const tt = 7
    const fe = 8
    const kr = 9
    const fb = 10
    const or = 11
    const fz = 12
    const go = 13
    const shipClass = 14

    const symbol_true = "✅"
    const symbol_false = "❌"

    //Armageddon
    ships[0] = new Array()
    ships[0][name] = "Армагеддон"
    ships[0][shipClass] = "schwer"
    ships[0][att] = 21114
    ships[0][def] = 16052
    ships[0][drive] = "NUK"
    ships[0][drive_s] = 160
    ships[0][freight] = 190
    ships[0][lkom] = true
    ships[0][tt] = false
    ships[0][fe] = 27144
    ships[0][kr] = 51422
    ships[0][fb] = 456
    ships[0][or] = 35978
    ships[0][fz] = 17737
    ships[0][go] = 100

    //Сухой Су-57
    ships[1] = new Array()
    ships[1][name] = "Сухой Су-57"
    ships[1][shipClass] = "schwer"
    ships[1][att] = 10790
    ships[1][def] = 16054
    ships[1][drive] = "NUK"
    ships[1][drive_s] = 160
    ships[1][freight] = 194
    ships[1][lkom] = true
    ships[1][tt] = true
    ships[1][fe] = 27944
    ships[1][kr] = 51422
    ships[1][fb] = 2123
    ships[1][or] = 25091
    ships[1][fz] = 11641
    ships[1][go] = 567
    
     //ъуран
    ships[2] = new Array()
    ships[2][name] = "ъуран"
    ships[2][shipClass] = "schwer"
    ships[2][att] = 449
    ships[2][def] = 20831
    ships[2][drive] = "NUK"
    ships[2][drive_s] = 160
    ships[2][freight] = 88800
    ships[2][lkom] = true
    ships[2][tt] = false
    ships[2][fe] = 42399
    ships[2][kr] = 66422
    ships[2][fb] = 3633
    ships[2][or] = 14204
    ships[2][fz] = 5545
    ships[2][go] = 100

    //Аракс
    ships[3] = new Array()
    ships[3][name] = "Аракс"
    ships[3][shipClass] = "schwer"
    ships[3][att] = 3301
    ships[3][def] = 8020
    ships[3][drive] = "NUK"
    ships[3][drive_s] = 160
    ships[3][freight] = 224399
    ships[3][lkom] = true
    ships[3][tt] = true
    ships[3][fe] = 57866
    ships[3][kr] = 41422
    ships[3][fb] = 3700
    ships[3][or] = 17117
    ships[3][fz] = 7117
    ships[3][go] = 567

    //левиафан
    ships[4] = new Array()
    ships[4][name] = "левиафан"
    ships[4][shipClass] = "schwer"
    ships[4][att] = 1371
    ships[4][def] = 8027
    ships[4][drive] = "NUK"
    ships[4][drive_s] = 160
    ships[4][freight] = 360000
    ships[4][lkom] = true
    ships[4][tt] = false
    ships[4][fe] = 85733
    ships[4][kr] = 51422
    ships[4][fb] = 433
    ships[4][or] = 15278
    ships[4][fz] = 6235
    ships[4][go] = 100

    //Turboooo
    ships[5] = new Array()
    ships[5][name] = "Turboooo"
    ships[5][shipClass] = "schwer"
    ships[5][att] = 36179
    ships[5][def] = 8024
    ships[5][drive] = "NUK"
    ships[5][drive_s] = 154
    ships[5][freight] = 182
    ships[5][lkom] = true
    ships[5][tt] = false
    ships[5][fe] = 19144
    ships[5][kr] = 31422
    ships[5][fb] = 456
    ships[5][or] = 51617
    ships[5][fz] = 26287
    ships[5][go] = 100


    function getShipNames(){
        var names = new Array();
        for (var i = 0; i < ships.length; i++) {
            names[i] = ships[i][name]
        }
        return names
    }


    function setTrade(){
        console.log(select.selectedIndex)
        var ship = select.selectedIndex
        var quantity = input.value
        document.getElementById("my_eisen").value = quantity * ships[ship][fe]
            document.getElementById("my_kristall").value = quantity * ships[ship][kr]
            document.getElementById("my_frubin").value = quantity * ships[ship][fb]
            document.getElementById("my_orizin").value = quantity * ships[ship][or]
            document.getElementById("my_frurozin").value = quantity * ships[ship][fz]
            document.getElementById("my_gold").value = quantity * ships[ship][go]
        if (parseInt(quantity) >= 1){
            document.getElementById("tradeOfferComment").value = quantity + " x " + ships[ship][name]
            document.getElementById("his_eisen").value = 1
        }
        else{
            document.getElementById("tradeOfferComment").value = ""
            document.getElementById("his_eisen").value = 0
        }
    }
})();
