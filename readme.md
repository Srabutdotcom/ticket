# NewSessionTicket Module

This module defines classes to handle NewSessionTicket structures in the context of a protocol like TLS. It provides parsing, construction, and serialization functionalities for NewSessionTicket and its associated components.

## Table of Contents

1. [Classes](#classes)
   - [NewSessionTicket](#newsessionticket)
   - [TicketNonce](#ticketnonce)
   - [Ticket](#ticket)
   - [Extensions](#extensions)
2. [Usage](#usage)
3. [Dependencies](#dependencies)

---

## Classes

### NewSessionTicket

The `NewSessionTicket` class represents a TLS `NewSessionTicket` message and provides parsing and construction methods.

#### Static Methods

- `fromHandshake(handshake: Uint8Array): NewSessionTicket`
  Parses a handshake message to extract a `NewSessionTicket` instance.

- `from(array: Uint8Array): NewSessionTicket`
  Parses a byte array to extract a `NewSessionTicket` instance.

#### Constructor

```ts
constructor(
  ticket_lifetime: Uint32,
  ticket_age_add: Uint32,
  ticket_nonce: TicketNonce,
  ticket: Ticket,
  extensions: Extensions
)
```
Initializes a `NewSessionTicket` with the given parameters.

### TicketNonce

The `TicketNonce` class represents a `ticket_nonce` value with constraints.

#### Static Methods

- `from(array: Uint8Array): TicketNonce`
  Parses a byte array to extract a `TicketNonce` instance.

#### Constructor

```ts
constructor(opaque: Uint8Array)
```
Initializes a `TicketNonce` instance.

### Ticket

The `Ticket` class represents a `ticket` value with constraints.

#### Static Methods

- `from(array: Uint8Array): Ticket`
  Parses a byte array to extract a `Ticket` instance.

#### Constructor

```ts
constructor(opaque: Uint8Array)
```
Initializes a `Ticket` instance.

### Extensions

The `Extensions` class represents a list of extensions in the `NewSessionTicket` structure.

#### Static Methods

- `from(array: Uint8Array): Extensions`
  Parses a byte array to extract an `Extensions` instance.

#### Constructor

```ts
constructor(...extensions: Extension[])
```
Initializes an `Extensions` instance with one or more extensions.

---

## Usage

### Parsing a Handshake

```ts
import { NewSessionTicket } from './path';

const handshake = new Uint8Array([...]);
const newSessionTicket = NewSessionTicket.fromHandshake(handshake);
```

### Creating a NewSessionTicket

```ts
import { NewSessionTicket, TicketNonce, Ticket, Extensions } from './path';

const ticketLifetime = new Uint32(3600);
const ticketAgeAdd = new Uint32(12345);
const ticketNonce = new TicketNonce(new Uint8Array([1, 2, 3]));
const ticket = new Ticket(new Uint8Array([4, 5, 6]));
const extensions = new Extensions(/* pass extensions here */);

const newSessionTicket = new NewSessionTicket(
  ticketLifetime,
  ticketAgeAdd,
  ticketNonce,
  ticket,
  extensions
);
```

### Serializing

```ts
const serialized = newSessionTicket.byte; // Get the byte representation
```

---

## Dependencies

This module depends on the following imports:

- `Uint16`, `Uint24`, `Uint32`, `Struct` from `./dep.ts`
- `Constrained`, `Extension`, `HandshakeType` from `./dep.ts`

Ensure that these dependencies are available and properly implemented in your environment.

