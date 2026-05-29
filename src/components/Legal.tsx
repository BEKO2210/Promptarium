import { motion } from 'motion/react';
import { ArrowLeft, Shield, FileText, Scale } from 'lucide-react';

interface LegalProps {
  onBack: () => void;
}

export default function Legal({ onBack }: LegalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen bg-future-black text-future-white"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-future-black/80 backdrop-blur-xl border-b border-future-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-future-elevated border border-future-border hover:border-future-cyan/30 transition-all text-sm text-future-muted hover:text-future-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </button>
          <h1 className="font-display text-xl font-semibold">Rechtliche Hinweise</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* IMPRESSUM */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-future-cyan/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-future-cyan" />
            </div>
            <h2 className="font-display text-3xl font-light">Impressum</h2>
          </div>

          <div className="glass-card rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                Angaben gemäß § 5 DDG
              </h3>
              <p className="text-future-white font-medium">Belkis Aslani</p>
              <p className="text-future-muted">Vogelsangstr. 32</p>
              <p className="text-future-muted">71691 Freiberg am Neckar</p>
              <p className="text-future-muted">Deutschland</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                Kontakt
              </h3>
              <p className="text-future-muted">
                E-Mail:{" "}
                <a
                  href="mailto:belkis.aslani@gmail.com"
                  className="text-future-cyan hover:underline"
                >
                  belkis.aslani@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                Hinweis
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Diese Website wird ausschließlich zu privaten, nicht-kommerziellen Zwecken
                betrieben. Es besteht keine Gewinnerzielungsabsicht und kein gewerblicher
                Hintergrund. Die bereitgestellten Prompts dienen der öffentlichen
                Informations- und Inspirationsvermittlung.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                Haftung für Inhalte
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Als Privatperson bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen
                Seiten verantwortlich. Nach §§ 8 bis 10 DDG bin ich jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
                überwachen. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige
                Inhalte umgehend entfernen.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                Streitbeilegung
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-future-cyan hover:underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                . Ich bin weder verpflichtet noch bereit, an einem
                Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen.
              </p>
            </div>
          </div>
        </section>

        {/* DATENSCHUTZ */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-future-cyan/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-future-cyan" />
            </div>
            <h2 className="font-display text-3xl font-light">Datenschutzerklärung</h2>
          </div>

          <div className="glass-card rounded-2xl p-8 space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                Verantwortlicher
              </h3>
              <p className="text-future-white font-medium">Belkis Aslani</p>
              <p className="text-future-muted text-sm">
                Vogelsangstr. 32, 71691 Freiberg am Neckar
              </p>
              <p className="text-future-muted text-sm">
                E-Mail:{" "}
                <a
                  href="mailto:belkis.aslani@gmail.com"
                  className="text-future-cyan hover:underline"
                >
                  belkis.aslani@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                1. Erhebung und Speicherung personenbezogener Daten
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Beim Aufruf dieser Website werden durch den Hosting-Provider automatisch
                Informationen in sogenannten Server-Logfiles gespeichert. Dies umfasst:
                Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL,
                Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und
                IP-Adresse. Diese Daten sind nicht bestimmten Personen zuordenbar und
                werden nicht mit anderen Datenquellen zusammengeführt.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                2. Rechtsgrundlage
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
                (Berechtigtes Interesse). Das berechtigte Interesse liegt in der
                technischen Bereitstellung und Optimierung der Website sowie der
                Gewährleistung der Systemsicherheit.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                3. Verwendung von Google Fonts
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Diese Website nutzt Google Fonts zur einheitlichen Darstellung von
                Schriftarten. Beim Aufruf einer Seite lädt Ihr Browser die benötigten
                Schriftarten in Ihren Browsercache, um Texte und Schriftarten korrekt
                anzuzeigen. Hierzu wird die IP-Adresse Ihres Endgeräts an Google
                übermittelt. Weitere Informationen finden Sie in der
                Datenschutzerklärung von Google:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-future-cyan hover:underline"
                >
                  https://policies.google.com/privacy
                </a>
                .
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                4. Speicherdauer
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Server-Logfiles werden aus Sicherheitsgründen (z. B. zur Aufklärung von
                Missbrauchs- oder Betrugshandlungen) maximal 7 Tage gespeichert und
                anschließend gelöscht. Daten, deren weitere Aufbewahrung zu
                Beweiszwecken erforderlich ist, sind bis zur endgültigen Klärung des
                jeweiligen Vorfalls von der Löschung ausgenommen.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                5. Ihre Rechte
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Sie haben das Recht auf Auskunft über die bei mir gespeicherten
                personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck
                der Verarbeitung. Außerdem haben Sie ein Recht auf Berichtigung,
                Einschränkung der Verarbeitung, Löschung ("Recht auf Vergessenwerden")
                sowie Datenübertragbarkeit. Wenn Sie der Ansicht sind, dass die
                Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie
                sich bei der zuständigen Aufsichtsbehörde beschweren.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                6. Cookies und lokale Speicherung
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Diese Website verwendet keine Tracking-Cookies und kein
                Webanalyse-Tool. Es werden keine personenbezogenen Daten in Cookies
                gespeichert. Lediglich technisch notwendige lokale Speicherungen
                (z. B. für das Kopieren von Prompts in die Zwischenablage) erfolgen
                ausschließlich clientseitig in Ihrem Browser und werden nicht an den
                Server übermittelt.
              </p>
            </div>
          </div>
        </section>

        {/* NUTZUNGSBEDINGUNGEN */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-future-cyan/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-future-cyan" />
            </div>
            <h2 className="font-display text-3xl font-light">Nutzungsbedingungen</h2>
          </div>

          <div className="glass-card rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                Geltungsbereich
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Diese Nutzungsbedingungen gelten für die kostenlose Nutzung der Website
                Promptarium und der darauf bereitgestellten Inhalte. Es werden keine
                Verträge geschlossen und keine Zahlungen verlangt. Die Nutzung ist
                ohne Registrierung möglich.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                Urheberrecht
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Die auf dieser Website veröffentlichten Prompts, Texte und Inhalte sind
                urheberrechtlich geschützt. Die Nutzung der Prompts für private und
                kommerzielle Projekte ist ausdrücklich erlaubt. Eine Weiterverbreitung
                oder Veröffentlichung der Prompts als eigenständiges Werk — etwa auf
                anderen Plattformen oder in Sammlungen — bedarf der vorherigen
                schriftlichen Zustimmung.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                Haftungsausschluss
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Die bereitgestellten Prompts werden ohne Gewährleistung für Richtigkeit,
                Vollständigkeit oder Eignung für einen bestimmten Zweck zur Verfügung
                gestellt. Ich übernehme keine Haftung für Schäden, die aus der Nutzung
                der Prompts entstehen könnten, es sei denn, diese beruhen auf grober
                Fahrlässigkeit oder Vorsatz. Die Verantwortung für die Einhaltung
                etwaiger Nutzungsbedingungen Dritter (z. B. von KI-Plattformen) liegt
                beim Nutzer.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                Markenrechte Dritter
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Soweit auf dieser Website auf Marken, Produktnamen oder Logos Dritter
                Bezug genommen wird, handelt es sich um Eigentum der jeweiligen
                Rechteinhaber. Die Nennung erfolgt ausschließlich zur informationellen
                Beschreibung der Prompts und stellt keine behauptete Zugehörigkeit oder
                Zusammenarbeit dar.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-2">
                Änderungsvorbehalt
              </h3>
              <p className="text-future-muted text-sm leading-relaxed">
                Ich behalte mir vor, diese Nutzungsbedingungen jederzeit zu ändern.
                Die jeweils aktuelle Fassung ist auf dieser Seite einsehbar.
              </p>
            </div>
          </div>
        </section>

        {/* Stand */}
        <div className="text-center pt-8 border-t border-future-border">
          <p className="text-xs text-future-muted">
            Stand: Mai 2026 · Promptarium · Freiberg am Neckar
          </p>
        </div>
      </div>
    </motion.div>
  );
}
