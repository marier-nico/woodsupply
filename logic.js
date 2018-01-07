var selectedServer;
var competitions;
var servers = Object;
var selectedGames = new Array();


// Get Servers
$.ajax({
    type : "POST",
    url : "./PHP/servers.php",
    dataType : "json",
    success: function (data) {
        var serverSelectHTML = "";

        for (var server in data) {
            if(data.hasOwnProperty(server)) {
                serverSelectHTML += ("<div class=\"col-md-3 text-center\"><label class=\"serverOption\"><input onClick=\"getGames('" + data[server] + "', '" + server + "')\" name=\"serverSelect\" type=\"radio\" value=\"" + data[server] + "\"><span>" + server + "</span></label></div>");
                servers[server] = data[server].valueOf();
            }
        }
        document.getElementById("ServerSelection").innerHTML = serverSelectHTML;
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus); alert("Error: " + errorThrown);
    }
});

// Get Competitions
$.ajax({
    type : "POST",
    url : "./PHP/competitions.php",
    dataType : "json",
    success: function(data){
        competitions = data.split(";")[0].split(",");
        var competitionHTML = "";
        for(var i = 0; i < competitions.length; i++){
            competitionHTML += ("<option value=\"" + competitions[i] + "\">" + competitions[i] + "</option>");
        }
        document.getElementById("Competitions").innerHTML = competitionHTML;
    }
});

// Select Competition
function selectCompetition() {
    var comp = $("#Competitions").val();
    $.ajax({
        type : "POST",
        url : "./PHP/competitionGames.php",
        dataType : "json",
        data :
        {
            compName : comp
        },
        success: function(data){
            var tmpGames = data.split(";")[0].split(",");
            for(var i = 0; i < tmpGames.length; i += 2){
                var GameName = tmpGames[i];
                var ServerURL = servers[tmpGames[i + 1]];
                var ServerName = tmpGames[i + 1];

                for(var j = 0; j < selectedGames.length; j++){
                    if(selectedGames[j].GameName == GameName){
                        break;
                    }
                }
                if(j == selectedGames.length){
                    selectedGames.push({GameName:GameName, ServerURL:ServerURL, ServerName:ServerName});
                }
            }
            updateSelected();
        }
    });
}

// Create Comp
function createCompetition(){
    var name = $("#CompetitionName").val();
    var pass = $("#CompetitionPassword").val();

    // Check if required vars are set.
    if(selectedGames.length == 0) return;
    if(name == "") return;
    if(pass == "") return;
    if(competitions.indexOf(name) != -1) return;

    var createURL = "http://forac-old.fsg.ulaval.ca/woodSupplyGame2010/Competition.aspx?action=addComp&name=" + name + "&pass=" + pass;

    var addGames = [];
    for(var i = 0; i < selectedGames.length; i++){
        addGames.push("http://forac-old.fsg.ulaval.ca/woodSupplyGame2010/Competition.aspx?action=addGame&compName=" + name + "&gameName=" + selectedGames[i].GameName + "&server=" + selectedGames[i].ServerName + "&pass=" + pass);
    }
    $.ajax({
        type : "POST",
        url : "./PHP/createCompetition.php",
        data :
        {
            createURL : createURL,
            addGames: addGames
        },
        success: function(data){
            location.reload();
        }
    });
}

// Set Comp
function setCompetition(){
    var name = $("#CompetitionName").val();
    var pass = $("#CompetitionPassword").val();

    // Check if required vars are set.
    if(name == "") {
        $.notify({
            message: "No competition name has been provided.",
            icon: "glyphicon glyphicon-console"
        },{
            type: "danger",
            allow_dismiss: false,
            delay: 2000
        });
        return;
    }
    if(pass == ""){
        $.notify({
            message: "No password has been provided.",
            icon: "glyphicon glyphicon-console"
        },{
            type: "danger",
            allow_dismiss: false,
            delay: 2000
        });
        return;
    }
    if(selectedGames.length == 0) {
        $.notify({
            message: "You must select at least one game to set a competition.",
            icon: "glyphicon glyphicon-console"
        },{
            type: "danger",
            allow_dismiss: false,
            delay: 2000
        });
        return;
    }
    // End Checks

    // If comp does not exist, create it.
    if(competitions.indexOf(name) == -1) {
        createCompetition();
        return;
    }

    var delURL = "http://forac-old.fsg.ulaval.ca/woodSupplyGame2010/Competition.aspx?action=delComp&name=" + name + "&pass=" + pass;
    var createURL = "http://forac-old.fsg.ulaval.ca/woodSupplyGame2010/Competition.aspx?action=addComp&name=" + name + "&pass=" + pass;

    var addGames = [];
    for(var i = 0; i < selectedGames.length; i++){
        addGames.push("http://forac-old.fsg.ulaval.ca/woodSupplyGame2010/Competition.aspx?action=addGame&compName=" + name + "&gameName=" + selectedGames[i].GameName + "&server=" + selectedGames[i].ServerName + "&pass=" + pass);
    }
    $.ajax({
        type : "POST",
        url : "./PHP/editCompetition.php",
        data :
        {
            createURL : createURL,
            delURL : delURL,
            addGames : addGames
        },
        success: function(data){
            if(data.indexOf("erreurText") != -1){
                $.notify({
                    message: "Incorrect Password",
                    icon: "glyphicon glyphicon-lock"
                },{
                    type: "warning",
                    allow_dismiss: false,
                    delay: 2000
                });
            } else {
                location.reload();
            }
        }
    });
}

// Delete Comp
function deleteCompetition(){
    var name = $("#CompetitionName").val();
    var pass = $("#CompetitionPassword").val();

    // Check if name & pass are set and comp exists.
    if(name == "") {
        $.notify({
            message: "No competition name has been provided.",
            icon: "glyphicon glyphicon-console"
        },{
            type: "danger",
            allow_dismiss: false,
            delay: 2000
        });
        return;
    }
    if(pass == ""){
        $.notify({
            message: "No password has been provided.",
            icon: "glyphicon glyphicon-console"
        },{
            type: "danger",
            allow_dismiss: false,
            delay: 2000
        });
        return;
    }
    if(competitions.indexOf(name) == -1) {
        $.notify({
            message: "No competition with the supplied name was found.",
            icon: "glyphicon glyphicon-warning-sign"
        },{
            type: "warning",
            allow_dismiss: false,
            delay: 2000
        });
        return;
    }
    // End checks.

    var delURL = "http://forac-old.fsg.ulaval.ca/woodSupplyGame2010/Competition.aspx?action=delComp&name=" + name + "&pass=" + pass;

    $.ajax({
        type : "POST",
        url : "./PHP/deleteCompetition.php",
        data :
        {
            delURL : delURL
        },
        success: function(data){
            if(data.indexOf("erreurText") != -1){
                $.notify({
                    message: "Incorrect Password",
                    icon: "glyphicon glyphicon-lock"
                },{
                    type: "warning",
                    allow_dismiss: false,
                    delay: 2000
                });
            } else {
                location.reload();
            }
        }
    });
}

// Get Games
function getGames(serverURL, serverName){
    selectedServer = {serverURL: serverURL, serverName: serverName};
    $.ajax({
        type : "POST",
        url : "./PHP/games.php",
        dataType : "json",
        data :
        {
            url : serverURL
        },
        success: function(data){
            var gameSelectHTML = "";

            for(var i = 0; i < data.length; i++){
                gameSelectHTML += ("<option value=\"" + data[i] + "\">" + data[i] + "</option>");
            }
            document.getElementById("GameSelection").innerHTML = gameSelectHTML;
        }
    });
}

// Select Games
function selectGames(){
    var recentSelection = $("#GameSelection").val();

    for(var i = 0; i < recentSelection.length; i++){
        for(var j = 0; j < selectedGames.length; j++){
            if(selectedGames[j].GameName == recentSelection[i]){
                break;
            }
        }
        if(j == (selectedGames.length)){
            selectedGames.push({GameName:recentSelection[i], ServerURL:selectedServer.serverURL, ServerName:selectedServer.serverName});
        }
    }

    updateSelected();
}

// Remove Games
function removeGames(){
    var gamesToRemove = $("#SelectedGames").val();
    for(var i = 0; i < gamesToRemove.length; i++){
        for(var j = 0; j < selectedGames.length; j++){
            if(gamesToRemove[i] == selectedGames[j].GameName){
                selectedGames.splice(j, 1);
                break;
            }
        }
    }
    updateSelected();
}

// Update Selected
function updateSelected(){
    var selectedGamesHTML = "";
    for(var i = 0; i < selectedGames.length; i++){
        selectedGamesHTML += ("<option value=\"" + selectedGames[i].GameName + "\">" + selectedGames[i].GameName + "</option>");
    }
    document.getElementById("SelectedGames").innerHTML = selectedGamesHTML;
}

// Submit Selection
function submitSelection(){
    if(selectedGames.length == 0) return;
    drawScores();
    setInterval(function(){ drawScores(); }, 30000);
}

// Draw Scores
function drawScores(){
    $.ajax({
        type : "POST",
        url : "./PHP/scores.php",
        data :
        {
            games : selectedGames
        },
        success: function(data){
            document.body.style.background = "#ffffff";
            var gameData = JSON.parse(data);
            var gameNames = Object.keys(gameData);
            var html = "";

            html += "<div style=\"height:100%;\" class=\"container-fluid\">";
            html += "<div style=\"height:100%;\" class=\"row\">";
            html += "<div style=\"height:100%;\" class=\"col-xs-5\">";
            html += "<div style=\"height:24%; width:100%;\" id=\"table\"></div>";
            html += "<div style=\"height:75%;\" id=\"averageChart\"></div>";
            html += "</div>";
            html += "<div style=\"height:100%;\" class=\"col-xs-7\">";
            html += "<div style=\"height:99%;\" id=\"costChart\"></div>";
            html += "</div>";
            html += "</div>";
            html += "</div>";

            document.body.innerHTML = html;

            google.charts.load('current', {'packages':['line', 'bar', 'table']});
            google.charts.setOnLoadCallback(drawTable);
            google.charts.setOnLoadCallback(drawLineChart);
            google.charts.setOnLoadCallback(drawBarChart);

            function drawTable(){
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Team Name');
                data.addColumn('number', 'Avg Cost');
                data.addColumn('number', 'Ttl Cost');
                data.addColumn('number', 'Weeks');

                for(var i = 0; i < gameNames.length; i++){
                    if(((gameData[gameNames[i]].currentWeek)-1) == 0){
                      data.addRow([gameNames[i], 0, 0, 0]);
                    } else {
                      data.addRow([gameNames[i],
                                   (Math.round((gameData[gameNames[i]].costList[gameData[gameNames[i]].currentWeek - 1]) / (gameData[gameNames[i]].currentWeek - 1))),
                                   gameData[gameNames[i]].costList[gameData[gameNames[i]].currentWeek - 1],
                                   (gameData[gameNames[i]].currentWeek - 1)]);
                    }
                }

                var table = new google.visualization.Table(document.getElementById('table'));
                table.draw(data, {showRowNumber: true, sortColumn: 1, sortAscending: true, width: '100%', height: '100%'});
            }

            function drawLineChart(){
                var data = new google.visualization.DataTable();
                data.addColumn('number', 'Week');
                for(var i = 0; i < gameNames.length; i++){
                    data.addColumn('number', gameNames[i]);
                }

                var rows = [];
                var longestGame = 0;
                for(var i = 0; i < gameNames.length; i++){
                    if(gameData[gameNames[i]] == null){
                        continue;
                    }
                    var weekCount = gameData[gameNames[i]].currentWeek;
                    if(weekCount > longestGame){
                        longestGame = weekCount;
                    }
                }

                for(var i = 0; i < longestGame; i++){
                    var row = [i];
                    for(var j = 0; j < gameNames.length; j++){
                        if(gameData[gameNames[j]] == null){
                            row.push(0);
                        } else {
                            if(gameData[gameNames[j]].currentWeek - 1 >= i){
                                row.push(gameData[gameNames[j]].costList[i]);
                            } else {
                                row.push(NaN);
                            }
                        }
                    }
                    rows.push(row);
                }

                data.addRows(rows);
                var options = {
                    chart: {
                        title: 'Cost per week',
                    }
                };
                var chart = new google.charts.Line(document.getElementById('costChart'));
                chart.draw(data, google.charts.Line.convertOptions(options));
            }

            function drawBarChart(){
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Team');
                data.addColumn('number', 'Average Cost');
                var rows = [];
                for(var i = 0; i < gameNames.length; i++){
                    if(gameData[gameNames[i]] == null || (gameData[gameNames[i]]["currentWeek"] - 1) == 0){
                        rows.push([gameNames[i], 0]);
                    } else {
                        rows.push([gameNames[i], Math.round((gameData[gameNames[i]]["costList"][gameData[gameNames[i]]["costList"].length - 1]) / (gameData[gameNames[i]]["currentWeek"] - 1))]);
                    }
                }
                data.addRows(rows);
                var options = {
                    chart: {
                        title: 'Average Costs'
                    },
                    legend: {
                        position: 'none'
                    },
                    bars: 'horizontal',
                };
                var chart = new google.charts.Bar(document.getElementById('averageChart'));
                chart.draw(data, google.charts.Bar.convertOptions(options));
            }
        }
    });
}

// Check for tab click
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr("href") // activated tab
  alert(target);
});
