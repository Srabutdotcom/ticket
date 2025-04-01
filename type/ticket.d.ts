import { ExtensionType, Uint32 } from "../src/dep.ts";

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
