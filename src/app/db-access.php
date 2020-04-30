<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Verbindungsaufbau und Auswahl der Datenbank
$dbconn = pg_connect("host=ec2-54-195-247-108.eu-west-1.compute.amazonaws.com dbname=dbouih7qphiunh user=fodxnyyjvemdgi password=13b28f11105b263808b74e8b507856aae0dc0a5789b10f5c613b299fd1a4398b")
    or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

// Eine SQL-Abfrage ausführen
$query = 'SELECT * FROM benutzer';
$result = pg_query($query) or die('Abfrage fehlgeschlagen: ' . pg_last_error());

// Ergebnisse in HTML ausgeben
echo "<table>\n";
while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
    echo "\t<tr>\n";
    foreach ($line as $col_value) {
        echo "\t\t<td>$col_value</td>\n";
    }
    echo "\t</tr>\n";
}
echo "</table>\n";

// Speicher freigeben
pg_free_result($result);

// Verbindung schließen
pg_close($dbconn);
?>
