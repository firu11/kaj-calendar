import { DateTime } from 'luxon';

const dateTimeFieldNames: string[] = ['from', 'to', 'until'];

// This shit does transform the JSON date strings (ISO format) to a luxon DateTime object, but only internally.
// Meaning I don't know how validation in TS/JS works (more like doesn't) with the lack of reflection,
// so it only makes sure that the date fields in JSON get parsed, but it still saves them as any, which seems strange to me.
//
// If you do:
//  const inputJSON = { /* stuff */ };
//  const event: CalendarEvent = inputJSON;
// it works haha, but event.from.day crashes, because the from is still a fakin string or standard JS Date object.
//
// So this hydrateDates tries to parse it beforehand.
export function hydrateDates<T>(data: unknown): T {
  // non-object, primitive, null
  if (data === null || typeof data !== 'object') return data as T;

  if (Array.isArray(data)) {
    return data.map(hydrateDates) as any; // recursively for arrays
  }

  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    if (dateTimeFieldNames.includes(key) && typeof value === 'string') {
      const dt = DateTime.fromISO(value, {
        setZone: true, // respect & keep the timezone offset from the string
      });

      if (!dt.isValid) {
        console.warn(`Bad ISO in ${key}: ${value} -> ${dt.invalidExplanation}`);
        result[key] = null; // or throw, or keep as string, etc.
      } else {
        result[key] = dt;
      }
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = hydrateDates(value); // recursively for objects
    } else {
      result[key] = value; // just assign
    }
  }

  return result as T;
}

// The other way around, meaning it goes from DateTime to string (only underlining, it still is undefined lol).
export function dehydrateDates(data: unknown): unknown {
  // top-level DateTime
  if (data instanceof DateTime) {
    return data.toISO();
  }

  // non-object, primitive, null
  if (!data || typeof data !== 'object') return data;

  if (Array.isArray(data)) {
    return data.map(dehydrateDates); // recursively for arrays
  }

  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof DateTime) {
      result[key] = value.toISO(); // date
    } else if (value && typeof value === 'object') {
      result[key] = dehydrateDates(value); // recursively for objects
    } else {
      result[key] = value; // just assign
    }
  }

  return result;
}
