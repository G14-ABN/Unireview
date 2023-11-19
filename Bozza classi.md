# *UTENTI*
Sulla base del diagramma di contesto di contesto del D2 vediamo che gli attori principali sono gli utenti (anonimi, standard e moderatori).
Poichè condividono tra loro molte funzionalità, l'utente anonimo può essere visto come una generalizzazione dell'utente standard, generalizzazione dell'utente moderatore.
Con le specificazioni delle classi si aggiungono funzionalità in linea con i requisiti funzionali.
|UtenteModeratore|
|-|
|-rinuncia():
-primuovi(Utente):
-ban(Utente)|

IS-A ->

|UtenteStansard|
|-|
|+nome_utente: String
-ban_time:int = 0
+recensioni_scritte: Recensione[]|
-crea() : Recensione
-modifica(Recensione):
-elimina(Recensione):
-logout():|

IS-A ->

|UtenteAnonimo|
|-|
||
|+ricerca(): Rcensione[] 
+login():|

# *RECENSIONI*
# struttura
Come dall'analisi del contesto, gli attori principali devono gestire i dati delle recensioni. 
Attraverso il RF 3 possiamo visualizzare una recensione come una classe che funge da contenitore per i suoi campi specifici.
|Recensione|
|-|
|+Autore: String
+professore: String
+corso: String
+data: int
+valutzione_professore: int 
+valutazione_fattibile: int 
+valutazione_materiale: int
+testo: String = NULL
+voto: Integer = NULL
+frequenza: enum|
