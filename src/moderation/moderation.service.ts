import { Injectable } from '@nestjs/common';
import { BLOCKED_SET, BLOCKED_PHRASES } from './blocked-words';

/**
 * Colapsa secuencias de letras sueltas separadas por espacios.
 * "p e n e" → "pene",  "h u e v o n" → "huevon"
 */
function collapseLetters(text: string): string {
  const words = text.split(' ');
  const out: string[] = [];
  let i = 0;
  while (i < words.length) {
    if (words[i].length === 1) {
      let combined = words[i];
      let j = i + 1;
      while (j < words.length && words[j].length === 1) {
        combined += words[j];
        j++;
      }
      out.push(combined);
      i = j;
    } else {
      out.push(words[i]);
      i++;
    }
  }
  return out.join(' ');
}

// Mapa explícito: cubre tildes + caracteres especiales como € antes del cleanup
const CHAR_MAP: Record<string, string> = {
  'á':'a','à':'a','â':'a','ä':'a','ã':'a','å':'a',
  'é':'e','è':'e','ê':'e','ë':'e',
  'í':'i','ì':'i','î':'i','ï':'i',
  'ó':'o','ò':'o','ô':'o','ö':'o','õ':'o',
  'ú':'u','ù':'u','û':'u','ü':'u',
  'ñ':'n','ç':'c',
  // Leet-speak y símbolos especiales
  '0':'o','@':'o','°':'o',
  '1':'i','!':'i','|':'i',
  '3':'e','€':'e','£':'e', // € y £
  '4':'a',
  '5':'s','$':'s',
  '7':'t','+':'t',
  '9':'g',
  '8':'b',
  '2':'z',
};

function normalize(text: string): string {
  // Reemplaza carácter a carácter usando el mapa
  let t = text
    .toLowerCase()
    .split('')
    .map(c => CHAR_MAP[c] ?? c)
    .join('');

  t = t
    // Colapsa letras repetidas: culoo → culo, miierda → mierda
    .replace(/(.)\1+/g, '$1')
    // Elimina cualquier carácter que no sea letra o espacio
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Colapsa letras separadas por espacios: "p e n e" → "pene"
  t = collapseLetters(t);

  return t;
}

@Injectable()
export class ModerationService {
  moderate(text: string): { flagged: boolean; matches: string[] } {
    const normalized = normalize(text);
    const words = normalized.split(' ');
    const matches: string[] = [];

    // Comprobación O(1) por palabra
    for (const word of words) {
      if (word.length > 1 && BLOCKED_SET.has(word)) {
        matches.push(word);
      }
    }

    // Comprobación de frases multi-palabra como "hijo de puta"
    for (const phrase of BLOCKED_PHRASES) {
      if (normalized.includes(phrase)) {
        matches.push(phrase);
      }
    }

    return { flagged: matches.length > 0, matches: [...new Set(matches)] };
  }
}
