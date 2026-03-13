import { LucideIcon, Car, Users, Sparkles, ShieldCheck, Heart, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden mb-16 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90"></div>
        <div className="relative z-10 px-4 py-20 md:py-32 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Chi Siamo
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
            La nostra passione, la tua garanzia. Scopri Vandos Auto Import-Export.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        <div className="lg:col-span-2 space-y-8 text-gray-700 leading-relaxed text-lg">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Sparkles className="text-blue-600" />
              Un Team Giovane e Dinamico
            </h2>
            <p>
              Benvenuti in <strong>Vandos Auto Import-Export</strong>, una realtà nata dalla visione di un team giovane, ambizioso e profondamente innamorato del mondo automobilistico. Non siamo solo rivenditori; siamo appassionati che hanno trasformato una vocazione in una missione: portare l'eccellenza automobilistica internazionale direttamente nelle vostre mani.
            </p>
            <p className="mt-4">
              La nostra storia inizia con l'idea che l'acquisto di un'auto, sia essa un'utilitaria quotidiana o una supercar da sogno, debba essere un'esperienza entusiasmante, trasparente e priva di preoccupazioni. Essendo un team giovane, portiamo un approccio fresco e tecnologicamente avanzato al settore dell'import-export, utilizzando le migliori piattaforme e reti di contatti globali per selezionare solo il meglio che il mercato ha da offrire.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Heart className="text-blue-600" />
              La Passione che Guida Ogni Scelta
            </h2>
            <p>
              Per noi di Vandos, ogni auto ha una storia e un'anima. Che si tratti dell'eleganza senza tempo di una Porsche, della potenza bruta di una Lamborghini o dell'innovazione di una moderna berlina tedesca, trattiamo ogni veicolo come se fosse il nostro. Questa passione ci spinge a non accontentarci mai della mediocrità: cerchiamo la perfezione in ogni dettaglio, dalla carrozzeria al motore.
            </p>
            <p className="mt-4">
              Il nostro team trascorre ore ad analizzare i trend di mercato, a scovare modelli rari e ad assicurarsi che ogni proposta nel nostro catalogo rappresenti il miglior valore possibile per i nostri clienti. La nostra gioventù è la nostra forza: abbiamo l'energia per andare oltre, per viaggiare, ispezionare e negoziare affinché voi non dobbiate farlo.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <ShieldCheck className="text-blue-600" />
              Qualità Certificata: La Nostra Rivisitazione
            </h2>
            <p>
              Ciò che ci distingue realmente nel panorama dell'import-export è il nostro impegno assoluto verso la qualità. <strong>Prima di essere messa in vendita, ogni auto viene sottoposta a un rigoroso processo di rivisitazione e controllo.</strong> Non ci limitiamo a una verifica superficiale; i nostri tecnici partner analizzano ogni componente meccanica, elettronica e strutturale.
            </p>
            <p className="mt-4">
              Il nostro "Protocollo Vandos" prevede:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Controllo storico completo e certificazione dei chilometri.</li>
              <li>Diagnostica elettronica avanzata per escludere difetti nascosti.</li>
              <li>Ispezione meccanica su oltre 100 punti di controllo.</li>
              <li>Detailing completo interno ed esterno per restituire all'auto il suo splendore originale.</li>
              <li>Prova su strada intensiva per garantire un feeling di guida impeccabile.</li>
            </ul>
            <p className="mt-4">
              Vogliamo che i nostri clienti si sentano sicuri. Sappiamo che l'acquisto di un'auto d'importazione può sollevare dubbi, ed è per questo che mettiamo la massima trasparenza al centro di tutto. Ogni auto che esce dal nostro showroom è pronta per macinare chilometri, offrendo la stessa affidabilità di un veicolo nuovo.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Users className="text-blue-600" />
              Il Nostro Impegno verso il Cliente
            </h2>
            <p>
              In Vandos, il cliente non è un numero, ma un membro della nostra famiglia di appassionati. Offriamo un servizio di consulenza personalizzato che guida l'acquirente attraverso ogni fase: dalla scelta del modello ideale alla gestione delle complesse pratiche burocratiche di importazione e immatricolazione.
            </p>
            <p className="mt-4">
              La nostra missione non termina al momento della consegna delle chiavi. Restiamo al vostro fianco per ogni necessità, costruendo rapporti di fiducia duraturi. Perché sappiamo che un cliente soddisfatto è il miglior biglietto da visita per un'azienda giovane come la nostra.
            </p>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 shadow-sm">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              I Nostri Numeri
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-3xl font-extrabold text-blue-600">100%</p>
                <p className="text-blue-800 font-medium">Auto Ispezionate</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-blue-600">5+</p>
                <p className="text-blue-800 font-medium">Anni di Esperienza combinata</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-blue-600">24/7</p>
                <p className="text-blue-800 font-medium">Passione Inarrestabile</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-400" />
              Cerchi un'auto specifica?
            </h3>
            <p className="text-gray-400 mb-6">
              Oltre alle auto in catalogo, possiamo ricercare e importare il modello esatto che desideri, gestendo tutta la logistica.
            </p>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all">
              Contattaci Ora
            </button>
          </div>
        </div>
      </div>
      
      {/* Vision Statement */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-12 rounded-[3rem] text-center border border-white shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 italic">
          "Non vendiamo solo auto, consegniamo emozioni certificate."
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          La nostra visione per il futuro è diventare il punto di riferimento in Europa per chi cerca trasparenza, qualità e una selezione di auto curata con amore e competenza.
        </p>
      </div>
    </div>
  );
}
