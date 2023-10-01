# UNIREVIEW
## Obiettivi del progetto

Lo scopo del progetto è di sviluppare una web app che consenta agli studenti dell’ateneo di scrivere delle recensioni per ogni esame, in modo che i successivi studenti possano consultarle facendosi un’idea di quale professore o di quale esame opzionale sia meglio scegliere.

La web app deve dare la possibilità agli utenti di:
	- cercare gli esami da un archivio secondo dipartimento, nome del corso, anno di studi, nome dell’esame e nome del professore.
	- una volta autenticati, gli utenti hanno la possibilità di recensire gli esami tentati con o senza anonimato fornendo prima un’autocertificazione dell’esito. Oltre a questo gli utenti possono fornire dati come il tasso di frequenza, il gradimento della materia e del professore così come il numero di tentativi.
	- esaminare le informazioni fornite dagli altri utenti: recensioni e statistiche calcolate sui dati quantitativi.

# **Requisiti funzionali**

RF1 **Requisiti di accesso**
	La web app permette l’accesso a due tipologie di utenti:
		-Utenti anonimi:
			non necessitano di effettuare il login
		-Utenti autenticati:
			tale livello si raggiunge in seguito al login con credenziali universitarie, suddivisi in:
				-Utente standard
				-Utente moderatore
	
RF2. **Requisiti a livello di accesso**
RF2.1 *Utenti anonimi*
	Questo tipo di accesso non richiede login e permette solo la visualizzazione e ricerca degli esami con relative recensioni e statistiche, senza alcuna possibilità di modifica. Hanno comunque la possibilità di fare login per autenticarsi.
RF2.2 *Utenti autenticati*
	Questo livello di autenticazione si raggiunge solo dopo aver effettuato il login con account istituzionale (e.g. nome.cognome@unitn.it). 
	RF2.2.1 *Utenti standard* 
		Oltre a tutte le possibilità degli utenti anonimi, hanno la possibilità di inserire recensioni (anonime o meno) previa autocertificazione della percentuale di frequenza al corso ed eventualmente dell’esito dell’esame. 
		Può anche visualizzare in una sezione dedicata della webapp tutte le recensioni da lui pubblicate con possibilità di modificarle o eliminarle.
	RF2.2.2 *Utenti moderatori*
		Oltre a tutte le possibilità degli utenti standard, hanno la possibilità di cancellare recensioni create da altri utenti o limitare le possibilità di azione nella webapp. A loro viene anche data la possibilità di promuovere utenti standard a moderatori, così come degradare altri moderatori a utenti standard.

RF3 **Requisiti delle recensioni**
	L’applicazione permette di compilare una scheda di valutazione in quinti suddivisa in quattro?tre parametri. Inoltre è richiesto di specificare l’esito dell’esame (eventuale voto conseguito con relativo numero di tentativi), tasso di frequenza, ed è infine possibile completare la valutazione con una breve recensione scritta.
	Infine a ogni recensione viene affidata una coppia di date, una relativa alla sua creazione e un’altra relativa all’ultima modifica.
	Sarà a discrezione dello studente decidere se pubblicare la valutazione in forma anonima.

RF4 **Requisiti di ricerca**
	La ricerca viene effettuata su diversi livelli:
	RF4.1 *Ricerca dell’esame*
		L’applicazione deve permettere la ricerca di un esame da un archivio. La ricerca può essere condotta selezionando innanzitutto il nome dell'esame e in seguito filtrando i risultati secondo i criteri di: corso di laurea, anno di corso, nome dell’esame, professore. Una volta completata la selezione vengono mostrate delle schede riassuntive delle recensioni e dei relativi dati.
	RF4.2 *Riordinamento*
		Una volta effettuata la ricerca dell’esame vengono mostrate le opzioni di riordinamento dei dati visualizzati, selezionabili opzionalmente secondo i criteri di: data di conseguimento dell’esame (di default vengono mostrati dal più al meno recente), esito dell’esame, voto dato, numero del tentativo.
		Possono essere applicati anche dei filtri sui dati visualizzati, tra cui:lasso temporale entro il quale l’esame è stato conseguito, voto generale dato e tentativo, tasso di frequenza.

RF5 **Requisiti delle statistiche**
	Una effettuata una ricerca è possibile visualizzare le statistiche relative alle metriche quantitative delle recensioni trovate.



# **Requisiti non funzionali**

RNF1 Modalità d’accesso
	-L’applicazione non deve permettere l’autenticazione nel caso di inserimento di credenziali errate.
	-L’applicazione deve limitare i poteri di ogni utente secondo il proprio livello di autenticazione.
	-Il processo di autenticazione deve avvenire tramite l’utilizzo delle API di ateneo

RNF2 **Prestazioni**
	-L’applicazione deve permettere una ricerca nell’archivio esami con un tempo di risposta ridotto.

RNF3 **Privacy e sicurezza**
	-Una volta effettuata l’autenticazione l’utente deve accettare una normativa che definisce come vengono gestiti i dati inseriti dall’utente.
	-L’utente deve anche sottoscrivere le linee guida della community (sulle quali poi si baseranno gli utenti moderatori)
	-L’applicazione non deve permettere di accedere alla visualizzazione dei dati privati di altri utenti se non quelli la cui visualizzazione è stata concordata.

RNF4 **Lingua di sistema**
	L’applicazione permette la visualizzazione in due lingue: l’italiano (default) e l’inglese. Il cambio di lingua può essere effettuato manualmente o automaticamente secondo impostazioni di sistema.

RNF5 **Compatibilità**
	L’applicazione deve offrire le stesse prestazioni e modalità uso indipendentemente dalla piattaforma di accesso (PC, mobile, dispositivi cinesi, smart fridge, smart TiVu, tesla model ics…)

RNF6 **Scalabilità**
	L’applicazione deve permettere di aggiungere nuovi esami e nuovi professori in correlazione con le nuove possibilità offerte dall’università.
	Non deve imporre limiti rispetto al numero di utenti se non quelli previsti dalle politiche di iscrizione di ateneo.

RNF7 **Moderazione del sito**
	L’applicazione deve permettere una moderazione a discrezione dei moderatori di sistema nel rispetto delle linee guida della community. Questi hanno la possibilità di rimuoevre recensioni ritenute non conformi alle linee guida e limitare l'attività di atri utenti attraverso un "ban" temporaneo. Qualsiasi loro azione verrà automaticamente comunicata agli utenti interessati tramite email. La loro area personale avrà anche una sezione dedicata a tutti gli utenti segnati come "bannati".

RNF8 **Modalità di valutazione dell’esame**
	-I tre campi di valutazione saranno relativi a:
		-professore
		- materiale fornito di supporto
		- interesse verso la materia di studio
	-Non sono previsti limiti riguardo alla lunghezza della recensione scritta.
	-Sono previsti ulteriori campi obbligatori come:
		-frequenza del corso:
			-Non frequentante 
			-Sotto il 50% 
			-Sopra il 50%
		-tentativo dell’esame (se inserito il voto)
		-fattibilità dell'esame
	-Sono previsti anche campi non obbligatori quali
		-voto conseguito
		-recensione scritta
	-La valutazione conterrà una descrizione contenente la media delle tre valutazioni in quinti fornite

RNF9 **Modalità di modifica**
	Ogni utente avrà la possibilità di modificare ogni sua recensione selezionandola. La modifica permette di:
		-modificare, aggiungere o rimuovere l'esito di un esame con relativo numero di tentativo
		-modificare i valori delle valutazioni in quinti fornite
		-modificare le impostazioni di anonimato
		-rimuovere la valutazione

RNF10 **Dark mode**
	L'applicazionne permette di modificare le tonalità della GUI in altre più scure per facilitare la visualizzazione al buio.
	La "dark mode" può essere attivata manualmente da un'area dedicata della web app, o automaticamente secondo impostazioni di sistema.


# **Design back-end**

**API e database**
	L'applicazione utilizza dall'esterno API e database per:
		-API di ateneo per l'autenticazione degli uetenti
		-API per l'iserimento delle dati nei campi di ricerca
		-database di ateneo contenenti nomi di esami, professori, etc...

