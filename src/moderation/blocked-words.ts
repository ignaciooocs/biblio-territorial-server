/**
 * Lista de palabras bloqueadas con generación automática de variantes.
 * Se construye un Set<string> normalizado al cargar el módulo — O(1) por búsqueda.
 *
 * Fuentes base:
 *  - google-profanity-words (coffee-and-fun/google-profanity-words)
 *  - Términos chilenos / latinoamericanos
 *  - Variantes leet-speak generadas automáticamente
 */

// ─── Sustituciones leet-speak ──────────────────────────────────────────────
const SUBS: [RegExp, string][] = [
  [/a/g, '4'],  [/4/g, 'a'],
  [/e/g, '3'],  [/3/g, 'e'],
  [/i/g, '1'],  [/1/g, 'i'],
  [/o/g, '0'],  [/0/g, 'o'],
  [/s/g, '5'],  [/5/g, 's'],
  [/t/g, '7'],  [/7/g, 't'],
  [/g/g, '9'],  [/9/g, 'g'],
  [/b/g, '8'],  [/8/g, 'b'],
];

/** Genera variantes leet-speak de una palabra base (ya normalizada sin tildes). */
function variants(word: string): string[] {
  const result = new Set<string>([word]);
  // Una pasada de sustitución por cada regla
  for (const [from, to] of SUBS) {
    for (const w of [...result]) {
      const mutated = w.replace(from, to);
      if (mutated !== w) result.add(mutated);
    }
  }
  // Espacios / puntos / guiones entre letras: "i m b e c i l"
  result.add(word.split('').join(' '));
  result.add(word.split('').join('.'));
  result.add(word.split('').join('-'));
  result.add(word.split('').join('_'));
  return [...result];
}

/** Quita tildes y normaliza a minúsculas. */
function norm(w: string): string {
  return w
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

// ─── Lista base de palabras ────────────────────────────────────────────────
// Organizada por categoría. Incluye la forma con y sin tilde;
// la función norm() las unifica de todas formas.
const BASE: string[] = [
  // ── Insultos generales ──
  'imbecil','imbécil','imbeciles','imbéciles',
  'idiota','idiotas',
  'estupido','estúpido','estupida','estúpida','estupidos','estúpidos',
  'tarado','tarada','tarados','taradas',
  'retrasado','retrasada','retrasados','retrasadas',
  'subnormal','subnormales',
  'inutil','inútil','inutiles','inútiles',
  'payaso','payasa','payasos','payasas',
  'burro','burra','burros','burras',
  'animal','bestia','bestias',
  'gilipollas','gilipollez',
  'capullo','capulla','capullos',
  'cabrón','cabron','cabrona','cabrons','cabrones','cabronazo',
  'gilipolla','gilipollas',
  'zoquete','mendrugo','cateto',
  'pedazo de idiota','maldito idiota',

  // ── Groserías chilenas ──
  'huevón','huevon','hueón','hueon','weón','weon','weona','huevona',
  'huevones','huevonada','huevonear','hueviada',
  'culiao','culiada','culiados','culiadas',
  'ctm','conchatumadre','conchetumare','conchesumadre','conchesumadre',
  'conchetumadre','conchesumare','cstm','csm',
  'chucha','chuchatumare','chuchatumadre','chuchadesumadre',
  'laconchetumare','laconchetumadre','laconchesumadre',
  'coñodesumadre',
  'aweonado','aweonada','aweonados',
  'sapo','sapos','sapas',                // insulto chileno (chismoso)
  'flaite','flaites',
  'roto','rota','rotos','rotas',         // sentido peyorativo

  // ── Groserías mexicanas / latam ──
  'pendejo','pendeja','pendejos','pendejas','pendejazo','pendejada',
  'cabrón','cabrona','cabrones','cabronazo',
  'chinga','chingada','chingado','chingadera','chingaderas',
  'chingarse','chíngate','vete a chingar','chinga tu madre',
  'pinche','pinches',
  'mamón','mamona','mamones','mamonada',
  'güey','guey','wey','we','buey',
  'puto','puta','putos','putas','putito','putita',
  'hp','hijodeputa','hijaputa','hijo de puta','hija de puta',
  'culero','culera','culeros','culeras',
  'ojete','ojetes',
  'perra','perro',                        // como insulto
  'zorra','zorras',
  'piruja','pirujas',
  'vieja','viejos',                       // como insulto

  // ── Groserías españolas ──
  'joder','jodido','jodida','jodidos','jodidas',
  'hostia','hostias','hostiaputa',
  'coño','coños',
  'cojones','cojón','cojudo','cojuda',
  'follar','follado','follada','follador',
  'mierda','mierdas','mrd',
  'imbécil','capullo',
  'polla','pollas',
  'chorizo',                              // vulgar en España
  'bocachancla','bocachanclas',

  // ── Términos sexuales explícitos ──
  'pene','penes','verga','vergas','vergón',
  'vagina','vaginas','chocho','chochos',
  'culo','culos','trasero',
  'teta','tetas','tetona','tetonas',
  'pezón','pezones',
  'sexo anal','sexo oral','felacion','felación',
  'mamada','mamadas',
  'corrida','corridas',
  'eyacular','eyaculacion','eyaculación',
  'masturbarse','masturbacion','masturbación',
  'pajear','pajero','pajera','pajeros',
  'hacerse una paja',
  'orgia','orgía','orgias','orgías',
  'prostituta','prostitutas','prostitución',
  'porno','pornografia','pornografía',
  'incesto',
  'violacion','violación','violar',
  'pedofilia','pedofilo','pedófilo',
  'sodomia','sodomía',

  // ── Discriminación / odio ──
  'maricón','maricon','maricones','marica','marico',
  'mariposa',                             // uso peyorativo
  'travelo',
  'sudaca','sudacas',
  'indio','india',                        // uso peyorativo
  'mongol','mongólico','mongolicos',
  'negro','negra','negritud',             // como insulto directo
  'negrito',                              // diminutivo como insulto
  'nagro','nagra',                        // variante ofensiva
  'muerto de hambre',

  // ── Amenazas / violencia ──
  'muere','muérete','te mato','voy a matarte','te voy a matar',
  'matate','mátate','suicidate','suicídate','mataos',
  'te voy a violar','te voy a pegar',
  'murder','kill','die',

  // ── Siglas / abreviaciones ofensivas ──
  'wtf','stfu','kys',
  'omfg',
];

// ─── Construcción del Set (una sola vez al cargar el módulo) ───────────────
export const BLOCKED_SET: Set<string> = (() => {
  const set = new Set<string>();
  for (const word of BASE) {
    const normalized = norm(word);
    // Agrega la forma normalizada base
    set.add(normalized);
    // Agrega todas las variantes leet-speak solo para palabras simples
    // (sin espacios — las frases se comprueban de otro modo)
    if (!normalized.includes(' ')) {
      for (const v of variants(normalized)) {
        set.add(norm(v));
      }
    }
  }
  return set;
})();

/** Palabras/frases que se verifican como substrings (no solo palabras completas). */
export const BLOCKED_PHRASES: string[] = BASE
  .map(norm)
  .filter(w => w.includes(' '));
