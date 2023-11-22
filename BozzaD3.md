# *UTENTI*
Sulla base del diagramma di contesto di contesto del D2 vediamo che gli attori principali sono gli utenti (anonimi, standard e moderatori).
Poichè condividono tra loro molte funzionalità, l'utente anonimo può essere visto come una generalizzazione dell'utente standard, generalizzazione dell'utente moderatore.
Con le specificazioni delle classi si aggiungono funzionalità in linea con i requisiti funzionali. L'utente standard possiede anche un metodo per poter conntattare i moderatori.
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
-contattaModeratore():
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

# ricerca
Osservando ora il diagramma dei componenti possiamo definire una classe **GestioneRicerca** per gestire le funzionalità relative alla gestione della ricerca delle recensioni come 
descritto anche dal RF 4. La classe può essere utilizzata sia per effettuare una ricerca che per applicare poi le impostaziooni di filtro e ordinamento.
|GestioneRicerca|
|-|
|+ricerche: Recensioni[]
+ordina():
+ricerca(): Recensioni[]|

# statistiche
Le statistiche vengono fornite da una classe a parte come descritto anche dal RF5. La classe Statistiche si appoggia sulla classe GestioneRicerca per ottenere le recensioni si cui basare le statstiche. 
|Statistiche|
|-|
+recensioni: Recensioni[]
+getStats():|

# gestione interfaccia
Come si osserva dal diagramma dei componenti, possiamo introdurre una classe che si occupa della modificha della lingua e tema dell'interfaccia.
|ModificaInterfaccia|
|-|
-lingua: boolean
-tema: boolean
+setTheme():
+setLanguage():|

# autenticazione
Per permettere l'accesso agli autenti anonimi, come da RF 1, si usa la classe autorizzazione. Questa si appoggia ad API di istituto per permettere l'autenticazione. Questa classe non memorizza nome utenti e password.
|Autenticazione|
|-|
-username: String
-password: String
+autenticato: bool
+autentica(): bool|

# modulo contatta moderatore
Per poter permettere agli utenti di contattare i moderatori, gli utenti si appoggiano su una classe apposita. La classe a sua volta utilizza API apposite per poter inviare la mail necessaria, come specificato da RF 2 el dal diagramma dei componenti. 
|ContattaModeratore|
|-|
+moderatori: String[]
+mittente: String
+messaggio: Sting
+contatta(): |
