import { Uint32 } from "../src/dep.ts";

/**
 * Generates a TLS 1.3 NewSessionTicket.
 * @param {Object} [option] - Configuration options for the ticket.
 * @param {Uint32} [option.ticket_lifetime] - The lifetime of the ticket in seconds (default: 604800).
 * @param {Uint32} [option.ticket_age_add] - A random 32-bit value to obfuscate ticket age.
 * @param {Uint8Array} [option.ticket_nonce] - A nonce value (default: [0, 0]).
 * @param {Uint8Array} [option.ticket] - The actual session ticket (default: random 32 bytes).
 * @param {Uint8Array[]} [option.extensions] - An array of extensions (default: empty array).
 * @returns {Uint8Array} - The serialized session ticket.
 * @version __VERSION__
 */
export declare function ticketGen(option?: {
   ticket_lifetime?: Uint32;     // The lifetime of the ticket in seconds
   ticket_age_add?: Uint32;      // A random 32-bit value to obfuscate ticket age
   ticket_nonce?: Uint8Array;    // A nonce value
   ticket?: Uint8Array;          // The actual session ticket
   extensions?: Uint8Array[];    // An array of extensions
}): Uint8Array;