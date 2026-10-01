// Full-length archive entries for selected countries.
// ISO codes are ISO 3166-1 alpha-3, matching the rest of the atlas dataset.

export interface ArchiveSection { heading: string; body: string }
export interface ArchiveFacts {
  capital?: string;
  region?: string;
  area_km2?: number;
  population?: string;
  founded?: string;
  government?: string;
  languages?: string;
  currency?: string;
  motto?: string;
}
export interface ArchiveEntry {
  iso: string;
  name: string;
  endonym?: string;
  tagline: string;
  facts: ArchiveFacts;
  sections: ArchiveSection[];
}

const E = (e: ArchiveEntry): [string, ArchiveEntry] => [e.iso, e];

export const ARCHIVE: Record<string, ArchiveEntry> = Object.fromEntries([
  // ─────────────── north america ───────────────
  E({
    iso: "USA", name: "united states", endonym: "United States of America",
    tagline: "a continental federation of fifty states, restless and self-revising",
    facts: { capital: "washington, d.c.", region: "north america", area_km2: 9833520, population: "~335 million", founded: "1776 (declaration) · 1788 (constitution)", government: "federal presidential constitutional republic", languages: "english (de facto) · spanish widely spoken", currency: "us dollar (USD)" },
    sections: [
      { heading: "overview", body: "the united states stretches from the atlantic to the pacific and from the gulf of mexico into the arctic via alaska, with hawaii anchoring an outer pacific reach. it is a federation of fifty states plus a federal district, five inhabited territories and several uninhabited insular areas. demographically and economically it remains one of the most consequential polities on earth, while internally it is a quiet collage of regional cultures with little in common except a shared founding document." },
      { heading: "history", body: "indigenous nations governed the continent for millennia before european colonisation in the sixteenth and seventeenth centuries. the thirteen british colonies declared independence in 1776 and ratified the present constitution in 1788. the nineteenth century was defined by westward expansion, the displacement of native peoples, the civil war over slavery (1861–1865) and rapid industrialisation. the twentieth century brought two world wars, the cold war, the civil-rights movement and the construction of a global financial and military presence that still shapes the international order." },
      { heading: "government and law", body: "the united states operates a presidential system with a strict separation between executive, legislative and judicial branches. federalism reserves significant powers to the states, producing fifty parallel legal systems layered beneath federal law. the legal tradition is common law (inherited from england), with louisiana retaining civil-law influences and tribal nations exercising their own jurisdiction within reservations. the supreme court, through judicial review, holds an unusually large interpretive role." },
      { heading: "culture and identity", body: "american identity is plural by construction: a country of immigration whose regional cultures — new england, the south, appalachia, the midwest, the southwest, the pacific northwest — differ sharply in cadence, cuisine, faith and politics. english is the working language; spanish is the second language of daily life across large swathes of the country. religion remains more present than in most peer democracies, with protestant traditions historically dominant alongside growing catholic, jewish, muslim, hindu, buddhist and unaffiliated communities." },
      { heading: "geography", body: "the country contains nearly every climate type: temperate rainforest, prairie, desert, alpine, subtropical, tundra and humid continental. major physiographic features include the appalachian and rocky mountain systems, the great plains, the mississippi basin, the great lakes and the long pacific coast. alaska adds boreal forest, glaciers and an arctic shore; hawaii adds tropical volcanic islands; the territories add the caribbean and the western pacific." },
      { heading: "notes", body: "the united states is one of the few countries where the same legal document — the constitution — has remained continuously in force since the eighteenth century. it is also one of the few where the question of what the country is for is still actively contested in every generation." },
    ],
  }),

  E({
    iso: "CAN", name: "canada", endonym: "Canada · Canada",
    tagline: "a bilingual northern federation built on three founding traditions",
    facts: { capital: "ottawa", region: "north america", area_km2: 9984670, population: "~40 million", founded: "1867 (confederation) · 1982 (constitution act)", government: "federal parliamentary constitutional monarchy", languages: "english and french (official, federal)", currency: "canadian dollar (CAD)" },
    sections: [
      { heading: "overview", body: "canada is the second-largest country on earth by area and one of the most sparsely populated, with the great majority of its population strung along the southern border. it is a federation of ten provinces and three territories, formally a constitutional monarchy under the canadian crown, and one of the few officially bilingual states at the federal level." },
      { heading: "history", body: "indigenous peoples — first nations, inuit and métis — have inhabited the land for thousands of years. french and british colonisation in the seventeenth and eighteenth centuries laid down the dual european inheritance. the confederation of 1867 federated four british north american colonies; the country expanded westward and arctic-ward over the following decades. the constitution act of 1982 patriated the constitution from the united kingdom and added the canadian charter of rights and freedoms." },
      { heading: "government and law", body: "canada follows the westminster parliamentary tradition with a prime minister, a house of commons and an appointed senate. quebec uses a civil-law system (rooted in the napoleonic tradition) for private law; the other provinces follow common law. indigenous self-government is recognised in varied forms across the country. the supreme court of canada interprets the charter and arbitrates federal-provincial disputes." },
      { heading: "culture and identity", body: "english and french coexist nationally, with french as the working language of quebec and a significant presence in new brunswick and parts of ontario and manitoba. multiculturalism is constitutionally protected and reflected in long-standing chinese, south asian, caribbean, filipino, eastern european, italian, ukrainian, lebanese and somali communities, among others. winter is a national vocabulary." },
      { heading: "geography", body: "canada encompasses arctic tundra, the canadian shield, the boreal forest, the prairies, the cordillera of the west and the maritime provinces of the east. it borders three oceans — the atlantic, pacific and arctic — and shares the world's longest international border with the united states." },
      { heading: "notes", body: "canada is a useful study in how a country can be plural at its core rather than as an afterthought. the question of who 'canada' is for has been answered, repeatedly and in different ways, by quebec, by indigenous nations and by the long succession of arriving communities." },
    ],
  }),

  E({
    iso: "MEX", name: "mexico", endonym: "México · Estados Unidos Mexicanos",
    tagline: "a federal republic of thirty-two states bridging north and central america",
    facts: { capital: "mexico city", region: "north america", area_km2: 1964375, population: "~129 million", founded: "1810 (independence movement) · 1821 (independence)", government: "federal presidential constitutional republic", languages: "spanish (de facto) · 68 recognised indigenous languages", currency: "mexican peso (MXN)" },
    sections: [
      { heading: "overview", body: "mexico is the spanish-speaking world's most populous country, a federation of thirty-one states and the federal district of mexico city. it sits at the cultural and geographic hinge between north and central america, with deep indigenous foundations and a long postcolonial trajectory." },
      { heading: "history", body: "the territory hosted some of the world's most sophisticated pre-columbian civilisations — olmec, teotihuacan, maya, zapotec, mixtec and aztec. spanish conquest in 1521 produced three centuries of colonial rule under new spain. independence (1810–1821), the reform era under benito juárez, the revolution (1910–1920) and seven decades of single-party government under the pri shaped the modern republic. democratic alternation since 2000 has brought repeated changes of governing party." },
      { heading: "government and law", body: "mexico operates a presidential system with a strong federal executive and a bicameral congress. its legal system is civil law, derived from spanish and napoleonic codes. amparo — a constitutional remedy with deep roots in mexican jurisprudence — is one of the country's distinctive contributions to comparative law." },
      { heading: "culture and identity", body: "mexican identity is mestizo by self-description, layered over a vast indigenous substrate that remains living, not historical. sixty-eight indigenous languages are recognised by the state, with náhuatl, maya, mixtec, zapotec and tzotzil among the most spoken. catholic festivals, regional cuisines and the day of the dead are export-grade cultural markers, but daily life is shaped as much by family, regional pride and a long literary and muralist tradition." },
      { heading: "geography", body: "the country runs from the sonoran desert and the chihuahuan plateau in the north to tropical lowlands and cloud forests in the south. two cordilleras — the sierra madre oriental and occidental — frame the central altiplano on which mexico city sits at 2,240 metres. it has long coasts on both the pacific and the gulf of mexico, plus the caribbean shore of the yucatán." },
      { heading: "notes", body: "mexico is the only country in north america whose foundational civilisations are not european in origin — a fact the constitution, the public art and the school curriculum all reflect." },
    ],
  }),

  // ─────────────── eu / eea / switzerland / russia ───────────────
  E({
    iso: "AUT", name: "austria", endonym: "Österreich",
    tagline: "an alpine federal republic at the old centre of central europe",
    facts: { capital: "vienna", region: "central europe", area_km2: 83879, population: "~9.1 million", founded: "1918 (first republic) · 1955 (second republic, sovereignty restored)", government: "federal parliamentary republic", languages: "german (austrian standard)", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "austria is a landlocked alpine country of nine federal states, descended from the habsburg empire that for centuries governed much of central and southeastern europe. since 1955 it has been a constitutionally neutral republic and a member of the european union since 1995." },
      { heading: "history", body: "the austrian lands coalesced under the habsburgs from the late middle ages, forming the holy roman emperor's home territory and later the austrian and austro-hungarian empires. the collapse of the empire in 1918 produced a small german-speaking republic, annexed by nazi germany in 1938 and re-established in 1945 under four-power occupation. neutrality, written into the constitution in 1955, ended the occupation and defined austria's cold-war posture." },
      { heading: "government and law", body: "the federal president is largely ceremonial; executive power is exercised by a chancellor accountable to the national council. austria uses civil law in the germanic tradition, with the constitutional court (verfassungsgerichtshof) holding strong review powers. neutrality remains a constitutional principle, though its practical scope has narrowed under eu obligations." },
      { heading: "culture and identity", body: "vienna sits at the centre of a musical, intellectual and pastry-shop tradition that includes mozart, beethoven, schubert, mahler, schoenberg, freud, wittgenstein and klimt. regional identity remains strong — tyrol, carinthia, styria and vorarlberg each retain distinct dialects, cuisines and political tempers. catholicism is the historic majority religion, with a long-standing protestant minority and growing muslim, orthodox and unaffiliated communities." },
      { heading: "geography", body: "two-thirds of austria sit in the eastern alps; the danube cuts across the north on its way to budapest and the black sea. lake constance ties it to germany and switzerland; the pannonian basin opens it eastward toward hungary." },
      { heading: "notes", body: "austria is often read as the cultural memory of an empire larger than itself — its institutions, language and food still circulate well beyond its current borders." },
    ],
  }),

  E({
    iso: "BEL", name: "belgium", endonym: "België · Belgique · Belgien",
    tagline: "a federal monarchy of two main language communities and a european capital",
    facts: { capital: "brussels", region: "western europe", area_km2: 30528, population: "~11.7 million", founded: "1830 (independence)", government: "federal parliamentary constitutional monarchy", languages: "dutch · french · german (all official)", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "belgium is a small but institutionally complex country of three regions (flanders, wallonia, brussels-capital) and three language communities (dutch, french, german). brussels hosts the principal institutions of the european union and nato's political headquarters." },
      { heading: "history", body: "the territory passed through burgundian, spanish, austrian and french rule before independence from the netherlands in 1830. industrial early-mover status, a brutal colonial period in the congo, two world-war occupations and post-war european integration shape modern belgian memory." },
      { heading: "government and law", body: "belgium is a federal constitutional monarchy with overlapping regions and communities, a bicameral parliament and a notably elaborate consociational system designed to balance dutch- and french-speaking interests. civil law in the napoleonic tradition." },
      { heading: "culture and identity", body: "flanders speaks dutch (often called flemish); wallonia speaks french; a small german-speaking community lives along the eastern border. cultural life crosses these lines unevenly — comics, beer, chocolate, surrealism, baroque painting, contemporary fashion and food are all part of the national repertoire." },
      { heading: "geography", body: "low countries terrain — coastal polders, the flemish plain, the meuse and scheldt rivers and the wooded ardennes in the south." },
      { heading: "notes", body: "belgium's institutional design is one of the most studied federal arrangements in the world, often used as a counterexample to the assumption that nation-states need a single linguistic centre." },
    ],
  }),

  E({ iso: "BGR", name: "bulgaria", endonym: "България", tagline: "an orthodox balkan republic at the lower danube",
    facts: { capital: "sofia", region: "southeast europe / balkans", area_km2: 110879, population: "~6.4 million", founded: "681 (first bulgarian empire) · 1908 (modern independence)", government: "parliamentary republic", languages: "bulgarian", currency: "bulgarian lev (BGN)" },
    sections: [
      { heading: "overview", body: "bulgaria stretches from the danube in the north to the rhodope mountains and the aegean basin in the south, with a black-sea coast in the east. it has been a member of the european union since 2007 and of nato since 2004." },
      { heading: "history", body: "the first bulgarian empire (founded 681) and the second bulgarian empire shaped medieval southeastern europe; five centuries of ottoman rule were ended by the russo-turkish war of 1877–78. the twentieth century brought monarchy, two world wars on the losing side, four decades of communist rule and a sometimes turbulent post-1989 transition." },
      { heading: "government and law", body: "parliamentary republic with a unicameral national assembly and a largely ceremonial president. civil-law tradition with strong byzantine and soviet-era legal inheritances." },
      { heading: "culture and identity", body: "bulgarian is a south-slavic language written in cyrillic (invented in medieval bulgaria). orthodox christianity is the majority faith; a significant turkish and muslim minority lives in the south and northeast. choral music, thracian archaeology, rose-oil agriculture and yogurt are emblematic exports." },
      { heading: "geography", body: "the balkan mountains run east-west across the centre; the danubian plain spreads to the north and the upper-thracian plain to the south. the black-sea coast runs roughly 350 km." },
      { heading: "notes", body: "bulgaria is one of the few european states with continuous use of the same name since the seventh century." },
    ],
  }),

  E({ iso: "HRV", name: "croatia", endonym: "Hrvatska", tagline: "an adriatic republic of central-european and mediterranean halves",
    facts: { capital: "zagreb", region: "southeast europe", area_km2: 56594, population: "~3.9 million", founded: "925 (medieval kingdom) · 1991 (independence)", government: "parliamentary republic", languages: "croatian", currency: "euro (EUR, since 2023)" },
    sections: [
      { heading: "overview", body: "croatia has a long, fragmented adriatic coast and a continental interior centred on zagreb. it has been a member of the eu since 2013, of nato since 2009 and of the eurozone and schengen area since 2023." },
      { heading: "history", body: "the medieval kingdom of croatia entered personal union with hungary in 1102 and later passed into habsburg administration. the south slavic state of yugoslavia (1918–1991) was succeeded by an independent croatia following a war of independence (1991–1995)." },
      { heading: "government and law", body: "semi-presidential by constitutional design but parliamentary in practice. civil-law tradition with strong austro-hungarian legal inheritance." },
      { heading: "culture and identity", body: "croatian is south slavic, written in latin script. catholicism is the majority faith. dalmatian, istrian and slavonian regional cultures differ sharply, with culinary and dialectal lines that predate the modern state." },
      { heading: "geography", body: "the dinaric alps separate a narrow mediterranean coast — with over a thousand islands — from a pannonian interior of plains and rivers." },
      { heading: "notes", body: "croatia's coastline is one of the most indented in europe; the country is sometimes described as 'the country with a thousand islands' and roughly that many are accurate." },
    ],
  }),

  E({ iso: "CYP", name: "cyprus", endonym: "Κύπρος · Kıbrıs", tagline: "a divided eastern-mediterranean island republic",
    facts: { capital: "nicosia", region: "eastern mediterranean", area_km2: 9251, population: "~1.3 million (government-controlled area)", founded: "1960 (independence)", government: "presidential republic", languages: "greek · turkish (both official)", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "cyprus is the third-largest mediterranean island and an eu member state since 2004. since 1974 the northern third has been administered by the turkish republic of northern cyprus, recognised only by turkey." },
      { heading: "history", body: "successively ruled by mycenaeans, phoenicians, persians, ptolemies, romans, byzantines, lusignans, venetians, ottomans and britain. independent since 1960. the 1974 turkish military intervention, following a greek-junta-backed coup, produced the ongoing partition." },
      { heading: "government and law", body: "presidential system; the constitution provides for greek- and turkish-cypriot communities, though the turkish-cypriot seats remain vacant. mixed civil-law/common-law system, reflecting both continental european and british colonial inheritances." },
      { heading: "culture and identity", body: "greek cypriots are predominantly orthodox christian; turkish cypriots are predominantly sunni muslim, though both communities are heavily secular by regional standards." },
      { heading: "geography", body: "two mountain ranges — the troodos in the centre and the kyrenia along the north coast — enclose the central mesaoria plain. coastline of roughly 650 km." },
      { heading: "notes", body: "the un-administered buffer zone running across the island, including through nicosia, is one of the longest-running peacekeeping deployments in the world." },
    ],
  }),

  E({ iso: "CZE", name: "czechia", endonym: "Česko · Česká republika", tagline: "a central-european republic of bohemia, moravia and silesia",
    facts: { capital: "prague", region: "central europe", area_km2: 78867, population: "~10.9 million", founded: "1918 (czechoslovakia) · 1993 (czech republic)", government: "parliamentary republic", languages: "czech", currency: "czech koruna (CZK)" },
    sections: [
      { heading: "overview", body: "czechia is a landlocked central european republic, an eu member since 2004 and a nato member since 1999, composed historically of the bohemian, moravian and czech-silesian lands." },
      { heading: "history", body: "the medieval kingdom of bohemia was a major holy-roman-empire polity. centuries of habsburg rule were ended by the formation of czechoslovakia in 1918. nazi occupation, communist rule from 1948, the prague spring of 1968 and the velvet revolution of 1989 led to the peaceful 'velvet divorce' from slovakia in 1993." },
      { heading: "government and law", body: "parliamentary republic with a largely ceremonial directly-elected president. civil-law tradition; austro-hungarian legal heritage still visible." },
      { heading: "culture and identity", body: "czechs are among europe's most secular populations. literary, musical and cinematic traditions (dvořák, smetana, kafka, kundera, hrabal, forman) are disproportionate to the country's size. beer consumption per capita is the highest in the world." },
      { heading: "geography", body: "a basin of low mountains and forested hills, drained by the elbe, vltava and morava rivers." },
      { heading: "notes", body: "the country adopted the short-form name 'czechia' in 2016; both 'czechia' and 'the czech republic' remain in use." },
    ],
  }),

  E({ iso: "DNK", name: "denmark", endonym: "Danmark", tagline: "a nordic constitutional monarchy of one peninsula and many islands",
    facts: { capital: "copenhagen", region: "northern europe / scandinavia", area_km2: 42933, population: "~5.9 million", founded: "10th century (as a unified kingdom)", government: "parliamentary constitutional monarchy", languages: "danish", currency: "danish krone (DKK)" },
    sections: [
      { heading: "overview", body: "denmark is one of the oldest monarchies in europe, comprising the jutland peninsula and an archipelago of more than 400 islands. the realm of denmark also includes the self-governing nations of greenland and the faroe islands." },
      { heading: "history", body: "tenth-century unification under harald bluetooth, the kalmar union (1397–1523) with norway and sweden, centuries of regional power in the baltic and the loss of norway in 1814 and of schleswig in 1864 narrowed the country to its present shape." },
      { heading: "government and law", body: "constitutional monarchy with a unicameral folketing. civil-law tradition; strong scandinavian-legal-realism influence. the danish 'realm' extends home-rule arrangements to greenland and the faroes." },
      { heading: "culture and identity", body: "danish is a north germanic language closely related to norwegian and swedish. the lutheran church of denmark remains the state church. design, cinema, literature (andersen, kierkegaard) and a long maritime and brewing tradition are central to public culture." },
      { heading: "geography", body: "low-lying, with no point above 173 m. the country is everywhere within 50 km of the sea." },
      { heading: "notes", body: "denmark is in the eu but not in the eurozone, retaining the krone under a long-standing opt-out." },
    ],
  }),

  E({ iso: "EST", name: "estonia", endonym: "Eesti", tagline: "a digital-state baltic republic with a finno-ugric language",
    facts: { capital: "tallinn", region: "baltic / northern europe", area_km2: 45227, population: "~1.4 million", founded: "1918 (independence) · 1991 (restored independence)", government: "parliamentary republic", languages: "estonian", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "estonia is the smallest and northernmost of the three baltic states, an eu and nato member since 2004 and eurozone member since 2011. it has built one of the world's most extensive e-government systems." },
      { heading: "history", body: "danish, teutonic, swedish and russian rule preceded a brief first independence (1918–1940), soviet annexation, and the restoration of independence in 1991 via the 'singing revolution'." },
      { heading: "government and law", body: "parliamentary republic with the riigikogu as legislature. germanic civil-law tradition. residency, voting, banking and most state services are accessible online via the cross-government x-road infrastructure." },
      { heading: "culture and identity", body: "estonian is a finno-ugric language related to finnish, not to its baltic or slavic neighbours. lutheranism is the historic majority faith but practice is low; a sizeable russian-speaking minority lives in the northeast." },
      { heading: "geography", body: "low, forested and lake-strewn, with more than 2,000 islands in the baltic." },
      { heading: "notes", body: "estonia issues an 'e-residency' identity that lets non-residents incorporate and operate eu businesses online." },
    ],
  }),

  E({ iso: "FIN", name: "finland", endonym: "Suomi", tagline: "a bilingual nordic republic of forests and lakes",
    facts: { capital: "helsinki", region: "northern europe / nordics", area_km2: 338424, population: "~5.6 million", founded: "1917 (independence)", government: "parliamentary republic", languages: "finnish · swedish (both official)", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "finland is a sparsely populated nordic state, an eu member since 1995, a eurozone member from the start, and a nato member since 2023. it shares a 1,340-km border with russia." },
      { heading: "history", body: "swedish rule for over six centuries, then russian grand duchy status from 1809 until independence in 1917. the winter war (1939–40) and continuation war (1941–44) preserved independence at the cost of territory. cold-war 'finlandisation' kept the country formally neutral until 2023." },
      { heading: "government and law", body: "parliamentary republic with the eduskunta as legislature and a directly-elected president retaining foreign-policy influence. germanic civil-law tradition with nordic-legal-realism flavour." },
      { heading: "culture and identity", body: "finnish is finno-ugric; swedish is co-official and a first language for ~5% of the population, concentrated on the western coast and the åland islands. lutheranism is the historic majority faith. saunas, design, education and a strong literary tradition (kalevala, väinö linna) anchor public life." },
      { heading: "geography", body: "roughly 70% forest and 10% water; over 188,000 lakes; long winters and white summer nights." },
      { heading: "notes", body: "the åland islands enjoy extensive autonomy and are demilitarised under nineteenth-century international agreements still in force." },
    ],
  }),

  E({ iso: "FRA", name: "france", endonym: "France · République française", tagline: "a centralised european republic with a global archipelago of overseas territories",
    facts: { capital: "paris", region: "western europe", area_km2: 643801, population: "~68 million", founded: "843 (treaty of verdun, west francia) · 1792 (first republic)", government: "semi-presidential republic", languages: "french", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "france is a founding eu member, a permanent un security council member and a nuclear-armed republic with territories on every inhabited continent. metropolitan france is a hexagonal landmass on the european mainland; the overseas departments and collectivities extend the republic into the caribbean, the indian ocean, the south pacific and south america." },
      { heading: "history", body: "francia under the merovingians and carolingians; medieval consolidation under the capetians, valois and bourbons; revolution in 1789 and five successive republics interrupted by two empires and the vichy regime. the fifth republic, founded in 1958 under de gaulle, remains in force." },
      { heading: "government and law", body: "the fifth republic combines a directly-elected president (strong) with a prime minister accountable to the national assembly. civil-law system codified under napoleon, exported widely. laïcité — strict state secularism — is constitutionally entrenched." },
      { heading: "culture and identity", body: "french is the working language. catholicism is the historic majority faith but practice is low; islam is the second religion. regional languages — breton, basque, occitan, corsican, alsatian — survive unevenly. cuisine, fashion, philosophy, cinema and literature are all instruments of soft power." },
      { heading: "geography", body: "mountains on three sides (alps, pyrenees, jura), atlantic and mediterranean coasts, and the central massif inland. overseas territories include guadeloupe, martinique, french guiana, réunion, mayotte, new caledonia, french polynesia and more." },
      { heading: "notes", body: "france is one of the few states whose constitution explicitly defines the republic as 'indivisible, secular, democratic and social'." },
    ],
  }),

  E({ iso: "DEU", name: "germany", endonym: "Deutschland", tagline: "a federal european republic with sixteen states and a strong constitutional court",
    facts: { capital: "berlin", region: "central europe", area_km2: 357596, population: "~84 million", founded: "1871 (unification) · 1949 (federal republic) · 1990 (reunification)", government: "federal parliamentary republic", languages: "german", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "germany is the most populous member of the european union and its largest economy. it is a federation of sixteen states (länder), each with significant cultural and constitutional autonomy." },
      { heading: "history", body: "long history of fragmentation under the holy roman empire, unification under prussia in 1871, weimar republic, third reich and post-1945 division between west and east germany. reunification in 1990 produced the present federation; the country has been an engine of european integration." },
      { heading: "government and law", body: "the basic law (grundgesetz) governs a parliamentary system with a chancellor, bundestag and bundesrat, plus an unusually powerful federal constitutional court at karlsruhe. germanic civil-law tradition, with strong dogmatic legal scholarship." },
      { heading: "culture and identity", body: "german is the working language; turkish, kurdish, polish, russian, arabic and english are common second languages. roughly half the population is unaffiliated; protestant and catholic traditions are historically balanced. regional identities — bavarian, swabian, saxon, rhinelander, hanseatic — remain vivid." },
      { heading: "geography", body: "north german plain, central uplands, alpine foothills in the south, and a coast on both the north and baltic seas." },
      { heading: "notes", body: "the federal constitutional court is one of the most-cited apex courts in the world and a deliberate institutional response to the failures of weimar." },
    ],
  }),

  E({ iso: "GRC", name: "greece", endonym: "Ελλάδα · Ελληνική Δημοκρατία", tagline: "an aegean republic with thousands of islands and a deep classical inheritance",
    facts: { capital: "athens", region: "southeast europe / balkans", area_km2: 131957, population: "~10.4 million", founded: "1830 (independence)", government: "parliamentary republic", languages: "greek", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "greece is a peninsular and island state at the southern tip of the balkans, with more than 6,000 islands and islets (around 230 inhabited). eu member since 1981, eurozone since 2001." },
      { heading: "history", body: "classical greek city-states, hellenistic empires, roman and byzantine rule, four centuries of ottoman administration and a war of independence (1821–1829) that produced the modern state. twentieth-century occupation, civil war, a military junta (1967–1974) and post-junta democratisation shape recent memory." },
      { heading: "government and law", body: "parliamentary republic with a ceremonial president. civil-law system with significant byzantine and roman-law inheritance." },
      { heading: "culture and identity", body: "greek is the working language. the greek orthodox church is the historic and constitutionally recognised majority faith. cuisine, music, archaeology, philosophy and the long literary tradition are central to public identity." },
      { heading: "geography", body: "80% mountainous; the aegean and ionian seas; a long coastline of around 13,700 km — one of the longest in europe." },
      { heading: "notes", body: "the official name of the state was the subject of a long dispute with north macedonia; the 2018 prespa agreement settled the question diplomatically." },
    ],
  }),

  E({ iso: "HUN", name: "hungary", endonym: "Magyarország", tagline: "a central-european republic with a non-indo-european language",
    facts: { capital: "budapest", region: "central europe", area_km2: 93030, population: "~9.6 million", founded: "1000 (kingdom of hungary) · 1989 (third republic)", government: "parliamentary republic", languages: "hungarian", currency: "hungarian forint (HUF)" },
    sections: [
      { heading: "overview", body: "hungary is a landlocked carpathian-basin republic, eu member since 2004 and nato member since 1999. the magyar language sets it apart linguistically from all its neighbours." },
      { heading: "history", body: "the magyar tribes settled the carpathian basin in the late ninth century; the kingdom of hungary was christianised under stephen i around 1000. centuries of ottoman partition, habsburg rule, the dual monarchy with austria, the loss of two-thirds of the kingdom at trianon in 1920, communist rule from 1949, the 1956 revolution and the post-1989 transition shape modern hungarian memory." },
      { heading: "government and law", body: "parliamentary republic with a unicameral national assembly. germanic civil-law tradition; a fundamental law adopted in 2011 reshaped much of the post-1989 constitutional order." },
      { heading: "culture and identity", body: "hungarian (magyar) is a finno-ugric language related to finnish and estonian, unrelated to its neighbours. catholic and calvinist traditions; a long literary, mathematical and musical tradition (bartók, kodály, liszt, márai, kertész)." },
      { heading: "geography", body: "great hungarian plain in the east, transdanubian hills and the bakony in the west, the danube and tisza rivers crossing the country." },
      { heading: "notes", body: "ethnic-hungarian minorities in romania, slovakia, serbia and ukraine remain politically and culturally significant for budapest's domestic politics." },
    ],
  }),

  E({ iso: "IRL", name: "ireland", endonym: "Éire · Ireland", tagline: "a north-atlantic republic with a bilingual constitutional identity",
    facts: { capital: "dublin", region: "western europe / british isles", area_km2: 70273, population: "~5.2 million", founded: "1922 (irish free state) · 1949 (republic)", government: "parliamentary republic", languages: "irish · english (both official)", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "ireland occupies five-sixths of the island of ireland (the rest being northern ireland, part of the united kingdom). it has been a member of the eu since 1973 and a eurozone member from the start." },
      { heading: "history", body: "gaelic-irish kingdoms, norse coastal settlement, anglo-norman invasion, plantation, the great famine of the 1840s, the 1916 rising, the war of independence and the partition of the island in 1921 produced the modern state. the 1998 good friday agreement settled the political status of northern ireland." },
      { heading: "government and law", body: "parliamentary republic with a directly-elected president (largely ceremonial) and a bicameral oireachtas. common-law system inherited from england, with strong constitutional review." },
      { heading: "culture and identity", body: "english is the working language; irish (gaeilge) is the first official language and is taught in schools, with native-speaking gaeltacht regions on the western coast. catholicism is the historic majority faith but practice has fallen sharply since the 1990s. a literary tradition disproportionate to population (yeats, joyce, beckett, heaney, friel)." },
      { heading: "geography", body: "a central plain ringed by coastal mountains; a long, indented atlantic coast; mild and rainy temperate climate." },
      { heading: "notes", body: "ireland is the only common-law country in the eu other than malta and (in part) cyprus." },
    ],
  }),

  E({ iso: "ITA", name: "italy", endonym: "Italia · Repubblica Italiana", tagline: "a mediterranean republic of twenty regions and three thousand years of municipal life",
    facts: { capital: "rome", region: "southern europe", area_km2: 301340, population: "~59 million", founded: "1861 (kingdom) · 1946 (republic)", government: "parliamentary republic", languages: "italian", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "italy is a peninsular and island state in the central mediterranean. founding eu member; founding eurozone member. twenty regions — five of them with special autonomy statutes — preserve unusually strong local identities." },
      { heading: "history", body: "etruscan, magna graecia, roman republic and empire, medieval city-states, the renaissance, three centuries of foreign rule and reunification (risorgimento) in 1861. monarchy, fascism, the republic of 1946 and post-war reconstruction shape modern memory." },
      { heading: "government and law", body: "parliamentary republic with a president as guarantor and a bicameral parliament. civil-law system descended from roman law via the napoleonic code." },
      { heading: "culture and identity", body: "italian is the working language; sicilian, sardinian, friulian, neapolitan, venetian, ladin and many others survive as regional languages. catholicism is the historic majority faith; the vatican city sits inside rome. cuisine, art, architecture, opera, fashion and design are central to public identity." },
      { heading: "geography", body: "the alps in the north, the apennines along the spine, the po valley plain, the mediterranean coast, and the two largest islands — sicily and sardinia." },
      { heading: "notes", body: "italy is sometimes described as a country of cities — the institutional and culinary boundary between bologna, florence, milan, naples and palermo remains as legible as any modern map line." },
    ],
  }),

  E({ iso: "LVA", name: "latvia", endonym: "Latvija", tagline: "a baltic republic with a riga at its centre",
    facts: { capital: "riga", region: "baltic / northern europe", area_km2: 64589, population: "~1.85 million", founded: "1918 · 1991 (restored)", government: "parliamentary republic", languages: "latvian", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "latvia is the central of the three baltic states, eu and nato member since 2004 and eurozone member since 2014." },
      { heading: "history", body: "ruled by the teutonic order, poland, sweden and russia before the first independence (1918–1940). soviet annexation and restored independence in 1991 via the singing revolution." },
      { heading: "government and law", body: "parliamentary republic with the saeima as legislature and a parliament-elected president. germanic civil-law tradition." },
      { heading: "culture and identity", body: "latvian is a baltic language related to lithuanian and remotely to sanskrit. lutheran, catholic and orthodox communities; a sizeable russian-speaking minority concentrated in riga and latgale." },
      { heading: "geography", body: "low, forested, lake-strewn, with a 500-km baltic coast and the daugava river crossing the country." },
      { heading: "notes", body: "the latvian song and dance celebration (every five years in riga) is inscribed on unesco's intangible cultural heritage list." },
    ],
  }),

  E({ iso: "LTU", name: "lithuania", endonym: "Lietuva", tagline: "a baltic republic descended from a medieval grand duchy",
    facts: { capital: "vilnius", region: "baltic / northern europe", area_km2: 65300, population: "~2.9 million", founded: "1253 (kingdom) · 1918 / 1990 (modern independence)", government: "semi-presidential republic", languages: "lithuanian", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "lithuania is the southernmost of the three baltic states, eu and nato member since 2004 and eurozone member since 2015." },
      { heading: "history", body: "the grand duchy of lithuania, in personal union with poland, was at one point the largest state in europe. partitioned in the late eighteenth century, briefly independent between the wars, occupied by the soviet union and then nazi germany, and restored to independence in 1990 — the first soviet republic to declare it." },
      { heading: "government and law", body: "semi-presidential by design; civil-law tradition." },
      { heading: "culture and identity", body: "lithuanian is, with latvian, one of the two surviving baltic languages — both unusually archaic among indo-european languages. catholicism is the historic majority faith." },
      { heading: "geography", body: "low-lying, with extensive forest and the curonian spit on the baltic coast." },
      { heading: "notes", body: "the city of vilnius preserves one of europe's largest baroque old towns, a unesco world heritage site." },
    ],
  }),

  E({ iso: "LUX", name: "luxembourg", endonym: "Lëtzebuerg · Luxembourg · Luxemburg", tagline: "a trilingual grand duchy and european institutional capital",
    facts: { capital: "luxembourg city", region: "western europe", area_km2: 2586, population: "~660,000", founded: "1839 (independence)", government: "parliamentary constitutional monarchy (grand duchy)", languages: "luxembourgish · french · german (all official)", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "luxembourg is europe's only remaining grand duchy and a founding member of the eu. it hosts the court of justice of the european union, the european investment bank and other eu institutions." },
      { heading: "history", body: "from a tenth-century county to a fortress-city contested by burgundy, spain, austria and france; full sovereignty in 1839; german occupation in both world wars; a founding member of benelux and the european communities." },
      { heading: "government and law", body: "parliamentary monarchy under the grand duke. civil-law tradition; french and german legal influence side by side." },
      { heading: "culture and identity", body: "luxembourgish is the national language and a moselle-franconian variety of german; french is the language of legislation; german dominates the press. catholic majority. roughly half the resident population are foreign nationals." },
      { heading: "geography", body: "the ardennes in the north, the gutland in the south, the mosel and sûre rivers." },
      { heading: "notes", body: "by area luxembourg is one of europe's smallest sovereign states; by gdp per capita it is consistently one of the highest in the world." },
    ],
  }),

  E({ iso: "MLT", name: "malta", endonym: "Malta · Repubblika ta' Malta", tagline: "a central-mediterranean island republic with a semitic-romance language",
    facts: { capital: "valletta", region: "southern europe / mediterranean", area_km2: 316, population: "~540,000", founded: "1964 (independence) · 1974 (republic)", government: "parliamentary republic", languages: "maltese · english (both official)", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "malta is an archipelago south of sicily, the smallest eu member state and a eurozone member since 2008." },
      { heading: "history", body: "successively phoenician, roman, arab, norman, sicilian, hospitaller (knights of st john), french and british. independent in 1964; republic in 1974." },
      { heading: "government and law", body: "parliamentary republic with a unicameral parliament. mixed legal system with continental civil-law and english common-law influences." },
      { heading: "culture and identity", body: "maltese is a semitic language descended from siculo-arabic, written in the latin alphabet — the only such language in the eu. english is co-official. catholicism is the constitutionally recognised majority faith." },
      { heading: "geography", body: "three inhabited islands — malta, gozo and comino — with no rivers and very limited fresh water." },
      { heading: "notes", body: "valletta, planned by the knights of st john in the sixteenth century, is one of the most concentrated historic urban areas in the world." },
    ],
  }),

  E({ iso: "NLD", name: "netherlands", endonym: "Nederland", tagline: "a low-country constitutional monarchy with a trans-atlantic kingdom",
    facts: { capital: "amsterdam (seat of government: the hague)", region: "western europe", area_km2: 41850, population: "~17.9 million", founded: "1581 (act of abjuration) · 1815 (kingdom)", government: "parliamentary constitutional monarchy", languages: "dutch · west frisian (regional)", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "the netherlands is the european core of the kingdom of the netherlands, which also includes aruba, curaçao and sint maarten as constituent countries in the caribbean. founding eu and eurozone member." },
      { heading: "history", body: "the dutch republic of the seventeenth century was a global maritime and financial power. the kingdom dates from 1815; the southern provinces broke away as belgium in 1830. germany occupied the country in world war ii; post-war recovery and european integration followed." },
      { heading: "government and law", body: "parliamentary monarchy with a bicameral states-general. civil-law system in the napoleonic tradition; the hague hosts the international court of justice and the international criminal court." },
      { heading: "culture and identity", body: "dutch is the working language; english is near-universally spoken; west frisian is co-official in friesland. historically calvinist and catholic, today majority non-religious. cycling infrastructure, water management, painting, design and a strong civic-liberal tradition are part of the national repertoire." },
      { heading: "geography", body: "a quarter of the country lies below sea level; the rhine, meuse and scheldt deltas dominate the south and west; the wadden sea and frisian islands lie to the north." },
      { heading: "notes", body: "the netherlands was the first country in the world to legalise same-sex marriage (2001)." },
    ],
  }),

  E({ iso: "POL", name: "poland", endonym: "Polska", tagline: "a central-european republic between the baltic and the carpathians",
    facts: { capital: "warsaw", region: "central europe", area_km2: 312696, population: "~38 million", founded: "966 (christianisation) · 1918 (second republic) · 1989 (third republic)", government: "parliamentary republic", languages: "polish", currency: "polish zloty (PLN)" },
    sections: [
      { heading: "overview", body: "poland is the largest central european country by population, an eu member since 2004 and a nato member since 1999. it is not (yet) in the eurozone." },
      { heading: "history", body: "the polish-lithuanian commonwealth of the sixteenth and seventeenth centuries was one of europe's largest states. three partitions removed it from the map between 1795 and 1918. the second republic, nazi and soviet occupation, communist rule and the solidarność-led transition of 1989 frame modern memory." },
      { heading: "government and law", body: "parliamentary republic with a bicameral parliament and a directly-elected president. civil-law tradition with strong napoleonic and germanic influences." },
      { heading: "culture and identity", body: "polish is the working language. catholicism is the historic majority faith and culturally central. literary, musical (chopin, penderecki) and cinematic traditions (kieślowski, wajda) are disproportionate to population." },
      { heading: "geography", body: "the baltic coast in the north, the great lowland in the centre, and the sudetes and carpathians in the south. the vistula and oder rivers cross the country." },
      { heading: "notes", body: "the city of warsaw was almost completely destroyed in 1944 and reconstructed largely from prewar plans — a deliberate act of urban memory." },
    ],
  }),

  E({ iso: "PRT", name: "portugal", endonym: "Portugal · República Portuguesa", tagline: "an atlantic republic with a long maritime trajectory",
    facts: { capital: "lisbon", region: "southern europe / iberia", area_km2: 92212, population: "~10.5 million", founded: "1143 (kingdom) · 1910 (republic)", government: "semi-presidential republic", languages: "portuguese · mirandese (co-official, regional)", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "portugal occupies the western edge of the iberian peninsula along with the atlantic archipelagos of the azores and madeira. eu member since 1986; eurozone member from the start." },
      { heading: "history", body: "independent kingdom since 1143; pioneer of european oceanic exploration in the fifteenth and sixteenth centuries; a colonial empire that lasted into the 1970s. the carnation revolution of 1974 ended four decades of authoritarian rule and decolonised the remaining overseas territories." },
      { heading: "government and law", body: "semi-presidential republic with a directly-elected president and a unicameral assembly. civil-law tradition with napoleonic and germanic influences." },
      { heading: "culture and identity", body: "portuguese is the working language and one of the most-spoken languages in the world (250+ million speakers globally). catholic majority. fado, azulejo tiles, port wine and a strong literary tradition (camões, pessoa, saramago)." },
      { heading: "geography", body: "a long atlantic coast, an interior of hills and plateaus, the tagus and douro rivers, and the volcanic mid-atlantic archipelagos." },
      { heading: "notes", body: "portugal is one of the oldest continuously existing nation-states in europe; the present borders are essentially unchanged since 1297." },
    ],
  }),

  E({ iso: "ROU", name: "romania", endonym: "România", tagline: "a romance-speaking republic at the lower danube and the carpathians",
    facts: { capital: "bucharest", region: "southeast europe / balkans", area_km2: 238397, population: "~19 million", founded: "1859 (unification) · 1989 (post-communist republic)", government: "semi-presidential republic", languages: "romanian", currency: "romanian leu (RON)" },
    sections: [
      { heading: "overview", body: "romania is the most populous balkan eu member, eu since 2007 and nato since 2004. it is the only romance-speaking country in its region." },
      { heading: "history", body: "the principalities of moldavia and wallachia united in 1859; transylvania joined in 1918. monarchy, two world wars, four decades of communist rule under ceaușescu and the 1989 revolution shape modern memory." },
      { heading: "government and law", body: "semi-presidential republic with a bicameral parliament. civil-law tradition with napoleonic and germanic influences." },
      { heading: "culture and identity", body: "romanian is a romance language with significant slavic vocabulary. orthodox christianity is the historic majority faith; hungarian, german, romani and other minorities live in transylvania and the banat." },
      { heading: "geography", body: "the carpathian arc cuts the country in two; the transylvanian plateau lies inside the arc; the danube forms much of the southern border before reaching the black sea via its delta." },
      { heading: "notes", body: "the danube delta is the second-largest river delta in europe and a unesco world heritage site." },
    ],
  }),

  E({ iso: "SVK", name: "slovakia", endonym: "Slovensko", tagline: "a central-european republic of the western carpathians",
    facts: { capital: "bratislava", region: "central europe", area_km2: 49035, population: "~5.4 million", founded: "1993 (split from czechoslovakia)", government: "parliamentary republic", languages: "slovak", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "slovakia is a landlocked central european country, eu and nato member since 2004 and eurozone member since 2009." },
      { heading: "history", body: "part of the kingdom of hungary for nearly a millennium, then of czechoslovakia (1918–1993). the velvet divorce produced the independent slovak republic." },
      { heading: "government and law", body: "parliamentary republic with a directly-elected president. civil-law tradition with austro-hungarian inheritance." },
      { heading: "culture and identity", body: "slovak is closely related to czech; the two languages remain mutually intelligible. catholic majority; small but historically significant hungarian and romani minorities." },
      { heading: "geography", body: "the tatra mountains in the north, the danubian lowlands in the south, and the danube forming part of the border with hungary." },
      { heading: "notes", body: "bratislava is the only national capital that borders two other sovereign states (austria and hungary)." },
    ],
  }),

  E({ iso: "SVN", name: "slovenia", endonym: "Slovenija", tagline: "an alpine-adriatic republic at the meeting of four european regions",
    facts: { capital: "ljubljana", region: "central / southern europe", area_km2: 20273, population: "~2.1 million", founded: "1991 (independence)", government: "parliamentary republic", languages: "slovene", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "slovenia is a small republic at the junction of the alps, the dinaric mountains, the pannonian plain and the adriatic. eu and nato member since 2004; eurozone since 2007." },
      { heading: "history", body: "centuries of habsburg rule; part of yugoslavia from 1918; declared independence in 1991 after a brief ten-day war." },
      { heading: "government and law", body: "parliamentary republic; civil-law tradition with strong austrian-german inheritance." },
      { heading: "culture and identity", body: "slovene is a south slavic language with dual grammatical number — a rare feature in modern indo-european languages. catholic majority; small italian and hungarian minorities are constitutionally recognised." },
      { heading: "geography", body: "the julian alps in the north, the karst plateau in the southwest (which gave the english word 'karst' to geology), and a short adriatic coast." },
      { heading: "notes", body: "slovenia is one of the most forested countries in europe — about 60% of its area is woodland." },
    ],
  }),

  E({ iso: "ESP", name: "spain", endonym: "España · Reino de España", tagline: "an iberian constitutional monarchy of seventeen autonomous communities",
    facts: { capital: "madrid", region: "southern europe / iberia", area_km2: 505990, population: "~48 million", founded: "1469 (dynastic union) · 1978 (current constitution)", government: "parliamentary constitutional monarchy", languages: "spanish (castilian) · catalan · galician · basque · valencian · aranese (co-official regionally)", currency: "euro (EUR)" },
    sections: [
      { heading: "overview", body: "spain is the second-largest country by area in the european union and one of its largest economies. seventeen autonomous communities and two autonomous cities (ceuta and melilla in north africa) hold significant devolved powers." },
      { heading: "history", body: "iberian, roman, visigothic and al-andalus periods preceded the reconquista and the dynastic union of castile and aragon in 1469. a global maritime empire from the sixteenth century onward; loss of most overseas possessions in the nineteenth century. the civil war (1936–39), franco's dictatorship (1939–75) and the post-1975 democratic transition shape modern memory." },
      { heading: "government and law", body: "parliamentary monarchy with a bicameral cortes generales. civil-law system with strong roman-law roots." },
      { heading: "culture and identity", body: "spanish (castilian) is the national language; catalan, galician, basque, valencian and aranese are co-official in their regions. catholicism is the historic majority faith. football, gastronomy, flamenco and a long literary tradition (cervantes, lorca) are central to public life." },
      { heading: "geography", body: "the meseta central, the pyrenees and the cantabrian mountains in the north, the sierra nevada in the south, and long mediterranean and atlantic coasts. the balearic islands, the canary islands and the north african cities complete the territory." },
      { heading: "notes", body: "the catalan independence question remains one of the live constitutional questions of contemporary western europe." },
    ],
  }),

  E({ iso: "SWE", name: "sweden", endonym: "Sverige", tagline: "a nordic constitutional monarchy stretching from the baltic to the arctic",
    facts: { capital: "stockholm", region: "northern europe / nordics", area_km2: 450295, population: "~10.6 million", founded: "10th century (as a unified kingdom)", government: "parliamentary constitutional monarchy", languages: "swedish", currency: "swedish krona (SEK)" },
    sections: [
      { heading: "overview", body: "sweden is the third-largest country in the european union by area, eu member since 1995 and nato member since 2024. it has not joined the eurozone." },
      { heading: "history", body: "a regional baltic power in the seventeenth century; the loss of finland to russia in 1809 and of norway from union in 1905 narrowed the country to its present borders. neutrality from 1814 until eu accession; non-alignment until the 2022 nato application." },
      { heading: "government and law", body: "parliamentary monarchy with a unicameral riksdag. civil-law tradition with strong scandinavian-legal-realism flavour. the swedish 'principle of publicity' grants unusually broad public access to official documents." },
      { heading: "culture and identity", body: "swedish is a north germanic language. lutheranism is the historic majority faith; the church of sweden was disestablished in 2000. design, music exports, cinema (bergman), literature and a strong welfare-state self-image shape public identity. the sámi indigenous people inhabit the far north." },
      { heading: "geography", body: "long and narrow, with forests covering roughly two-thirds of the country, the scandinavian mountains along the norwegian border and lakes mälaren, vänern and vättern in the south." },
      { heading: "notes", body: "the nobel prizes (except the peace prize, awarded in oslo) are awarded in stockholm by swedish institutions." },
    ],
  }),

  E({ iso: "ISL", name: "iceland", endonym: "Ísland", tagline: "a north-atlantic island republic with a millennium-old parliament",
    facts: { capital: "reykjavík", region: "northern europe / nordics", area_km2: 103000, population: "~390,000", founded: "930 (alþingi established) · 1944 (republic)", government: "parliamentary republic", languages: "icelandic", currency: "icelandic króna (ISK)" },
    sections: [
      { heading: "overview", body: "iceland sits on the mid-atlantic ridge between greenland and norway. it is not an eu member but is part of the european economic area and the schengen area." },
      { heading: "history", body: "settled by norse and gaelic colonists from the late ninth century; the alþingi, founded in 930, is one of the oldest still-functioning parliaments in the world. union with norway in 1262 and with denmark in 1380; full independence in 1944." },
      { heading: "government and law", body: "parliamentary republic with a directly-elected president (largely ceremonial). civil-law tradition with strong scandinavian-legal-realism influence." },
      { heading: "culture and identity", body: "icelandic is a north germanic language that has changed remarkably little since the middle ages — modern icelanders can read the sagas in the original. lutheran majority. a literary and musical tradition disproportionate to population." },
      { heading: "geography", body: "volcanic and glacial, with the largest non-polar ice cap in europe (vatnajökull), active volcanism, geothermal energy and almost no forest cover." },
      { heading: "notes", body: "iceland has no standing army; defence is provided through nato and a bilateral agreement with the united states." },
    ],
  }),

  E({ iso: "NOR", name: "norway", endonym: "Norge · Noreg", tagline: "a fjord-laced constitutional monarchy outside the european union",
    facts: { capital: "oslo", region: "northern europe / nordics", area_km2: 385207, population: "~5.5 million", founded: "9th century unification · 1905 (full independence)", government: "parliamentary constitutional monarchy", languages: "norwegian (bokmål and nynorsk) · sámi (regional)", currency: "norwegian krone (NOK)" },
    sections: [
      { heading: "overview", body: "norway is a long, narrow country along the western edge of the scandinavian peninsula, plus the arctic archipelago of svalbard. it is a member of nato, the eea and schengen, but not of the eu (after two failed referenda)." },
      { heading: "history", body: "viking-age expansion; long unions with denmark and then sweden; full independence in 1905. german occupation (1940–45), post-war reconstruction and the discovery of north-sea oil in 1969 transformed the country into one of the wealthiest in the world per capita." },
      { heading: "government and law", body: "parliamentary monarchy with a unicameral storting. civil-law system in the scandinavian tradition. the sovereign wealth fund is the largest of its kind in the world." },
      { heading: "culture and identity", body: "two written forms of norwegian — bokmål and nynorsk — are both official. sámi is co-official in the north. lutheranism is the historic majority faith. literary, musical (grieg) and cinematic traditions are well developed." },
      { heading: "geography", body: "deep fjords cut into the western coast; the scandinavian mountains run down the spine; svalbard reaches to within 1,000 km of the north pole." },
      { heading: "notes", body: "the svalbard treaty of 1920 places the archipelago under norwegian sovereignty but with unusual visa-free access and economic rights for citizens of all signatory states." },
    ],
  }),

  E({ iso: "LIE", name: "liechtenstein", endonym: "Liechtenstein · Fürstentum Liechtenstein", tagline: "a tiny alpine principality between switzerland and austria",
    facts: { capital: "vaduz", region: "central europe / alps", area_km2: 160, population: "~40,000", founded: "1719 (principality) · 1806 (sovereignty)", government: "constitutional monarchy with strong princely powers", languages: "german (alemannic dialects)", currency: "swiss franc (CHF)" },
    sections: [
      { heading: "overview", body: "liechtenstein is one of europe's smallest sovereign states, an eea and schengen member but not an eu member. it is in customs and monetary union with switzerland." },
      { heading: "history", body: "the principality was created in 1719 by combining two imperial fiefs; sovereignty consolidated after the dissolution of the holy roman empire in 1806." },
      { heading: "government and law", body: "constitutional monarchy in which the reigning prince retains unusually strong veto and dismissal powers; a bicameral arrangement of prince and parliament. civil-law system." },
      { heading: "culture and identity", body: "german is the official language; everyday speech is alemannic dialect. catholic majority. banking, precision manufacturing and tourism dominate the economy." },
      { heading: "geography", body: "entirely alpine; the rhine forms the western border with switzerland." },
      { heading: "notes", body: "liechtenstein is one of only two doubly landlocked countries in the world (the other is uzbekistan) — landlocked by countries that are themselves landlocked." },
    ],
  }),

  E({ iso: "CHE", name: "switzerland", endonym: "Schweiz · Suisse · Svizzera · Svizra", tagline: "a quadrilingual federation of twenty-six cantons at the heart of the alps",
    facts: { capital: "bern (de facto)", region: "central europe / alps", area_km2: 41285, population: "~8.9 million", founded: "1291 (federal charter, traditional founding date)", government: "federal directorial republic", languages: "german · french · italian · romansh (all national)", currency: "swiss franc (CHF)" },
    sections: [
      { heading: "overview", body: "switzerland is a landlocked alpine federation of twenty-six cantons, governed not by a head of state in the usual sense but by a seven-member federal council. it is a member of schengen and efta but not of the eu or the eea." },
      { heading: "history", body: "the old swiss confederacy expanded between the late middle ages and the early modern period; the modern federal state dates from 1848 and was reshaped in 1874 and 1999. armed neutrality has been observed since 1815 and has been compatible, in practice, with un membership since 2002." },
      { heading: "government and law", body: "the federal council rotates the largely-ceremonial presidency annually among its members. direct democracy plays an unusually large role — citizens vote on federal initiatives and referenda several times per year. civil-law tradition with germanic influence." },
      { heading: "culture and identity", body: "four national languages — german (~63%), french (~23%), italian (~8%) and romansh (~0.5%). catholic and protestant traditions roughly balanced historically. banking, precision manufacturing, pharma, watchmaking and tourism define the economy; the international red cross was founded in geneva, which also hosts much of the un system." },
      { heading: "geography", body: "the alps cover roughly 60% of the country; the central plateau (mittelland) holds most of the population; the jura lies in the northwest." },
      { heading: "notes", body: "swiss neutrality and direct democracy are often studied together as one of europe's most distinctive institutional packages." },
    ],
  }),

  E({ iso: "RUS", name: "russia", endonym: "Россия · Российская Федерация", tagline: "a federation spanning eleven time zones from the baltic to the pacific",
    facts: { capital: "moscow", region: "eastern europe / northern asia", area_km2: 17098246, population: "~144 million", founded: "862 (legendary) · 882 (kievan rus) · 1991 (russian federation)", government: "federal semi-presidential republic (constitutional) / highly centralised in practice", languages: "russian (federal) · dozens of co-official regional languages", currency: "russian ruble (RUB)" },
    sections: [
      { heading: "overview", body: "russia is the largest country on earth by area, spanning eastern europe, the urals, siberia and the russian far east. it is a permanent member of the un security council and a nuclear-armed state." },
      { heading: "history", body: "kievan rus, the mongol period, the rise of moscow, the tsardom and then the russian empire under the romanovs (1613–1917). the 1917 revolutions established soviet rule; the dissolution of the ussr in 1991 produced the russian federation. the post-2000 period has been defined by recentralisation under vladimir putin and the 2022 large-scale invasion of ukraine." },
      { heading: "government and law", body: "constitutionally a federation of 89 federal subjects (including territories whose status is contested under international law) with a strong directly-elected president and a bicameral federal assembly. civil-law tradition with significant soviet legal inheritance." },
      { heading: "culture and identity", body: "russian is the federal working language; many regions are bilingual with tatar, bashkir, chechen, yakut, buryat and others. russian orthodoxy is the historic and culturally dominant faith, with sizeable muslim, buddhist and jewish communities. a literary, musical and scientific tradition disproportionate to almost any standard." },
      { heading: "geography", body: "the east european plain, the urals, the west siberian plain, the central siberian plateau, the russian far east, and arctic and pacific coasts." },
      { heading: "notes", body: "russia is the only country in the world spanning eleven time zones." },
    ],
  }),

  // ─────────────── australia / new zealand ───────────────
  E({
    iso: "AUS", name: "australia", endonym: "Australia · Commonwealth of Australia",
    tagline: "a federation of six states and ten territories across a continent and an ocean",
    facts: { capital: "canberra", region: "oceania", area_km2: 7692024, population: "~27 million", founded: "1901 (federation)", government: "federal parliamentary constitutional monarchy", languages: "english (de facto)", currency: "australian dollar (AUD)" },
    sections: [
      { heading: "overview", body: "australia is a continent-sized federation of six states and ten territories, the sixth-largest country in the world by area and one of the most urbanised. it is a constitutional monarchy under the australian crown." },
      { heading: "history", body: "aboriginal and torres strait islander peoples have inhabited the continent for at least 65,000 years. british colonisation began in 1788; the colonies federated in 1901. the australia act of 1986 ended remaining british legislative authority. the question of becoming a republic has been put to referendum (1999) and remains a live political question." },
      { heading: "government and law", body: "westminster parliamentary system at federal and state level. common-law tradition inherited from england. the high court of australia is the apex court. compulsory voting and ranked-choice electoral systems are distinguishing features." },
      { heading: "culture and identity", body: "english is the working language; over 250 indigenous languages were spoken at the time of european contact, of which roughly 120 survive. christianity is the largest religious tradition; nearly 40% identify as having no religion. multicultural communities — chinese, indian, italian, greek, vietnamese, lebanese, filipino — shape the major cities." },
      { heading: "geography", body: "the dry interior (the 'outback') contrasts with a fertile southeast, tropical north and temperate southwest. the great barrier reef stretches over 2,300 km off the queensland coast." },
      { heading: "notes", body: "the uluru statement from the heart (2017) called for a 'first nations voice' in the constitution; a 2023 referendum on the proposal did not pass." },
    ],
  }),

  E({
    iso: "NZL", name: "new zealand", endonym: "New Zealand · Aotearoa",
    tagline: "a south-pacific constitutional monarchy with a constitutionally significant founding treaty",
    facts: { capital: "wellington", region: "oceania / polynesia", area_km2: 268021, population: "~5.2 million", founded: "1840 (treaty of waitangi) · 1907 (dominion status)", government: "parliamentary constitutional monarchy", languages: "english · te reo māori · new zealand sign language (all official)", currency: "new zealand dollar (NZD)" },
    sections: [
      { heading: "overview", body: "new zealand consists of two large islands and many smaller ones in the southwest pacific. it is a constitutional monarchy under the new zealand crown and a westminster parliamentary democracy." },
      { heading: "history", body: "polynesian voyagers settled the islands by around 1300, developing māori society. the treaty of waitangi (1840) between māori chiefs and the british crown remains a foundational constitutional document. responsible government, dominion status (1907) and the constitution act of 1986 marked the steady consolidation of independence." },
      { heading: "government and law", body: "unicameral parliament under a mixed-member-proportional electoral system since 1996. common-law tradition; the treaty of waitangi has acquired increasing legal weight through statute, case law and the waitangi tribunal." },
      { heading: "culture and identity", body: "english is the working language; te reo māori is co-official and undergoing significant revitalisation. christianity is the largest religious tradition; nearly half identify as having no religion. māori identity, pacific island communities and a growing asian-origin population shape the cultural mix." },
      { heading: "geography", body: "the north island is volcanic and warm; the south island is mountainous and cooler, with the southern alps and the fiordland coast. extensive marine territory." },
      { heading: "notes", body: "new zealand was the first self-governing country in the world to give all women the right to vote in parliamentary elections (1893)." },
    ],
  }),

  // ─────────────── united kingdom ───────────────
  E({
    iso: "GBR", name: "united kingdom", endonym: "United Kingdom of Great Britain and Northern Ireland",
    tagline: "a union of four constituent nations under a single crown",
    facts: { capital: "london", region: "western europe / british isles", area_km2: 243610, population: "~67 million", founded: "1707 (acts of union: great britain) · 1801 (united kingdom)", government: "parliamentary constitutional monarchy", languages: "english · welsh, scottish gaelic, irish, scots, ulster scots, cornish (varying official recognition)", currency: "pound sterling (GBP)" },
    sections: [
      { heading: "overview", body: "the united kingdom is a union of four nations — england, scotland, wales and northern ireland — under a single sovereign and parliament. it left the european union in 2020." },
      { heading: "history", body: "the kingdom of england and the kingdom of scotland merged in 1707 to form the kingdom of great britain; the union with ireland in 1801 produced the united kingdom of great britain and ireland, reduced to its present shape after irish partition in 1921. industrial revolution, the british empire (at its peak the largest in history), two world wars, post-war welfare state, eu membership (1973–2020) and ongoing devolution define the modern country." },
      { heading: "government and law", body: "westminster parliamentary system with no codified constitution. three distinct legal jurisdictions — english law (common-law), scots law (mixed civil/common-law) and northern ireland law (common-law) — coexist. devolution since 1998 has created parliaments and assemblies in scotland, wales and northern ireland with substantial domestic powers." },
      { heading: "culture and identity", body: "english is universal; welsh is co-official in wales; scottish gaelic, irish, scots, ulster scots and cornish have varying recognition. christianity is the historic majority faith (the church of england and the church of scotland are the two established churches); the country is increasingly secular and religiously plural." },
      { heading: "geography", body: "lowland england, upland wales and northern england, the highlands and islands of scotland, and the partitioned northern part of the island of ireland. extensive overseas territories from gibraltar to the falklands and the pacific." },
      { heading: "notes", body: "scottish independence was put to referendum in 2014 (rejected); the question remains live, as does the future of the northern ireland protocol arrangements." },
    ],
  }),

  // ─────────────── israel ───────────────
  E({
    iso: "ISR", name: "israel", endonym: "ישראל · מדינת ישראל · إسرائيل",
    tagline: "a parliamentary state on the eastern mediterranean, with contested final borders",
    facts: { capital: "jerusalem (proclaimed; recognition mixed) · most embassies in tel aviv", region: "middle east / levant", area_km2: 22145, population: "~9.9 million (inside green-line israel)", founded: "1948 (declaration of independence)", government: "parliamentary republic", languages: "hebrew (official) · arabic (special status)", currency: "israeli new shekel (ILS)" },
    sections: [
      { heading: "overview", body: "israel is a small mediterranean state established in 1948. its borders with several neighbours and the status of the west bank, east jerusalem and gaza remain contested under international law and at the centre of the broader israeli–palestinian conflict." },
      { heading: "history", body: "the british mandate for palestine (1920–1948) followed ottoman rule and the balfour declaration. the un partition plan of 1947, the 1948 arab–israeli war and the declaration of independence produced the state; subsequent wars (1956, 1967, 1973) and the 1993 oslo accords have shaped a still-unresolved political settlement." },
      { heading: "government and law", body: "unicameral parliament (knesset) elected by nationwide proportional representation, with a largely ceremonial president. israel has no single codified constitution; basic laws function as constitutional norms. mixed legal system: ottoman, british mandatory, jewish-religious and civil-law elements coexist. religious courts (jewish, muslim, druze, christian) retain jurisdiction over personal-status matters." },
      { heading: "culture and identity", body: "hebrew is the working language; arabic has a special legal status and is the first language of roughly one-fifth of citizens. judaism is the majority religion; significant muslim (sunni), christian, druze and bahá'í communities are present. immigrant communities from europe, the arab world, ethiopia, the former soviet union and elsewhere shape the cultural mix." },
      { heading: "geography", body: "from the mediterranean coastal plain to the central highlands, the jordan rift valley and the negev desert. the dead sea, on the eastern border, is the lowest land point on earth." },
      { heading: "notes", body: "israel is one of the few states whose final international borders, capital and constitutional document are all simultaneously unsettled." },
    ],
  }),

  // ─────────────── india ───────────────
  E({
    iso: "IND", name: "india", endonym: "भारत · India · Bhārat",
    tagline: "the world's most populous parliamentary federation",
    facts: { capital: "new delhi", region: "south asia", area_km2: 3287263, population: "~1.43 billion", founded: "1947 (independence) · 1950 (republic)", government: "federal parliamentary constitutional republic", languages: "hindi · english (working languages of the union) · 22 scheduled languages", currency: "indian rupee (INR)" },
    sections: [
      { heading: "overview", body: "india is the world's most populous country and largest democracy by electorate, a federation of twenty-eight states and eight union territories. it is a constitutional republic with a parliamentary system and an unusually long, detailed written constitution." },
      { heading: "history", body: "indus valley civilisation, vedic period, the mauryan and gupta empires, the delhi sultanate, the mughal empire, european trading companies, british crown rule from 1858, the independence and partition of 1947 and the adoption of the constitution in 1950 shape the modern country." },
      { heading: "government and law", body: "westminster-style parliamentary system at union and state levels, with a directly-elected lower house (lok sabha) and indirectly-elected upper house (rajya sabha). common-law tradition inherited from britain; personal-status law remains religion-based for hindus, muslims, christians, parsis and others, alongside efforts at a uniform civil code. the supreme court of india holds extensive constitutional-review powers under the 'basic structure' doctrine." },
      { heading: "culture and identity", body: "hindi and english are the official working languages of the union; twenty-two scheduled languages are recognised, with hundreds more in everyday use. hinduism is the historic majority religion; india is also home to one of the world's largest muslim populations and significant christian, sikh, buddhist, jain, zoroastrian and jewish communities. the cinema industries (hindi-language 'bollywood', tamil, telugu, malayalam, kannada, bengali and others) are among the largest in the world by output." },
      { heading: "geography", body: "from the himalayas in the north to the deccan plateau and the long coastlines of the arabian sea and bay of bengal. the andaman, nicobar and lakshadweep islands extend the territory into the indian ocean." },
      { heading: "notes", body: "india's constitution is, by word count, one of the longest national constitutions in the world." },
    ],
  }),

  // ─────────────── singapore ───────────────
  E({
    iso: "SGP", name: "singapore", endonym: "Singapore · 新加坡 · சிங்கப்பூர் · Singapura",
    tagline: "a multilingual city-state at the tip of the malay peninsula",
    facts: { capital: "singapore (city-state)", region: "southeast asia", area_km2: 728, population: "~5.9 million", founded: "1965 (independence)", government: "parliamentary republic", languages: "english · malay (national) · mandarin chinese · tamil (all official)", currency: "singapore dollar (SGD)" },
    sections: [
      { heading: "overview", body: "singapore is a southeast asian island city-state of about 64 islands, one of the highest-density and most economically developed countries in the world. it is a member of the commonwealth of nations and asean." },
      { heading: "history", body: "a trading settlement under the srivijaya and majapahit periods; a british east india company outpost from 1819; part of the federation of malaya/malaysia from 1963 until expulsion and independence in 1965 under prime minister lee kuan yew. the people's action party has governed continuously since independence." },
      { heading: "government and law", body: "unicameral parliament under a westminster model; the president is directly elected but largely ceremonial. common-law system inherited from england, with significant statutory codification and a strict regulatory environment." },
      { heading: "culture and identity", body: "english is the working language and the language of school instruction; malay is the national language; mandarin chinese and tamil are the other official languages. religious life is plural — buddhism, christianity, islam, taoism, hinduism, sikhism, judaism, and the unaffiliated are all significantly represented. cuisine reflects chinese, malay, indian and peranakan traditions, with hawker culture inscribed on the unesco list of intangible heritage." },
      { heading: "geography", body: "a low-lying tropical island; the central catchment area preserves rainforest and reservoirs. land reclamation has expanded the territory by roughly 25% since independence." },
      { heading: "notes", body: "singapore is one of only three modern sovereign city-states (with monaco and vatican city), and by far the largest of them by population and economy." },
    ],
  }),
]);

export function hasArchive(iso: string): boolean {
  return Boolean(ARCHIVE[iso]);
}