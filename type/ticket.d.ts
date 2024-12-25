import { Uint32, Struct, Constrained } from "@tls/struct";
import { Extension } from "@tls/enum";

/**
 * Represents a NewSessionTicket structure used in handshake processes.
 */
export class NewSessionTicket extends Struct {

  /**
   * Creates a NewSessionTicket instance from a handshake message.
   * @param handshake - The handshake Uint8Array data.
   * @returns A NewSessionTicket instance.
   */
  static fromHandshake(handshake: Uint8Array): NewSessionTicket;

  /**
   * Creates a NewSessionTicket instance from a raw byte array.
   * @param array - The raw Uint8Array data.
   * @returns A NewSessionTicket instance.
   */
  static from(array: Uint8Array): NewSessionTicket;

  /**
   * Constructs a NewSessionTicket instance.
   * @param ticket_lifetime - The ticket lifetime (Uint32).
   * @param ticket_age_add - The ticket age add (Uint32).
   * @param ticket_nonce - The ticket nonce (TicketNonce).
   * @param ticket - The ticket (Ticket).
   * @param extensions - The extensions (Extensions).
   */
  constructor(
    ticket_lifetime: Uint32,
    ticket_age_add: Uint32,
    ticket_nonce: TicketNonce,
    ticket: Ticket,
    extensions: Extensions
  );

  /**
    * Creates a `TicketNonce` instance from opaque data.
    * @param {Uint8Array} opaque - The opaque data for the ticket nonce.
    * @returns {TicketNonce} The parsed `TicketNonce`.
    */
  static ticketNonce(opaque: Uint8Array): TicketNonce;

  /**
   * Creates a `Ticket` instance from opaque data.
   * @param {Uint8Array} opaque - The opaque data for the ticket.
   * @returns {Ticket} The parsed `Ticket`.
   */
  static ticket(opaque: Uint8Array): Ticket;

  /**
   * Creates an `Extensions` instance from multiple extensions.
   * @param {...Extension[]} extensions - The extensions to include.
   * @returns {Extensions} The parsed `Extensions`.
   */
  static extensions(...extensions: Extension[]): Extensions;

  /** The ticket's lifetime in seconds. */
  ticket_lifetime: Uint32;

  /** The additional age value for the ticket. */
  ticket_age_add: Uint32;

  /** The ticket nonce. */
  ticket_nonce: TicketNonce;

  /** The ticket data. */
  ticket: Ticket;

  /** Additional ticket extensions. */
  extensions: Extensions;
}

/**
 * Represents the TicketNonce structure.
 */
export class TicketNonce extends Constrained {
  ticket_nonce: Uint8Array;

  /**
   * Creates a TicketNonce instance from a raw byte array.
   * @param array - The raw Uint8Array data.
   * @returns A TicketNonce instance.
   */
  static from(array: Uint8Array): TicketNonce;

  /**
   * Constructs a TicketNonce instance.
   * @param opaque - The ticket nonce data.
   */
  constructor(opaque: Uint8Array);

  /**
   * Gets the byte representation of the ticket nonce.
   */
  get byte(): Uint8Array;
}

/**
 * Represents the Ticket structure.
 */
export class Ticket extends Constrained {
  ticket: Uint8Array;

  /**
   * Creates a Ticket instance from a raw byte array.
   * @param array - The raw Uint8Array data.
   * @returns A Ticket instance.
   */
  static from(array: Uint8Array): Ticket;

  /**
   * Constructs a Ticket instance.
   * @param opaque - The ticket data.
   */
  constructor(opaque: Uint8Array);

  /**
   * Gets the byte representation of the ticket.
   */
  get byte(): Uint8Array;
}

/**
 * Represents the Extensions structure.
 */
export class Extensions extends Constrained {
  extension: Extension[];

  /**
   * Creates an Extensions instance from a raw byte array.
   * @param array - The raw Uint8Array data.
   * @returns An Extensions instance.
   */
  static from(array: Uint8Array): Extensions;

  /**
   * Constructs an Extensions instance.
   * @param extensions - The list of extensions.
   */
  constructor(...extensions: Extension[]);

  /**
   * Gets the byte representation of the extensions.
   */
  get byte(): Uint8Array;
}
