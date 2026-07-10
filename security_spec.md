# Security Specification: used_codes

This document defines the security boundaries, data invariants, and defensive validation rules for the `used_codes` Firestore collection.

## 1. Data Invariants

1. **Immutable State**: Once an activation code is marked as used (i.e., created in the database), it can never be deleted or updated. It is a write-once ledger of activated keys.
2. **Strict Identity**: The document ID must match the normalized code itself. The document field `code` must exactly equal the document ID (`codeId`).
3. **Well-Formed Codes**: The code must match the pattern `^BAC-[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}$` (e.g., `BAC-ABC-123-XYZ`).
4. **No Shadow Fields**: No additional or custom properties can be injected.
5. **Temporal Integrity**: The activation timestamp `usedAt` must exactly match the server timestamp (`request.time`).
6. **No Anonymous/Uncontrolled Modification**: Only creation of valid codes is allowed; modification (`update`) and deletion (`delete`) are strictly forbidden.

---

## 2. The "Dirty Dozen" Malicious Payloads

The following 12 payloads attempt to compromise the integrity of the activation system. Our security rules must guarantee that all of these result in `PERMISSION_DENIED`.

### Case 1: Code ID Poisoning (Resource Poisoning)
An attacker attempts to write an incredibly long or malformed code ID to cause resource bloat.
* **Attempt**: `create` on path `/used_codes/BAC-VERY-LONG-EXPLOIT-STRING-THAT-EXCEEDS-LIMITS`
* **Payload**: `{ "code": "BAC-VERY-LONG-EXPLOIT-STRING-THAT-EXCEEDS-LIMITS", "used": true, "usedAt": "2026-07-10T12:00:00Z" }`

### Case 2: Code/ID Mismatch (Spoofing)
An attacker attempts to write a document where the inner `code` field does not match the document ID.
* **Attempt**: `create` on path `/used_codes/BAC-AAA-BBB-CCC`
* **Payload**: `{ "code": "BAC-XXX-YYY-ZZZ", "used": true, "usedAt": "2026-07-10T12:00:00Z" }`

### Case 3: Extra Shadow Fields (Infiltration)
An attacker tries to inject additional parameters like `isAdmin: true` or `bypass: true`.
* **Attempt**: `create` on path `/used_codes/BAC-AAA-BBB-CCC`
* **Payload**: `{ "code": "BAC-AAA-BBB-CCC", "used": true, "usedAt": "2026-07-10T12:00:00Z", "isAdmin": true }`

### Case 4: Invalid Types (Type Poisoning)
An attacker tries to write `used` as a string instead of a boolean.
* **Attempt**: `create` on path `/used_codes/BAC-AAA-BBB-CCC`
* **Payload**: `{ "code": "BAC-AAA-BBB-CCC", "used": "true", "usedAt": "2026-07-10T12:00:00Z" }`

### Case 5: Client-Forged Timestamp (Temporal Manipulation)
An attacker tries to specify an arbitrary past or future date for `usedAt` instead of the server's timestamp.
* **Attempt**: `create` on path `/used_codes/BAC-AAA-BBB-CCC`
* **Payload**: `{ "code": "BAC-AAA-BBB-CCC", "used": true, "usedAt": "1999-01-01T00:00:00Z" }`

### Case 6: Resetting Used Code (State Shortcutting / Mutability)
An attacker attempts to update an already consumed code to mark it as unused (`used: false`).
* **Attempt**: `update` on path `/used_codes/BAC-AAA-BBB-CCC`
* **Payload**: `{ "code": "BAC-AAA-BBB-CCC", "used": false, "usedAt": "2026-07-10T12:00:00Z" }`

### Case 7: Deleting a Used Code (Ledger Deletion)
An attacker attempts to delete a consumed code from the ledger so they can reuse it.
* **Attempt**: `delete` on path `/used_codes/BAC-AAA-BBB-CCC`

### Case 8: Malformed Path ID Prefix (Format Violation)
An attacker tries to create a code that doesn't start with `BAC-`.
* **Attempt**: `create` on path `/used_codes/SKP-AAA-BBB-CCC`
* **Payload**: `{ "code": "SKP-AAA-BBB-CCC", "used": true, "usedAt": "2026-07-10T12:00:00Z" }`

### Case 9: Missing Required Fields (Schema Undersizing)
An attacker tries to create a code record but omits the `usedAt` timestamp.
* **Attempt**: `create` on path `/used_codes/BAC-AAA-BBB-CCC`
* **Payload**: `{ "code": "BAC-AAA-BBB-CCC", "used": true }`

### Case 10: Array Manipulation (List Poisoning)
An attacker tries to inject arrays or map structures into the code field.
* **Attempt**: `create` on path `/used_codes/BAC-AAA-BBB-CCC`
* **Payload**: `{ "code": ["BAC-AAA-BBB-CCC"], "used": true, "usedAt": "2026-07-10T12:00:00Z" }`

### Case 11: Bulk Overwrite (Collection Level Attack)
An attacker attempts a wild wildcard update or collection replacement.
* **Attempt**: `update` on path `/used_codes/` (Invalid operation, blocked by default deny)

### Case 12: Unauthorized Read Injection
An attacker attempts to filter or read un-owned documents with forged queries.
* **Attempt**: Read list from `used_codes` without specifying correct collection boundaries (blocked/safe under secure rules).

---

## 3. Test Runner Design

To verify these rules, we will write a declarative test suite that attempts these 12 scenarios against our local rules logic.
