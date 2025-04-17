// @ts-self-types="../type/ticket.d.ts"
import { Uint16, Uint32, ExtensionType, NamedGroupList, KeyShareClientHello, Versions, SignatureSchemeList, ServerNameList, PskKeyExchangeModes, Cookie, RecordSizeLimit, EarlyDataIndication, Padding, OfferedPsks } from "./dep.ts";
import { Extension } from "./dep.ts";

/* export class NewSessionTicket_0 extends Struct {
   static fromHandshake(handshake) {
      const copy = handshake.slice();
      const _type = HandshakeType.fromValue(copy.at(0));
      const _lengthOf = Uint24.from(copy.subarray(1)).value;
      return NewSessionTicket.from(copy.subarray(4));
   }
   static from(array) {
      const copy = array.slice();
      let offset = 0;
      const ticket_lifetime = Uint32.from(copy.subarray(offset));
      offset += ticket_lifetime.length;
      const ticket_age_add = Uint32.from(copy.subarray(offset));
      offset += ticket_age_add.length;
      const ticket_nonce = TicketNonce.from(copy.subarray(offset));
      offset += ticket_nonce.length;
      const ticket = Ticket.from(copy.subarray(offset));
      offset += ticket.length;
      const extensions = Extensions.from(copy.subarray(offset));
      return new NewSessionTicket(ticket_lifetime, ticket_age_add, ticket_nonce, ticket, extensions);
   }
   constructor(ticket_lifetime, ticket_age_add, ticket_nonce, ticket, extensions) {
      super(
         ticket_lifetime,
         ticket_age_add,
         ticket_nonce,
         ticket,
         extensions
      )
      this.ticket_lifetime = ticket_lifetime;
      this.ticket_age_add = ticket_age_add;
      this.ticket_nonce = ticket_nonce;
      this.ticket = ticket;
      this.extensions = extensions
      //return HandshakeType.NEW_SESSION_TICKET.handshake(this)
   }
   static ticketNonce(opaque) { return new TicketNonce(opaque) };
   static ticket(opaque) { return new Ticket(opaque) };
   static extensions(...extensions) { return new Extensions(...extensions) }
} */

export class NewSessionTicket extends Uint8Array {
   #ticket_lifetime
   #ticket_age_add
   #ticket_nonce
   #ticket
   #extensions
   static from(array) {
      return new NewSessionTicket(array)
   }
   constructor(...args) {
      super(...args)
   }

   get ticket_lifetime() {
      if (this.#ticket_lifetime) return this.#ticket_lifetime;
      this.#ticket_lifetime ||= Uint32.from(this);
      return this.#ticket_lifetime
   }
   get ticket_age_add() {
      if (this.#ticket_age_add) return this.#ticket_age_add;
      this.#ticket_age_add ||= Uint32.from(this.subarray(4));
      return this.#ticket_age_add;
   }
   get ticket_nonce() {
      if (this.#ticket_nonce) return this.#ticket_nonce;
      const lengthOf = this[8];
      const end = 9 + lengthOf;
      this.#ticket_nonce ||= this.subarray(9, end);
      this.#ticket_nonce.end = end;
      return this.#ticket_nonce
   }
   get ticket() {
      if (this.#ticket) return this.#ticket;
      const lengthOf = Uint16.from(this.subarray(this.ticket_nonce.end)).value;
      const start = this.#ticket_nonce.end + 2;
      const end = start + lengthOf;
      if (lengthOf < 1) throw Error(`Expected minimum length : 1`);
      this.#ticket ||= this.subarray(start, end);
      this.#ticket.end = end;
      return this.#ticket;
   }
   get extensions() {
      if (this.#extensions) return this.#extensions;
      const lengthOf = Uint16.from(this.subarray(this.ticket.end)).value;
      if (lengthOf > 2 ** 16 - 2) throw Error(`Extensions length exceeding 2**16-2`)
      const start = this.ticket.end + 2;
      //const end = start + lengthOf
      this.#extensions ||= parseExtensions(this, start, lengthOf);//Extensions.from(this.subarray(start, end));

      return this.#extensions
   }
}

/* class TicketNonce extends Constrained {
   ticket_nonce
   static from(array) {
      const copy = array.slice();
      const lengthOf = copy.at(0);
      return new TicketNonce(copy.subarray(1, lengthOf + 1))
   }
   constructor(opaque) {
      super(0, 255, opaque)
      this.ticket_nonce = opaque
   }
   get byte() { return Uint8Array.from(this) }
}

class Ticket extends Constrained {
   ticket
   static from(array) {
      const copy = array.slice();
      const lengthOf = Uint16.from(copy).value;
      return new Ticket(copy.subarray(2, lengthOf + 2))
   }
   constructor(opaque) {
      super(0, 2 ** 16 - 1, opaque)
      this.ticket = opaque
   }
   get byte() { return Uint8Array.from(this) }
}

class Extensions_0 extends Constrained {
   ticket
   static from(array) {
      const copy = array.slice();
      const lengthOf = Uint16.from(copy).value;
      const extensions = copy.subarray(2, lengthOf + 2);
      const exts = []
      let offset = 0;
      while (true) {
         const extension = Extension.from(extensions.subarray(offset))
         exts.push(extension);
         offset += extension.length;
         if (offset >= extensions.length) break
      }
      return new Extensions(...exts)
   }
   constructor(...extensions) {
      super(0, 2 ** 16 - 2, ...extensions)
      this.extension = extensions
   }
   get byte() { return Uint8Array.from(this) }
}

class Extensions extends Uint8Array {
   static from(array) {
      return new Extensions(array)
   }
   static MIN = 0;
   static MAX = 2 ** 16 - 2;
   #lengthOf
   #extensions
   static sanitize(args) {
      if ((args[0] instanceof Uint8Array) == false) return args

      const lengthOf = Uint16.from(args[0]).value;
      args[0] = args[0].slice(0, lengthOf + 2);
      if (args[0].length > Extensions.MAX) throw Error(`Length exceed the limit max 2**16-2`)
      return args
   }
   constructor(...args) {
      args = Extensions.sanitize(args)
      super(...args)
   }
   get lengthOf() {
      if (this.#lengthOf) return this.#lengthOf;
      this.#lengthOf ||= Uint16.from(this).value;
      return this.#lengthOf
   }
   get extensions() {
      if (this.#extensions) return this.#extensions;
      this.#extensions ||= parseExtensions(this, 2, this.lengthOf);
      return this.#extensions
   }
} */

function parseExtensions(array, start, lengthOf) {
   let offset = start;
   const output = new Map;
   while (true) {
      const extension = Extension.from(array.subarray(offset)); offset += extension.length
      parseExtension(extension);
      extension.pos = offset + 2;
      output.set(extension.type, extension.data)
      if (offset >= lengthOf) break;
      if (offset >= array.length) break;
   }
   return output;
}

function parseExtension(extension) {
   switch (extension.type) {
      case ExtensionType.SUPPORTED_GROUPS: {
         extension.parser = NamedGroupList; break;
      }
      case ExtensionType.KEY_SHARE: {
         extension.parser = KeyShareClientHello; break;
      }
      case ExtensionType.SUPPORTED_VERSIONS: {
         extension.parser = Versions; break;
      }
      case ExtensionType.SIGNATURE_ALGORITHMS: {
         extension.parser = SignatureSchemeList; break;
      }
      case ExtensionType.SERVER_NAME: {
         extension.parser = extension.data.length ? ServerNameList : undefined; break;
      }
      case ExtensionType.PSK_KEY_EXCHANGE_MODES: {
         extension.parser = PskKeyExchangeModes; break;
      }
      case ExtensionType.COOKIE: {
         extension.parser = Cookie; break;
      }
      case ExtensionType.RECORD_SIZE_LIMIT: {
         extension.parser = RecordSizeLimit; break;
      }
      case ExtensionType.EARLY_DATA: {
         extension.parser = EarlyDataIndication; break;
      }
      case ExtensionType.PADDING: {
         extension.parser = Padding; break;
      }
      case ExtensionType.PRE_SHARED_KEY: {
         extension.parser = OfferedPsks; break;
      }
      default:
         break;
   }
}