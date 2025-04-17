// @ts-self-types="../type/ticketgen.d.ts"
import { unity, Uint16, Uint32 } from "./dep.ts";
import { NewSessionTicket } from "./ticket.js";

export function ticketGen(option = {
   ticket_lifetime: Uint32.fromValue(604800),            // uint32 ticket_lifetime;
   ticket_age_add: crypto.getRandomValues(new Uint32),   // uint32 ticket_age_add;
   ticket_nonce: Uint8Array.of(0, 0),                    // opaque ticket_nonce<0..255>;
   ticket : crypto.getRandomValues(new Uint8Array(32)),  // opaque ticket<1..2^16-1>;
   extensions : []                                       // Extension extensions<0..2^16-2>;
}) {
   const { 
      ticket_lifetime,
      ticket_age_add, 
      ticket_nonce, 
      ticket, 
      extensions
   } = option

   const extension_joined = unity(...extensions);

   const array = unity(
      ticket_lifetime,
      ticket_age_add,
      ticket_nonce.length,
      ticket_nonce,
      Uint16.fromValue(ticket.length),
      ticket,
      Uint16.fromValue(extension_joined.length),
      extension_joined
   )
   return NewSessionTicket.from(array)
}
