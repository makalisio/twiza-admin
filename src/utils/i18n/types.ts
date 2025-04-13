import { fr } from './translations/fr';

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? TKey | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : TKey
}[keyof TObj & string];

export type TranslationType = typeof fr;
export type TranslationKey = RecursiveKeyOf<typeof fr>; 