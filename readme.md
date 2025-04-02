# NewSessionTicket

## Overview
The `NewSessionTicket` class extends `Uint8Array` and represents a TLS 1.3 New Session Ticket (NST). This class provides structured access to the different fields within the ticket, including the ticket lifetime, age add, nonce, and extensions.

## Installation
This module is designed for use in JavaScript and Deno environments. Ensure you have the required dependencies before usage.

## Usage

### Importing the Class
```javascript
import { NewSessionTicket, ticketGen } from '@tls/ticket';
```

### Creating a New Session Ticket from an Array
```javascript
const rawTicketData = new Uint8Array([...]); // Replace with actual ticket data
const ticket = NewSessionTicket.from(rawTicketData);
console.log(ticket.ticket_lifetime.value); // Accessing ticket lifetime
```

### Generating a New Session Ticket
```javascript
const ticket = ticketGen();
console.log(ticket.ticket_nonce); // Accessing the ticket nonce
```

## API Reference

### Class: `NewSessionTicket`
#### Static Methods
- `NewSessionTicket.from(array: Uint8Array): NewSessionTicket`  
  Creates an instance of `NewSessionTicket` from a given `Uint8Array`.

#### Properties (Getters)
- `ticket_lifetime: Uint32`  
  Retrieves the lifetime of the ticket in seconds.
- `ticket_age_add: Uint32`  
  Retrieves a random 32-bit value used to obfuscate the ticket age.
- `ticket_nonce: Uint8Array`  
  Retrieves the nonce associated with the ticket.
- `ticket: Uint8Array`  
  Retrieves the actual session ticket.
- `extensions: Uint8Array[]`  
  Retrieves the extensions associated with the ticket.

### Function: `ticketGen`
#### Description
Generates a new TLS 1.3 session ticket with default or provided values.

#### Parameters
- `option` (optional):
  - `ticket_lifetime: Uint32` (default: 604800) - The ticket lifetime in seconds.
  - `ticket_age_add: Uint32` (random) - A random 32-bit value.
  - `ticket_nonce: Uint8Array` (default: [0, 0]) - The ticket nonce.
  - `ticket: Uint8Array` (default: random 32-byte array) - The session ticket.
  - `extensions: Uint8Array[]` (default: []) - An array of ticket extensions.

#### Returns
`NewSessionTicket` - A new instance containing the serialized session ticket data.

#### Example
```javascript
const generatedTicket = ticketGen({
   ticket_lifetime: Uint32.fromValue(7200),
   ticket_nonce: Uint8Array.of(1, 2, 3)
});
console.log(generatedTicket.ticket);
```

### Donation

- https://paypal.me/aiconeid

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.
