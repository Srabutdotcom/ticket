import { ExtensionType, Uint32 } from "../src/dep.ts";

/**
 * Represents a TLS NewSessionTicket message as a `Uint8Array`.
 * 
 * The `NewSessionTicket` class encapsulates the session ticket structure 
 * as defined in TLS 1.3. It provides methods to access various components 
 * of the ticket, such as the lifetime, age addition, nonce, ticket data, 
 * and extensions.
 * 
 * ## Structure:
 * ```
 * struct {
 *   uint32 ticket_lifetime;
 *   uint32 ticket_age_add;
 *   opaque ticket_nonce<0..255>;
 *   opaque ticket<1..2^16-1>;
 *   Extension extensions<0..2^16-2>;
 * } NewSessionTicket;
 * ```
 * 
 * ## Usage:
 * ```js
 * const ticketData = new Uint8Array([...]); // Some raw session ticket data
 * const ticket = NewSessionTicket.from(ticketData);
 * 
 * console.log(ticket.ticket_lifetime); // Access ticket lifetime
 * console.log(ticket.ticket_nonce); // Access ticket nonce
 * ```
 * 
 * ## Properties:
 * - `ticket_lifetime` - The lifetime of the ticket in seconds.
 * - `ticket_age_add` - A random value added to the ticket age.
 * - `ticket_nonce` - A unique nonce for the session ticket.
 * - `ticket` - The actual session ticket data.
 * - `extensions` - Additional extensions for the session ticket.
 * 
 * ## Errors:
 * - Throws an error if the ticket length is less than 1.
 * - Throws an error if the extensions length exceeds `2^16 - 2`.
 * @version 0.0.8
 */
export declare class NewSessionTicket extends Uint8Array {
  #ticket_lifetime;
  #ticket_age_add;
  #ticket_nonce;
  #ticket;
  #extensions;
  #ticket_nonce_end;
  #ticket_end;

  /**
   * Creates a `NewSessionTicket` instance from an existing `Uint8Array`.
   * @param {Uint8Array} array The byte array containing the session ticket data.
   * @returns {NewSessionTicket}
   */
  static from(array: Uint8Array): NewSessionTicket;

  /**
   * Constructs a `NewSessionTicket` instance.
   * @param {...any} args The arguments to be passed to `Uint8Array`.
   */
  constructor(...args: any[]);

  /**
   * Gets the ticket lifetime in seconds.
   * @returns {Uint32}
   */
  get ticket_lifetime(): Uint32;

  /**
   * Gets the ticket age addition value.
   * @returns {Uint32}
   */
  get ticket_age_add(): Uint32;

  /**
   * Gets the ticket nonce.
   * @returns {Uint8Array}
   */
  get ticket_nonce(): Uint8Array;

  /**
   * Gets the session ticket.
   * @returns {Uint8Array}
   * @throws {Error} If the ticket length is less than 1.
   */
  get ticket(): Uint8Array;

  /**
   * Gets the ticket extensions.
   * @returns {Map<ExtensionType, Uint8Array>}
   * @throws {Error} If the extensions length exceeds 2^16-2.
   */
  get extensions(): Map<ExtensionType, Uint8Array>;
}
