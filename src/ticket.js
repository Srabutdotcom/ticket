// @ts-self-types="../type/ticket.d.ts"
import { Uint16, Uint24, Uint32, Struct } from "./dep.ts";
import { Constrained, Extension, HandshakeType } from "./dep.ts";

export class NewSessionTicket extends Struct {
   static fromHandshake(handshake){
      const copy = handshake.slice();
      const _type = HandshakeType.fromValue(copy.at(0));
      const _lengthOf = Uint24.from(copy.subarray(1)).value;
      return NewSessionTicket.from(copy.subarray(4));
   }
   static from(array){
      const copy = array.slice();
      let offset = 0;
      const ticket_lifetime = Uint32.from(copy.subarray(offset)); 
      offset+=ticket_lifetime.length;
      const ticket_age_add = Uint32.from(copy.subarray(offset));
      offset+=ticket_age_add.length;
      const ticket_nonce = TicketNonce.from(copy.subarray(offset));
      offset+=ticket_nonce.length;
      const ticket = Ticket.from(copy.subarray(offset));
      offset+=ticket.length;
      const extensions = Extensions.from(copy.subarray(offset));
      return new NewSessionTicket(ticket_lifetime,ticket_age_add, ticket_nonce, ticket,extensions); 
   }
   constructor(ticket_lifetime, ticket_age_add, ticket_nonce, ticket, extensions){
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
      return HandshakeType.NEW_SESSION_TICKET.handshake(this)
   }
}

class TicketNonce extends Constrained {
   ticket_nonce
   static from(array){
      const copy = array.slice();
      const lengthOf = copy.at(0);
      return new TicketNonce(copy.subarray(1, lengthOf+1))
   }
   constructor(opaque){
      super(0,255, opaque)
      this.ticket_nonce = opaque
   }
   get byte(){return Uint8Array.from(this)}
}

class Ticket extends Constrained {
   ticket
   static from(array){
      const copy = array.slice();
      const lengthOf = Uint16.from(copy).value;
      return new Ticket(copy.subarray(2, lengthOf+2))
   }
   constructor(opaque){
      super(0, 2**16-1, opaque)
      this.ticket = opaque
   }
   get byte(){return Uint8Array.from(this)}
}

class Extensions extends Constrained {
   ticket
   static from(array){
      const copy = array.slice();
      const lengthOf = Uint16.from(copy).value;
      const extensions = copy.subarray(2, lengthOf+2);
      const exts = []
      let offset = 0;
      while(true){
         const extension = Extension.from(extensions.subarray(offset)) 
         exts.push(extension);
         offset+=extension.length;
         if(offset>=extensions.length)break
      }
      return new Extensions(...exts)
   }
   constructor(...extensions){
      super(0, 2**16-2, ...extensions)
      this.extension = extensions
   }
   get byte(){return Uint8Array.from(this)}
}