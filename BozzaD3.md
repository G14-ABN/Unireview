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

# contatta
Come vediamo dal diagramma dei componenti e dal diagramma di contesto, sono previsti in varie occasioni dei metodi volti al contattare gli altri utenti. Si utilizza quindi la classe Contatta. Questa classe si appoggia su API apposite per l'invio di email La classe poi si specializza poi per permettere notifiche specifiche alle varie occasioni. Si specializza quindi in Ban, per il ban di utenti da moderatori, ContattaModeratore, per permettere agli utenti di contattare moderatori, e Promuovi, rivolta ai moderatori per promuovere utenti standard.
|Contatta {abstract}|
|-|
+moderatori
+mittente: String
+messaggio: Sting
+contatta()|

# IS-A
|ContattaModeratore|Ban|Promuovi|
|------------------|---|--------|
|+moderatori: UtneteModeratore[]|-utenteBannato: String|+utente: String|
|-|-setBan(): int|-promuovi()|


# mostra recensioni
Come vediamo anche dal diagrama dei componenti, per mostrare le recensioni trovate in seguito alla ricerca si usa una classe apposita che si appoggia sulla classe Ricerca e Statistica per modstrare tutti gli elementi mostrati dai RF 4 e 5.
|MostraRecensioni|
|-|
+ricerche: GestioneRicerca
+statistica: Statstiche|

# ban utente
Come si nota anche dal diagramma di contesto ai moderatori è data la possibilià di assegnare un tempo di ban agli uteni. Per permettere ciò si utilizza una classe apposita. La classe si appoggia anche su un sistema di API per l'invio di email per poter inviare una notifica all'utente in questione.
|Ban|
|-|
+utente: String
+messaggio: String
+assegnaBan(): int|





# **DIAGRAMMA DELLE CLASSI**
https://lucid.app/lucidchart/42c1deca-d56f-439f-8382-4aca6617a275/edit?viewport_loc=-457%2C171%2C1997%2C923%2CHWEp-vi-RSFO&invitationId=inv_385988dc-e047-474e-9a14-0d6d221b8f1d
