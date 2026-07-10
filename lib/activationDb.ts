import fs from 'fs';
import path from 'path';
import { db } from './firebase';
import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore';

export interface ActivationCode {
  code: string;
  used: boolean;
  usedAt?: string;
}

const DB_FILE_PATH = path.join(process.cwd(), 'activation_db.json');

// Helper to generate a single code: BAC-XXX-XXX-XXX
function generateOneCode(index: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Readable alphanumeric characters
  
  // Use a pseudo-deterministic generation based on index and some random-like hashing 
  // to ensure they look completely random and unique but we can generate 4000 easily.
  // Using a seed/hash to mix things up:
  const hash = (index * 9301 + 49297) % 233280;
  const hash2 = (hash * 9301 + 49297) % 233280;
  const hash3 = (hash2 * 9301 + 49297) % 233280;

  const segment = (seed: number) => {
    let result = '';
    let val = seed;
    for (let i = 0; i < 3; i++) {
      result += chars[val % chars.length];
      val = Math.floor(val / chars.length);
    }
    return result;
  };

  const seg1 = segment(hash + index);
  const seg2 = segment(hash2 + index * 17);
  const seg3 = segment(hash3 + index * 31);

  return `BAC-${seg1}-${seg2}-${seg3}`;
}

// Function to generate 4,000 unique codes
function generateAllCodes(): ActivationCode[] {
  const codesSet = new Set<string>();
  const codesList: ActivationCode[] = [];
  
  // We want exactly 4000 unique codes
  let i = 0;
  let attempts = 0;
  while (codesList.length < 4000 && attempts < 100000) {
    const code = generateOneCode(i + attempts);
    if (!codesSet.has(code)) {
      codesSet.add(code);
      codesList.push({
        code,
        used: false
      });
      i++;
    }
    attempts++;
  }
  return codesList;
}

// Memory cache to avoid reading from disk on every operation
let cachedCodes: ActivationCode[] | null = null;

export function loadCodes(): ActivationCode[] {
  if (cachedCodes) {
    return cachedCodes;
  }

  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const data = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      cachedCodes = JSON.parse(data);
      return cachedCodes || [];
    }
  } catch (err) {
    console.error('Error loading activation codes:', err);
  }

  // If file doesn't exist, generate and save 4000 codes
  console.log('Generating 4000 new activation codes...');
  const newCodes = generateAllCodes();
  saveCodes(newCodes);
  cachedCodes = newCodes;
  return newCodes;
}

export function saveCodes(codes: ActivationCode[]): void {
  try {
    cachedCodes = codes;
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(codes, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving activation codes:', err);
  }
}

// Validate a code and mark as used if valid in Firestore
export async function consumeActivationCode(code: string): Promise<{ success: boolean; message: string }> {
  const normalized = code.trim().toUpperCase();
  const baseCodes = loadCodes();
  
  const exists = baseCodes.some(c => c.code === normalized);
  if (!exists) {
    return { success: false, message: 'رمز التفعيل غير صحيح!' };
  }

  try {
    const codeRef = doc(db, 'used_codes', normalized);
    const codeDoc = await getDoc(codeRef);
    
    if (codeDoc.exists()) {
      return { success: false, message: 'رمز التفعيل هذا تم استخدامه مسبقاً من طرف مستخدم آخر!' };
    }

    // Mark as used in Firestore durably
    await setDoc(codeRef, {
      code: normalized,
      used: true,
      usedAt: new Date().toISOString()
    });

    return { success: true, message: 'تم تفعيل المنصة بنجاح!' };
  } catch (err) {
    console.error('Error consuming activation code in Firestore:', err);
    return { success: false, message: 'حدث خطأ أثناء معالجة رمز التفعيل.' };
  }
}

// Load all codes merged with their used status from Firestore
export async function loadCodesWithFirebase(): Promise<ActivationCode[]> {
  const baseCodes = loadCodes();
  
  // Clone to avoid side effects
  const codesCopy = baseCodes.map(c => ({ ...c, used: false, usedAt: undefined }));

  try {
    const usedCol = collection(db, 'used_codes');
    const snapshot = await getDocs(usedCol);
    
    const usedMap = new Map<string, string>();
    snapshot.forEach(doc => {
      const data = doc.data();
      usedMap.set(doc.id, data.usedAt || new Date().toISOString());
    });

    for (const codeObj of codesCopy) {
      if (usedMap.has(codeObj.code)) {
        codeObj.used = true;
        codeObj.usedAt = usedMap.get(codeObj.code);
      }
    }
  } catch (err) {
    console.error('Error fetching used codes from Firestore:', err);
  }

  return codesCopy;
}

