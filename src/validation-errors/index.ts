export const VALIDATION_ERRORS = {
  1: 'UUID is invalid',
  3: 'Body does not contain required fields',
  101: 'oldPassowrd is wrong',
  401: 'Login already exists',
  402: 'Incorrect login or password',
};

export const DATABASE_ERRORS = {
  2: 'Record with this ID doies not exist',
  201: 'User not found',
  202: 'Track not found',
  203: 'Artist not found',
  204: 'Album not found',
  401: 'The item is not in favorites',
};

export const PRISMA_ERRORS = {
  user: {
    P2025: DATABASE_ERRORS[201],
  },
  artist: {
    P2025: DATABASE_ERRORS[203],
  },
  album: {
    P2025: DATABASE_ERRORS[204],
  },
  track: {
    P2025: DATABASE_ERRORS[202],
  },
};


export class ValidationError extends Error {
  code: number;
  path: string;
  constructor(code: number, path?: string) {
    super(VALIDATION_ERRORS[code as keyof typeof VALIDATION_ERRORS]);
    this.code = code;
    this.path = path;
  }
}

export class DatabaseError extends Error {
  code: number;
  path: string;
  constructor(code: number, path?: string) {
    super(DATABASE_ERRORS[code as keyof typeof DATABASE_ERRORS]);
    this.code = code;
    this.path = path;
  }
}
