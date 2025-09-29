# 📌 Rättningsrapport – fed24d-case-af-jobtech-team-13

## 🎯 Uppgiftens Krav:
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/6VsM7MHT)
# Skapa en egen Platsbanken för ert drömscenario 

Dokumentation om Arbetsförmedlingens öppna data finns på https://jobtechdev.se. All öppna data från arbetsförmedlingen och andra offentliga organisationen går även att hitta direkt på dataportal.se. 
I detta dokument ges två förslag på användningsfall som vi tror är lämpliga för studenter som vill utveckla en applikation på riktig data. All data som är öppna data får vem som helst använda utan att fråga myndigheten om lov, så ingen är begränsad till de exempel vi ger.

Läs först igenom kom-igång hjälpen 

-  [Övergripande dokumentation API:etJobSearch](https://jobtechdev.se/sv/components/jobsearch)
-  [Kom-igång guide](https://gitlab.com/arbetsformedlingen/education/education-api/-/blob/main/GETTING_STARTED.md)

## Prova att utforska datan med vår interaktiva tjänst 

Görs genom att öppna Swagger-sidan för API:et (för att enkelt testa olika endpoints i API:et och läsa dokumentation för respektive endpoint): Search job ads (jobtechdev.se) 

## Uppgift 

Använd endpoint https://jobsearch.api.jobtechdev.se/ för att använda/söka bland befintliga annonser. 
Det går även bra att använda historiska annonser om ni vill jämföra aktuella annonser med hur det har sett ut tidigare. Detta api finns här: Historical job ads (jobtechdev.se)

Om möjligt, använd en grafisk presentation av era resultat genom t.ex. stapeldiagram eller linjegrafer.

**Observera**
Er slutprodukt ska ej innehålla Arbetsförmedlingens logga eller färger. Anpassa gärna efter eget tycke och smak så att ni har en färgpalett och en god tanke bakom. 

## Betygskriterier 

### Need-to-have (G) 
- Ni har hämtat data på ett strukturerat sätt med hjälp av antingen fetch eller axios. 
- Ni har skapat en tjänst som ni använder för att hämta data. 
- Ni använder react-koncept vi har pratat om för att göra datan tillgänglig (context, state, routing et.c.). 
- Ni använder den syntax, namngivningsstandard samt skrivsätt som vi har lärt er.  
- Ni använder designsystemet för presentation. 

### Nice-to-have (Extra bonus) 
- Styled components (som drar nytta av designsystemet) 
- Grafisk presentation av datat 
- Användning av custom hook där det finns möjlighet

## 🔍 ESLint-varningar:
- C:\Work\AssignmentCorrector\backend\repos\fed24d-case-af-jobtech-team-13\src\api\jobService.ts - no-console - Unexpected console statement.,no-console - Unexpected console statement.
- C:\Work\AssignmentCorrector\backend\repos\fed24d-case-af-jobtech-team-13\src\loaders\jobLoader.ts - no-console - Unexpected console statement.
- C:\Work\AssignmentCorrector\backend\repos\fed24d-case-af-jobtech-team-13\src\reducers\jobReducer.ts - no-unused-vars - 'SEARCH_START' is defined but never used.,no-unused-vars - 'SEARCH_START_PAGINATION' is defined but never used.,no-unused-vars - 'SEARCH_SUCCESS' is defined but never used.,no-unused-vars - 'SEARCH_ERROR' is defined but never used.,no-unused-vars - 'SET_SEARCH_QUERY' is defined but never used.,no-unused-vars - 'SET_PAGE' is defined but never used.,no-unused-vars - 'SET_MUNICIPALITIES' is defined but never used.,no-unused-vars - 'SET_OCCUPATION_GROUPS' is defined but never used.,no-unused-vars - 'RESET_ERROR' is defined but never used.

## 🏆 **Betyg: G**
📌 **Motivering:** Uppgiften uppfyller samtliga G‑krav: data hämtas strukturerat via en tjänst (JobService med axios), React‑koncept används korrekt (context + reducer, state, routing med loaders), koden är typad med TS och väl namngiven, och presentationen bygger på Arbetsförmedlingens designsystem – med egen färgpalett och egna logotyper (ingen AF‑brandning). Funktionaliteten är genomarbetad med sökning, filter (kommun/yrkesgrupper), paginering, och en detaljerad annonsvy.

💡 **Förbättringsförslag:**  
- Förbättra stateflödet i reducer/actions: ni serialiserar data till JSON‑strängar i payload (SEARCH_SUCCESS, SET_MUNICIPALITIES, SET_OCCUPATION_GROUPS) och parsar i reducern. Skapa istället typade actions med rätt datatyper för bättre typesäkerhet och mindre overhead.
- Undvik DOM‑manipulation och setTimeout‑hack för att synka checkboxar i DigiFormFilter. Försök låta komponenterna vara kontrollerade via props/händelser (eller kapsla dem i en adapterkomponent). Om libben saknar stöd – skriv en liten hook/adapter som centralt hanterar värden i stället för querySelector + tidsfördröjningar.
- Hantera pågående förfrågningar: använd AbortController eller axios cancel tokens vid snabba om-sökningar/paginering för att undvika race conditions och state som skrivs över av långsamma svar.
- sanitize HTML innan dangerouslySetInnerHTML i JobDetails (t.ex. med DOMPurify) för att minimera XSS‑risk, även om källan är betrodd.
- Rätta småsaker i typerna (t.ex. stavfel nummber_of_vacancies → number_of_vacancies) och onödiga props (t.ex. af-hide-icon på React‑wrappern) så att TS och komponent-API:n lirar fullt ut.
- HTTP‑status i loader: returnera 404 i jobDetailsLoader vid saknad annons i stället för 400.
- Städa bort död kod: den stora testObject‑dumpen bör flyttas till mock/tests eller tas bort för att inte belasta repo/bundle.
- Bonus att sikta på (VG‑nivå): lägg till en grafisk presentation (t.ex. stapeldiagram över antal annonser per kommun/yrkesgrupp) och/eller extrahera återkommande logik till en custom hook (t.ex. useJobSearch) som kapslar sök/paginering/URL‑synk.

## 👥 Gruppbidrag

| Deltagare | Antal commits | Commit % | Uppgiftskomplettering | Totalt bidrag |
| --------- | -------------- | -------- | ---------------------- | ------------- |
| Jonatan Hellberg | 32 | 43.8% | 0.33 | 0.38 |
| Egil Eskilsson | 29 | 39.7% | 0.33 | 0.36 |
| LDMI-24 | 12 | 16.4% | 0.33 | 0.27 |


### 📊 Förklaring
- **Antal commits**: Antalet commits som personen har gjort
- **Commit %**: Procentuell andel av totala commits
- **Uppgiftskomplettering**: Poäng baserad på mappning av README-krav mot kodbidrag 
- **Totalt bidrag**: Viktad bedömning av personens totala bidrag (40% commits, 60% uppgiftskomplettering)
