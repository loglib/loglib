
/**
 * Client
**/

import * as runtime from './runtime/library';
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends Prisma.PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>


/**
 * Model Account
 * 
 */
export type Account = {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string | null
  access_token: string | null
  expires_at: number | null
  token_type: string | null
  scope: string | null
  id_token: string | null
  session_state: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Session
 * 
 */
export type Session = {
  id: string
  sessionToken: string
  userId: string
  expires: Date
}

/**
 * Model User
 * 
 */
export type User = {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  createdAt: Date
  updatedAt: Date
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  stripePriceId: string | null
  stripeCurrentPeriodEnd: Date | null
}

/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = {
  identifier: string
  token: string
  expires: Date
}

/**
 * Model Website
 * 
 */
export type Website = {
  id: string
  createdAt: Date
  updatedAt: Date
  url: string
  title: string | null
  userId: string
  active: boolean
}

/**
 * Model WebVisitor
 * 
 */
export type WebVisitor = {
  id: string
  data: string
  createdAt: Date
  updatedAt: Date
  websiteId: string
}

/**
 * Model WebSession
 * 
 */
export type WebSession = {
  id: string
  createdAt: Date
  updatedAt: Date
  referrer: string
  queryParams: string
  duration: number
  country: string | null
  city: string | null
  device: string | null
  os: string | null
  browser: string | null
  language: string | null
  visitorId: string
  websiteId: string
}

/**
 * Model WebPageview
 * 
 */
export type WebPageview = {
  id: string
  createdAt: Date
  updatedAt: Date
  page: string
  referrer: string
  queryParams: string
  duration: number
  sessionId: string
  visitorId: string
  websiteId: string
}

/**
 * Model WebEvent
 * 
 */
export type WebEvent = {
  id: string
  createdAt: Date
  updatedAt: Date
  eventType: string
  eventName: string
  payload: string
  pageId: string
  sessionId: string
  visitorId: string
  websiteId: string
}

/**
 * Model ApiKey
 * 
 */
export type ApiKey = {
  id: string
  userId: string
  name: string
  websiteId: string
  key: string
  createdAt: Date
  deletedAt: Date | null
  expires: Date
}

/**
 * Model Team
 * 
 */
export type Team = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
}

/**
 * Model TeamWebsite
 * 
 */
export type TeamWebsite = {
  id: string
  createdAt: Date
  updatedAt: Date
  teamId: string
  websiteId: string
}

/**
 * Model TeamUser
 * 
 */
export type TeamUser = {
  id: string
  teamId: string
  userId: string
  role: ROLE
  accepted: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * Model TeamUserInvite
 * 
 */
export type TeamUserInvite = {
  id: string
  teamId: string
  userId: string
  teamUserId: string
  token: string
  status: INVITE_STATUS
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Disallowed
 * 
 */
export type Disallowed = {
  id: string
  identity: string
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const INVITE_STATUS: {
  sent: 'sent',
  accepted: 'accepted',
  expired: 'expired'
};

export type INVITE_STATUS = (typeof INVITE_STATUS)[keyof typeof INVITE_STATUS]


export const ROLE: {
  owner: 'owner',
  admin: 'admin',
  viewer: 'viewer'
};

export type ROLE = (typeof ROLE)[keyof typeof ROLE]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<this, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>

      /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<GlobalReject>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<GlobalReject>;

  /**
   * `prisma.website`: Exposes CRUD operations for the **Website** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Websites
    * const websites = await prisma.website.findMany()
    * ```
    */
  get website(): Prisma.WebsiteDelegate<GlobalReject>;

  /**
   * `prisma.webVisitor`: Exposes CRUD operations for the **WebVisitor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebVisitors
    * const webVisitors = await prisma.webVisitor.findMany()
    * ```
    */
  get webVisitor(): Prisma.WebVisitorDelegate<GlobalReject>;

  /**
   * `prisma.webSession`: Exposes CRUD operations for the **WebSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebSessions
    * const webSessions = await prisma.webSession.findMany()
    * ```
    */
  get webSession(): Prisma.WebSessionDelegate<GlobalReject>;

  /**
   * `prisma.webPageview`: Exposes CRUD operations for the **WebPageview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebPageviews
    * const webPageviews = await prisma.webPageview.findMany()
    * ```
    */
  get webPageview(): Prisma.WebPageviewDelegate<GlobalReject>;

  /**
   * `prisma.webEvent`: Exposes CRUD operations for the **WebEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebEvents
    * const webEvents = await prisma.webEvent.findMany()
    * ```
    */
  get webEvent(): Prisma.WebEventDelegate<GlobalReject>;

  /**
   * `prisma.apiKey`: Exposes CRUD operations for the **ApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeys
    * const apiKeys = await prisma.apiKey.findMany()
    * ```
    */
  get apiKey(): Prisma.ApiKeyDelegate<GlobalReject>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<GlobalReject>;

  /**
   * `prisma.teamWebsite`: Exposes CRUD operations for the **TeamWebsite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamWebsites
    * const teamWebsites = await prisma.teamWebsite.findMany()
    * ```
    */
  get teamWebsite(): Prisma.TeamWebsiteDelegate<GlobalReject>;

  /**
   * `prisma.teamUser`: Exposes CRUD operations for the **TeamUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamUsers
    * const teamUsers = await prisma.teamUser.findMany()
    * ```
    */
  get teamUser(): Prisma.TeamUserDelegate<GlobalReject>;

  /**
   * `prisma.teamUserInvite`: Exposes CRUD operations for the **TeamUserInvite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamUserInvites
    * const teamUserInvites = await prisma.teamUserInvite.findMany()
    * ```
    */
  get teamUserInvite(): Prisma.TeamUserInviteDelegate<GlobalReject>;

  /**
   * `prisma.disallowed`: Exposes CRUD operations for the **Disallowed** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Disalloweds
    * const disalloweds = await prisma.disallowed.findMany()
    * ```
    */
  get disallowed(): Prisma.DisallowedDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.14.0
   * Query Engine version: d9a4c5988f480fa576d43970d5a23641aa77bc9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Account: 'Account',
    Session: 'Session',
    User: 'User',
    VerificationToken: 'VerificationToken',
    Website: 'Website',
    WebVisitor: 'WebVisitor',
    WebSession: 'WebSession',
    WebPageview: 'WebPageview',
    WebEvent: 'WebEvent',
    ApiKey: 'ApiKey',
    Team: 'Team',
    TeamWebsite: 'TeamWebsite',
    TeamUser: 'TeamUser',
    TeamUserInvite: 'TeamUserInvite',
    Disallowed: 'Disallowed'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    accounts: number
    sessions: number
    Website: number
    ApiKey: number
    TeamUser: number
    TeamUserInvite: number
  }

  export type UserCountOutputTypeSelect = {
    accounts?: boolean
    sessions?: boolean
    Website?: boolean
    ApiKey?: boolean
    TeamUser?: boolean
    TeamUserInvite?: boolean
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type WebsiteCountOutputType
   */


  export type WebsiteCountOutputType = {
    WebVisitor: number
    WebSession: number
    WebPageview: number
    WebEvent: number
    ApiKey: number
    TeamWebsite: number
  }

  export type WebsiteCountOutputTypeSelect = {
    WebVisitor?: boolean
    WebSession?: boolean
    WebPageview?: boolean
    WebEvent?: boolean
    ApiKey?: boolean
    TeamWebsite?: boolean
  }

  export type WebsiteCountOutputTypeGetPayload<S extends boolean | null | undefined | WebsiteCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? WebsiteCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (WebsiteCountOutputTypeArgs)
    ? WebsiteCountOutputType 
    : S extends { select: any } & (WebsiteCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof WebsiteCountOutputType ? WebsiteCountOutputType[P] : never
  } 
      : WebsiteCountOutputType




  // Custom InputTypes

  /**
   * WebsiteCountOutputType without action
   */
  export type WebsiteCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the WebsiteCountOutputType
     */
    select?: WebsiteCountOutputTypeSelect | null
  }



  /**
   * Count Type WebVisitorCountOutputType
   */


  export type WebVisitorCountOutputType = {
    Session: number
    Pageview: number
    WebEvent: number
  }

  export type WebVisitorCountOutputTypeSelect = {
    Session?: boolean
    Pageview?: boolean
    WebEvent?: boolean
  }

  export type WebVisitorCountOutputTypeGetPayload<S extends boolean | null | undefined | WebVisitorCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? WebVisitorCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (WebVisitorCountOutputTypeArgs)
    ? WebVisitorCountOutputType 
    : S extends { select: any } & (WebVisitorCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof WebVisitorCountOutputType ? WebVisitorCountOutputType[P] : never
  } 
      : WebVisitorCountOutputType




  // Custom InputTypes

  /**
   * WebVisitorCountOutputType without action
   */
  export type WebVisitorCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the WebVisitorCountOutputType
     */
    select?: WebVisitorCountOutputTypeSelect | null
  }



  /**
   * Count Type WebSessionCountOutputType
   */


  export type WebSessionCountOutputType = {
    WebPage: number
    WebEvent: number
  }

  export type WebSessionCountOutputTypeSelect = {
    WebPage?: boolean
    WebEvent?: boolean
  }

  export type WebSessionCountOutputTypeGetPayload<S extends boolean | null | undefined | WebSessionCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? WebSessionCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (WebSessionCountOutputTypeArgs)
    ? WebSessionCountOutputType 
    : S extends { select: any } & (WebSessionCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof WebSessionCountOutputType ? WebSessionCountOutputType[P] : never
  } 
      : WebSessionCountOutputType




  // Custom InputTypes

  /**
   * WebSessionCountOutputType without action
   */
  export type WebSessionCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the WebSessionCountOutputType
     */
    select?: WebSessionCountOutputTypeSelect | null
  }



  /**
   * Count Type WebPageviewCountOutputType
   */


  export type WebPageviewCountOutputType = {
    Event: number
  }

  export type WebPageviewCountOutputTypeSelect = {
    Event?: boolean
  }

  export type WebPageviewCountOutputTypeGetPayload<S extends boolean | null | undefined | WebPageviewCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? WebPageviewCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (WebPageviewCountOutputTypeArgs)
    ? WebPageviewCountOutputType 
    : S extends { select: any } & (WebPageviewCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof WebPageviewCountOutputType ? WebPageviewCountOutputType[P] : never
  } 
      : WebPageviewCountOutputType




  // Custom InputTypes

  /**
   * WebPageviewCountOutputType without action
   */
  export type WebPageviewCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the WebPageviewCountOutputType
     */
    select?: WebPageviewCountOutputTypeSelect | null
  }



  /**
   * Count Type TeamCountOutputType
   */


  export type TeamCountOutputType = {
    TeamWebsite: number
    TeamUser: number
    TeamUserInvite: number
  }

  export type TeamCountOutputTypeSelect = {
    TeamWebsite?: boolean
    TeamUser?: boolean
    TeamUserInvite?: boolean
  }

  export type TeamCountOutputTypeGetPayload<S extends boolean | null | undefined | TeamCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TeamCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (TeamCountOutputTypeArgs)
    ? TeamCountOutputType 
    : S extends { select: any } & (TeamCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof TeamCountOutputType ? TeamCountOutputType[P] : never
  } 
      : TeamCountOutputType




  // Custom InputTypes

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect | null
  }



  /**
   * Count Type TeamUserCountOutputType
   */


  export type TeamUserCountOutputType = {
    TeamUserInvite: number
  }

  export type TeamUserCountOutputTypeSelect = {
    TeamUserInvite?: boolean
  }

  export type TeamUserCountOutputTypeGetPayload<S extends boolean | null | undefined | TeamUserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TeamUserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (TeamUserCountOutputTypeArgs)
    ? TeamUserCountOutputType 
    : S extends { select: any } & (TeamUserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof TeamUserCountOutputType ? TeamUserCountOutputType[P] : never
  } 
      : TeamUserCountOutputType




  // Custom InputTypes

  /**
   * TeamUserCountOutputType without action
   */
  export type TeamUserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the TeamUserCountOutputType
     */
    select?: TeamUserCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Account
   */


  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs = {
    where?: AccountWhereInput
    orderBy?: Enumerable<AccountOrderByWithAggregationInput>
    by: AccountScalarFieldEnum[]
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }


  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserArgs
  }


  export type AccountInclude = {
    user?: boolean | UserArgs
  }

  export type AccountGetPayload<S extends boolean | null | undefined | AccountArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Account :
    S extends undefined ? never :
    S extends { include: any } & (AccountArgs | AccountFindManyArgs)
    ? Account  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (AccountArgs | AccountFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Account ? Account[P] : never
  } 
      : Account


  type AccountCountArgs = 
    Omit<AccountFindManyArgs, 'select' | 'include'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AccountFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AccountFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Account'> extends True ? Prisma__AccountClient<AccountGetPayload<T>> : Prisma__AccountClient<AccountGetPayload<T> | null, null>

    /**
     * Find one Account that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AccountFindUniqueOrThrowArgs>
    ): Prisma__AccountClient<AccountGetPayload<T>>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AccountFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AccountFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Account'> extends True ? Prisma__AccountClient<AccountGetPayload<T>> : Prisma__AccountClient<AccountGetPayload<T> | null, null>

    /**
     * Find the first Account that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccountFindFirstOrThrowArgs>
    ): Prisma__AccountClient<AccountGetPayload<T>>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AccountFindManyArgs>(
      args?: SelectSubset<T, AccountFindManyArgs>
    ): Prisma.PrismaPromise<Array<AccountGetPayload<T>>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
    **/
    create<T extends AccountCreateArgs>(
      args: SelectSubset<T, AccountCreateArgs>
    ): Prisma__AccountClient<AccountGetPayload<T>>

    /**
     * Create many Accounts.
     *     @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     *     @example
     *     // Create many Accounts
     *     const account = await prisma.account.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AccountCreateManyArgs>(
      args?: SelectSubset<T, AccountCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
    **/
    delete<T extends AccountDeleteArgs>(
      args: SelectSubset<T, AccountDeleteArgs>
    ): Prisma__AccountClient<AccountGetPayload<T>>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AccountUpdateArgs>(
      args: SelectSubset<T, AccountUpdateArgs>
    ): Prisma__AccountClient<AccountGetPayload<T>>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AccountDeleteManyArgs>(
      args?: SelectSubset<T, AccountDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AccountUpdateManyArgs>(
      args: SelectSubset<T, AccountUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
    **/
    upsert<T extends AccountUpsertArgs>(
      args: SelectSubset<T, AccountUpsertArgs>
    ): Prisma__AccountClient<AccountGetPayload<T>>

    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AccountClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Account base type for findUnique actions
   */
  export type AccountFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUnique
   */
  export interface AccountFindUniqueArgs extends AccountFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }


  /**
   * Account base type for findFirst actions
   */
  export type AccountFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: Enumerable<AccountScalarFieldEnum>
  }

  /**
   * Account findFirst
   */
  export interface AccountFindFirstArgs extends AccountFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * Account findMany
   */
  export type AccountFindManyArgs = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * Account create
   */
  export type AccountCreateArgs = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }


  /**
   * Account createMany
   */
  export type AccountCreateManyArgs = {
    /**
     * The data used to create many Accounts.
     */
    data: Enumerable<AccountCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Account update
   */
  export type AccountUpdateArgs = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }


  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
  }


  /**
   * Account upsert
   */
  export type AccountUpsertArgs = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }


  /**
   * Account delete
   */
  export type AccountDeleteArgs = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }


  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
  }


  /**
   * Account without action
   */
  export type AccountArgs = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude | null
  }



  /**
   * Model Session
   */


  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs = {
    where?: SessionWhereInput
    orderBy?: Enumerable<SessionOrderByWithAggregationInput>
    by: SessionScalarFieldEnum[]
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }


  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserArgs
  }


  export type SessionInclude = {
    user?: boolean | UserArgs
  }

  export type SessionGetPayload<S extends boolean | null | undefined | SessionArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Session :
    S extends undefined ? never :
    S extends { include: any } & (SessionArgs | SessionFindManyArgs)
    ? Session  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (SessionArgs | SessionFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Session ? Session[P] : never
  } 
      : Session


  type SessionCountArgs = 
    Omit<SessionFindManyArgs, 'select' | 'include'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SessionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SessionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Session'> extends True ? Prisma__SessionClient<SessionGetPayload<T>> : Prisma__SessionClient<SessionGetPayload<T> | null, null>

    /**
     * Find one Session that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, SessionFindUniqueOrThrowArgs>
    ): Prisma__SessionClient<SessionGetPayload<T>>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SessionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SessionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Session'> extends True ? Prisma__SessionClient<SessionGetPayload<T>> : Prisma__SessionClient<SessionGetPayload<T> | null, null>

    /**
     * Find the first Session that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs>
    ): Prisma__SessionClient<SessionGetPayload<T>>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs>
    ): Prisma.PrismaPromise<Array<SessionGetPayload<T>>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
    **/
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs>
    ): Prisma__SessionClient<SessionGetPayload<T>>

    /**
     * Create many Sessions.
     *     @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     *     @example
     *     // Create many Sessions
     *     const session = await prisma.session.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
    **/
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs>
    ): Prisma__SessionClient<SessionGetPayload<T>>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs>
    ): Prisma__SessionClient<SessionGetPayload<T>>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
    **/
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs>
    ): Prisma__SessionClient<SessionGetPayload<T>>

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SessionClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Session base type for findUnique actions
   */
  export type SessionFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUnique
   */
  export interface SessionFindUniqueArgs extends SessionFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }


  /**
   * Session base type for findFirst actions
   */
  export type SessionFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: Enumerable<SessionScalarFieldEnum>
  }

  /**
   * Session findFirst
   */
  export interface SessionFindFirstArgs extends SessionFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * Session findMany
   */
  export type SessionFindManyArgs = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * Session create
   */
  export type SessionCreateArgs = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }


  /**
   * Session createMany
   */
  export type SessionCreateManyArgs = {
    /**
     * The data used to create many Sessions.
     */
    data: Enumerable<SessionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Session update
   */
  export type SessionUpdateArgs = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }


  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }


  /**
   * Session upsert
   */
  export type SessionUpsertArgs = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }


  /**
   * Session delete
   */
  export type SessionDeleteArgs = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }


  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }


  /**
   * Session without action
   */
  export type SessionArgs = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripePriceId: string | null
    stripeCurrentPeriodEnd: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripePriceId: string | null
    stripeCurrentPeriodEnd: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    stripeCustomerId: number
    stripeSubscriptionId: number
    stripePriceId: number
    stripeCurrentPeriodEnd: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripePriceId?: true
    stripeCurrentPeriodEnd?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripePriceId?: true
    stripeCurrentPeriodEnd?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripePriceId?: true
    stripeCurrentPeriodEnd?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripePriceId: string | null
    stripeCurrentPeriodEnd: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripePriceId?: boolean
    stripeCurrentPeriodEnd?: boolean
    accounts?: boolean | User$accountsArgs
    sessions?: boolean | User$sessionsArgs
    Website?: boolean | User$WebsiteArgs
    ApiKey?: boolean | User$ApiKeyArgs
    TeamUser?: boolean | User$TeamUserArgs
    TeamUserInvite?: boolean | User$TeamUserInviteArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    accounts?: boolean | User$accountsArgs
    sessions?: boolean | User$sessionsArgs
    Website?: boolean | User$WebsiteArgs
    ApiKey?: boolean | User$ApiKeyArgs
    TeamUser?: boolean | User$TeamUserArgs
    TeamUserInvite?: boolean | User$TeamUserInviteArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'accounts' ? Array < AccountGetPayload<S['include'][P]>>  :
        P extends 'sessions' ? Array < SessionGetPayload<S['include'][P]>>  :
        P extends 'Website' ? Array < WebsiteGetPayload<S['include'][P]>>  :
        P extends 'ApiKey' ? Array < ApiKeyGetPayload<S['include'][P]>>  :
        P extends 'TeamUser' ? Array < TeamUserGetPayload<S['include'][P]>>  :
        P extends 'TeamUserInvite' ? Array < TeamUserInviteGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'accounts' ? Array < AccountGetPayload<S['select'][P]>>  :
        P extends 'sessions' ? Array < SessionGetPayload<S['select'][P]>>  :
        P extends 'Website' ? Array < WebsiteGetPayload<S['select'][P]>>  :
        P extends 'ApiKey' ? Array < ApiKeyGetPayload<S['select'][P]>>  :
        P extends 'TeamUser' ? Array < TeamUserGetPayload<S['select'][P]>>  :
        P extends 'TeamUserInvite' ? Array < TeamUserInviteGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): Prisma.PrismaPromise<Array<UserGetPayload<T>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    accounts<T extends User$accountsArgs= {}>(args?: Subset<T, User$accountsArgs>): Prisma.PrismaPromise<Array<AccountGetPayload<T>>| Null>;

    sessions<T extends User$sessionsArgs= {}>(args?: Subset<T, User$sessionsArgs>): Prisma.PrismaPromise<Array<SessionGetPayload<T>>| Null>;

    Website<T extends User$WebsiteArgs= {}>(args?: Subset<T, User$WebsiteArgs>): Prisma.PrismaPromise<Array<WebsiteGetPayload<T>>| Null>;

    ApiKey<T extends User$ApiKeyArgs= {}>(args?: Subset<T, User$ApiKeyArgs>): Prisma.PrismaPromise<Array<ApiKeyGetPayload<T>>| Null>;

    TeamUser<T extends User$TeamUserArgs= {}>(args?: Subset<T, User$TeamUserArgs>): Prisma.PrismaPromise<Array<TeamUserGetPayload<T>>| Null>;

    TeamUserInvite<T extends User$TeamUserInviteArgs= {}>(args?: Subset<T, User$TeamUserInviteArgs>): Prisma.PrismaPromise<Array<TeamUserInviteGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     */
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.accounts
   */
  export type User$accountsArgs = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude | null
    where?: AccountWhereInput
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * User.sessions
   */
  export type User$sessionsArgs = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude | null
    where?: SessionWhereInput
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * User.Website
   */
  export type User$WebsiteArgs = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude | null
    where?: WebsiteWhereInput
    orderBy?: Enumerable<WebsiteOrderByWithRelationInput>
    cursor?: WebsiteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WebsiteScalarFieldEnum>
  }


  /**
   * User.ApiKey
   */
  export type User$ApiKeyArgs = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ApiKeyInclude | null
    where?: ApiKeyWhereInput
    orderBy?: Enumerable<ApiKeyOrderByWithRelationInput>
    cursor?: ApiKeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ApiKeyScalarFieldEnum>
  }


  /**
   * User.TeamUser
   */
  export type User$TeamUserArgs = {
    /**
     * Select specific fields to fetch from the TeamUser
     */
    select?: TeamUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInclude | null
    where?: TeamUserWhereInput
    orderBy?: Enumerable<TeamUserOrderByWithRelationInput>
    cursor?: TeamUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TeamUserScalarFieldEnum>
  }


  /**
   * User.TeamUserInvite
   */
  export type User$TeamUserInviteArgs = {
    /**
     * Select specific fields to fetch from the TeamUserInvite
     */
    select?: TeamUserInviteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInviteInclude | null
    where?: TeamUserInviteWhereInput
    orderBy?: Enumerable<TeamUserInviteOrderByWithRelationInput>
    cursor?: TeamUserInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TeamUserInviteScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
  }



  /**
   * Model VerificationToken
   */


  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs = {
    where?: VerificationTokenWhereInput
    orderBy?: Enumerable<VerificationTokenOrderByWithAggregationInput>
    by: VerificationTokenScalarFieldEnum[]
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }


  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }


  export type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? VerificationToken :
    S extends undefined ? never :
    S extends { include: any } & (VerificationTokenArgs | VerificationTokenFindManyArgs)
    ? VerificationToken 
    : S extends { select: any } & (VerificationTokenArgs | VerificationTokenFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof VerificationToken ? VerificationToken[P] : never
  } 
      : VerificationToken


  type VerificationTokenCountArgs = 
    Omit<VerificationTokenFindManyArgs, 'select' | 'include'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends VerificationTokenFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, VerificationTokenFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'VerificationToken'> extends True ? Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>> : Prisma__VerificationTokenClient<VerificationTokenGetPayload<T> | null, null>

    /**
     * Find one VerificationToken that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs>
    ): Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends VerificationTokenFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, VerificationTokenFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'VerificationToken'> extends True ? Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>> : Prisma__VerificationTokenClient<VerificationTokenGetPayload<T> | null, null>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs>
    ): Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
    **/
    findMany<T extends VerificationTokenFindManyArgs>(
      args?: SelectSubset<T, VerificationTokenFindManyArgs>
    ): Prisma.PrismaPromise<Array<VerificationTokenGetPayload<T>>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
    **/
    create<T extends VerificationTokenCreateArgs>(
      args: SelectSubset<T, VerificationTokenCreateArgs>
    ): Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>

    /**
     * Create many VerificationTokens.
     *     @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     *     @example
     *     // Create many VerificationTokens
     *     const verificationToken = await prisma.verificationToken.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends VerificationTokenCreateManyArgs>(
      args?: SelectSubset<T, VerificationTokenCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
    **/
    delete<T extends VerificationTokenDeleteArgs>(
      args: SelectSubset<T, VerificationTokenDeleteArgs>
    ): Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends VerificationTokenUpdateArgs>(
      args: SelectSubset<T, VerificationTokenUpdateArgs>
    ): Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends VerificationTokenDeleteManyArgs>(
      args?: SelectSubset<T, VerificationTokenDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends VerificationTokenUpdateManyArgs>(
      args: SelectSubset<T, VerificationTokenUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
    **/
    upsert<T extends VerificationTokenUpsertArgs>(
      args: SelectSubset<T, VerificationTokenUpsertArgs>
    ): Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>

    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__VerificationTokenClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * VerificationToken base type for findUnique actions
   */
  export type VerificationTokenFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUnique
   */
  export interface VerificationTokenFindUniqueArgs extends VerificationTokenFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken base type for findFirst actions
   */
  export type VerificationTokenFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }

  /**
   * VerificationToken findFirst
   */
  export interface VerificationTokenFindFirstArgs extends VerificationTokenFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }


  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }


  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }


  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: Enumerable<VerificationTokenCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }


  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken without action
   */
  export type VerificationTokenArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect | null
  }



  /**
   * Model Website
   */


  export type AggregateWebsite = {
    _count: WebsiteCountAggregateOutputType | null
    _min: WebsiteMinAggregateOutputType | null
    _max: WebsiteMaxAggregateOutputType | null
  }

  export type WebsiteMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    url: string | null
    title: string | null
    userId: string | null
    active: boolean | null
  }

  export type WebsiteMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    url: string | null
    title: string | null
    userId: string | null
    active: boolean | null
  }

  export type WebsiteCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    url: number
    title: number
    userId: number
    active: number
    _all: number
  }


  export type WebsiteMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    url?: true
    title?: true
    userId?: true
    active?: true
  }

  export type WebsiteMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    url?: true
    title?: true
    userId?: true
    active?: true
  }

  export type WebsiteCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    url?: true
    title?: true
    userId?: true
    active?: true
    _all?: true
  }

  export type WebsiteAggregateArgs = {
    /**
     * Filter which Website to aggregate.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: Enumerable<WebsiteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Websites
    **/
    _count?: true | WebsiteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebsiteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebsiteMaxAggregateInputType
  }

  export type GetWebsiteAggregateType<T extends WebsiteAggregateArgs> = {
        [P in keyof T & keyof AggregateWebsite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebsite[P]>
      : GetScalarType<T[P], AggregateWebsite[P]>
  }




  export type WebsiteGroupByArgs = {
    where?: WebsiteWhereInput
    orderBy?: Enumerable<WebsiteOrderByWithAggregationInput>
    by: WebsiteScalarFieldEnum[]
    having?: WebsiteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebsiteCountAggregateInputType | true
    _min?: WebsiteMinAggregateInputType
    _max?: WebsiteMaxAggregateInputType
  }


  export type WebsiteGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    url: string
    title: string | null
    userId: string
    active: boolean
    _count: WebsiteCountAggregateOutputType | null
    _min: WebsiteMinAggregateOutputType | null
    _max: WebsiteMaxAggregateOutputType | null
  }

  type GetWebsiteGroupByPayload<T extends WebsiteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<WebsiteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebsiteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebsiteGroupByOutputType[P]>
            : GetScalarType<T[P], WebsiteGroupByOutputType[P]>
        }
      >
    >


  export type WebsiteSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    url?: boolean
    title?: boolean
    userId?: boolean
    active?: boolean
    User?: boolean | UserArgs
    WebVisitor?: boolean | Website$WebVisitorArgs
    WebSession?: boolean | Website$WebSessionArgs
    WebPageview?: boolean | Website$WebPageviewArgs
    WebEvent?: boolean | Website$WebEventArgs
    ApiKey?: boolean | Website$ApiKeyArgs
    TeamWebsite?: boolean | Website$TeamWebsiteArgs
    _count?: boolean | WebsiteCountOutputTypeArgs
  }


  export type WebsiteInclude = {
    User?: boolean | UserArgs
    WebVisitor?: boolean | Website$WebVisitorArgs
    WebSession?: boolean | Website$WebSessionArgs
    WebPageview?: boolean | Website$WebPageviewArgs
    WebEvent?: boolean | Website$WebEventArgs
    ApiKey?: boolean | Website$ApiKeyArgs
    TeamWebsite?: boolean | Website$TeamWebsiteArgs
    _count?: boolean | WebsiteCountOutputTypeArgs
  }

  export type WebsiteGetPayload<S extends boolean | null | undefined | WebsiteArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Website :
    S extends undefined ? never :
    S extends { include: any } & (WebsiteArgs | WebsiteFindManyArgs)
    ? Website  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'User' ? UserGetPayload<S['include'][P]> :
        P extends 'WebVisitor' ? Array < WebVisitorGetPayload<S['include'][P]>>  :
        P extends 'WebSession' ? Array < WebSessionGetPayload<S['include'][P]>>  :
        P extends 'WebPageview' ? Array < WebPageviewGetPayload<S['include'][P]>>  :
        P extends 'WebEvent' ? Array < WebEventGetPayload<S['include'][P]>>  :
        P extends 'ApiKey' ? Array < ApiKeyGetPayload<S['include'][P]>>  :
        P extends 'TeamWebsite' ? Array < TeamWebsiteGetPayload<S['include'][P]>>  :
        P extends '_count' ? WebsiteCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (WebsiteArgs | WebsiteFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'User' ? UserGetPayload<S['select'][P]> :
        P extends 'WebVisitor' ? Array < WebVisitorGetPayload<S['select'][P]>>  :
        P extends 'WebSession' ? Array < WebSessionGetPayload<S['select'][P]>>  :
        P extends 'WebPageview' ? Array < WebPageviewGetPayload<S['select'][P]>>  :
        P extends 'WebEvent' ? Array < WebEventGetPayload<S['select'][P]>>  :
        P extends 'ApiKey' ? Array < ApiKeyGetPayload<S['select'][P]>>  :
        P extends 'TeamWebsite' ? Array < TeamWebsiteGetPayload<S['select'][P]>>  :
        P extends '_count' ? WebsiteCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Website ? Website[P] : never
  } 
      : Website


  type WebsiteCountArgs = 
    Omit<WebsiteFindManyArgs, 'select' | 'include'> & {
      select?: WebsiteCountAggregateInputType | true
    }

  export interface WebsiteDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Website that matches the filter.
     * @param {WebsiteFindUniqueArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WebsiteFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WebsiteFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Website'> extends True ? Prisma__WebsiteClient<WebsiteGetPayload<T>> : Prisma__WebsiteClient<WebsiteGetPayload<T> | null, null>

    /**
     * Find one Website that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WebsiteFindUniqueOrThrowArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WebsiteFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, WebsiteFindUniqueOrThrowArgs>
    ): Prisma__WebsiteClient<WebsiteGetPayload<T>>

    /**
     * Find the first Website that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteFindFirstArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WebsiteFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WebsiteFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Website'> extends True ? Prisma__WebsiteClient<WebsiteGetPayload<T>> : Prisma__WebsiteClient<WebsiteGetPayload<T> | null, null>

    /**
     * Find the first Website that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteFindFirstOrThrowArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WebsiteFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WebsiteFindFirstOrThrowArgs>
    ): Prisma__WebsiteClient<WebsiteGetPayload<T>>

    /**
     * Find zero or more Websites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Websites
     * const websites = await prisma.website.findMany()
     * 
     * // Get first 10 Websites
     * const websites = await prisma.website.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const websiteWithIdOnly = await prisma.website.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WebsiteFindManyArgs>(
      args?: SelectSubset<T, WebsiteFindManyArgs>
    ): Prisma.PrismaPromise<Array<WebsiteGetPayload<T>>>

    /**
     * Create a Website.
     * @param {WebsiteCreateArgs} args - Arguments to create a Website.
     * @example
     * // Create one Website
     * const Website = await prisma.website.create({
     *   data: {
     *     // ... data to create a Website
     *   }
     * })
     * 
    **/
    create<T extends WebsiteCreateArgs>(
      args: SelectSubset<T, WebsiteCreateArgs>
    ): Prisma__WebsiteClient<WebsiteGetPayload<T>>

    /**
     * Create many Websites.
     *     @param {WebsiteCreateManyArgs} args - Arguments to create many Websites.
     *     @example
     *     // Create many Websites
     *     const website = await prisma.website.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WebsiteCreateManyArgs>(
      args?: SelectSubset<T, WebsiteCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Website.
     * @param {WebsiteDeleteArgs} args - Arguments to delete one Website.
     * @example
     * // Delete one Website
     * const Website = await prisma.website.delete({
     *   where: {
     *     // ... filter to delete one Website
     *   }
     * })
     * 
    **/
    delete<T extends WebsiteDeleteArgs>(
      args: SelectSubset<T, WebsiteDeleteArgs>
    ): Prisma__WebsiteClient<WebsiteGetPayload<T>>

    /**
     * Update one Website.
     * @param {WebsiteUpdateArgs} args - Arguments to update one Website.
     * @example
     * // Update one Website
     * const website = await prisma.website.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WebsiteUpdateArgs>(
      args: SelectSubset<T, WebsiteUpdateArgs>
    ): Prisma__WebsiteClient<WebsiteGetPayload<T>>

    /**
     * Delete zero or more Websites.
     * @param {WebsiteDeleteManyArgs} args - Arguments to filter Websites to delete.
     * @example
     * // Delete a few Websites
     * const { count } = await prisma.website.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WebsiteDeleteManyArgs>(
      args?: SelectSubset<T, WebsiteDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Websites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Websites
     * const website = await prisma.website.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WebsiteUpdateManyArgs>(
      args: SelectSubset<T, WebsiteUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Website.
     * @param {WebsiteUpsertArgs} args - Arguments to update or create a Website.
     * @example
     * // Update or create a Website
     * const website = await prisma.website.upsert({
     *   create: {
     *     // ... data to create a Website
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Website we want to update
     *   }
     * })
    **/
    upsert<T extends WebsiteUpsertArgs>(
      args: SelectSubset<T, WebsiteUpsertArgs>
    ): Prisma__WebsiteClient<WebsiteGetPayload<T>>

    /**
     * Count the number of Websites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteCountArgs} args - Arguments to filter Websites to count.
     * @example
     * // Count the number of Websites
     * const count = await prisma.website.count({
     *   where: {
     *     // ... the filter for the Websites we want to count
     *   }
     * })
    **/
    count<T extends WebsiteCountArgs>(
      args?: Subset<T, WebsiteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebsiteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Website.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebsiteAggregateArgs>(args: Subset<T, WebsiteAggregateArgs>): Prisma.PrismaPromise<GetWebsiteAggregateType<T>>

    /**
     * Group by Website.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebsiteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebsiteGroupByArgs['orderBy'] }
        : { orderBy?: WebsiteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebsiteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebsiteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Website.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WebsiteClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    User<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    WebVisitor<T extends Website$WebVisitorArgs= {}>(args?: Subset<T, Website$WebVisitorArgs>): Prisma.PrismaPromise<Array<WebVisitorGetPayload<T>>| Null>;

    WebSession<T extends Website$WebSessionArgs= {}>(args?: Subset<T, Website$WebSessionArgs>): Prisma.PrismaPromise<Array<WebSessionGetPayload<T>>| Null>;

    WebPageview<T extends Website$WebPageviewArgs= {}>(args?: Subset<T, Website$WebPageviewArgs>): Prisma.PrismaPromise<Array<WebPageviewGetPayload<T>>| Null>;

    WebEvent<T extends Website$WebEventArgs= {}>(args?: Subset<T, Website$WebEventArgs>): Prisma.PrismaPromise<Array<WebEventGetPayload<T>>| Null>;

    ApiKey<T extends Website$ApiKeyArgs= {}>(args?: Subset<T, Website$ApiKeyArgs>): Prisma.PrismaPromise<Array<ApiKeyGetPayload<T>>| Null>;

    TeamWebsite<T extends Website$TeamWebsiteArgs= {}>(args?: Subset<T, Website$TeamWebsiteArgs>): Prisma.PrismaPromise<Array<TeamWebsiteGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Website base type for findUnique actions
   */
  export type WebsiteFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude | null
    /**
     * Filter, which Website to fetch.
     */
    where: WebsiteWhereUniqueInput
  }

  /**
   * Website findUnique
   */
  export interface WebsiteFindUniqueArgs extends WebsiteFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Website findUniqueOrThrow
   */
  export type WebsiteFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude | null
    /**
     * Filter, which Website to fetch.
     */
    where: WebsiteWhereUniqueInput
  }


  /**
   * Website base type for findFirst actions
   */
  export type WebsiteFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude | null
    /**
     * Filter, which Website to fetch.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: Enumerable<WebsiteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Websites.
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Websites.
     */
    distinct?: Enumerable<WebsiteScalarFieldEnum>
  }

  /**
   * Website findFirst
   */
  export interface WebsiteFindFirstArgs extends WebsiteFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Website findFirstOrThrow
   */
  export type WebsiteFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude | null
    /**
     * Filter, which Website to fetch.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: Enumerable<WebsiteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Websites.
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Websites.
     */
    distinct?: Enumerable<WebsiteScalarFieldEnum>
  }


  /**
   * Website findMany
   */
  export type WebsiteFindManyArgs = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude | null
    /**
     * Filter, which Websites to fetch.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: Enumerable<WebsiteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Websites.
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    distinct?: Enumerable<WebsiteScalarFieldEnum>
  }


  /**
   * Website create
   */
  export type WebsiteCreateArgs = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude | null
    /**
     * The data needed to create a Website.
     */
    data: XOR<WebsiteCreateInput, WebsiteUncheckedCreateInput>
  }


  /**
   * Website createMany
   */
  export type WebsiteCreateManyArgs = {
    /**
     * The data used to create many Websites.
     */
    data: Enumerable<WebsiteCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Website update
   */
  export type WebsiteUpdateArgs = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude | null
    /**
     * The data needed to update a Website.
     */
    data: XOR<WebsiteUpdateInput, WebsiteUncheckedUpdateInput>
    /**
     * Choose, which Website to update.
     */
    where: WebsiteWhereUniqueInput
  }


  /**
   * Website updateMany
   */
  export type WebsiteUpdateManyArgs = {
    /**
     * The data used to update Websites.
     */
    data: XOR<WebsiteUpdateManyMutationInput, WebsiteUncheckedUpdateManyInput>
    /**
     * Filter which Websites to update
     */
    where?: WebsiteWhereInput
  }


  /**
   * Website upsert
   */
  export type WebsiteUpsertArgs = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude | null
    /**
     * The filter to search for the Website to update in case it exists.
     */
    where: WebsiteWhereUniqueInput
    /**
     * In case the Website found by the `where` argument doesn't exist, create a new Website with this data.
     */
    create: XOR<WebsiteCreateInput, WebsiteUncheckedCreateInput>
    /**
     * In case the Website was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebsiteUpdateInput, WebsiteUncheckedUpdateInput>
  }


  /**
   * Website delete
   */
  export type WebsiteDeleteArgs = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude | null
    /**
     * Filter which Website to delete.
     */
    where: WebsiteWhereUniqueInput
  }


  /**
   * Website deleteMany
   */
  export type WebsiteDeleteManyArgs = {
    /**
     * Filter which Websites to delete
     */
    where?: WebsiteWhereInput
  }


  /**
   * Website.WebVisitor
   */
  export type Website$WebVisitorArgs = {
    /**
     * Select specific fields to fetch from the WebVisitor
     */
    select?: WebVisitorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebVisitorInclude | null
    where?: WebVisitorWhereInput
    orderBy?: Enumerable<WebVisitorOrderByWithRelationInput>
    cursor?: WebVisitorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WebVisitorScalarFieldEnum>
  }


  /**
   * Website.WebSession
   */
  export type Website$WebSessionArgs = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebSessionInclude | null
    where?: WebSessionWhereInput
    orderBy?: Enumerable<WebSessionOrderByWithRelationInput>
    cursor?: WebSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WebSessionScalarFieldEnum>
  }


  /**
   * Website.WebPageview
   */
  export type Website$WebPageviewArgs = {
    /**
     * Select specific fields to fetch from the WebPageview
     */
    select?: WebPageviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebPageviewInclude | null
    where?: WebPageviewWhereInput
    orderBy?: Enumerable<WebPageviewOrderByWithRelationInput>
    cursor?: WebPageviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WebPageviewScalarFieldEnum>
  }


  /**
   * Website.WebEvent
   */
  export type Website$WebEventArgs = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
    where?: WebEventWhereInput
    orderBy?: Enumerable<WebEventOrderByWithRelationInput>
    cursor?: WebEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WebEventScalarFieldEnum>
  }


  /**
   * Website.ApiKey
   */
  export type Website$ApiKeyArgs = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ApiKeyInclude | null
    where?: ApiKeyWhereInput
    orderBy?: Enumerable<ApiKeyOrderByWithRelationInput>
    cursor?: ApiKeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ApiKeyScalarFieldEnum>
  }


  /**
   * Website.TeamWebsite
   */
  export type Website$TeamWebsiteArgs = {
    /**
     * Select specific fields to fetch from the TeamWebsite
     */
    select?: TeamWebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamWebsiteInclude | null
    where?: TeamWebsiteWhereInput
    orderBy?: Enumerable<TeamWebsiteOrderByWithRelationInput>
    cursor?: TeamWebsiteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TeamWebsiteScalarFieldEnum>
  }


  /**
   * Website without action
   */
  export type WebsiteArgs = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude | null
  }



  /**
   * Model WebVisitor
   */


  export type AggregateWebVisitor = {
    _count: WebVisitorCountAggregateOutputType | null
    _min: WebVisitorMinAggregateOutputType | null
    _max: WebVisitorMaxAggregateOutputType | null
  }

  export type WebVisitorMinAggregateOutputType = {
    id: string | null
    data: string | null
    createdAt: Date | null
    updatedAt: Date | null
    websiteId: string | null
  }

  export type WebVisitorMaxAggregateOutputType = {
    id: string | null
    data: string | null
    createdAt: Date | null
    updatedAt: Date | null
    websiteId: string | null
  }

  export type WebVisitorCountAggregateOutputType = {
    id: number
    data: number
    createdAt: number
    updatedAt: number
    websiteId: number
    _all: number
  }


  export type WebVisitorMinAggregateInputType = {
    id?: true
    data?: true
    createdAt?: true
    updatedAt?: true
    websiteId?: true
  }

  export type WebVisitorMaxAggregateInputType = {
    id?: true
    data?: true
    createdAt?: true
    updatedAt?: true
    websiteId?: true
  }

  export type WebVisitorCountAggregateInputType = {
    id?: true
    data?: true
    createdAt?: true
    updatedAt?: true
    websiteId?: true
    _all?: true
  }

  export type WebVisitorAggregateArgs = {
    /**
     * Filter which WebVisitor to aggregate.
     */
    where?: WebVisitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebVisitors to fetch.
     */
    orderBy?: Enumerable<WebVisitorOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebVisitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebVisitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebVisitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebVisitors
    **/
    _count?: true | WebVisitorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebVisitorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebVisitorMaxAggregateInputType
  }

  export type GetWebVisitorAggregateType<T extends WebVisitorAggregateArgs> = {
        [P in keyof T & keyof AggregateWebVisitor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebVisitor[P]>
      : GetScalarType<T[P], AggregateWebVisitor[P]>
  }




  export type WebVisitorGroupByArgs = {
    where?: WebVisitorWhereInput
    orderBy?: Enumerable<WebVisitorOrderByWithAggregationInput>
    by: WebVisitorScalarFieldEnum[]
    having?: WebVisitorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebVisitorCountAggregateInputType | true
    _min?: WebVisitorMinAggregateInputType
    _max?: WebVisitorMaxAggregateInputType
  }


  export type WebVisitorGroupByOutputType = {
    id: string
    data: string
    createdAt: Date
    updatedAt: Date
    websiteId: string
    _count: WebVisitorCountAggregateOutputType | null
    _min: WebVisitorMinAggregateOutputType | null
    _max: WebVisitorMaxAggregateOutputType | null
  }

  type GetWebVisitorGroupByPayload<T extends WebVisitorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<WebVisitorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebVisitorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebVisitorGroupByOutputType[P]>
            : GetScalarType<T[P], WebVisitorGroupByOutputType[P]>
        }
      >
    >


  export type WebVisitorSelect = {
    id?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    websiteId?: boolean
    Session?: boolean | WebVisitor$SessionArgs
    Pageview?: boolean | WebVisitor$PageviewArgs
    WebEvent?: boolean | WebVisitor$WebEventArgs
    Website?: boolean | WebsiteArgs
    _count?: boolean | WebVisitorCountOutputTypeArgs
  }


  export type WebVisitorInclude = {
    Session?: boolean | WebVisitor$SessionArgs
    Pageview?: boolean | WebVisitor$PageviewArgs
    WebEvent?: boolean | WebVisitor$WebEventArgs
    Website?: boolean | WebsiteArgs
    _count?: boolean | WebVisitorCountOutputTypeArgs
  }

  export type WebVisitorGetPayload<S extends boolean | null | undefined | WebVisitorArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? WebVisitor :
    S extends undefined ? never :
    S extends { include: any } & (WebVisitorArgs | WebVisitorFindManyArgs)
    ? WebVisitor  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'Session' ? Array < WebSessionGetPayload<S['include'][P]>>  :
        P extends 'Pageview' ? Array < WebPageviewGetPayload<S['include'][P]>>  :
        P extends 'WebEvent' ? Array < WebEventGetPayload<S['include'][P]>>  :
        P extends 'Website' ? WebsiteGetPayload<S['include'][P]> :
        P extends '_count' ? WebVisitorCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (WebVisitorArgs | WebVisitorFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'Session' ? Array < WebSessionGetPayload<S['select'][P]>>  :
        P extends 'Pageview' ? Array < WebPageviewGetPayload<S['select'][P]>>  :
        P extends 'WebEvent' ? Array < WebEventGetPayload<S['select'][P]>>  :
        P extends 'Website' ? WebsiteGetPayload<S['select'][P]> :
        P extends '_count' ? WebVisitorCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof WebVisitor ? WebVisitor[P] : never
  } 
      : WebVisitor


  type WebVisitorCountArgs = 
    Omit<WebVisitorFindManyArgs, 'select' | 'include'> & {
      select?: WebVisitorCountAggregateInputType | true
    }

  export interface WebVisitorDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one WebVisitor that matches the filter.
     * @param {WebVisitorFindUniqueArgs} args - Arguments to find a WebVisitor
     * @example
     * // Get one WebVisitor
     * const webVisitor = await prisma.webVisitor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WebVisitorFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WebVisitorFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'WebVisitor'> extends True ? Prisma__WebVisitorClient<WebVisitorGetPayload<T>> : Prisma__WebVisitorClient<WebVisitorGetPayload<T> | null, null>

    /**
     * Find one WebVisitor that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WebVisitorFindUniqueOrThrowArgs} args - Arguments to find a WebVisitor
     * @example
     * // Get one WebVisitor
     * const webVisitor = await prisma.webVisitor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WebVisitorFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, WebVisitorFindUniqueOrThrowArgs>
    ): Prisma__WebVisitorClient<WebVisitorGetPayload<T>>

    /**
     * Find the first WebVisitor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebVisitorFindFirstArgs} args - Arguments to find a WebVisitor
     * @example
     * // Get one WebVisitor
     * const webVisitor = await prisma.webVisitor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WebVisitorFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WebVisitorFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'WebVisitor'> extends True ? Prisma__WebVisitorClient<WebVisitorGetPayload<T>> : Prisma__WebVisitorClient<WebVisitorGetPayload<T> | null, null>

    /**
     * Find the first WebVisitor that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebVisitorFindFirstOrThrowArgs} args - Arguments to find a WebVisitor
     * @example
     * // Get one WebVisitor
     * const webVisitor = await prisma.webVisitor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WebVisitorFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WebVisitorFindFirstOrThrowArgs>
    ): Prisma__WebVisitorClient<WebVisitorGetPayload<T>>

    /**
     * Find zero or more WebVisitors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebVisitorFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebVisitors
     * const webVisitors = await prisma.webVisitor.findMany()
     * 
     * // Get first 10 WebVisitors
     * const webVisitors = await prisma.webVisitor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webVisitorWithIdOnly = await prisma.webVisitor.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WebVisitorFindManyArgs>(
      args?: SelectSubset<T, WebVisitorFindManyArgs>
    ): Prisma.PrismaPromise<Array<WebVisitorGetPayload<T>>>

    /**
     * Create a WebVisitor.
     * @param {WebVisitorCreateArgs} args - Arguments to create a WebVisitor.
     * @example
     * // Create one WebVisitor
     * const WebVisitor = await prisma.webVisitor.create({
     *   data: {
     *     // ... data to create a WebVisitor
     *   }
     * })
     * 
    **/
    create<T extends WebVisitorCreateArgs>(
      args: SelectSubset<T, WebVisitorCreateArgs>
    ): Prisma__WebVisitorClient<WebVisitorGetPayload<T>>

    /**
     * Create many WebVisitors.
     *     @param {WebVisitorCreateManyArgs} args - Arguments to create many WebVisitors.
     *     @example
     *     // Create many WebVisitors
     *     const webVisitor = await prisma.webVisitor.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WebVisitorCreateManyArgs>(
      args?: SelectSubset<T, WebVisitorCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WebVisitor.
     * @param {WebVisitorDeleteArgs} args - Arguments to delete one WebVisitor.
     * @example
     * // Delete one WebVisitor
     * const WebVisitor = await prisma.webVisitor.delete({
     *   where: {
     *     // ... filter to delete one WebVisitor
     *   }
     * })
     * 
    **/
    delete<T extends WebVisitorDeleteArgs>(
      args: SelectSubset<T, WebVisitorDeleteArgs>
    ): Prisma__WebVisitorClient<WebVisitorGetPayload<T>>

    /**
     * Update one WebVisitor.
     * @param {WebVisitorUpdateArgs} args - Arguments to update one WebVisitor.
     * @example
     * // Update one WebVisitor
     * const webVisitor = await prisma.webVisitor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WebVisitorUpdateArgs>(
      args: SelectSubset<T, WebVisitorUpdateArgs>
    ): Prisma__WebVisitorClient<WebVisitorGetPayload<T>>

    /**
     * Delete zero or more WebVisitors.
     * @param {WebVisitorDeleteManyArgs} args - Arguments to filter WebVisitors to delete.
     * @example
     * // Delete a few WebVisitors
     * const { count } = await prisma.webVisitor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WebVisitorDeleteManyArgs>(
      args?: SelectSubset<T, WebVisitorDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebVisitors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebVisitorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebVisitors
     * const webVisitor = await prisma.webVisitor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WebVisitorUpdateManyArgs>(
      args: SelectSubset<T, WebVisitorUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WebVisitor.
     * @param {WebVisitorUpsertArgs} args - Arguments to update or create a WebVisitor.
     * @example
     * // Update or create a WebVisitor
     * const webVisitor = await prisma.webVisitor.upsert({
     *   create: {
     *     // ... data to create a WebVisitor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebVisitor we want to update
     *   }
     * })
    **/
    upsert<T extends WebVisitorUpsertArgs>(
      args: SelectSubset<T, WebVisitorUpsertArgs>
    ): Prisma__WebVisitorClient<WebVisitorGetPayload<T>>

    /**
     * Count the number of WebVisitors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebVisitorCountArgs} args - Arguments to filter WebVisitors to count.
     * @example
     * // Count the number of WebVisitors
     * const count = await prisma.webVisitor.count({
     *   where: {
     *     // ... the filter for the WebVisitors we want to count
     *   }
     * })
    **/
    count<T extends WebVisitorCountArgs>(
      args?: Subset<T, WebVisitorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebVisitorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebVisitor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebVisitorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebVisitorAggregateArgs>(args: Subset<T, WebVisitorAggregateArgs>): Prisma.PrismaPromise<GetWebVisitorAggregateType<T>>

    /**
     * Group by WebVisitor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebVisitorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebVisitorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebVisitorGroupByArgs['orderBy'] }
        : { orderBy?: WebVisitorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebVisitorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebVisitorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for WebVisitor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WebVisitorClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    Session<T extends WebVisitor$SessionArgs= {}>(args?: Subset<T, WebVisitor$SessionArgs>): Prisma.PrismaPromise<Array<WebSessionGetPayload<T>>| Null>;

    Pageview<T extends WebVisitor$PageviewArgs= {}>(args?: Subset<T, WebVisitor$PageviewArgs>): Prisma.PrismaPromise<Array<WebPageviewGetPayload<T>>| Null>;

    WebEvent<T extends WebVisitor$WebEventArgs= {}>(args?: Subset<T, WebVisitor$WebEventArgs>): Prisma.PrismaPromise<Array<WebEventGetPayload<T>>| Null>;

    Website<T extends WebsiteArgs= {}>(args?: Subset<T, WebsiteArgs>): Prisma__WebsiteClient<WebsiteGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * WebVisitor base type for findUnique actions
   */
  export type WebVisitorFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the WebVisitor
     */
    select?: WebVisitorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebVisitorInclude | null
    /**
     * Filter, which WebVisitor to fetch.
     */
    where: WebVisitorWhereUniqueInput
  }

  /**
   * WebVisitor findUnique
   */
  export interface WebVisitorFindUniqueArgs extends WebVisitorFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WebVisitor findUniqueOrThrow
   */
  export type WebVisitorFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the WebVisitor
     */
    select?: WebVisitorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebVisitorInclude | null
    /**
     * Filter, which WebVisitor to fetch.
     */
    where: WebVisitorWhereUniqueInput
  }


  /**
   * WebVisitor base type for findFirst actions
   */
  export type WebVisitorFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the WebVisitor
     */
    select?: WebVisitorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebVisitorInclude | null
    /**
     * Filter, which WebVisitor to fetch.
     */
    where?: WebVisitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebVisitors to fetch.
     */
    orderBy?: Enumerable<WebVisitorOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebVisitors.
     */
    cursor?: WebVisitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebVisitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebVisitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebVisitors.
     */
    distinct?: Enumerable<WebVisitorScalarFieldEnum>
  }

  /**
   * WebVisitor findFirst
   */
  export interface WebVisitorFindFirstArgs extends WebVisitorFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WebVisitor findFirstOrThrow
   */
  export type WebVisitorFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the WebVisitor
     */
    select?: WebVisitorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebVisitorInclude | null
    /**
     * Filter, which WebVisitor to fetch.
     */
    where?: WebVisitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebVisitors to fetch.
     */
    orderBy?: Enumerable<WebVisitorOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebVisitors.
     */
    cursor?: WebVisitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebVisitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebVisitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebVisitors.
     */
    distinct?: Enumerable<WebVisitorScalarFieldEnum>
  }


  /**
   * WebVisitor findMany
   */
  export type WebVisitorFindManyArgs = {
    /**
     * Select specific fields to fetch from the WebVisitor
     */
    select?: WebVisitorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebVisitorInclude | null
    /**
     * Filter, which WebVisitors to fetch.
     */
    where?: WebVisitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebVisitors to fetch.
     */
    orderBy?: Enumerable<WebVisitorOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebVisitors.
     */
    cursor?: WebVisitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebVisitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebVisitors.
     */
    skip?: number
    distinct?: Enumerable<WebVisitorScalarFieldEnum>
  }


  /**
   * WebVisitor create
   */
  export type WebVisitorCreateArgs = {
    /**
     * Select specific fields to fetch from the WebVisitor
     */
    select?: WebVisitorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebVisitorInclude | null
    /**
     * The data needed to create a WebVisitor.
     */
    data: XOR<WebVisitorCreateInput, WebVisitorUncheckedCreateInput>
  }


  /**
   * WebVisitor createMany
   */
  export type WebVisitorCreateManyArgs = {
    /**
     * The data used to create many WebVisitors.
     */
    data: Enumerable<WebVisitorCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * WebVisitor update
   */
  export type WebVisitorUpdateArgs = {
    /**
     * Select specific fields to fetch from the WebVisitor
     */
    select?: WebVisitorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebVisitorInclude | null
    /**
     * The data needed to update a WebVisitor.
     */
    data: XOR<WebVisitorUpdateInput, WebVisitorUncheckedUpdateInput>
    /**
     * Choose, which WebVisitor to update.
     */
    where: WebVisitorWhereUniqueInput
  }


  /**
   * WebVisitor updateMany
   */
  export type WebVisitorUpdateManyArgs = {
    /**
     * The data used to update WebVisitors.
     */
    data: XOR<WebVisitorUpdateManyMutationInput, WebVisitorUncheckedUpdateManyInput>
    /**
     * Filter which WebVisitors to update
     */
    where?: WebVisitorWhereInput
  }


  /**
   * WebVisitor upsert
   */
  export type WebVisitorUpsertArgs = {
    /**
     * Select specific fields to fetch from the WebVisitor
     */
    select?: WebVisitorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebVisitorInclude | null
    /**
     * The filter to search for the WebVisitor to update in case it exists.
     */
    where: WebVisitorWhereUniqueInput
    /**
     * In case the WebVisitor found by the `where` argument doesn't exist, create a new WebVisitor with this data.
     */
    create: XOR<WebVisitorCreateInput, WebVisitorUncheckedCreateInput>
    /**
     * In case the WebVisitor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebVisitorUpdateInput, WebVisitorUncheckedUpdateInput>
  }


  /**
   * WebVisitor delete
   */
  export type WebVisitorDeleteArgs = {
    /**
     * Select specific fields to fetch from the WebVisitor
     */
    select?: WebVisitorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebVisitorInclude | null
    /**
     * Filter which WebVisitor to delete.
     */
    where: WebVisitorWhereUniqueInput
  }


  /**
   * WebVisitor deleteMany
   */
  export type WebVisitorDeleteManyArgs = {
    /**
     * Filter which WebVisitors to delete
     */
    where?: WebVisitorWhereInput
  }


  /**
   * WebVisitor.Session
   */
  export type WebVisitor$SessionArgs = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebSessionInclude | null
    where?: WebSessionWhereInput
    orderBy?: Enumerable<WebSessionOrderByWithRelationInput>
    cursor?: WebSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WebSessionScalarFieldEnum>
  }


  /**
   * WebVisitor.Pageview
   */
  export type WebVisitor$PageviewArgs = {
    /**
     * Select specific fields to fetch from the WebPageview
     */
    select?: WebPageviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebPageviewInclude | null
    where?: WebPageviewWhereInput
    orderBy?: Enumerable<WebPageviewOrderByWithRelationInput>
    cursor?: WebPageviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WebPageviewScalarFieldEnum>
  }


  /**
   * WebVisitor.WebEvent
   */
  export type WebVisitor$WebEventArgs = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
    where?: WebEventWhereInput
    orderBy?: Enumerable<WebEventOrderByWithRelationInput>
    cursor?: WebEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WebEventScalarFieldEnum>
  }


  /**
   * WebVisitor without action
   */
  export type WebVisitorArgs = {
    /**
     * Select specific fields to fetch from the WebVisitor
     */
    select?: WebVisitorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebVisitorInclude | null
  }



  /**
   * Model WebSession
   */


  export type AggregateWebSession = {
    _count: WebSessionCountAggregateOutputType | null
    _avg: WebSessionAvgAggregateOutputType | null
    _sum: WebSessionSumAggregateOutputType | null
    _min: WebSessionMinAggregateOutputType | null
    _max: WebSessionMaxAggregateOutputType | null
  }

  export type WebSessionAvgAggregateOutputType = {
    duration: number | null
  }

  export type WebSessionSumAggregateOutputType = {
    duration: number | null
  }

  export type WebSessionMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    referrer: string | null
    queryParams: string | null
    duration: number | null
    country: string | null
    city: string | null
    device: string | null
    os: string | null
    browser: string | null
    language: string | null
    visitorId: string | null
    websiteId: string | null
  }

  export type WebSessionMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    referrer: string | null
    queryParams: string | null
    duration: number | null
    country: string | null
    city: string | null
    device: string | null
    os: string | null
    browser: string | null
    language: string | null
    visitorId: string | null
    websiteId: string | null
  }

  export type WebSessionCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    referrer: number
    queryParams: number
    duration: number
    country: number
    city: number
    device: number
    os: number
    browser: number
    language: number
    visitorId: number
    websiteId: number
    _all: number
  }


  export type WebSessionAvgAggregateInputType = {
    duration?: true
  }

  export type WebSessionSumAggregateInputType = {
    duration?: true
  }

  export type WebSessionMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    referrer?: true
    queryParams?: true
    duration?: true
    country?: true
    city?: true
    device?: true
    os?: true
    browser?: true
    language?: true
    visitorId?: true
    websiteId?: true
  }

  export type WebSessionMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    referrer?: true
    queryParams?: true
    duration?: true
    country?: true
    city?: true
    device?: true
    os?: true
    browser?: true
    language?: true
    visitorId?: true
    websiteId?: true
  }

  export type WebSessionCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    referrer?: true
    queryParams?: true
    duration?: true
    country?: true
    city?: true
    device?: true
    os?: true
    browser?: true
    language?: true
    visitorId?: true
    websiteId?: true
    _all?: true
  }

  export type WebSessionAggregateArgs = {
    /**
     * Filter which WebSession to aggregate.
     */
    where?: WebSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebSessions to fetch.
     */
    orderBy?: Enumerable<WebSessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebSessions
    **/
    _count?: true | WebSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebSessionMaxAggregateInputType
  }

  export type GetWebSessionAggregateType<T extends WebSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateWebSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebSession[P]>
      : GetScalarType<T[P], AggregateWebSession[P]>
  }




  export type WebSessionGroupByArgs = {
    where?: WebSessionWhereInput
    orderBy?: Enumerable<WebSessionOrderByWithAggregationInput>
    by: WebSessionScalarFieldEnum[]
    having?: WebSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebSessionCountAggregateInputType | true
    _avg?: WebSessionAvgAggregateInputType
    _sum?: WebSessionSumAggregateInputType
    _min?: WebSessionMinAggregateInputType
    _max?: WebSessionMaxAggregateInputType
  }


  export type WebSessionGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    referrer: string
    queryParams: string
    duration: number
    country: string | null
    city: string | null
    device: string | null
    os: string | null
    browser: string | null
    language: string | null
    visitorId: string
    websiteId: string
    _count: WebSessionCountAggregateOutputType | null
    _avg: WebSessionAvgAggregateOutputType | null
    _sum: WebSessionSumAggregateOutputType | null
    _min: WebSessionMinAggregateOutputType | null
    _max: WebSessionMaxAggregateOutputType | null
  }

  type GetWebSessionGroupByPayload<T extends WebSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<WebSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebSessionGroupByOutputType[P]>
            : GetScalarType<T[P], WebSessionGroupByOutputType[P]>
        }
      >
    >


  export type WebSessionSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    referrer?: boolean
    queryParams?: boolean
    duration?: boolean
    country?: boolean
    city?: boolean
    device?: boolean
    os?: boolean
    browser?: boolean
    language?: boolean
    visitorId?: boolean
    websiteId?: boolean
    WebPage?: boolean | WebSession$WebPageArgs
    WebEvent?: boolean | WebSession$WebEventArgs
    WebVisitor?: boolean | WebVisitorArgs
    Website?: boolean | WebsiteArgs
    _count?: boolean | WebSessionCountOutputTypeArgs
  }


  export type WebSessionInclude = {
    WebPage?: boolean | WebSession$WebPageArgs
    WebEvent?: boolean | WebSession$WebEventArgs
    WebVisitor?: boolean | WebVisitorArgs
    Website?: boolean | WebsiteArgs
    _count?: boolean | WebSessionCountOutputTypeArgs
  }

  export type WebSessionGetPayload<S extends boolean | null | undefined | WebSessionArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? WebSession :
    S extends undefined ? never :
    S extends { include: any } & (WebSessionArgs | WebSessionFindManyArgs)
    ? WebSession  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'WebPage' ? Array < WebPageviewGetPayload<S['include'][P]>>  :
        P extends 'WebEvent' ? Array < WebEventGetPayload<S['include'][P]>>  :
        P extends 'WebVisitor' ? WebVisitorGetPayload<S['include'][P]> :
        P extends 'Website' ? WebsiteGetPayload<S['include'][P]> :
        P extends '_count' ? WebSessionCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (WebSessionArgs | WebSessionFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'WebPage' ? Array < WebPageviewGetPayload<S['select'][P]>>  :
        P extends 'WebEvent' ? Array < WebEventGetPayload<S['select'][P]>>  :
        P extends 'WebVisitor' ? WebVisitorGetPayload<S['select'][P]> :
        P extends 'Website' ? WebsiteGetPayload<S['select'][P]> :
        P extends '_count' ? WebSessionCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof WebSession ? WebSession[P] : never
  } 
      : WebSession


  type WebSessionCountArgs = 
    Omit<WebSessionFindManyArgs, 'select' | 'include'> & {
      select?: WebSessionCountAggregateInputType | true
    }

  export interface WebSessionDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one WebSession that matches the filter.
     * @param {WebSessionFindUniqueArgs} args - Arguments to find a WebSession
     * @example
     * // Get one WebSession
     * const webSession = await prisma.webSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WebSessionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WebSessionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'WebSession'> extends True ? Prisma__WebSessionClient<WebSessionGetPayload<T>> : Prisma__WebSessionClient<WebSessionGetPayload<T> | null, null>

    /**
     * Find one WebSession that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WebSessionFindUniqueOrThrowArgs} args - Arguments to find a WebSession
     * @example
     * // Get one WebSession
     * const webSession = await prisma.webSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WebSessionFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, WebSessionFindUniqueOrThrowArgs>
    ): Prisma__WebSessionClient<WebSessionGetPayload<T>>

    /**
     * Find the first WebSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionFindFirstArgs} args - Arguments to find a WebSession
     * @example
     * // Get one WebSession
     * const webSession = await prisma.webSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WebSessionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WebSessionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'WebSession'> extends True ? Prisma__WebSessionClient<WebSessionGetPayload<T>> : Prisma__WebSessionClient<WebSessionGetPayload<T> | null, null>

    /**
     * Find the first WebSession that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionFindFirstOrThrowArgs} args - Arguments to find a WebSession
     * @example
     * // Get one WebSession
     * const webSession = await prisma.webSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WebSessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WebSessionFindFirstOrThrowArgs>
    ): Prisma__WebSessionClient<WebSessionGetPayload<T>>

    /**
     * Find zero or more WebSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebSessions
     * const webSessions = await prisma.webSession.findMany()
     * 
     * // Get first 10 WebSessions
     * const webSessions = await prisma.webSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webSessionWithIdOnly = await prisma.webSession.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WebSessionFindManyArgs>(
      args?: SelectSubset<T, WebSessionFindManyArgs>
    ): Prisma.PrismaPromise<Array<WebSessionGetPayload<T>>>

    /**
     * Create a WebSession.
     * @param {WebSessionCreateArgs} args - Arguments to create a WebSession.
     * @example
     * // Create one WebSession
     * const WebSession = await prisma.webSession.create({
     *   data: {
     *     // ... data to create a WebSession
     *   }
     * })
     * 
    **/
    create<T extends WebSessionCreateArgs>(
      args: SelectSubset<T, WebSessionCreateArgs>
    ): Prisma__WebSessionClient<WebSessionGetPayload<T>>

    /**
     * Create many WebSessions.
     *     @param {WebSessionCreateManyArgs} args - Arguments to create many WebSessions.
     *     @example
     *     // Create many WebSessions
     *     const webSession = await prisma.webSession.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WebSessionCreateManyArgs>(
      args?: SelectSubset<T, WebSessionCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WebSession.
     * @param {WebSessionDeleteArgs} args - Arguments to delete one WebSession.
     * @example
     * // Delete one WebSession
     * const WebSession = await prisma.webSession.delete({
     *   where: {
     *     // ... filter to delete one WebSession
     *   }
     * })
     * 
    **/
    delete<T extends WebSessionDeleteArgs>(
      args: SelectSubset<T, WebSessionDeleteArgs>
    ): Prisma__WebSessionClient<WebSessionGetPayload<T>>

    /**
     * Update one WebSession.
     * @param {WebSessionUpdateArgs} args - Arguments to update one WebSession.
     * @example
     * // Update one WebSession
     * const webSession = await prisma.webSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WebSessionUpdateArgs>(
      args: SelectSubset<T, WebSessionUpdateArgs>
    ): Prisma__WebSessionClient<WebSessionGetPayload<T>>

    /**
     * Delete zero or more WebSessions.
     * @param {WebSessionDeleteManyArgs} args - Arguments to filter WebSessions to delete.
     * @example
     * // Delete a few WebSessions
     * const { count } = await prisma.webSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WebSessionDeleteManyArgs>(
      args?: SelectSubset<T, WebSessionDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebSessions
     * const webSession = await prisma.webSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WebSessionUpdateManyArgs>(
      args: SelectSubset<T, WebSessionUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WebSession.
     * @param {WebSessionUpsertArgs} args - Arguments to update or create a WebSession.
     * @example
     * // Update or create a WebSession
     * const webSession = await prisma.webSession.upsert({
     *   create: {
     *     // ... data to create a WebSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebSession we want to update
     *   }
     * })
    **/
    upsert<T extends WebSessionUpsertArgs>(
      args: SelectSubset<T, WebSessionUpsertArgs>
    ): Prisma__WebSessionClient<WebSessionGetPayload<T>>

    /**
     * Count the number of WebSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionCountArgs} args - Arguments to filter WebSessions to count.
     * @example
     * // Count the number of WebSessions
     * const count = await prisma.webSession.count({
     *   where: {
     *     // ... the filter for the WebSessions we want to count
     *   }
     * })
    **/
    count<T extends WebSessionCountArgs>(
      args?: Subset<T, WebSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebSessionAggregateArgs>(args: Subset<T, WebSessionAggregateArgs>): Prisma.PrismaPromise<GetWebSessionAggregateType<T>>

    /**
     * Group by WebSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebSessionGroupByArgs['orderBy'] }
        : { orderBy?: WebSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for WebSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WebSessionClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    WebPage<T extends WebSession$WebPageArgs= {}>(args?: Subset<T, WebSession$WebPageArgs>): Prisma.PrismaPromise<Array<WebPageviewGetPayload<T>>| Null>;

    WebEvent<T extends WebSession$WebEventArgs= {}>(args?: Subset<T, WebSession$WebEventArgs>): Prisma.PrismaPromise<Array<WebEventGetPayload<T>>| Null>;

    WebVisitor<T extends WebVisitorArgs= {}>(args?: Subset<T, WebVisitorArgs>): Prisma__WebVisitorClient<WebVisitorGetPayload<T> | Null>;

    Website<T extends WebsiteArgs= {}>(args?: Subset<T, WebsiteArgs>): Prisma__WebsiteClient<WebsiteGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * WebSession base type for findUnique actions
   */
  export type WebSessionFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebSessionInclude | null
    /**
     * Filter, which WebSession to fetch.
     */
    where: WebSessionWhereUniqueInput
  }

  /**
   * WebSession findUnique
   */
  export interface WebSessionFindUniqueArgs extends WebSessionFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WebSession findUniqueOrThrow
   */
  export type WebSessionFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebSessionInclude | null
    /**
     * Filter, which WebSession to fetch.
     */
    where: WebSessionWhereUniqueInput
  }


  /**
   * WebSession base type for findFirst actions
   */
  export type WebSessionFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebSessionInclude | null
    /**
     * Filter, which WebSession to fetch.
     */
    where?: WebSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebSessions to fetch.
     */
    orderBy?: Enumerable<WebSessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebSessions.
     */
    cursor?: WebSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebSessions.
     */
    distinct?: Enumerable<WebSessionScalarFieldEnum>
  }

  /**
   * WebSession findFirst
   */
  export interface WebSessionFindFirstArgs extends WebSessionFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WebSession findFirstOrThrow
   */
  export type WebSessionFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebSessionInclude | null
    /**
     * Filter, which WebSession to fetch.
     */
    where?: WebSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebSessions to fetch.
     */
    orderBy?: Enumerable<WebSessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebSessions.
     */
    cursor?: WebSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebSessions.
     */
    distinct?: Enumerable<WebSessionScalarFieldEnum>
  }


  /**
   * WebSession findMany
   */
  export type WebSessionFindManyArgs = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebSessionInclude | null
    /**
     * Filter, which WebSessions to fetch.
     */
    where?: WebSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebSessions to fetch.
     */
    orderBy?: Enumerable<WebSessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebSessions.
     */
    cursor?: WebSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebSessions.
     */
    skip?: number
    distinct?: Enumerable<WebSessionScalarFieldEnum>
  }


  /**
   * WebSession create
   */
  export type WebSessionCreateArgs = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebSessionInclude | null
    /**
     * The data needed to create a WebSession.
     */
    data: XOR<WebSessionCreateInput, WebSessionUncheckedCreateInput>
  }


  /**
   * WebSession createMany
   */
  export type WebSessionCreateManyArgs = {
    /**
     * The data used to create many WebSessions.
     */
    data: Enumerable<WebSessionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * WebSession update
   */
  export type WebSessionUpdateArgs = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebSessionInclude | null
    /**
     * The data needed to update a WebSession.
     */
    data: XOR<WebSessionUpdateInput, WebSessionUncheckedUpdateInput>
    /**
     * Choose, which WebSession to update.
     */
    where: WebSessionWhereUniqueInput
  }


  /**
   * WebSession updateMany
   */
  export type WebSessionUpdateManyArgs = {
    /**
     * The data used to update WebSessions.
     */
    data: XOR<WebSessionUpdateManyMutationInput, WebSessionUncheckedUpdateManyInput>
    /**
     * Filter which WebSessions to update
     */
    where?: WebSessionWhereInput
  }


  /**
   * WebSession upsert
   */
  export type WebSessionUpsertArgs = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebSessionInclude | null
    /**
     * The filter to search for the WebSession to update in case it exists.
     */
    where: WebSessionWhereUniqueInput
    /**
     * In case the WebSession found by the `where` argument doesn't exist, create a new WebSession with this data.
     */
    create: XOR<WebSessionCreateInput, WebSessionUncheckedCreateInput>
    /**
     * In case the WebSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebSessionUpdateInput, WebSessionUncheckedUpdateInput>
  }


  /**
   * WebSession delete
   */
  export type WebSessionDeleteArgs = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebSessionInclude | null
    /**
     * Filter which WebSession to delete.
     */
    where: WebSessionWhereUniqueInput
  }


  /**
   * WebSession deleteMany
   */
  export type WebSessionDeleteManyArgs = {
    /**
     * Filter which WebSessions to delete
     */
    where?: WebSessionWhereInput
  }


  /**
   * WebSession.WebPage
   */
  export type WebSession$WebPageArgs = {
    /**
     * Select specific fields to fetch from the WebPageview
     */
    select?: WebPageviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebPageviewInclude | null
    where?: WebPageviewWhereInput
    orderBy?: Enumerable<WebPageviewOrderByWithRelationInput>
    cursor?: WebPageviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WebPageviewScalarFieldEnum>
  }


  /**
   * WebSession.WebEvent
   */
  export type WebSession$WebEventArgs = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
    where?: WebEventWhereInput
    orderBy?: Enumerable<WebEventOrderByWithRelationInput>
    cursor?: WebEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WebEventScalarFieldEnum>
  }


  /**
   * WebSession without action
   */
  export type WebSessionArgs = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebSessionInclude | null
  }



  /**
   * Model WebPageview
   */


  export type AggregateWebPageview = {
    _count: WebPageviewCountAggregateOutputType | null
    _avg: WebPageviewAvgAggregateOutputType | null
    _sum: WebPageviewSumAggregateOutputType | null
    _min: WebPageviewMinAggregateOutputType | null
    _max: WebPageviewMaxAggregateOutputType | null
  }

  export type WebPageviewAvgAggregateOutputType = {
    duration: number | null
  }

  export type WebPageviewSumAggregateOutputType = {
    duration: number | null
  }

  export type WebPageviewMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    page: string | null
    referrer: string | null
    queryParams: string | null
    duration: number | null
    sessionId: string | null
    visitorId: string | null
    websiteId: string | null
  }

  export type WebPageviewMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    page: string | null
    referrer: string | null
    queryParams: string | null
    duration: number | null
    sessionId: string | null
    visitorId: string | null
    websiteId: string | null
  }

  export type WebPageviewCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    page: number
    referrer: number
    queryParams: number
    duration: number
    sessionId: number
    visitorId: number
    websiteId: number
    _all: number
  }


  export type WebPageviewAvgAggregateInputType = {
    duration?: true
  }

  export type WebPageviewSumAggregateInputType = {
    duration?: true
  }

  export type WebPageviewMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    page?: true
    referrer?: true
    queryParams?: true
    duration?: true
    sessionId?: true
    visitorId?: true
    websiteId?: true
  }

  export type WebPageviewMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    page?: true
    referrer?: true
    queryParams?: true
    duration?: true
    sessionId?: true
    visitorId?: true
    websiteId?: true
  }

  export type WebPageviewCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    page?: true
    referrer?: true
    queryParams?: true
    duration?: true
    sessionId?: true
    visitorId?: true
    websiteId?: true
    _all?: true
  }

  export type WebPageviewAggregateArgs = {
    /**
     * Filter which WebPageview to aggregate.
     */
    where?: WebPageviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebPageviews to fetch.
     */
    orderBy?: Enumerable<WebPageviewOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebPageviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebPageviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebPageviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebPageviews
    **/
    _count?: true | WebPageviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebPageviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebPageviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebPageviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebPageviewMaxAggregateInputType
  }

  export type GetWebPageviewAggregateType<T extends WebPageviewAggregateArgs> = {
        [P in keyof T & keyof AggregateWebPageview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebPageview[P]>
      : GetScalarType<T[P], AggregateWebPageview[P]>
  }




  export type WebPageviewGroupByArgs = {
    where?: WebPageviewWhereInput
    orderBy?: Enumerable<WebPageviewOrderByWithAggregationInput>
    by: WebPageviewScalarFieldEnum[]
    having?: WebPageviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebPageviewCountAggregateInputType | true
    _avg?: WebPageviewAvgAggregateInputType
    _sum?: WebPageviewSumAggregateInputType
    _min?: WebPageviewMinAggregateInputType
    _max?: WebPageviewMaxAggregateInputType
  }


  export type WebPageviewGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    page: string
    referrer: string
    queryParams: string
    duration: number
    sessionId: string
    visitorId: string
    websiteId: string
    _count: WebPageviewCountAggregateOutputType | null
    _avg: WebPageviewAvgAggregateOutputType | null
    _sum: WebPageviewSumAggregateOutputType | null
    _min: WebPageviewMinAggregateOutputType | null
    _max: WebPageviewMaxAggregateOutputType | null
  }

  type GetWebPageviewGroupByPayload<T extends WebPageviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<WebPageviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebPageviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebPageviewGroupByOutputType[P]>
            : GetScalarType<T[P], WebPageviewGroupByOutputType[P]>
        }
      >
    >


  export type WebPageviewSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    page?: boolean
    referrer?: boolean
    queryParams?: boolean
    duration?: boolean
    sessionId?: boolean
    visitorId?: boolean
    websiteId?: boolean
    Event?: boolean | WebPageview$EventArgs
    WebSession?: boolean | WebSessionArgs
    WebVisitor?: boolean | WebVisitorArgs
    Website?: boolean | WebsiteArgs
    _count?: boolean | WebPageviewCountOutputTypeArgs
  }


  export type WebPageviewInclude = {
    Event?: boolean | WebPageview$EventArgs
    WebSession?: boolean | WebSessionArgs
    WebVisitor?: boolean | WebVisitorArgs
    Website?: boolean | WebsiteArgs
    _count?: boolean | WebPageviewCountOutputTypeArgs
  }

  export type WebPageviewGetPayload<S extends boolean | null | undefined | WebPageviewArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? WebPageview :
    S extends undefined ? never :
    S extends { include: any } & (WebPageviewArgs | WebPageviewFindManyArgs)
    ? WebPageview  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'Event' ? Array < WebEventGetPayload<S['include'][P]>>  :
        P extends 'WebSession' ? WebSessionGetPayload<S['include'][P]> :
        P extends 'WebVisitor' ? WebVisitorGetPayload<S['include'][P]> :
        P extends 'Website' ? WebsiteGetPayload<S['include'][P]> :
        P extends '_count' ? WebPageviewCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (WebPageviewArgs | WebPageviewFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'Event' ? Array < WebEventGetPayload<S['select'][P]>>  :
        P extends 'WebSession' ? WebSessionGetPayload<S['select'][P]> :
        P extends 'WebVisitor' ? WebVisitorGetPayload<S['select'][P]> :
        P extends 'Website' ? WebsiteGetPayload<S['select'][P]> :
        P extends '_count' ? WebPageviewCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof WebPageview ? WebPageview[P] : never
  } 
      : WebPageview


  type WebPageviewCountArgs = 
    Omit<WebPageviewFindManyArgs, 'select' | 'include'> & {
      select?: WebPageviewCountAggregateInputType | true
    }

  export interface WebPageviewDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one WebPageview that matches the filter.
     * @param {WebPageviewFindUniqueArgs} args - Arguments to find a WebPageview
     * @example
     * // Get one WebPageview
     * const webPageview = await prisma.webPageview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WebPageviewFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WebPageviewFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'WebPageview'> extends True ? Prisma__WebPageviewClient<WebPageviewGetPayload<T>> : Prisma__WebPageviewClient<WebPageviewGetPayload<T> | null, null>

    /**
     * Find one WebPageview that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WebPageviewFindUniqueOrThrowArgs} args - Arguments to find a WebPageview
     * @example
     * // Get one WebPageview
     * const webPageview = await prisma.webPageview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WebPageviewFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, WebPageviewFindUniqueOrThrowArgs>
    ): Prisma__WebPageviewClient<WebPageviewGetPayload<T>>

    /**
     * Find the first WebPageview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebPageviewFindFirstArgs} args - Arguments to find a WebPageview
     * @example
     * // Get one WebPageview
     * const webPageview = await prisma.webPageview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WebPageviewFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WebPageviewFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'WebPageview'> extends True ? Prisma__WebPageviewClient<WebPageviewGetPayload<T>> : Prisma__WebPageviewClient<WebPageviewGetPayload<T> | null, null>

    /**
     * Find the first WebPageview that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebPageviewFindFirstOrThrowArgs} args - Arguments to find a WebPageview
     * @example
     * // Get one WebPageview
     * const webPageview = await prisma.webPageview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WebPageviewFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WebPageviewFindFirstOrThrowArgs>
    ): Prisma__WebPageviewClient<WebPageviewGetPayload<T>>

    /**
     * Find zero or more WebPageviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebPageviewFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebPageviews
     * const webPageviews = await prisma.webPageview.findMany()
     * 
     * // Get first 10 WebPageviews
     * const webPageviews = await prisma.webPageview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webPageviewWithIdOnly = await prisma.webPageview.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WebPageviewFindManyArgs>(
      args?: SelectSubset<T, WebPageviewFindManyArgs>
    ): Prisma.PrismaPromise<Array<WebPageviewGetPayload<T>>>

    /**
     * Create a WebPageview.
     * @param {WebPageviewCreateArgs} args - Arguments to create a WebPageview.
     * @example
     * // Create one WebPageview
     * const WebPageview = await prisma.webPageview.create({
     *   data: {
     *     // ... data to create a WebPageview
     *   }
     * })
     * 
    **/
    create<T extends WebPageviewCreateArgs>(
      args: SelectSubset<T, WebPageviewCreateArgs>
    ): Prisma__WebPageviewClient<WebPageviewGetPayload<T>>

    /**
     * Create many WebPageviews.
     *     @param {WebPageviewCreateManyArgs} args - Arguments to create many WebPageviews.
     *     @example
     *     // Create many WebPageviews
     *     const webPageview = await prisma.webPageview.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WebPageviewCreateManyArgs>(
      args?: SelectSubset<T, WebPageviewCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WebPageview.
     * @param {WebPageviewDeleteArgs} args - Arguments to delete one WebPageview.
     * @example
     * // Delete one WebPageview
     * const WebPageview = await prisma.webPageview.delete({
     *   where: {
     *     // ... filter to delete one WebPageview
     *   }
     * })
     * 
    **/
    delete<T extends WebPageviewDeleteArgs>(
      args: SelectSubset<T, WebPageviewDeleteArgs>
    ): Prisma__WebPageviewClient<WebPageviewGetPayload<T>>

    /**
     * Update one WebPageview.
     * @param {WebPageviewUpdateArgs} args - Arguments to update one WebPageview.
     * @example
     * // Update one WebPageview
     * const webPageview = await prisma.webPageview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WebPageviewUpdateArgs>(
      args: SelectSubset<T, WebPageviewUpdateArgs>
    ): Prisma__WebPageviewClient<WebPageviewGetPayload<T>>

    /**
     * Delete zero or more WebPageviews.
     * @param {WebPageviewDeleteManyArgs} args - Arguments to filter WebPageviews to delete.
     * @example
     * // Delete a few WebPageviews
     * const { count } = await prisma.webPageview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WebPageviewDeleteManyArgs>(
      args?: SelectSubset<T, WebPageviewDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebPageviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebPageviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebPageviews
     * const webPageview = await prisma.webPageview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WebPageviewUpdateManyArgs>(
      args: SelectSubset<T, WebPageviewUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WebPageview.
     * @param {WebPageviewUpsertArgs} args - Arguments to update or create a WebPageview.
     * @example
     * // Update or create a WebPageview
     * const webPageview = await prisma.webPageview.upsert({
     *   create: {
     *     // ... data to create a WebPageview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebPageview we want to update
     *   }
     * })
    **/
    upsert<T extends WebPageviewUpsertArgs>(
      args: SelectSubset<T, WebPageviewUpsertArgs>
    ): Prisma__WebPageviewClient<WebPageviewGetPayload<T>>

    /**
     * Count the number of WebPageviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebPageviewCountArgs} args - Arguments to filter WebPageviews to count.
     * @example
     * // Count the number of WebPageviews
     * const count = await prisma.webPageview.count({
     *   where: {
     *     // ... the filter for the WebPageviews we want to count
     *   }
     * })
    **/
    count<T extends WebPageviewCountArgs>(
      args?: Subset<T, WebPageviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebPageviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebPageview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebPageviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebPageviewAggregateArgs>(args: Subset<T, WebPageviewAggregateArgs>): Prisma.PrismaPromise<GetWebPageviewAggregateType<T>>

    /**
     * Group by WebPageview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebPageviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebPageviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebPageviewGroupByArgs['orderBy'] }
        : { orderBy?: WebPageviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebPageviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebPageviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for WebPageview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WebPageviewClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    Event<T extends WebPageview$EventArgs= {}>(args?: Subset<T, WebPageview$EventArgs>): Prisma.PrismaPromise<Array<WebEventGetPayload<T>>| Null>;

    WebSession<T extends WebSessionArgs= {}>(args?: Subset<T, WebSessionArgs>): Prisma__WebSessionClient<WebSessionGetPayload<T> | Null>;

    WebVisitor<T extends WebVisitorArgs= {}>(args?: Subset<T, WebVisitorArgs>): Prisma__WebVisitorClient<WebVisitorGetPayload<T> | Null>;

    Website<T extends WebsiteArgs= {}>(args?: Subset<T, WebsiteArgs>): Prisma__WebsiteClient<WebsiteGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * WebPageview base type for findUnique actions
   */
  export type WebPageviewFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the WebPageview
     */
    select?: WebPageviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebPageviewInclude | null
    /**
     * Filter, which WebPageview to fetch.
     */
    where: WebPageviewWhereUniqueInput
  }

  /**
   * WebPageview findUnique
   */
  export interface WebPageviewFindUniqueArgs extends WebPageviewFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WebPageview findUniqueOrThrow
   */
  export type WebPageviewFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the WebPageview
     */
    select?: WebPageviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebPageviewInclude | null
    /**
     * Filter, which WebPageview to fetch.
     */
    where: WebPageviewWhereUniqueInput
  }


  /**
   * WebPageview base type for findFirst actions
   */
  export type WebPageviewFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the WebPageview
     */
    select?: WebPageviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebPageviewInclude | null
    /**
     * Filter, which WebPageview to fetch.
     */
    where?: WebPageviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebPageviews to fetch.
     */
    orderBy?: Enumerable<WebPageviewOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebPageviews.
     */
    cursor?: WebPageviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebPageviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebPageviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebPageviews.
     */
    distinct?: Enumerable<WebPageviewScalarFieldEnum>
  }

  /**
   * WebPageview findFirst
   */
  export interface WebPageviewFindFirstArgs extends WebPageviewFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WebPageview findFirstOrThrow
   */
  export type WebPageviewFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the WebPageview
     */
    select?: WebPageviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebPageviewInclude | null
    /**
     * Filter, which WebPageview to fetch.
     */
    where?: WebPageviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebPageviews to fetch.
     */
    orderBy?: Enumerable<WebPageviewOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebPageviews.
     */
    cursor?: WebPageviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebPageviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebPageviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebPageviews.
     */
    distinct?: Enumerable<WebPageviewScalarFieldEnum>
  }


  /**
   * WebPageview findMany
   */
  export type WebPageviewFindManyArgs = {
    /**
     * Select specific fields to fetch from the WebPageview
     */
    select?: WebPageviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebPageviewInclude | null
    /**
     * Filter, which WebPageviews to fetch.
     */
    where?: WebPageviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebPageviews to fetch.
     */
    orderBy?: Enumerable<WebPageviewOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebPageviews.
     */
    cursor?: WebPageviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebPageviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebPageviews.
     */
    skip?: number
    distinct?: Enumerable<WebPageviewScalarFieldEnum>
  }


  /**
   * WebPageview create
   */
  export type WebPageviewCreateArgs = {
    /**
     * Select specific fields to fetch from the WebPageview
     */
    select?: WebPageviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebPageviewInclude | null
    /**
     * The data needed to create a WebPageview.
     */
    data: XOR<WebPageviewCreateInput, WebPageviewUncheckedCreateInput>
  }


  /**
   * WebPageview createMany
   */
  export type WebPageviewCreateManyArgs = {
    /**
     * The data used to create many WebPageviews.
     */
    data: Enumerable<WebPageviewCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * WebPageview update
   */
  export type WebPageviewUpdateArgs = {
    /**
     * Select specific fields to fetch from the WebPageview
     */
    select?: WebPageviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebPageviewInclude | null
    /**
     * The data needed to update a WebPageview.
     */
    data: XOR<WebPageviewUpdateInput, WebPageviewUncheckedUpdateInput>
    /**
     * Choose, which WebPageview to update.
     */
    where: WebPageviewWhereUniqueInput
  }


  /**
   * WebPageview updateMany
   */
  export type WebPageviewUpdateManyArgs = {
    /**
     * The data used to update WebPageviews.
     */
    data: XOR<WebPageviewUpdateManyMutationInput, WebPageviewUncheckedUpdateManyInput>
    /**
     * Filter which WebPageviews to update
     */
    where?: WebPageviewWhereInput
  }


  /**
   * WebPageview upsert
   */
  export type WebPageviewUpsertArgs = {
    /**
     * Select specific fields to fetch from the WebPageview
     */
    select?: WebPageviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebPageviewInclude | null
    /**
     * The filter to search for the WebPageview to update in case it exists.
     */
    where: WebPageviewWhereUniqueInput
    /**
     * In case the WebPageview found by the `where` argument doesn't exist, create a new WebPageview with this data.
     */
    create: XOR<WebPageviewCreateInput, WebPageviewUncheckedCreateInput>
    /**
     * In case the WebPageview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebPageviewUpdateInput, WebPageviewUncheckedUpdateInput>
  }


  /**
   * WebPageview delete
   */
  export type WebPageviewDeleteArgs = {
    /**
     * Select specific fields to fetch from the WebPageview
     */
    select?: WebPageviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebPageviewInclude | null
    /**
     * Filter which WebPageview to delete.
     */
    where: WebPageviewWhereUniqueInput
  }


  /**
   * WebPageview deleteMany
   */
  export type WebPageviewDeleteManyArgs = {
    /**
     * Filter which WebPageviews to delete
     */
    where?: WebPageviewWhereInput
  }


  /**
   * WebPageview.Event
   */
  export type WebPageview$EventArgs = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
    where?: WebEventWhereInput
    orderBy?: Enumerable<WebEventOrderByWithRelationInput>
    cursor?: WebEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WebEventScalarFieldEnum>
  }


  /**
   * WebPageview without action
   */
  export type WebPageviewArgs = {
    /**
     * Select specific fields to fetch from the WebPageview
     */
    select?: WebPageviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebPageviewInclude | null
  }



  /**
   * Model WebEvent
   */


  export type AggregateWebEvent = {
    _count: WebEventCountAggregateOutputType | null
    _min: WebEventMinAggregateOutputType | null
    _max: WebEventMaxAggregateOutputType | null
  }

  export type WebEventMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    eventType: string | null
    eventName: string | null
    payload: string | null
    pageId: string | null
    sessionId: string | null
    visitorId: string | null
    websiteId: string | null
  }

  export type WebEventMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    eventType: string | null
    eventName: string | null
    payload: string | null
    pageId: string | null
    sessionId: string | null
    visitorId: string | null
    websiteId: string | null
  }

  export type WebEventCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    eventType: number
    eventName: number
    payload: number
    pageId: number
    sessionId: number
    visitorId: number
    websiteId: number
    _all: number
  }


  export type WebEventMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventType?: true
    eventName?: true
    payload?: true
    pageId?: true
    sessionId?: true
    visitorId?: true
    websiteId?: true
  }

  export type WebEventMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventType?: true
    eventName?: true
    payload?: true
    pageId?: true
    sessionId?: true
    visitorId?: true
    websiteId?: true
  }

  export type WebEventCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventType?: true
    eventName?: true
    payload?: true
    pageId?: true
    sessionId?: true
    visitorId?: true
    websiteId?: true
    _all?: true
  }

  export type WebEventAggregateArgs = {
    /**
     * Filter which WebEvent to aggregate.
     */
    where?: WebEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebEvents to fetch.
     */
    orderBy?: Enumerable<WebEventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebEvents
    **/
    _count?: true | WebEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebEventMaxAggregateInputType
  }

  export type GetWebEventAggregateType<T extends WebEventAggregateArgs> = {
        [P in keyof T & keyof AggregateWebEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebEvent[P]>
      : GetScalarType<T[P], AggregateWebEvent[P]>
  }




  export type WebEventGroupByArgs = {
    where?: WebEventWhereInput
    orderBy?: Enumerable<WebEventOrderByWithAggregationInput>
    by: WebEventScalarFieldEnum[]
    having?: WebEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebEventCountAggregateInputType | true
    _min?: WebEventMinAggregateInputType
    _max?: WebEventMaxAggregateInputType
  }


  export type WebEventGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    eventType: string
    eventName: string
    payload: string
    pageId: string
    sessionId: string
    visitorId: string
    websiteId: string
    _count: WebEventCountAggregateOutputType | null
    _min: WebEventMinAggregateOutputType | null
    _max: WebEventMaxAggregateOutputType | null
  }

  type GetWebEventGroupByPayload<T extends WebEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<WebEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebEventGroupByOutputType[P]>
            : GetScalarType<T[P], WebEventGroupByOutputType[P]>
        }
      >
    >


  export type WebEventSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventType?: boolean
    eventName?: boolean
    payload?: boolean
    pageId?: boolean
    sessionId?: boolean
    visitorId?: boolean
    websiteId?: boolean
    Page?: boolean | WebPageviewArgs
    User?: boolean | WebVisitorArgs
    WebSession?: boolean | WebSessionArgs
    Website?: boolean | WebsiteArgs
  }


  export type WebEventInclude = {
    Page?: boolean | WebPageviewArgs
    User?: boolean | WebVisitorArgs
    WebSession?: boolean | WebSessionArgs
    Website?: boolean | WebsiteArgs
  }

  export type WebEventGetPayload<S extends boolean | null | undefined | WebEventArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? WebEvent :
    S extends undefined ? never :
    S extends { include: any } & (WebEventArgs | WebEventFindManyArgs)
    ? WebEvent  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'Page' ? WebPageviewGetPayload<S['include'][P]> :
        P extends 'User' ? WebVisitorGetPayload<S['include'][P]> :
        P extends 'WebSession' ? WebSessionGetPayload<S['include'][P]> :
        P extends 'Website' ? WebsiteGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (WebEventArgs | WebEventFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'Page' ? WebPageviewGetPayload<S['select'][P]> :
        P extends 'User' ? WebVisitorGetPayload<S['select'][P]> :
        P extends 'WebSession' ? WebSessionGetPayload<S['select'][P]> :
        P extends 'Website' ? WebsiteGetPayload<S['select'][P]> :  P extends keyof WebEvent ? WebEvent[P] : never
  } 
      : WebEvent


  type WebEventCountArgs = 
    Omit<WebEventFindManyArgs, 'select' | 'include'> & {
      select?: WebEventCountAggregateInputType | true
    }

  export interface WebEventDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one WebEvent that matches the filter.
     * @param {WebEventFindUniqueArgs} args - Arguments to find a WebEvent
     * @example
     * // Get one WebEvent
     * const webEvent = await prisma.webEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WebEventFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WebEventFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'WebEvent'> extends True ? Prisma__WebEventClient<WebEventGetPayload<T>> : Prisma__WebEventClient<WebEventGetPayload<T> | null, null>

    /**
     * Find one WebEvent that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WebEventFindUniqueOrThrowArgs} args - Arguments to find a WebEvent
     * @example
     * // Get one WebEvent
     * const webEvent = await prisma.webEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WebEventFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, WebEventFindUniqueOrThrowArgs>
    ): Prisma__WebEventClient<WebEventGetPayload<T>>

    /**
     * Find the first WebEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebEventFindFirstArgs} args - Arguments to find a WebEvent
     * @example
     * // Get one WebEvent
     * const webEvent = await prisma.webEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WebEventFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WebEventFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'WebEvent'> extends True ? Prisma__WebEventClient<WebEventGetPayload<T>> : Prisma__WebEventClient<WebEventGetPayload<T> | null, null>

    /**
     * Find the first WebEvent that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebEventFindFirstOrThrowArgs} args - Arguments to find a WebEvent
     * @example
     * // Get one WebEvent
     * const webEvent = await prisma.webEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WebEventFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WebEventFindFirstOrThrowArgs>
    ): Prisma__WebEventClient<WebEventGetPayload<T>>

    /**
     * Find zero or more WebEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebEventFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebEvents
     * const webEvents = await prisma.webEvent.findMany()
     * 
     * // Get first 10 WebEvents
     * const webEvents = await prisma.webEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webEventWithIdOnly = await prisma.webEvent.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WebEventFindManyArgs>(
      args?: SelectSubset<T, WebEventFindManyArgs>
    ): Prisma.PrismaPromise<Array<WebEventGetPayload<T>>>

    /**
     * Create a WebEvent.
     * @param {WebEventCreateArgs} args - Arguments to create a WebEvent.
     * @example
     * // Create one WebEvent
     * const WebEvent = await prisma.webEvent.create({
     *   data: {
     *     // ... data to create a WebEvent
     *   }
     * })
     * 
    **/
    create<T extends WebEventCreateArgs>(
      args: SelectSubset<T, WebEventCreateArgs>
    ): Prisma__WebEventClient<WebEventGetPayload<T>>

    /**
     * Create many WebEvents.
     *     @param {WebEventCreateManyArgs} args - Arguments to create many WebEvents.
     *     @example
     *     // Create many WebEvents
     *     const webEvent = await prisma.webEvent.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WebEventCreateManyArgs>(
      args?: SelectSubset<T, WebEventCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WebEvent.
     * @param {WebEventDeleteArgs} args - Arguments to delete one WebEvent.
     * @example
     * // Delete one WebEvent
     * const WebEvent = await prisma.webEvent.delete({
     *   where: {
     *     // ... filter to delete one WebEvent
     *   }
     * })
     * 
    **/
    delete<T extends WebEventDeleteArgs>(
      args: SelectSubset<T, WebEventDeleteArgs>
    ): Prisma__WebEventClient<WebEventGetPayload<T>>

    /**
     * Update one WebEvent.
     * @param {WebEventUpdateArgs} args - Arguments to update one WebEvent.
     * @example
     * // Update one WebEvent
     * const webEvent = await prisma.webEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WebEventUpdateArgs>(
      args: SelectSubset<T, WebEventUpdateArgs>
    ): Prisma__WebEventClient<WebEventGetPayload<T>>

    /**
     * Delete zero or more WebEvents.
     * @param {WebEventDeleteManyArgs} args - Arguments to filter WebEvents to delete.
     * @example
     * // Delete a few WebEvents
     * const { count } = await prisma.webEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WebEventDeleteManyArgs>(
      args?: SelectSubset<T, WebEventDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebEvents
     * const webEvent = await prisma.webEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WebEventUpdateManyArgs>(
      args: SelectSubset<T, WebEventUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WebEvent.
     * @param {WebEventUpsertArgs} args - Arguments to update or create a WebEvent.
     * @example
     * // Update or create a WebEvent
     * const webEvent = await prisma.webEvent.upsert({
     *   create: {
     *     // ... data to create a WebEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebEvent we want to update
     *   }
     * })
    **/
    upsert<T extends WebEventUpsertArgs>(
      args: SelectSubset<T, WebEventUpsertArgs>
    ): Prisma__WebEventClient<WebEventGetPayload<T>>

    /**
     * Count the number of WebEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebEventCountArgs} args - Arguments to filter WebEvents to count.
     * @example
     * // Count the number of WebEvents
     * const count = await prisma.webEvent.count({
     *   where: {
     *     // ... the filter for the WebEvents we want to count
     *   }
     * })
    **/
    count<T extends WebEventCountArgs>(
      args?: Subset<T, WebEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebEventAggregateArgs>(args: Subset<T, WebEventAggregateArgs>): Prisma.PrismaPromise<GetWebEventAggregateType<T>>

    /**
     * Group by WebEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebEventGroupByArgs['orderBy'] }
        : { orderBy?: WebEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for WebEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WebEventClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    Page<T extends WebPageviewArgs= {}>(args?: Subset<T, WebPageviewArgs>): Prisma__WebPageviewClient<WebPageviewGetPayload<T> | Null>;

    User<T extends WebVisitorArgs= {}>(args?: Subset<T, WebVisitorArgs>): Prisma__WebVisitorClient<WebVisitorGetPayload<T> | Null>;

    WebSession<T extends WebSessionArgs= {}>(args?: Subset<T, WebSessionArgs>): Prisma__WebSessionClient<WebSessionGetPayload<T> | Null>;

    Website<T extends WebsiteArgs= {}>(args?: Subset<T, WebsiteArgs>): Prisma__WebsiteClient<WebsiteGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * WebEvent base type for findUnique actions
   */
  export type WebEventFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
    /**
     * Filter, which WebEvent to fetch.
     */
    where: WebEventWhereUniqueInput
  }

  /**
   * WebEvent findUnique
   */
  export interface WebEventFindUniqueArgs extends WebEventFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WebEvent findUniqueOrThrow
   */
  export type WebEventFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
    /**
     * Filter, which WebEvent to fetch.
     */
    where: WebEventWhereUniqueInput
  }


  /**
   * WebEvent base type for findFirst actions
   */
  export type WebEventFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
    /**
     * Filter, which WebEvent to fetch.
     */
    where?: WebEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebEvents to fetch.
     */
    orderBy?: Enumerable<WebEventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebEvents.
     */
    cursor?: WebEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebEvents.
     */
    distinct?: Enumerable<WebEventScalarFieldEnum>
  }

  /**
   * WebEvent findFirst
   */
  export interface WebEventFindFirstArgs extends WebEventFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WebEvent findFirstOrThrow
   */
  export type WebEventFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
    /**
     * Filter, which WebEvent to fetch.
     */
    where?: WebEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebEvents to fetch.
     */
    orderBy?: Enumerable<WebEventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebEvents.
     */
    cursor?: WebEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebEvents.
     */
    distinct?: Enumerable<WebEventScalarFieldEnum>
  }


  /**
   * WebEvent findMany
   */
  export type WebEventFindManyArgs = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
    /**
     * Filter, which WebEvents to fetch.
     */
    where?: WebEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebEvents to fetch.
     */
    orderBy?: Enumerable<WebEventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebEvents.
     */
    cursor?: WebEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebEvents.
     */
    skip?: number
    distinct?: Enumerable<WebEventScalarFieldEnum>
  }


  /**
   * WebEvent create
   */
  export type WebEventCreateArgs = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
    /**
     * The data needed to create a WebEvent.
     */
    data: XOR<WebEventCreateInput, WebEventUncheckedCreateInput>
  }


  /**
   * WebEvent createMany
   */
  export type WebEventCreateManyArgs = {
    /**
     * The data used to create many WebEvents.
     */
    data: Enumerable<WebEventCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * WebEvent update
   */
  export type WebEventUpdateArgs = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
    /**
     * The data needed to update a WebEvent.
     */
    data: XOR<WebEventUpdateInput, WebEventUncheckedUpdateInput>
    /**
     * Choose, which WebEvent to update.
     */
    where: WebEventWhereUniqueInput
  }


  /**
   * WebEvent updateMany
   */
  export type WebEventUpdateManyArgs = {
    /**
     * The data used to update WebEvents.
     */
    data: XOR<WebEventUpdateManyMutationInput, WebEventUncheckedUpdateManyInput>
    /**
     * Filter which WebEvents to update
     */
    where?: WebEventWhereInput
  }


  /**
   * WebEvent upsert
   */
  export type WebEventUpsertArgs = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
    /**
     * The filter to search for the WebEvent to update in case it exists.
     */
    where: WebEventWhereUniqueInput
    /**
     * In case the WebEvent found by the `where` argument doesn't exist, create a new WebEvent with this data.
     */
    create: XOR<WebEventCreateInput, WebEventUncheckedCreateInput>
    /**
     * In case the WebEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebEventUpdateInput, WebEventUncheckedUpdateInput>
  }


  /**
   * WebEvent delete
   */
  export type WebEventDeleteArgs = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
    /**
     * Filter which WebEvent to delete.
     */
    where: WebEventWhereUniqueInput
  }


  /**
   * WebEvent deleteMany
   */
  export type WebEventDeleteManyArgs = {
    /**
     * Filter which WebEvents to delete
     */
    where?: WebEventWhereInput
  }


  /**
   * WebEvent without action
   */
  export type WebEventArgs = {
    /**
     * Select specific fields to fetch from the WebEvent
     */
    select?: WebEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebEventInclude | null
  }



  /**
   * Model ApiKey
   */


  export type AggregateApiKey = {
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  export type ApiKeyMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    websiteId: string | null
    key: string | null
    createdAt: Date | null
    deletedAt: Date | null
    expires: Date | null
  }

  export type ApiKeyMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    websiteId: string | null
    key: string | null
    createdAt: Date | null
    deletedAt: Date | null
    expires: Date | null
  }

  export type ApiKeyCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    websiteId: number
    key: number
    createdAt: number
    deletedAt: number
    expires: number
    _all: number
  }


  export type ApiKeyMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    websiteId?: true
    key?: true
    createdAt?: true
    deletedAt?: true
    expires?: true
  }

  export type ApiKeyMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    websiteId?: true
    key?: true
    createdAt?: true
    deletedAt?: true
    expires?: true
  }

  export type ApiKeyCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    websiteId?: true
    key?: true
    createdAt?: true
    deletedAt?: true
    expires?: true
    _all?: true
  }

  export type ApiKeyAggregateArgs = {
    /**
     * Filter which ApiKey to aggregate.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: Enumerable<ApiKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeys
    **/
    _count?: true | ApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyMaxAggregateInputType
  }

  export type GetApiKeyAggregateType<T extends ApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKey[P]>
      : GetScalarType<T[P], AggregateApiKey[P]>
  }




  export type ApiKeyGroupByArgs = {
    where?: ApiKeyWhereInput
    orderBy?: Enumerable<ApiKeyOrderByWithAggregationInput>
    by: ApiKeyScalarFieldEnum[]
    having?: ApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyCountAggregateInputType | true
    _min?: ApiKeyMinAggregateInputType
    _max?: ApiKeyMaxAggregateInputType
  }


  export type ApiKeyGroupByOutputType = {
    id: string
    userId: string
    name: string
    websiteId: string
    key: string
    createdAt: Date
    deletedAt: Date | null
    expires: Date
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  type GetApiKeyGroupByPayload<T extends ApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeySelect = {
    id?: boolean
    userId?: boolean
    name?: boolean
    websiteId?: boolean
    key?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    expires?: boolean
    user?: boolean | UserArgs
    website?: boolean | WebsiteArgs
  }


  export type ApiKeyInclude = {
    user?: boolean | UserArgs
    website?: boolean | WebsiteArgs
  }

  export type ApiKeyGetPayload<S extends boolean | null | undefined | ApiKeyArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ApiKey :
    S extends undefined ? never :
    S extends { include: any } & (ApiKeyArgs | ApiKeyFindManyArgs)
    ? ApiKey  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :
        P extends 'website' ? WebsiteGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ApiKeyArgs | ApiKeyFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :
        P extends 'website' ? WebsiteGetPayload<S['select'][P]> :  P extends keyof ApiKey ? ApiKey[P] : never
  } 
      : ApiKey


  type ApiKeyCountArgs = 
    Omit<ApiKeyFindManyArgs, 'select' | 'include'> & {
      select?: ApiKeyCountAggregateInputType | true
    }

  export interface ApiKeyDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one ApiKey that matches the filter.
     * @param {ApiKeyFindUniqueArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ApiKeyFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ApiKeyFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ApiKey'> extends True ? Prisma__ApiKeyClient<ApiKeyGetPayload<T>> : Prisma__ApiKeyClient<ApiKeyGetPayload<T> | null, null>

    /**
     * Find one ApiKey that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ApiKeyFindUniqueOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ApiKeyFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ApiKeyFindUniqueOrThrowArgs>
    ): Prisma__ApiKeyClient<ApiKeyGetPayload<T>>

    /**
     * Find the first ApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ApiKeyFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ApiKeyFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ApiKey'> extends True ? Prisma__ApiKeyClient<ApiKeyGetPayload<T>> : Prisma__ApiKeyClient<ApiKeyGetPayload<T> | null, null>

    /**
     * Find the first ApiKey that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ApiKeyFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ApiKeyFindFirstOrThrowArgs>
    ): Prisma__ApiKeyClient<ApiKeyGetPayload<T>>

    /**
     * Find zero or more ApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeys
     * const apiKeys = await prisma.apiKey.findMany()
     * 
     * // Get first 10 ApiKeys
     * const apiKeys = await prisma.apiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ApiKeyFindManyArgs>(
      args?: SelectSubset<T, ApiKeyFindManyArgs>
    ): Prisma.PrismaPromise<Array<ApiKeyGetPayload<T>>>

    /**
     * Create a ApiKey.
     * @param {ApiKeyCreateArgs} args - Arguments to create a ApiKey.
     * @example
     * // Create one ApiKey
     * const ApiKey = await prisma.apiKey.create({
     *   data: {
     *     // ... data to create a ApiKey
     *   }
     * })
     * 
    **/
    create<T extends ApiKeyCreateArgs>(
      args: SelectSubset<T, ApiKeyCreateArgs>
    ): Prisma__ApiKeyClient<ApiKeyGetPayload<T>>

    /**
     * Create many ApiKeys.
     *     @param {ApiKeyCreateManyArgs} args - Arguments to create many ApiKeys.
     *     @example
     *     // Create many ApiKeys
     *     const apiKey = await prisma.apiKey.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ApiKeyCreateManyArgs>(
      args?: SelectSubset<T, ApiKeyCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ApiKey.
     * @param {ApiKeyDeleteArgs} args - Arguments to delete one ApiKey.
     * @example
     * // Delete one ApiKey
     * const ApiKey = await prisma.apiKey.delete({
     *   where: {
     *     // ... filter to delete one ApiKey
     *   }
     * })
     * 
    **/
    delete<T extends ApiKeyDeleteArgs>(
      args: SelectSubset<T, ApiKeyDeleteArgs>
    ): Prisma__ApiKeyClient<ApiKeyGetPayload<T>>

    /**
     * Update one ApiKey.
     * @param {ApiKeyUpdateArgs} args - Arguments to update one ApiKey.
     * @example
     * // Update one ApiKey
     * const apiKey = await prisma.apiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ApiKeyUpdateArgs>(
      args: SelectSubset<T, ApiKeyUpdateArgs>
    ): Prisma__ApiKeyClient<ApiKeyGetPayload<T>>

    /**
     * Delete zero or more ApiKeys.
     * @param {ApiKeyDeleteManyArgs} args - Arguments to filter ApiKeys to delete.
     * @example
     * // Delete a few ApiKeys
     * const { count } = await prisma.apiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ApiKeyDeleteManyArgs>(
      args?: SelectSubset<T, ApiKeyDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ApiKeyUpdateManyArgs>(
      args: SelectSubset<T, ApiKeyUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ApiKey.
     * @param {ApiKeyUpsertArgs} args - Arguments to update or create a ApiKey.
     * @example
     * // Update or create a ApiKey
     * const apiKey = await prisma.apiKey.upsert({
     *   create: {
     *     // ... data to create a ApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKey we want to update
     *   }
     * })
    **/
    upsert<T extends ApiKeyUpsertArgs>(
      args: SelectSubset<T, ApiKeyUpsertArgs>
    ): Prisma__ApiKeyClient<ApiKeyGetPayload<T>>

    /**
     * Count the number of ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyCountArgs} args - Arguments to filter ApiKeys to count.
     * @example
     * // Count the number of ApiKeys
     * const count = await prisma.apiKey.count({
     *   where: {
     *     // ... the filter for the ApiKeys we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyCountArgs>(
      args?: Subset<T, ApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApiKeyAggregateArgs>(args: Subset<T, ApiKeyAggregateArgs>): Prisma.PrismaPromise<GetApiKeyAggregateType<T>>

    /**
     * Group by ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ApiKeyClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    website<T extends WebsiteArgs= {}>(args?: Subset<T, WebsiteArgs>): Prisma__WebsiteClient<WebsiteGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * ApiKey base type for findUnique actions
   */
  export type ApiKeyFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ApiKeyInclude | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findUnique
   */
  export interface ApiKeyFindUniqueArgs extends ApiKeyFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ApiKey findUniqueOrThrow
   */
  export type ApiKeyFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ApiKeyInclude | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }


  /**
   * ApiKey base type for findFirst actions
   */
  export type ApiKeyFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ApiKeyInclude | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: Enumerable<ApiKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: Enumerable<ApiKeyScalarFieldEnum>
  }

  /**
   * ApiKey findFirst
   */
  export interface ApiKeyFindFirstArgs extends ApiKeyFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ApiKey findFirstOrThrow
   */
  export type ApiKeyFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ApiKeyInclude | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: Enumerable<ApiKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: Enumerable<ApiKeyScalarFieldEnum>
  }


  /**
   * ApiKey findMany
   */
  export type ApiKeyFindManyArgs = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ApiKeyInclude | null
    /**
     * Filter, which ApiKeys to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: Enumerable<ApiKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    distinct?: Enumerable<ApiKeyScalarFieldEnum>
  }


  /**
   * ApiKey create
   */
  export type ApiKeyCreateArgs = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ApiKeyInclude | null
    /**
     * The data needed to create a ApiKey.
     */
    data: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
  }


  /**
   * ApiKey createMany
   */
  export type ApiKeyCreateManyArgs = {
    /**
     * The data used to create many ApiKeys.
     */
    data: Enumerable<ApiKeyCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ApiKey update
   */
  export type ApiKeyUpdateArgs = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ApiKeyInclude | null
    /**
     * The data needed to update a ApiKey.
     */
    data: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
    /**
     * Choose, which ApiKey to update.
     */
    where: ApiKeyWhereUniqueInput
  }


  /**
   * ApiKey updateMany
   */
  export type ApiKeyUpdateManyArgs = {
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
  }


  /**
   * ApiKey upsert
   */
  export type ApiKeyUpsertArgs = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ApiKeyInclude | null
    /**
     * The filter to search for the ApiKey to update in case it exists.
     */
    where: ApiKeyWhereUniqueInput
    /**
     * In case the ApiKey found by the `where` argument doesn't exist, create a new ApiKey with this data.
     */
    create: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
    /**
     * In case the ApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
  }


  /**
   * ApiKey delete
   */
  export type ApiKeyDeleteArgs = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ApiKeyInclude | null
    /**
     * Filter which ApiKey to delete.
     */
    where: ApiKeyWhereUniqueInput
  }


  /**
   * ApiKey deleteMany
   */
  export type ApiKeyDeleteManyArgs = {
    /**
     * Filter which ApiKeys to delete
     */
    where?: ApiKeyWhereInput
  }


  /**
   * ApiKey without action
   */
  export type ApiKeyArgs = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ApiKeyInclude | null
  }



  /**
   * Model Team
   */


  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
  }

  export type TeamMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    _all: number
  }


  export type TeamMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    _all?: true
  }

  export type TeamAggregateArgs = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: Enumerable<TeamOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs = {
    where?: TeamWhereInput
    orderBy?: Enumerable<TeamOrderByWithAggregationInput>
    by: TeamScalarFieldEnum[]
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }


  export type TeamGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    TeamWebsite?: boolean | Team$TeamWebsiteArgs
    TeamUser?: boolean | Team$TeamUserArgs
    TeamUserInvite?: boolean | Team$TeamUserInviteArgs
    _count?: boolean | TeamCountOutputTypeArgs
  }


  export type TeamInclude = {
    TeamWebsite?: boolean | Team$TeamWebsiteArgs
    TeamUser?: boolean | Team$TeamUserArgs
    TeamUserInvite?: boolean | Team$TeamUserInviteArgs
    _count?: boolean | TeamCountOutputTypeArgs
  }

  export type TeamGetPayload<S extends boolean | null | undefined | TeamArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Team :
    S extends undefined ? never :
    S extends { include: any } & (TeamArgs | TeamFindManyArgs)
    ? Team  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'TeamWebsite' ? Array < TeamWebsiteGetPayload<S['include'][P]>>  :
        P extends 'TeamUser' ? Array < TeamUserGetPayload<S['include'][P]>>  :
        P extends 'TeamUserInvite' ? Array < TeamUserInviteGetPayload<S['include'][P]>>  :
        P extends '_count' ? TeamCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (TeamArgs | TeamFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'TeamWebsite' ? Array < TeamWebsiteGetPayload<S['select'][P]>>  :
        P extends 'TeamUser' ? Array < TeamUserGetPayload<S['select'][P]>>  :
        P extends 'TeamUserInvite' ? Array < TeamUserInviteGetPayload<S['select'][P]>>  :
        P extends '_count' ? TeamCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Team ? Team[P] : never
  } 
      : Team


  type TeamCountArgs = 
    Omit<TeamFindManyArgs, 'select' | 'include'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TeamFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TeamFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Team'> extends True ? Prisma__TeamClient<TeamGetPayload<T>> : Prisma__TeamClient<TeamGetPayload<T> | null, null>

    /**
     * Find one Team that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TeamFindUniqueOrThrowArgs>
    ): Prisma__TeamClient<TeamGetPayload<T>>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TeamFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TeamFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Team'> extends True ? Prisma__TeamClient<TeamGetPayload<T>> : Prisma__TeamClient<TeamGetPayload<T> | null, null>

    /**
     * Find the first Team that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TeamFindFirstOrThrowArgs>
    ): Prisma__TeamClient<TeamGetPayload<T>>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TeamFindManyArgs>(
      args?: SelectSubset<T, TeamFindManyArgs>
    ): Prisma.PrismaPromise<Array<TeamGetPayload<T>>>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
    **/
    create<T extends TeamCreateArgs>(
      args: SelectSubset<T, TeamCreateArgs>
    ): Prisma__TeamClient<TeamGetPayload<T>>

    /**
     * Create many Teams.
     *     @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     *     @example
     *     // Create many Teams
     *     const team = await prisma.team.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TeamCreateManyArgs>(
      args?: SelectSubset<T, TeamCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
    **/
    delete<T extends TeamDeleteArgs>(
      args: SelectSubset<T, TeamDeleteArgs>
    ): Prisma__TeamClient<TeamGetPayload<T>>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TeamUpdateArgs>(
      args: SelectSubset<T, TeamUpdateArgs>
    ): Prisma__TeamClient<TeamGetPayload<T>>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TeamDeleteManyArgs>(
      args?: SelectSubset<T, TeamDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TeamUpdateManyArgs>(
      args: SelectSubset<T, TeamUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
    **/
    upsert<T extends TeamUpsertArgs>(
      args: SelectSubset<T, TeamUpsertArgs>
    ): Prisma__TeamClient<TeamGetPayload<T>>

    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TeamClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    TeamWebsite<T extends Team$TeamWebsiteArgs= {}>(args?: Subset<T, Team$TeamWebsiteArgs>): Prisma.PrismaPromise<Array<TeamWebsiteGetPayload<T>>| Null>;

    TeamUser<T extends Team$TeamUserArgs= {}>(args?: Subset<T, Team$TeamUserArgs>): Prisma.PrismaPromise<Array<TeamUserGetPayload<T>>| Null>;

    TeamUserInvite<T extends Team$TeamUserInviteArgs= {}>(args?: Subset<T, Team$TeamUserInviteArgs>): Prisma.PrismaPromise<Array<TeamUserInviteGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Team base type for findUnique actions
   */
  export type TeamFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUnique
   */
  export interface TeamFindUniqueArgs extends TeamFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }


  /**
   * Team base type for findFirst actions
   */
  export type TeamFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: Enumerable<TeamOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: Enumerable<TeamScalarFieldEnum>
  }

  /**
   * Team findFirst
   */
  export interface TeamFindFirstArgs extends TeamFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: Enumerable<TeamOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: Enumerable<TeamScalarFieldEnum>
  }


  /**
   * Team findMany
   */
  export type TeamFindManyArgs = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: Enumerable<TeamOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    distinct?: Enumerable<TeamScalarFieldEnum>
  }


  /**
   * Team create
   */
  export type TeamCreateArgs = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }


  /**
   * Team createMany
   */
  export type TeamCreateManyArgs = {
    /**
     * The data used to create many Teams.
     */
    data: Enumerable<TeamCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Team update
   */
  export type TeamUpdateArgs = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }


  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
  }


  /**
   * Team upsert
   */
  export type TeamUpsertArgs = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }


  /**
   * Team delete
   */
  export type TeamDeleteArgs = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }


  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
  }


  /**
   * Team.TeamWebsite
   */
  export type Team$TeamWebsiteArgs = {
    /**
     * Select specific fields to fetch from the TeamWebsite
     */
    select?: TeamWebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamWebsiteInclude | null
    where?: TeamWebsiteWhereInput
    orderBy?: Enumerable<TeamWebsiteOrderByWithRelationInput>
    cursor?: TeamWebsiteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TeamWebsiteScalarFieldEnum>
  }


  /**
   * Team.TeamUser
   */
  export type Team$TeamUserArgs = {
    /**
     * Select specific fields to fetch from the TeamUser
     */
    select?: TeamUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInclude | null
    where?: TeamUserWhereInput
    orderBy?: Enumerable<TeamUserOrderByWithRelationInput>
    cursor?: TeamUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TeamUserScalarFieldEnum>
  }


  /**
   * Team.TeamUserInvite
   */
  export type Team$TeamUserInviteArgs = {
    /**
     * Select specific fields to fetch from the TeamUserInvite
     */
    select?: TeamUserInviteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInviteInclude | null
    where?: TeamUserInviteWhereInput
    orderBy?: Enumerable<TeamUserInviteOrderByWithRelationInput>
    cursor?: TeamUserInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TeamUserInviteScalarFieldEnum>
  }


  /**
   * Team without action
   */
  export type TeamArgs = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude | null
  }



  /**
   * Model TeamWebsite
   */


  export type AggregateTeamWebsite = {
    _count: TeamWebsiteCountAggregateOutputType | null
    _min: TeamWebsiteMinAggregateOutputType | null
    _max: TeamWebsiteMaxAggregateOutputType | null
  }

  export type TeamWebsiteMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    teamId: string | null
    websiteId: string | null
  }

  export type TeamWebsiteMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    teamId: string | null
    websiteId: string | null
  }

  export type TeamWebsiteCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    teamId: number
    websiteId: number
    _all: number
  }


  export type TeamWebsiteMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    teamId?: true
    websiteId?: true
  }

  export type TeamWebsiteMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    teamId?: true
    websiteId?: true
  }

  export type TeamWebsiteCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    teamId?: true
    websiteId?: true
    _all?: true
  }

  export type TeamWebsiteAggregateArgs = {
    /**
     * Filter which TeamWebsite to aggregate.
     */
    where?: TeamWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamWebsites to fetch.
     */
    orderBy?: Enumerable<TeamWebsiteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamWebsites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamWebsites
    **/
    _count?: true | TeamWebsiteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamWebsiteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamWebsiteMaxAggregateInputType
  }

  export type GetTeamWebsiteAggregateType<T extends TeamWebsiteAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamWebsite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamWebsite[P]>
      : GetScalarType<T[P], AggregateTeamWebsite[P]>
  }




  export type TeamWebsiteGroupByArgs = {
    where?: TeamWebsiteWhereInput
    orderBy?: Enumerable<TeamWebsiteOrderByWithAggregationInput>
    by: TeamWebsiteScalarFieldEnum[]
    having?: TeamWebsiteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamWebsiteCountAggregateInputType | true
    _min?: TeamWebsiteMinAggregateInputType
    _max?: TeamWebsiteMaxAggregateInputType
  }


  export type TeamWebsiteGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    teamId: string
    websiteId: string
    _count: TeamWebsiteCountAggregateOutputType | null
    _min: TeamWebsiteMinAggregateOutputType | null
    _max: TeamWebsiteMaxAggregateOutputType | null
  }

  type GetTeamWebsiteGroupByPayload<T extends TeamWebsiteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TeamWebsiteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamWebsiteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamWebsiteGroupByOutputType[P]>
            : GetScalarType<T[P], TeamWebsiteGroupByOutputType[P]>
        }
      >
    >


  export type TeamWebsiteSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teamId?: boolean
    websiteId?: boolean
    Team?: boolean | TeamArgs
    Website?: boolean | WebsiteArgs
  }


  export type TeamWebsiteInclude = {
    Team?: boolean | TeamArgs
    Website?: boolean | WebsiteArgs
  }

  export type TeamWebsiteGetPayload<S extends boolean | null | undefined | TeamWebsiteArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TeamWebsite :
    S extends undefined ? never :
    S extends { include: any } & (TeamWebsiteArgs | TeamWebsiteFindManyArgs)
    ? TeamWebsite  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'Team' ? TeamGetPayload<S['include'][P]> :
        P extends 'Website' ? WebsiteGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (TeamWebsiteArgs | TeamWebsiteFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'Team' ? TeamGetPayload<S['select'][P]> :
        P extends 'Website' ? WebsiteGetPayload<S['select'][P]> :  P extends keyof TeamWebsite ? TeamWebsite[P] : never
  } 
      : TeamWebsite


  type TeamWebsiteCountArgs = 
    Omit<TeamWebsiteFindManyArgs, 'select' | 'include'> & {
      select?: TeamWebsiteCountAggregateInputType | true
    }

  export interface TeamWebsiteDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one TeamWebsite that matches the filter.
     * @param {TeamWebsiteFindUniqueArgs} args - Arguments to find a TeamWebsite
     * @example
     * // Get one TeamWebsite
     * const teamWebsite = await prisma.teamWebsite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TeamWebsiteFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TeamWebsiteFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TeamWebsite'> extends True ? Prisma__TeamWebsiteClient<TeamWebsiteGetPayload<T>> : Prisma__TeamWebsiteClient<TeamWebsiteGetPayload<T> | null, null>

    /**
     * Find one TeamWebsite that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TeamWebsiteFindUniqueOrThrowArgs} args - Arguments to find a TeamWebsite
     * @example
     * // Get one TeamWebsite
     * const teamWebsite = await prisma.teamWebsite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TeamWebsiteFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TeamWebsiteFindUniqueOrThrowArgs>
    ): Prisma__TeamWebsiteClient<TeamWebsiteGetPayload<T>>

    /**
     * Find the first TeamWebsite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamWebsiteFindFirstArgs} args - Arguments to find a TeamWebsite
     * @example
     * // Get one TeamWebsite
     * const teamWebsite = await prisma.teamWebsite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TeamWebsiteFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TeamWebsiteFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TeamWebsite'> extends True ? Prisma__TeamWebsiteClient<TeamWebsiteGetPayload<T>> : Prisma__TeamWebsiteClient<TeamWebsiteGetPayload<T> | null, null>

    /**
     * Find the first TeamWebsite that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamWebsiteFindFirstOrThrowArgs} args - Arguments to find a TeamWebsite
     * @example
     * // Get one TeamWebsite
     * const teamWebsite = await prisma.teamWebsite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TeamWebsiteFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TeamWebsiteFindFirstOrThrowArgs>
    ): Prisma__TeamWebsiteClient<TeamWebsiteGetPayload<T>>

    /**
     * Find zero or more TeamWebsites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamWebsiteFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamWebsites
     * const teamWebsites = await prisma.teamWebsite.findMany()
     * 
     * // Get first 10 TeamWebsites
     * const teamWebsites = await prisma.teamWebsite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWebsiteWithIdOnly = await prisma.teamWebsite.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TeamWebsiteFindManyArgs>(
      args?: SelectSubset<T, TeamWebsiteFindManyArgs>
    ): Prisma.PrismaPromise<Array<TeamWebsiteGetPayload<T>>>

    /**
     * Create a TeamWebsite.
     * @param {TeamWebsiteCreateArgs} args - Arguments to create a TeamWebsite.
     * @example
     * // Create one TeamWebsite
     * const TeamWebsite = await prisma.teamWebsite.create({
     *   data: {
     *     // ... data to create a TeamWebsite
     *   }
     * })
     * 
    **/
    create<T extends TeamWebsiteCreateArgs>(
      args: SelectSubset<T, TeamWebsiteCreateArgs>
    ): Prisma__TeamWebsiteClient<TeamWebsiteGetPayload<T>>

    /**
     * Create many TeamWebsites.
     *     @param {TeamWebsiteCreateManyArgs} args - Arguments to create many TeamWebsites.
     *     @example
     *     // Create many TeamWebsites
     *     const teamWebsite = await prisma.teamWebsite.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TeamWebsiteCreateManyArgs>(
      args?: SelectSubset<T, TeamWebsiteCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TeamWebsite.
     * @param {TeamWebsiteDeleteArgs} args - Arguments to delete one TeamWebsite.
     * @example
     * // Delete one TeamWebsite
     * const TeamWebsite = await prisma.teamWebsite.delete({
     *   where: {
     *     // ... filter to delete one TeamWebsite
     *   }
     * })
     * 
    **/
    delete<T extends TeamWebsiteDeleteArgs>(
      args: SelectSubset<T, TeamWebsiteDeleteArgs>
    ): Prisma__TeamWebsiteClient<TeamWebsiteGetPayload<T>>

    /**
     * Update one TeamWebsite.
     * @param {TeamWebsiteUpdateArgs} args - Arguments to update one TeamWebsite.
     * @example
     * // Update one TeamWebsite
     * const teamWebsite = await prisma.teamWebsite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TeamWebsiteUpdateArgs>(
      args: SelectSubset<T, TeamWebsiteUpdateArgs>
    ): Prisma__TeamWebsiteClient<TeamWebsiteGetPayload<T>>

    /**
     * Delete zero or more TeamWebsites.
     * @param {TeamWebsiteDeleteManyArgs} args - Arguments to filter TeamWebsites to delete.
     * @example
     * // Delete a few TeamWebsites
     * const { count } = await prisma.teamWebsite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TeamWebsiteDeleteManyArgs>(
      args?: SelectSubset<T, TeamWebsiteDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamWebsites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamWebsiteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamWebsites
     * const teamWebsite = await prisma.teamWebsite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TeamWebsiteUpdateManyArgs>(
      args: SelectSubset<T, TeamWebsiteUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TeamWebsite.
     * @param {TeamWebsiteUpsertArgs} args - Arguments to update or create a TeamWebsite.
     * @example
     * // Update or create a TeamWebsite
     * const teamWebsite = await prisma.teamWebsite.upsert({
     *   create: {
     *     // ... data to create a TeamWebsite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamWebsite we want to update
     *   }
     * })
    **/
    upsert<T extends TeamWebsiteUpsertArgs>(
      args: SelectSubset<T, TeamWebsiteUpsertArgs>
    ): Prisma__TeamWebsiteClient<TeamWebsiteGetPayload<T>>

    /**
     * Count the number of TeamWebsites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamWebsiteCountArgs} args - Arguments to filter TeamWebsites to count.
     * @example
     * // Count the number of TeamWebsites
     * const count = await prisma.teamWebsite.count({
     *   where: {
     *     // ... the filter for the TeamWebsites we want to count
     *   }
     * })
    **/
    count<T extends TeamWebsiteCountArgs>(
      args?: Subset<T, TeamWebsiteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamWebsiteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamWebsite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamWebsiteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamWebsiteAggregateArgs>(args: Subset<T, TeamWebsiteAggregateArgs>): Prisma.PrismaPromise<GetTeamWebsiteAggregateType<T>>

    /**
     * Group by TeamWebsite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamWebsiteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamWebsiteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamWebsiteGroupByArgs['orderBy'] }
        : { orderBy?: TeamWebsiteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamWebsiteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamWebsiteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamWebsite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TeamWebsiteClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    Team<T extends TeamArgs= {}>(args?: Subset<T, TeamArgs>): Prisma__TeamClient<TeamGetPayload<T> | Null>;

    Website<T extends WebsiteArgs= {}>(args?: Subset<T, WebsiteArgs>): Prisma__WebsiteClient<WebsiteGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * TeamWebsite base type for findUnique actions
   */
  export type TeamWebsiteFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the TeamWebsite
     */
    select?: TeamWebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamWebsiteInclude | null
    /**
     * Filter, which TeamWebsite to fetch.
     */
    where: TeamWebsiteWhereUniqueInput
  }

  /**
   * TeamWebsite findUnique
   */
  export interface TeamWebsiteFindUniqueArgs extends TeamWebsiteFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TeamWebsite findUniqueOrThrow
   */
  export type TeamWebsiteFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the TeamWebsite
     */
    select?: TeamWebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamWebsiteInclude | null
    /**
     * Filter, which TeamWebsite to fetch.
     */
    where: TeamWebsiteWhereUniqueInput
  }


  /**
   * TeamWebsite base type for findFirst actions
   */
  export type TeamWebsiteFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the TeamWebsite
     */
    select?: TeamWebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamWebsiteInclude | null
    /**
     * Filter, which TeamWebsite to fetch.
     */
    where?: TeamWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamWebsites to fetch.
     */
    orderBy?: Enumerable<TeamWebsiteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamWebsites.
     */
    cursor?: TeamWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamWebsites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamWebsites.
     */
    distinct?: Enumerable<TeamWebsiteScalarFieldEnum>
  }

  /**
   * TeamWebsite findFirst
   */
  export interface TeamWebsiteFindFirstArgs extends TeamWebsiteFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TeamWebsite findFirstOrThrow
   */
  export type TeamWebsiteFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the TeamWebsite
     */
    select?: TeamWebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamWebsiteInclude | null
    /**
     * Filter, which TeamWebsite to fetch.
     */
    where?: TeamWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamWebsites to fetch.
     */
    orderBy?: Enumerable<TeamWebsiteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamWebsites.
     */
    cursor?: TeamWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamWebsites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamWebsites.
     */
    distinct?: Enumerable<TeamWebsiteScalarFieldEnum>
  }


  /**
   * TeamWebsite findMany
   */
  export type TeamWebsiteFindManyArgs = {
    /**
     * Select specific fields to fetch from the TeamWebsite
     */
    select?: TeamWebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamWebsiteInclude | null
    /**
     * Filter, which TeamWebsites to fetch.
     */
    where?: TeamWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamWebsites to fetch.
     */
    orderBy?: Enumerable<TeamWebsiteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamWebsites.
     */
    cursor?: TeamWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamWebsites.
     */
    skip?: number
    distinct?: Enumerable<TeamWebsiteScalarFieldEnum>
  }


  /**
   * TeamWebsite create
   */
  export type TeamWebsiteCreateArgs = {
    /**
     * Select specific fields to fetch from the TeamWebsite
     */
    select?: TeamWebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamWebsiteInclude | null
    /**
     * The data needed to create a TeamWebsite.
     */
    data: XOR<TeamWebsiteCreateInput, TeamWebsiteUncheckedCreateInput>
  }


  /**
   * TeamWebsite createMany
   */
  export type TeamWebsiteCreateManyArgs = {
    /**
     * The data used to create many TeamWebsites.
     */
    data: Enumerable<TeamWebsiteCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TeamWebsite update
   */
  export type TeamWebsiteUpdateArgs = {
    /**
     * Select specific fields to fetch from the TeamWebsite
     */
    select?: TeamWebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamWebsiteInclude | null
    /**
     * The data needed to update a TeamWebsite.
     */
    data: XOR<TeamWebsiteUpdateInput, TeamWebsiteUncheckedUpdateInput>
    /**
     * Choose, which TeamWebsite to update.
     */
    where: TeamWebsiteWhereUniqueInput
  }


  /**
   * TeamWebsite updateMany
   */
  export type TeamWebsiteUpdateManyArgs = {
    /**
     * The data used to update TeamWebsites.
     */
    data: XOR<TeamWebsiteUpdateManyMutationInput, TeamWebsiteUncheckedUpdateManyInput>
    /**
     * Filter which TeamWebsites to update
     */
    where?: TeamWebsiteWhereInput
  }


  /**
   * TeamWebsite upsert
   */
  export type TeamWebsiteUpsertArgs = {
    /**
     * Select specific fields to fetch from the TeamWebsite
     */
    select?: TeamWebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamWebsiteInclude | null
    /**
     * The filter to search for the TeamWebsite to update in case it exists.
     */
    where: TeamWebsiteWhereUniqueInput
    /**
     * In case the TeamWebsite found by the `where` argument doesn't exist, create a new TeamWebsite with this data.
     */
    create: XOR<TeamWebsiteCreateInput, TeamWebsiteUncheckedCreateInput>
    /**
     * In case the TeamWebsite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamWebsiteUpdateInput, TeamWebsiteUncheckedUpdateInput>
  }


  /**
   * TeamWebsite delete
   */
  export type TeamWebsiteDeleteArgs = {
    /**
     * Select specific fields to fetch from the TeamWebsite
     */
    select?: TeamWebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamWebsiteInclude | null
    /**
     * Filter which TeamWebsite to delete.
     */
    where: TeamWebsiteWhereUniqueInput
  }


  /**
   * TeamWebsite deleteMany
   */
  export type TeamWebsiteDeleteManyArgs = {
    /**
     * Filter which TeamWebsites to delete
     */
    where?: TeamWebsiteWhereInput
  }


  /**
   * TeamWebsite without action
   */
  export type TeamWebsiteArgs = {
    /**
     * Select specific fields to fetch from the TeamWebsite
     */
    select?: TeamWebsiteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamWebsiteInclude | null
  }



  /**
   * Model TeamUser
   */


  export type AggregateTeamUser = {
    _count: TeamUserCountAggregateOutputType | null
    _min: TeamUserMinAggregateOutputType | null
    _max: TeamUserMaxAggregateOutputType | null
  }

  export type TeamUserMinAggregateOutputType = {
    id: string | null
    teamId: string | null
    userId: string | null
    role: ROLE | null
    accepted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamUserMaxAggregateOutputType = {
    id: string | null
    teamId: string | null
    userId: string | null
    role: ROLE | null
    accepted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamUserCountAggregateOutputType = {
    id: number
    teamId: number
    userId: number
    role: number
    accepted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeamUserMinAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    accepted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamUserMaxAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    accepted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamUserCountAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    accepted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeamUserAggregateArgs = {
    /**
     * Filter which TeamUser to aggregate.
     */
    where?: TeamUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamUsers to fetch.
     */
    orderBy?: Enumerable<TeamUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamUsers
    **/
    _count?: true | TeamUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamUserMaxAggregateInputType
  }

  export type GetTeamUserAggregateType<T extends TeamUserAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamUser[P]>
      : GetScalarType<T[P], AggregateTeamUser[P]>
  }




  export type TeamUserGroupByArgs = {
    where?: TeamUserWhereInput
    orderBy?: Enumerable<TeamUserOrderByWithAggregationInput>
    by: TeamUserScalarFieldEnum[]
    having?: TeamUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamUserCountAggregateInputType | true
    _min?: TeamUserMinAggregateInputType
    _max?: TeamUserMaxAggregateInputType
  }


  export type TeamUserGroupByOutputType = {
    id: string
    teamId: string
    userId: string
    role: ROLE
    accepted: boolean
    createdAt: Date
    updatedAt: Date
    _count: TeamUserCountAggregateOutputType | null
    _min: TeamUserMinAggregateOutputType | null
    _max: TeamUserMaxAggregateOutputType | null
  }

  type GetTeamUserGroupByPayload<T extends TeamUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TeamUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamUserGroupByOutputType[P]>
            : GetScalarType<T[P], TeamUserGroupByOutputType[P]>
        }
      >
    >


  export type TeamUserSelect = {
    id?: boolean
    teamId?: boolean
    userId?: boolean
    role?: boolean
    accepted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Team?: boolean | TeamArgs
    User?: boolean | UserArgs
    TeamUserInvite?: boolean | TeamUser$TeamUserInviteArgs
    _count?: boolean | TeamUserCountOutputTypeArgs
  }


  export type TeamUserInclude = {
    Team?: boolean | TeamArgs
    User?: boolean | UserArgs
    TeamUserInvite?: boolean | TeamUser$TeamUserInviteArgs
    _count?: boolean | TeamUserCountOutputTypeArgs
  }

  export type TeamUserGetPayload<S extends boolean | null | undefined | TeamUserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TeamUser :
    S extends undefined ? never :
    S extends { include: any } & (TeamUserArgs | TeamUserFindManyArgs)
    ? TeamUser  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'Team' ? TeamGetPayload<S['include'][P]> :
        P extends 'User' ? UserGetPayload<S['include'][P]> :
        P extends 'TeamUserInvite' ? Array < TeamUserInviteGetPayload<S['include'][P]>>  :
        P extends '_count' ? TeamUserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (TeamUserArgs | TeamUserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'Team' ? TeamGetPayload<S['select'][P]> :
        P extends 'User' ? UserGetPayload<S['select'][P]> :
        P extends 'TeamUserInvite' ? Array < TeamUserInviteGetPayload<S['select'][P]>>  :
        P extends '_count' ? TeamUserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof TeamUser ? TeamUser[P] : never
  } 
      : TeamUser


  type TeamUserCountArgs = 
    Omit<TeamUserFindManyArgs, 'select' | 'include'> & {
      select?: TeamUserCountAggregateInputType | true
    }

  export interface TeamUserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one TeamUser that matches the filter.
     * @param {TeamUserFindUniqueArgs} args - Arguments to find a TeamUser
     * @example
     * // Get one TeamUser
     * const teamUser = await prisma.teamUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TeamUserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TeamUserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TeamUser'> extends True ? Prisma__TeamUserClient<TeamUserGetPayload<T>> : Prisma__TeamUserClient<TeamUserGetPayload<T> | null, null>

    /**
     * Find one TeamUser that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TeamUserFindUniqueOrThrowArgs} args - Arguments to find a TeamUser
     * @example
     * // Get one TeamUser
     * const teamUser = await prisma.teamUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TeamUserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TeamUserFindUniqueOrThrowArgs>
    ): Prisma__TeamUserClient<TeamUserGetPayload<T>>

    /**
     * Find the first TeamUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserFindFirstArgs} args - Arguments to find a TeamUser
     * @example
     * // Get one TeamUser
     * const teamUser = await prisma.teamUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TeamUserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TeamUserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TeamUser'> extends True ? Prisma__TeamUserClient<TeamUserGetPayload<T>> : Prisma__TeamUserClient<TeamUserGetPayload<T> | null, null>

    /**
     * Find the first TeamUser that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserFindFirstOrThrowArgs} args - Arguments to find a TeamUser
     * @example
     * // Get one TeamUser
     * const teamUser = await prisma.teamUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TeamUserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TeamUserFindFirstOrThrowArgs>
    ): Prisma__TeamUserClient<TeamUserGetPayload<T>>

    /**
     * Find zero or more TeamUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamUsers
     * const teamUsers = await prisma.teamUser.findMany()
     * 
     * // Get first 10 TeamUsers
     * const teamUsers = await prisma.teamUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamUserWithIdOnly = await prisma.teamUser.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TeamUserFindManyArgs>(
      args?: SelectSubset<T, TeamUserFindManyArgs>
    ): Prisma.PrismaPromise<Array<TeamUserGetPayload<T>>>

    /**
     * Create a TeamUser.
     * @param {TeamUserCreateArgs} args - Arguments to create a TeamUser.
     * @example
     * // Create one TeamUser
     * const TeamUser = await prisma.teamUser.create({
     *   data: {
     *     // ... data to create a TeamUser
     *   }
     * })
     * 
    **/
    create<T extends TeamUserCreateArgs>(
      args: SelectSubset<T, TeamUserCreateArgs>
    ): Prisma__TeamUserClient<TeamUserGetPayload<T>>

    /**
     * Create many TeamUsers.
     *     @param {TeamUserCreateManyArgs} args - Arguments to create many TeamUsers.
     *     @example
     *     // Create many TeamUsers
     *     const teamUser = await prisma.teamUser.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TeamUserCreateManyArgs>(
      args?: SelectSubset<T, TeamUserCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TeamUser.
     * @param {TeamUserDeleteArgs} args - Arguments to delete one TeamUser.
     * @example
     * // Delete one TeamUser
     * const TeamUser = await prisma.teamUser.delete({
     *   where: {
     *     // ... filter to delete one TeamUser
     *   }
     * })
     * 
    **/
    delete<T extends TeamUserDeleteArgs>(
      args: SelectSubset<T, TeamUserDeleteArgs>
    ): Prisma__TeamUserClient<TeamUserGetPayload<T>>

    /**
     * Update one TeamUser.
     * @param {TeamUserUpdateArgs} args - Arguments to update one TeamUser.
     * @example
     * // Update one TeamUser
     * const teamUser = await prisma.teamUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TeamUserUpdateArgs>(
      args: SelectSubset<T, TeamUserUpdateArgs>
    ): Prisma__TeamUserClient<TeamUserGetPayload<T>>

    /**
     * Delete zero or more TeamUsers.
     * @param {TeamUserDeleteManyArgs} args - Arguments to filter TeamUsers to delete.
     * @example
     * // Delete a few TeamUsers
     * const { count } = await prisma.teamUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TeamUserDeleteManyArgs>(
      args?: SelectSubset<T, TeamUserDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamUsers
     * const teamUser = await prisma.teamUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TeamUserUpdateManyArgs>(
      args: SelectSubset<T, TeamUserUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TeamUser.
     * @param {TeamUserUpsertArgs} args - Arguments to update or create a TeamUser.
     * @example
     * // Update or create a TeamUser
     * const teamUser = await prisma.teamUser.upsert({
     *   create: {
     *     // ... data to create a TeamUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamUser we want to update
     *   }
     * })
    **/
    upsert<T extends TeamUserUpsertArgs>(
      args: SelectSubset<T, TeamUserUpsertArgs>
    ): Prisma__TeamUserClient<TeamUserGetPayload<T>>

    /**
     * Count the number of TeamUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserCountArgs} args - Arguments to filter TeamUsers to count.
     * @example
     * // Count the number of TeamUsers
     * const count = await prisma.teamUser.count({
     *   where: {
     *     // ... the filter for the TeamUsers we want to count
     *   }
     * })
    **/
    count<T extends TeamUserCountArgs>(
      args?: Subset<T, TeamUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamUserAggregateArgs>(args: Subset<T, TeamUserAggregateArgs>): Prisma.PrismaPromise<GetTeamUserAggregateType<T>>

    /**
     * Group by TeamUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamUserGroupByArgs['orderBy'] }
        : { orderBy?: TeamUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TeamUserClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    Team<T extends TeamArgs= {}>(args?: Subset<T, TeamArgs>): Prisma__TeamClient<TeamGetPayload<T> | Null>;

    User<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    TeamUserInvite<T extends TeamUser$TeamUserInviteArgs= {}>(args?: Subset<T, TeamUser$TeamUserInviteArgs>): Prisma.PrismaPromise<Array<TeamUserInviteGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * TeamUser base type for findUnique actions
   */
  export type TeamUserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the TeamUser
     */
    select?: TeamUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInclude | null
    /**
     * Filter, which TeamUser to fetch.
     */
    where: TeamUserWhereUniqueInput
  }

  /**
   * TeamUser findUnique
   */
  export interface TeamUserFindUniqueArgs extends TeamUserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TeamUser findUniqueOrThrow
   */
  export type TeamUserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the TeamUser
     */
    select?: TeamUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInclude | null
    /**
     * Filter, which TeamUser to fetch.
     */
    where: TeamUserWhereUniqueInput
  }


  /**
   * TeamUser base type for findFirst actions
   */
  export type TeamUserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the TeamUser
     */
    select?: TeamUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInclude | null
    /**
     * Filter, which TeamUser to fetch.
     */
    where?: TeamUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamUsers to fetch.
     */
    orderBy?: Enumerable<TeamUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamUsers.
     */
    cursor?: TeamUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamUsers.
     */
    distinct?: Enumerable<TeamUserScalarFieldEnum>
  }

  /**
   * TeamUser findFirst
   */
  export interface TeamUserFindFirstArgs extends TeamUserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TeamUser findFirstOrThrow
   */
  export type TeamUserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the TeamUser
     */
    select?: TeamUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInclude | null
    /**
     * Filter, which TeamUser to fetch.
     */
    where?: TeamUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamUsers to fetch.
     */
    orderBy?: Enumerable<TeamUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamUsers.
     */
    cursor?: TeamUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamUsers.
     */
    distinct?: Enumerable<TeamUserScalarFieldEnum>
  }


  /**
   * TeamUser findMany
   */
  export type TeamUserFindManyArgs = {
    /**
     * Select specific fields to fetch from the TeamUser
     */
    select?: TeamUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInclude | null
    /**
     * Filter, which TeamUsers to fetch.
     */
    where?: TeamUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamUsers to fetch.
     */
    orderBy?: Enumerable<TeamUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamUsers.
     */
    cursor?: TeamUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamUsers.
     */
    skip?: number
    distinct?: Enumerable<TeamUserScalarFieldEnum>
  }


  /**
   * TeamUser create
   */
  export type TeamUserCreateArgs = {
    /**
     * Select specific fields to fetch from the TeamUser
     */
    select?: TeamUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInclude | null
    /**
     * The data needed to create a TeamUser.
     */
    data: XOR<TeamUserCreateInput, TeamUserUncheckedCreateInput>
  }


  /**
   * TeamUser createMany
   */
  export type TeamUserCreateManyArgs = {
    /**
     * The data used to create many TeamUsers.
     */
    data: Enumerable<TeamUserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TeamUser update
   */
  export type TeamUserUpdateArgs = {
    /**
     * Select specific fields to fetch from the TeamUser
     */
    select?: TeamUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInclude | null
    /**
     * The data needed to update a TeamUser.
     */
    data: XOR<TeamUserUpdateInput, TeamUserUncheckedUpdateInput>
    /**
     * Choose, which TeamUser to update.
     */
    where: TeamUserWhereUniqueInput
  }


  /**
   * TeamUser updateMany
   */
  export type TeamUserUpdateManyArgs = {
    /**
     * The data used to update TeamUsers.
     */
    data: XOR<TeamUserUpdateManyMutationInput, TeamUserUncheckedUpdateManyInput>
    /**
     * Filter which TeamUsers to update
     */
    where?: TeamUserWhereInput
  }


  /**
   * TeamUser upsert
   */
  export type TeamUserUpsertArgs = {
    /**
     * Select specific fields to fetch from the TeamUser
     */
    select?: TeamUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInclude | null
    /**
     * The filter to search for the TeamUser to update in case it exists.
     */
    where: TeamUserWhereUniqueInput
    /**
     * In case the TeamUser found by the `where` argument doesn't exist, create a new TeamUser with this data.
     */
    create: XOR<TeamUserCreateInput, TeamUserUncheckedCreateInput>
    /**
     * In case the TeamUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUserUpdateInput, TeamUserUncheckedUpdateInput>
  }


  /**
   * TeamUser delete
   */
  export type TeamUserDeleteArgs = {
    /**
     * Select specific fields to fetch from the TeamUser
     */
    select?: TeamUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInclude | null
    /**
     * Filter which TeamUser to delete.
     */
    where: TeamUserWhereUniqueInput
  }


  /**
   * TeamUser deleteMany
   */
  export type TeamUserDeleteManyArgs = {
    /**
     * Filter which TeamUsers to delete
     */
    where?: TeamUserWhereInput
  }


  /**
   * TeamUser.TeamUserInvite
   */
  export type TeamUser$TeamUserInviteArgs = {
    /**
     * Select specific fields to fetch from the TeamUserInvite
     */
    select?: TeamUserInviteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInviteInclude | null
    where?: TeamUserInviteWhereInput
    orderBy?: Enumerable<TeamUserInviteOrderByWithRelationInput>
    cursor?: TeamUserInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TeamUserInviteScalarFieldEnum>
  }


  /**
   * TeamUser without action
   */
  export type TeamUserArgs = {
    /**
     * Select specific fields to fetch from the TeamUser
     */
    select?: TeamUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInclude | null
  }



  /**
   * Model TeamUserInvite
   */


  export type AggregateTeamUserInvite = {
    _count: TeamUserInviteCountAggregateOutputType | null
    _min: TeamUserInviteMinAggregateOutputType | null
    _max: TeamUserInviteMaxAggregateOutputType | null
  }

  export type TeamUserInviteMinAggregateOutputType = {
    id: string | null
    teamId: string | null
    userId: string | null
    teamUserId: string | null
    token: string | null
    status: INVITE_STATUS | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamUserInviteMaxAggregateOutputType = {
    id: string | null
    teamId: string | null
    userId: string | null
    teamUserId: string | null
    token: string | null
    status: INVITE_STATUS | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamUserInviteCountAggregateOutputType = {
    id: number
    teamId: number
    userId: number
    teamUserId: number
    token: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeamUserInviteMinAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    teamUserId?: true
    token?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamUserInviteMaxAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    teamUserId?: true
    token?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamUserInviteCountAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    teamUserId?: true
    token?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeamUserInviteAggregateArgs = {
    /**
     * Filter which TeamUserInvite to aggregate.
     */
    where?: TeamUserInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamUserInvites to fetch.
     */
    orderBy?: Enumerable<TeamUserInviteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamUserInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamUserInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamUserInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamUserInvites
    **/
    _count?: true | TeamUserInviteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamUserInviteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamUserInviteMaxAggregateInputType
  }

  export type GetTeamUserInviteAggregateType<T extends TeamUserInviteAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamUserInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamUserInvite[P]>
      : GetScalarType<T[P], AggregateTeamUserInvite[P]>
  }




  export type TeamUserInviteGroupByArgs = {
    where?: TeamUserInviteWhereInput
    orderBy?: Enumerable<TeamUserInviteOrderByWithAggregationInput>
    by: TeamUserInviteScalarFieldEnum[]
    having?: TeamUserInviteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamUserInviteCountAggregateInputType | true
    _min?: TeamUserInviteMinAggregateInputType
    _max?: TeamUserInviteMaxAggregateInputType
  }


  export type TeamUserInviteGroupByOutputType = {
    id: string
    teamId: string
    userId: string
    teamUserId: string
    token: string
    status: INVITE_STATUS
    createdAt: Date
    updatedAt: Date
    _count: TeamUserInviteCountAggregateOutputType | null
    _min: TeamUserInviteMinAggregateOutputType | null
    _max: TeamUserInviteMaxAggregateOutputType | null
  }

  type GetTeamUserInviteGroupByPayload<T extends TeamUserInviteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TeamUserInviteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamUserInviteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamUserInviteGroupByOutputType[P]>
            : GetScalarType<T[P], TeamUserInviteGroupByOutputType[P]>
        }
      >
    >


  export type TeamUserInviteSelect = {
    id?: boolean
    teamId?: boolean
    userId?: boolean
    teamUserId?: boolean
    token?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Team?: boolean | TeamArgs
    User?: boolean | UserArgs
    TeamUser?: boolean | TeamUserArgs
  }


  export type TeamUserInviteInclude = {
    Team?: boolean | TeamArgs
    User?: boolean | UserArgs
    TeamUser?: boolean | TeamUserArgs
  }

  export type TeamUserInviteGetPayload<S extends boolean | null | undefined | TeamUserInviteArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TeamUserInvite :
    S extends undefined ? never :
    S extends { include: any } & (TeamUserInviteArgs | TeamUserInviteFindManyArgs)
    ? TeamUserInvite  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'Team' ? TeamGetPayload<S['include'][P]> :
        P extends 'User' ? UserGetPayload<S['include'][P]> :
        P extends 'TeamUser' ? TeamUserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (TeamUserInviteArgs | TeamUserInviteFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'Team' ? TeamGetPayload<S['select'][P]> :
        P extends 'User' ? UserGetPayload<S['select'][P]> :
        P extends 'TeamUser' ? TeamUserGetPayload<S['select'][P]> :  P extends keyof TeamUserInvite ? TeamUserInvite[P] : never
  } 
      : TeamUserInvite


  type TeamUserInviteCountArgs = 
    Omit<TeamUserInviteFindManyArgs, 'select' | 'include'> & {
      select?: TeamUserInviteCountAggregateInputType | true
    }

  export interface TeamUserInviteDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one TeamUserInvite that matches the filter.
     * @param {TeamUserInviteFindUniqueArgs} args - Arguments to find a TeamUserInvite
     * @example
     * // Get one TeamUserInvite
     * const teamUserInvite = await prisma.teamUserInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TeamUserInviteFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TeamUserInviteFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TeamUserInvite'> extends True ? Prisma__TeamUserInviteClient<TeamUserInviteGetPayload<T>> : Prisma__TeamUserInviteClient<TeamUserInviteGetPayload<T> | null, null>

    /**
     * Find one TeamUserInvite that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TeamUserInviteFindUniqueOrThrowArgs} args - Arguments to find a TeamUserInvite
     * @example
     * // Get one TeamUserInvite
     * const teamUserInvite = await prisma.teamUserInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TeamUserInviteFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TeamUserInviteFindUniqueOrThrowArgs>
    ): Prisma__TeamUserInviteClient<TeamUserInviteGetPayload<T>>

    /**
     * Find the first TeamUserInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserInviteFindFirstArgs} args - Arguments to find a TeamUserInvite
     * @example
     * // Get one TeamUserInvite
     * const teamUserInvite = await prisma.teamUserInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TeamUserInviteFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TeamUserInviteFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TeamUserInvite'> extends True ? Prisma__TeamUserInviteClient<TeamUserInviteGetPayload<T>> : Prisma__TeamUserInviteClient<TeamUserInviteGetPayload<T> | null, null>

    /**
     * Find the first TeamUserInvite that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserInviteFindFirstOrThrowArgs} args - Arguments to find a TeamUserInvite
     * @example
     * // Get one TeamUserInvite
     * const teamUserInvite = await prisma.teamUserInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TeamUserInviteFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TeamUserInviteFindFirstOrThrowArgs>
    ): Prisma__TeamUserInviteClient<TeamUserInviteGetPayload<T>>

    /**
     * Find zero or more TeamUserInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserInviteFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamUserInvites
     * const teamUserInvites = await prisma.teamUserInvite.findMany()
     * 
     * // Get first 10 TeamUserInvites
     * const teamUserInvites = await prisma.teamUserInvite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamUserInviteWithIdOnly = await prisma.teamUserInvite.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TeamUserInviteFindManyArgs>(
      args?: SelectSubset<T, TeamUserInviteFindManyArgs>
    ): Prisma.PrismaPromise<Array<TeamUserInviteGetPayload<T>>>

    /**
     * Create a TeamUserInvite.
     * @param {TeamUserInviteCreateArgs} args - Arguments to create a TeamUserInvite.
     * @example
     * // Create one TeamUserInvite
     * const TeamUserInvite = await prisma.teamUserInvite.create({
     *   data: {
     *     // ... data to create a TeamUserInvite
     *   }
     * })
     * 
    **/
    create<T extends TeamUserInviteCreateArgs>(
      args: SelectSubset<T, TeamUserInviteCreateArgs>
    ): Prisma__TeamUserInviteClient<TeamUserInviteGetPayload<T>>

    /**
     * Create many TeamUserInvites.
     *     @param {TeamUserInviteCreateManyArgs} args - Arguments to create many TeamUserInvites.
     *     @example
     *     // Create many TeamUserInvites
     *     const teamUserInvite = await prisma.teamUserInvite.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TeamUserInviteCreateManyArgs>(
      args?: SelectSubset<T, TeamUserInviteCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TeamUserInvite.
     * @param {TeamUserInviteDeleteArgs} args - Arguments to delete one TeamUserInvite.
     * @example
     * // Delete one TeamUserInvite
     * const TeamUserInvite = await prisma.teamUserInvite.delete({
     *   where: {
     *     // ... filter to delete one TeamUserInvite
     *   }
     * })
     * 
    **/
    delete<T extends TeamUserInviteDeleteArgs>(
      args: SelectSubset<T, TeamUserInviteDeleteArgs>
    ): Prisma__TeamUserInviteClient<TeamUserInviteGetPayload<T>>

    /**
     * Update one TeamUserInvite.
     * @param {TeamUserInviteUpdateArgs} args - Arguments to update one TeamUserInvite.
     * @example
     * // Update one TeamUserInvite
     * const teamUserInvite = await prisma.teamUserInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TeamUserInviteUpdateArgs>(
      args: SelectSubset<T, TeamUserInviteUpdateArgs>
    ): Prisma__TeamUserInviteClient<TeamUserInviteGetPayload<T>>

    /**
     * Delete zero or more TeamUserInvites.
     * @param {TeamUserInviteDeleteManyArgs} args - Arguments to filter TeamUserInvites to delete.
     * @example
     * // Delete a few TeamUserInvites
     * const { count } = await prisma.teamUserInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TeamUserInviteDeleteManyArgs>(
      args?: SelectSubset<T, TeamUserInviteDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamUserInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamUserInvites
     * const teamUserInvite = await prisma.teamUserInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TeamUserInviteUpdateManyArgs>(
      args: SelectSubset<T, TeamUserInviteUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TeamUserInvite.
     * @param {TeamUserInviteUpsertArgs} args - Arguments to update or create a TeamUserInvite.
     * @example
     * // Update or create a TeamUserInvite
     * const teamUserInvite = await prisma.teamUserInvite.upsert({
     *   create: {
     *     // ... data to create a TeamUserInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamUserInvite we want to update
     *   }
     * })
    **/
    upsert<T extends TeamUserInviteUpsertArgs>(
      args: SelectSubset<T, TeamUserInviteUpsertArgs>
    ): Prisma__TeamUserInviteClient<TeamUserInviteGetPayload<T>>

    /**
     * Count the number of TeamUserInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserInviteCountArgs} args - Arguments to filter TeamUserInvites to count.
     * @example
     * // Count the number of TeamUserInvites
     * const count = await prisma.teamUserInvite.count({
     *   where: {
     *     // ... the filter for the TeamUserInvites we want to count
     *   }
     * })
    **/
    count<T extends TeamUserInviteCountArgs>(
      args?: Subset<T, TeamUserInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamUserInviteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamUserInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamUserInviteAggregateArgs>(args: Subset<T, TeamUserInviteAggregateArgs>): Prisma.PrismaPromise<GetTeamUserInviteAggregateType<T>>

    /**
     * Group by TeamUserInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUserInviteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamUserInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamUserInviteGroupByArgs['orderBy'] }
        : { orderBy?: TeamUserInviteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamUserInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamUserInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamUserInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TeamUserInviteClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    Team<T extends TeamArgs= {}>(args?: Subset<T, TeamArgs>): Prisma__TeamClient<TeamGetPayload<T> | Null>;

    User<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    TeamUser<T extends TeamUserArgs= {}>(args?: Subset<T, TeamUserArgs>): Prisma__TeamUserClient<TeamUserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * TeamUserInvite base type for findUnique actions
   */
  export type TeamUserInviteFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the TeamUserInvite
     */
    select?: TeamUserInviteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInviteInclude | null
    /**
     * Filter, which TeamUserInvite to fetch.
     */
    where: TeamUserInviteWhereUniqueInput
  }

  /**
   * TeamUserInvite findUnique
   */
  export interface TeamUserInviteFindUniqueArgs extends TeamUserInviteFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TeamUserInvite findUniqueOrThrow
   */
  export type TeamUserInviteFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the TeamUserInvite
     */
    select?: TeamUserInviteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInviteInclude | null
    /**
     * Filter, which TeamUserInvite to fetch.
     */
    where: TeamUserInviteWhereUniqueInput
  }


  /**
   * TeamUserInvite base type for findFirst actions
   */
  export type TeamUserInviteFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the TeamUserInvite
     */
    select?: TeamUserInviteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInviteInclude | null
    /**
     * Filter, which TeamUserInvite to fetch.
     */
    where?: TeamUserInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamUserInvites to fetch.
     */
    orderBy?: Enumerable<TeamUserInviteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamUserInvites.
     */
    cursor?: TeamUserInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamUserInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamUserInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamUserInvites.
     */
    distinct?: Enumerable<TeamUserInviteScalarFieldEnum>
  }

  /**
   * TeamUserInvite findFirst
   */
  export interface TeamUserInviteFindFirstArgs extends TeamUserInviteFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TeamUserInvite findFirstOrThrow
   */
  export type TeamUserInviteFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the TeamUserInvite
     */
    select?: TeamUserInviteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInviteInclude | null
    /**
     * Filter, which TeamUserInvite to fetch.
     */
    where?: TeamUserInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamUserInvites to fetch.
     */
    orderBy?: Enumerable<TeamUserInviteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamUserInvites.
     */
    cursor?: TeamUserInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamUserInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamUserInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamUserInvites.
     */
    distinct?: Enumerable<TeamUserInviteScalarFieldEnum>
  }


  /**
   * TeamUserInvite findMany
   */
  export type TeamUserInviteFindManyArgs = {
    /**
     * Select specific fields to fetch from the TeamUserInvite
     */
    select?: TeamUserInviteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInviteInclude | null
    /**
     * Filter, which TeamUserInvites to fetch.
     */
    where?: TeamUserInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamUserInvites to fetch.
     */
    orderBy?: Enumerable<TeamUserInviteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamUserInvites.
     */
    cursor?: TeamUserInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamUserInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamUserInvites.
     */
    skip?: number
    distinct?: Enumerable<TeamUserInviteScalarFieldEnum>
  }


  /**
   * TeamUserInvite create
   */
  export type TeamUserInviteCreateArgs = {
    /**
     * Select specific fields to fetch from the TeamUserInvite
     */
    select?: TeamUserInviteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInviteInclude | null
    /**
     * The data needed to create a TeamUserInvite.
     */
    data: XOR<TeamUserInviteCreateInput, TeamUserInviteUncheckedCreateInput>
  }


  /**
   * TeamUserInvite createMany
   */
  export type TeamUserInviteCreateManyArgs = {
    /**
     * The data used to create many TeamUserInvites.
     */
    data: Enumerable<TeamUserInviteCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TeamUserInvite update
   */
  export type TeamUserInviteUpdateArgs = {
    /**
     * Select specific fields to fetch from the TeamUserInvite
     */
    select?: TeamUserInviteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInviteInclude | null
    /**
     * The data needed to update a TeamUserInvite.
     */
    data: XOR<TeamUserInviteUpdateInput, TeamUserInviteUncheckedUpdateInput>
    /**
     * Choose, which TeamUserInvite to update.
     */
    where: TeamUserInviteWhereUniqueInput
  }


  /**
   * TeamUserInvite updateMany
   */
  export type TeamUserInviteUpdateManyArgs = {
    /**
     * The data used to update TeamUserInvites.
     */
    data: XOR<TeamUserInviteUpdateManyMutationInput, TeamUserInviteUncheckedUpdateManyInput>
    /**
     * Filter which TeamUserInvites to update
     */
    where?: TeamUserInviteWhereInput
  }


  /**
   * TeamUserInvite upsert
   */
  export type TeamUserInviteUpsertArgs = {
    /**
     * Select specific fields to fetch from the TeamUserInvite
     */
    select?: TeamUserInviteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInviteInclude | null
    /**
     * The filter to search for the TeamUserInvite to update in case it exists.
     */
    where: TeamUserInviteWhereUniqueInput
    /**
     * In case the TeamUserInvite found by the `where` argument doesn't exist, create a new TeamUserInvite with this data.
     */
    create: XOR<TeamUserInviteCreateInput, TeamUserInviteUncheckedCreateInput>
    /**
     * In case the TeamUserInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUserInviteUpdateInput, TeamUserInviteUncheckedUpdateInput>
  }


  /**
   * TeamUserInvite delete
   */
  export type TeamUserInviteDeleteArgs = {
    /**
     * Select specific fields to fetch from the TeamUserInvite
     */
    select?: TeamUserInviteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInviteInclude | null
    /**
     * Filter which TeamUserInvite to delete.
     */
    where: TeamUserInviteWhereUniqueInput
  }


  /**
   * TeamUserInvite deleteMany
   */
  export type TeamUserInviteDeleteManyArgs = {
    /**
     * Filter which TeamUserInvites to delete
     */
    where?: TeamUserInviteWhereInput
  }


  /**
   * TeamUserInvite without action
   */
  export type TeamUserInviteArgs = {
    /**
     * Select specific fields to fetch from the TeamUserInvite
     */
    select?: TeamUserInviteSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamUserInviteInclude | null
  }



  /**
   * Model Disallowed
   */


  export type AggregateDisallowed = {
    _count: DisallowedCountAggregateOutputType | null
    _min: DisallowedMinAggregateOutputType | null
    _max: DisallowedMaxAggregateOutputType | null
  }

  export type DisallowedMinAggregateOutputType = {
    id: string | null
    identity: string | null
  }

  export type DisallowedMaxAggregateOutputType = {
    id: string | null
    identity: string | null
  }

  export type DisallowedCountAggregateOutputType = {
    id: number
    identity: number
    _all: number
  }


  export type DisallowedMinAggregateInputType = {
    id?: true
    identity?: true
  }

  export type DisallowedMaxAggregateInputType = {
    id?: true
    identity?: true
  }

  export type DisallowedCountAggregateInputType = {
    id?: true
    identity?: true
    _all?: true
  }

  export type DisallowedAggregateArgs = {
    /**
     * Filter which Disallowed to aggregate.
     */
    where?: DisallowedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disalloweds to fetch.
     */
    orderBy?: Enumerable<DisallowedOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DisallowedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disalloweds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disalloweds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Disalloweds
    **/
    _count?: true | DisallowedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DisallowedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DisallowedMaxAggregateInputType
  }

  export type GetDisallowedAggregateType<T extends DisallowedAggregateArgs> = {
        [P in keyof T & keyof AggregateDisallowed]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDisallowed[P]>
      : GetScalarType<T[P], AggregateDisallowed[P]>
  }




  export type DisallowedGroupByArgs = {
    where?: DisallowedWhereInput
    orderBy?: Enumerable<DisallowedOrderByWithAggregationInput>
    by: DisallowedScalarFieldEnum[]
    having?: DisallowedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DisallowedCountAggregateInputType | true
    _min?: DisallowedMinAggregateInputType
    _max?: DisallowedMaxAggregateInputType
  }


  export type DisallowedGroupByOutputType = {
    id: string
    identity: string
    _count: DisallowedCountAggregateOutputType | null
    _min: DisallowedMinAggregateOutputType | null
    _max: DisallowedMaxAggregateOutputType | null
  }

  type GetDisallowedGroupByPayload<T extends DisallowedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<DisallowedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DisallowedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DisallowedGroupByOutputType[P]>
            : GetScalarType<T[P], DisallowedGroupByOutputType[P]>
        }
      >
    >


  export type DisallowedSelect = {
    id?: boolean
    identity?: boolean
  }


  export type DisallowedGetPayload<S extends boolean | null | undefined | DisallowedArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Disallowed :
    S extends undefined ? never :
    S extends { include: any } & (DisallowedArgs | DisallowedFindManyArgs)
    ? Disallowed 
    : S extends { select: any } & (DisallowedArgs | DisallowedFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof Disallowed ? Disallowed[P] : never
  } 
      : Disallowed


  type DisallowedCountArgs = 
    Omit<DisallowedFindManyArgs, 'select' | 'include'> & {
      select?: DisallowedCountAggregateInputType | true
    }

  export interface DisallowedDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Disallowed that matches the filter.
     * @param {DisallowedFindUniqueArgs} args - Arguments to find a Disallowed
     * @example
     * // Get one Disallowed
     * const disallowed = await prisma.disallowed.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DisallowedFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DisallowedFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Disallowed'> extends True ? Prisma__DisallowedClient<DisallowedGetPayload<T>> : Prisma__DisallowedClient<DisallowedGetPayload<T> | null, null>

    /**
     * Find one Disallowed that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DisallowedFindUniqueOrThrowArgs} args - Arguments to find a Disallowed
     * @example
     * // Get one Disallowed
     * const disallowed = await prisma.disallowed.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DisallowedFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DisallowedFindUniqueOrThrowArgs>
    ): Prisma__DisallowedClient<DisallowedGetPayload<T>>

    /**
     * Find the first Disallowed that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisallowedFindFirstArgs} args - Arguments to find a Disallowed
     * @example
     * // Get one Disallowed
     * const disallowed = await prisma.disallowed.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DisallowedFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DisallowedFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Disallowed'> extends True ? Prisma__DisallowedClient<DisallowedGetPayload<T>> : Prisma__DisallowedClient<DisallowedGetPayload<T> | null, null>

    /**
     * Find the first Disallowed that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisallowedFindFirstOrThrowArgs} args - Arguments to find a Disallowed
     * @example
     * // Get one Disallowed
     * const disallowed = await prisma.disallowed.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DisallowedFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DisallowedFindFirstOrThrowArgs>
    ): Prisma__DisallowedClient<DisallowedGetPayload<T>>

    /**
     * Find zero or more Disalloweds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisallowedFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Disalloweds
     * const disalloweds = await prisma.disallowed.findMany()
     * 
     * // Get first 10 Disalloweds
     * const disalloweds = await prisma.disallowed.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const disallowedWithIdOnly = await prisma.disallowed.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DisallowedFindManyArgs>(
      args?: SelectSubset<T, DisallowedFindManyArgs>
    ): Prisma.PrismaPromise<Array<DisallowedGetPayload<T>>>

    /**
     * Create a Disallowed.
     * @param {DisallowedCreateArgs} args - Arguments to create a Disallowed.
     * @example
     * // Create one Disallowed
     * const Disallowed = await prisma.disallowed.create({
     *   data: {
     *     // ... data to create a Disallowed
     *   }
     * })
     * 
    **/
    create<T extends DisallowedCreateArgs>(
      args: SelectSubset<T, DisallowedCreateArgs>
    ): Prisma__DisallowedClient<DisallowedGetPayload<T>>

    /**
     * Create many Disalloweds.
     *     @param {DisallowedCreateManyArgs} args - Arguments to create many Disalloweds.
     *     @example
     *     // Create many Disalloweds
     *     const disallowed = await prisma.disallowed.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DisallowedCreateManyArgs>(
      args?: SelectSubset<T, DisallowedCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Disallowed.
     * @param {DisallowedDeleteArgs} args - Arguments to delete one Disallowed.
     * @example
     * // Delete one Disallowed
     * const Disallowed = await prisma.disallowed.delete({
     *   where: {
     *     // ... filter to delete one Disallowed
     *   }
     * })
     * 
    **/
    delete<T extends DisallowedDeleteArgs>(
      args: SelectSubset<T, DisallowedDeleteArgs>
    ): Prisma__DisallowedClient<DisallowedGetPayload<T>>

    /**
     * Update one Disallowed.
     * @param {DisallowedUpdateArgs} args - Arguments to update one Disallowed.
     * @example
     * // Update one Disallowed
     * const disallowed = await prisma.disallowed.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DisallowedUpdateArgs>(
      args: SelectSubset<T, DisallowedUpdateArgs>
    ): Prisma__DisallowedClient<DisallowedGetPayload<T>>

    /**
     * Delete zero or more Disalloweds.
     * @param {DisallowedDeleteManyArgs} args - Arguments to filter Disalloweds to delete.
     * @example
     * // Delete a few Disalloweds
     * const { count } = await prisma.disallowed.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DisallowedDeleteManyArgs>(
      args?: SelectSubset<T, DisallowedDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Disalloweds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisallowedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Disalloweds
     * const disallowed = await prisma.disallowed.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DisallowedUpdateManyArgs>(
      args: SelectSubset<T, DisallowedUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Disallowed.
     * @param {DisallowedUpsertArgs} args - Arguments to update or create a Disallowed.
     * @example
     * // Update or create a Disallowed
     * const disallowed = await prisma.disallowed.upsert({
     *   create: {
     *     // ... data to create a Disallowed
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Disallowed we want to update
     *   }
     * })
    **/
    upsert<T extends DisallowedUpsertArgs>(
      args: SelectSubset<T, DisallowedUpsertArgs>
    ): Prisma__DisallowedClient<DisallowedGetPayload<T>>

    /**
     * Count the number of Disalloweds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisallowedCountArgs} args - Arguments to filter Disalloweds to count.
     * @example
     * // Count the number of Disalloweds
     * const count = await prisma.disallowed.count({
     *   where: {
     *     // ... the filter for the Disalloweds we want to count
     *   }
     * })
    **/
    count<T extends DisallowedCountArgs>(
      args?: Subset<T, DisallowedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DisallowedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Disallowed.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisallowedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DisallowedAggregateArgs>(args: Subset<T, DisallowedAggregateArgs>): Prisma.PrismaPromise<GetDisallowedAggregateType<T>>

    /**
     * Group by Disallowed.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisallowedGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DisallowedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DisallowedGroupByArgs['orderBy'] }
        : { orderBy?: DisallowedGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DisallowedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisallowedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Disallowed.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DisallowedClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Disallowed base type for findUnique actions
   */
  export type DisallowedFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Disallowed
     */
    select?: DisallowedSelect | null
    /**
     * Filter, which Disallowed to fetch.
     */
    where: DisallowedWhereUniqueInput
  }

  /**
   * Disallowed findUnique
   */
  export interface DisallowedFindUniqueArgs extends DisallowedFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Disallowed findUniqueOrThrow
   */
  export type DisallowedFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Disallowed
     */
    select?: DisallowedSelect | null
    /**
     * Filter, which Disallowed to fetch.
     */
    where: DisallowedWhereUniqueInput
  }


  /**
   * Disallowed base type for findFirst actions
   */
  export type DisallowedFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Disallowed
     */
    select?: DisallowedSelect | null
    /**
     * Filter, which Disallowed to fetch.
     */
    where?: DisallowedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disalloweds to fetch.
     */
    orderBy?: Enumerable<DisallowedOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disalloweds.
     */
    cursor?: DisallowedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disalloweds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disalloweds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disalloweds.
     */
    distinct?: Enumerable<DisallowedScalarFieldEnum>
  }

  /**
   * Disallowed findFirst
   */
  export interface DisallowedFindFirstArgs extends DisallowedFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Disallowed findFirstOrThrow
   */
  export type DisallowedFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Disallowed
     */
    select?: DisallowedSelect | null
    /**
     * Filter, which Disallowed to fetch.
     */
    where?: DisallowedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disalloweds to fetch.
     */
    orderBy?: Enumerable<DisallowedOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disalloweds.
     */
    cursor?: DisallowedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disalloweds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disalloweds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disalloweds.
     */
    distinct?: Enumerable<DisallowedScalarFieldEnum>
  }


  /**
   * Disallowed findMany
   */
  export type DisallowedFindManyArgs = {
    /**
     * Select specific fields to fetch from the Disallowed
     */
    select?: DisallowedSelect | null
    /**
     * Filter, which Disalloweds to fetch.
     */
    where?: DisallowedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disalloweds to fetch.
     */
    orderBy?: Enumerable<DisallowedOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Disalloweds.
     */
    cursor?: DisallowedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disalloweds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disalloweds.
     */
    skip?: number
    distinct?: Enumerable<DisallowedScalarFieldEnum>
  }


  /**
   * Disallowed create
   */
  export type DisallowedCreateArgs = {
    /**
     * Select specific fields to fetch from the Disallowed
     */
    select?: DisallowedSelect | null
    /**
     * The data needed to create a Disallowed.
     */
    data: XOR<DisallowedCreateInput, DisallowedUncheckedCreateInput>
  }


  /**
   * Disallowed createMany
   */
  export type DisallowedCreateManyArgs = {
    /**
     * The data used to create many Disalloweds.
     */
    data: Enumerable<DisallowedCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Disallowed update
   */
  export type DisallowedUpdateArgs = {
    /**
     * Select specific fields to fetch from the Disallowed
     */
    select?: DisallowedSelect | null
    /**
     * The data needed to update a Disallowed.
     */
    data: XOR<DisallowedUpdateInput, DisallowedUncheckedUpdateInput>
    /**
     * Choose, which Disallowed to update.
     */
    where: DisallowedWhereUniqueInput
  }


  /**
   * Disallowed updateMany
   */
  export type DisallowedUpdateManyArgs = {
    /**
     * The data used to update Disalloweds.
     */
    data: XOR<DisallowedUpdateManyMutationInput, DisallowedUncheckedUpdateManyInput>
    /**
     * Filter which Disalloweds to update
     */
    where?: DisallowedWhereInput
  }


  /**
   * Disallowed upsert
   */
  export type DisallowedUpsertArgs = {
    /**
     * Select specific fields to fetch from the Disallowed
     */
    select?: DisallowedSelect | null
    /**
     * The filter to search for the Disallowed to update in case it exists.
     */
    where: DisallowedWhereUniqueInput
    /**
     * In case the Disallowed found by the `where` argument doesn't exist, create a new Disallowed with this data.
     */
    create: XOR<DisallowedCreateInput, DisallowedUncheckedCreateInput>
    /**
     * In case the Disallowed was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DisallowedUpdateInput, DisallowedUncheckedUpdateInput>
  }


  /**
   * Disallowed delete
   */
  export type DisallowedDeleteArgs = {
    /**
     * Select specific fields to fetch from the Disallowed
     */
    select?: DisallowedSelect | null
    /**
     * Filter which Disallowed to delete.
     */
    where: DisallowedWhereUniqueInput
  }


  /**
   * Disallowed deleteMany
   */
  export type DisallowedDeleteManyArgs = {
    /**
     * Filter which Disalloweds to delete
     */
    where?: DisallowedWhereInput
  }


  /**
   * Disallowed without action
   */
  export type DisallowedArgs = {
    /**
     * Select specific fields to fetch from the Disallowed
     */
    select?: DisallowedSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const ApiKeyScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    websiteId: 'websiteId',
    key: 'key',
    createdAt: 'createdAt',
    deletedAt: 'deletedAt',
    expires: 'expires'
  };

  export type ApiKeyScalarFieldEnum = (typeof ApiKeyScalarFieldEnum)[keyof typeof ApiKeyScalarFieldEnum]


  export const DisallowedScalarFieldEnum: {
    id: 'id',
    identity: 'identity'
  };

  export type DisallowedScalarFieldEnum = (typeof DisallowedScalarFieldEnum)[keyof typeof DisallowedScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TeamScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const TeamUserInviteScalarFieldEnum: {
    id: 'id',
    teamId: 'teamId',
    userId: 'userId',
    teamUserId: 'teamUserId',
    token: 'token',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeamUserInviteScalarFieldEnum = (typeof TeamUserInviteScalarFieldEnum)[keyof typeof TeamUserInviteScalarFieldEnum]


  export const TeamUserScalarFieldEnum: {
    id: 'id',
    teamId: 'teamId',
    userId: 'userId',
    role: 'role',
    accepted: 'accepted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeamUserScalarFieldEnum = (typeof TeamUserScalarFieldEnum)[keyof typeof TeamUserScalarFieldEnum]


  export const TeamWebsiteScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    teamId: 'teamId',
    websiteId: 'websiteId'
  };

  export type TeamWebsiteScalarFieldEnum = (typeof TeamWebsiteScalarFieldEnum)[keyof typeof TeamWebsiteScalarFieldEnum]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    stripeCustomerId: 'stripeCustomerId',
    stripeSubscriptionId: 'stripeSubscriptionId',
    stripePriceId: 'stripePriceId',
    stripeCurrentPeriodEnd: 'stripeCurrentPeriodEnd'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const WebEventScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    eventType: 'eventType',
    eventName: 'eventName',
    payload: 'payload',
    pageId: 'pageId',
    sessionId: 'sessionId',
    visitorId: 'visitorId',
    websiteId: 'websiteId'
  };

  export type WebEventScalarFieldEnum = (typeof WebEventScalarFieldEnum)[keyof typeof WebEventScalarFieldEnum]


  export const WebPageviewScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    page: 'page',
    referrer: 'referrer',
    queryParams: 'queryParams',
    duration: 'duration',
    sessionId: 'sessionId',
    visitorId: 'visitorId',
    websiteId: 'websiteId'
  };

  export type WebPageviewScalarFieldEnum = (typeof WebPageviewScalarFieldEnum)[keyof typeof WebPageviewScalarFieldEnum]


  export const WebSessionScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    referrer: 'referrer',
    queryParams: 'queryParams',
    duration: 'duration',
    country: 'country',
    city: 'city',
    device: 'device',
    os: 'os',
    browser: 'browser',
    language: 'language',
    visitorId: 'visitorId',
    websiteId: 'websiteId'
  };

  export type WebSessionScalarFieldEnum = (typeof WebSessionScalarFieldEnum)[keyof typeof WebSessionScalarFieldEnum]


  export const WebVisitorScalarFieldEnum: {
    id: 'id',
    data: 'data',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    websiteId: 'websiteId'
  };

  export type WebVisitorScalarFieldEnum = (typeof WebVisitorScalarFieldEnum)[keyof typeof WebVisitorScalarFieldEnum]


  export const WebsiteScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    url: 'url',
    title: 'title',
    userId: 'userId',
    active: 'active'
  };

  export type WebsiteScalarFieldEnum = (typeof WebsiteScalarFieldEnum)[keyof typeof WebsiteScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type AccountWhereInput = {
    AND?: Enumerable<AccountWhereInput>
    OR?: Enumerable<AccountWhereInput>
    NOT?: Enumerable<AccountWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    type?: StringFilter | string
    provider?: StringFilter | string
    providerAccountId?: StringFilter | string
    refresh_token?: StringNullableFilter | string | null
    access_token?: StringNullableFilter | string | null
    expires_at?: IntNullableFilter | number | null
    token_type?: StringNullableFilter | string | null
    scope?: StringNullableFilter | string | null
    id_token?: StringNullableFilter | string | null
    session_state?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = {
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
  }

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AccountScalarWhereWithAggregatesInput>
    OR?: Enumerable<AccountScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AccountScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    type?: StringWithAggregatesFilter | string
    provider?: StringWithAggregatesFilter | string
    providerAccountId?: StringWithAggregatesFilter | string
    refresh_token?: StringNullableWithAggregatesFilter | string | null
    access_token?: StringNullableWithAggregatesFilter | string | null
    expires_at?: IntNullableWithAggregatesFilter | number | null
    token_type?: StringNullableWithAggregatesFilter | string | null
    scope?: StringNullableWithAggregatesFilter | string | null
    id_token?: StringNullableWithAggregatesFilter | string | null
    session_state?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type SessionWhereInput = {
    AND?: Enumerable<SessionWhereInput>
    OR?: Enumerable<SessionWhereInput>
    NOT?: Enumerable<SessionWhereInput>
    id?: StringFilter | string
    sessionToken?: StringFilter | string
    userId?: StringFilter | string
    expires?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = {
    id?: string
    sessionToken?: string
  }

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SessionScalarWhereWithAggregatesInput>
    OR?: Enumerable<SessionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SessionScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    sessionToken?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    expires?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    name?: StringNullableFilter | string | null
    email?: StringNullableFilter | string | null
    emailVerified?: DateTimeNullableFilter | Date | string | null
    image?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    stripeCustomerId?: StringNullableFilter | string | null
    stripeSubscriptionId?: StringNullableFilter | string | null
    stripePriceId?: StringNullableFilter | string | null
    stripeCurrentPeriodEnd?: DateTimeNullableFilter | Date | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    Website?: WebsiteListRelationFilter
    ApiKey?: ApiKeyListRelationFilter
    TeamUser?: TeamUserListRelationFilter
    TeamUserInvite?: TeamUserInviteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    stripeCurrentPeriodEnd?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    Website?: WebsiteOrderByRelationAggregateInput
    ApiKey?: ApiKeyOrderByRelationAggregateInput
    TeamUser?: TeamUserOrderByRelationAggregateInput
    TeamUserInvite?: TeamUserInviteOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    email?: string
    stripeCustomerId?: string
    stripeSubscriptionId?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    stripeCurrentPeriodEnd?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringNullableWithAggregatesFilter | string | null
    email?: StringNullableWithAggregatesFilter | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter | Date | string | null
    image?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    stripeCustomerId?: StringNullableWithAggregatesFilter | string | null
    stripeSubscriptionId?: StringNullableWithAggregatesFilter | string | null
    stripePriceId?: StringNullableWithAggregatesFilter | string | null
    stripeCurrentPeriodEnd?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type VerificationTokenWhereInput = {
    AND?: Enumerable<VerificationTokenWhereInput>
    OR?: Enumerable<VerificationTokenWhereInput>
    NOT?: Enumerable<VerificationTokenWhereInput>
    identifier?: StringFilter | string
    token?: StringFilter | string
    expires?: DateTimeFilter | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = {
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
  }

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    OR?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    NOT?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    identifier?: StringWithAggregatesFilter | string
    token?: StringWithAggregatesFilter | string
    expires?: DateTimeWithAggregatesFilter | Date | string
  }

  export type WebsiteWhereInput = {
    AND?: Enumerable<WebsiteWhereInput>
    OR?: Enumerable<WebsiteWhereInput>
    NOT?: Enumerable<WebsiteWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    url?: StringFilter | string
    title?: StringNullableFilter | string | null
    userId?: StringFilter | string
    active?: BoolFilter | boolean
    User?: XOR<UserRelationFilter, UserWhereInput>
    WebVisitor?: WebVisitorListRelationFilter
    WebSession?: WebSessionListRelationFilter
    WebPageview?: WebPageviewListRelationFilter
    WebEvent?: WebEventListRelationFilter
    ApiKey?: ApiKeyListRelationFilter
    TeamWebsite?: TeamWebsiteListRelationFilter
  }

  export type WebsiteOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    url?: SortOrder
    title?: SortOrder
    userId?: SortOrder
    active?: SortOrder
    User?: UserOrderByWithRelationInput
    WebVisitor?: WebVisitorOrderByRelationAggregateInput
    WebSession?: WebSessionOrderByRelationAggregateInput
    WebPageview?: WebPageviewOrderByRelationAggregateInput
    WebEvent?: WebEventOrderByRelationAggregateInput
    ApiKey?: ApiKeyOrderByRelationAggregateInput
    TeamWebsite?: TeamWebsiteOrderByRelationAggregateInput
  }

  export type WebsiteWhereUniqueInput = {
    id?: string
    url?: string
  }

  export type WebsiteOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    url?: SortOrder
    title?: SortOrder
    userId?: SortOrder
    active?: SortOrder
    _count?: WebsiteCountOrderByAggregateInput
    _max?: WebsiteMaxOrderByAggregateInput
    _min?: WebsiteMinOrderByAggregateInput
  }

  export type WebsiteScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WebsiteScalarWhereWithAggregatesInput>
    OR?: Enumerable<WebsiteScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WebsiteScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    url?: StringWithAggregatesFilter | string
    title?: StringNullableWithAggregatesFilter | string | null
    userId?: StringWithAggregatesFilter | string
    active?: BoolWithAggregatesFilter | boolean
  }

  export type WebVisitorWhereInput = {
    AND?: Enumerable<WebVisitorWhereInput>
    OR?: Enumerable<WebVisitorWhereInput>
    NOT?: Enumerable<WebVisitorWhereInput>
    id?: StringFilter | string
    data?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    websiteId?: StringFilter | string
    Session?: WebSessionListRelationFilter
    Pageview?: WebPageviewListRelationFilter
    WebEvent?: WebEventListRelationFilter
    Website?: XOR<WebsiteRelationFilter, WebsiteWhereInput>
  }

  export type WebVisitorOrderByWithRelationInput = {
    id?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    websiteId?: SortOrder
    Session?: WebSessionOrderByRelationAggregateInput
    Pageview?: WebPageviewOrderByRelationAggregateInput
    WebEvent?: WebEventOrderByRelationAggregateInput
    Website?: WebsiteOrderByWithRelationInput
  }

  export type WebVisitorWhereUniqueInput = {
    id?: string
  }

  export type WebVisitorOrderByWithAggregationInput = {
    id?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    websiteId?: SortOrder
    _count?: WebVisitorCountOrderByAggregateInput
    _max?: WebVisitorMaxOrderByAggregateInput
    _min?: WebVisitorMinOrderByAggregateInput
  }

  export type WebVisitorScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WebVisitorScalarWhereWithAggregatesInput>
    OR?: Enumerable<WebVisitorScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WebVisitorScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    data?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    websiteId?: StringWithAggregatesFilter | string
  }

  export type WebSessionWhereInput = {
    AND?: Enumerable<WebSessionWhereInput>
    OR?: Enumerable<WebSessionWhereInput>
    NOT?: Enumerable<WebSessionWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    referrer?: StringFilter | string
    queryParams?: StringFilter | string
    duration?: IntFilter | number
    country?: StringNullableFilter | string | null
    city?: StringNullableFilter | string | null
    device?: StringNullableFilter | string | null
    os?: StringNullableFilter | string | null
    browser?: StringNullableFilter | string | null
    language?: StringNullableFilter | string | null
    visitorId?: StringFilter | string
    websiteId?: StringFilter | string
    WebPage?: WebPageviewListRelationFilter
    WebEvent?: WebEventListRelationFilter
    WebVisitor?: XOR<WebVisitorRelationFilter, WebVisitorWhereInput>
    Website?: XOR<WebsiteRelationFilter, WebsiteWhereInput>
  }

  export type WebSessionOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    referrer?: SortOrder
    queryParams?: SortOrder
    duration?: SortOrder
    country?: SortOrder
    city?: SortOrder
    device?: SortOrder
    os?: SortOrder
    browser?: SortOrder
    language?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
    WebPage?: WebPageviewOrderByRelationAggregateInput
    WebEvent?: WebEventOrderByRelationAggregateInput
    WebVisitor?: WebVisitorOrderByWithRelationInput
    Website?: WebsiteOrderByWithRelationInput
  }

  export type WebSessionWhereUniqueInput = {
    id?: string
  }

  export type WebSessionOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    referrer?: SortOrder
    queryParams?: SortOrder
    duration?: SortOrder
    country?: SortOrder
    city?: SortOrder
    device?: SortOrder
    os?: SortOrder
    browser?: SortOrder
    language?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
    _count?: WebSessionCountOrderByAggregateInput
    _avg?: WebSessionAvgOrderByAggregateInput
    _max?: WebSessionMaxOrderByAggregateInput
    _min?: WebSessionMinOrderByAggregateInput
    _sum?: WebSessionSumOrderByAggregateInput
  }

  export type WebSessionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WebSessionScalarWhereWithAggregatesInput>
    OR?: Enumerable<WebSessionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WebSessionScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    referrer?: StringWithAggregatesFilter | string
    queryParams?: StringWithAggregatesFilter | string
    duration?: IntWithAggregatesFilter | number
    country?: StringNullableWithAggregatesFilter | string | null
    city?: StringNullableWithAggregatesFilter | string | null
    device?: StringNullableWithAggregatesFilter | string | null
    os?: StringNullableWithAggregatesFilter | string | null
    browser?: StringNullableWithAggregatesFilter | string | null
    language?: StringNullableWithAggregatesFilter | string | null
    visitorId?: StringWithAggregatesFilter | string
    websiteId?: StringWithAggregatesFilter | string
  }

  export type WebPageviewWhereInput = {
    AND?: Enumerable<WebPageviewWhereInput>
    OR?: Enumerable<WebPageviewWhereInput>
    NOT?: Enumerable<WebPageviewWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    page?: StringFilter | string
    referrer?: StringFilter | string
    queryParams?: StringFilter | string
    duration?: IntFilter | number
    sessionId?: StringFilter | string
    visitorId?: StringFilter | string
    websiteId?: StringFilter | string
    Event?: WebEventListRelationFilter
    WebSession?: XOR<WebSessionRelationFilter, WebSessionWhereInput>
    WebVisitor?: XOR<WebVisitorRelationFilter, WebVisitorWhereInput>
    Website?: XOR<WebsiteRelationFilter, WebsiteWhereInput>
  }

  export type WebPageviewOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    page?: SortOrder
    referrer?: SortOrder
    queryParams?: SortOrder
    duration?: SortOrder
    sessionId?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
    Event?: WebEventOrderByRelationAggregateInput
    WebSession?: WebSessionOrderByWithRelationInput
    WebVisitor?: WebVisitorOrderByWithRelationInput
    Website?: WebsiteOrderByWithRelationInput
  }

  export type WebPageviewWhereUniqueInput = {
    id?: string
  }

  export type WebPageviewOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    page?: SortOrder
    referrer?: SortOrder
    queryParams?: SortOrder
    duration?: SortOrder
    sessionId?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
    _count?: WebPageviewCountOrderByAggregateInput
    _avg?: WebPageviewAvgOrderByAggregateInput
    _max?: WebPageviewMaxOrderByAggregateInput
    _min?: WebPageviewMinOrderByAggregateInput
    _sum?: WebPageviewSumOrderByAggregateInput
  }

  export type WebPageviewScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WebPageviewScalarWhereWithAggregatesInput>
    OR?: Enumerable<WebPageviewScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WebPageviewScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    page?: StringWithAggregatesFilter | string
    referrer?: StringWithAggregatesFilter | string
    queryParams?: StringWithAggregatesFilter | string
    duration?: IntWithAggregatesFilter | number
    sessionId?: StringWithAggregatesFilter | string
    visitorId?: StringWithAggregatesFilter | string
    websiteId?: StringWithAggregatesFilter | string
  }

  export type WebEventWhereInput = {
    AND?: Enumerable<WebEventWhereInput>
    OR?: Enumerable<WebEventWhereInput>
    NOT?: Enumerable<WebEventWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    eventType?: StringFilter | string
    eventName?: StringFilter | string
    payload?: StringFilter | string
    pageId?: StringFilter | string
    sessionId?: StringFilter | string
    visitorId?: StringFilter | string
    websiteId?: StringFilter | string
    Page?: XOR<WebPageviewRelationFilter, WebPageviewWhereInput>
    User?: XOR<WebVisitorRelationFilter, WebVisitorWhereInput>
    WebSession?: XOR<WebSessionRelationFilter, WebSessionWhereInput>
    Website?: XOR<WebsiteRelationFilter, WebsiteWhereInput>
  }

  export type WebEventOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventType?: SortOrder
    eventName?: SortOrder
    payload?: SortOrder
    pageId?: SortOrder
    sessionId?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
    Page?: WebPageviewOrderByWithRelationInput
    User?: WebVisitorOrderByWithRelationInput
    WebSession?: WebSessionOrderByWithRelationInput
    Website?: WebsiteOrderByWithRelationInput
  }

  export type WebEventWhereUniqueInput = {
    id?: string
  }

  export type WebEventOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventType?: SortOrder
    eventName?: SortOrder
    payload?: SortOrder
    pageId?: SortOrder
    sessionId?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
    _count?: WebEventCountOrderByAggregateInput
    _max?: WebEventMaxOrderByAggregateInput
    _min?: WebEventMinOrderByAggregateInput
  }

  export type WebEventScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WebEventScalarWhereWithAggregatesInput>
    OR?: Enumerable<WebEventScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WebEventScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    eventType?: StringWithAggregatesFilter | string
    eventName?: StringWithAggregatesFilter | string
    payload?: StringWithAggregatesFilter | string
    pageId?: StringWithAggregatesFilter | string
    sessionId?: StringWithAggregatesFilter | string
    visitorId?: StringWithAggregatesFilter | string
    websiteId?: StringWithAggregatesFilter | string
  }

  export type ApiKeyWhereInput = {
    AND?: Enumerable<ApiKeyWhereInput>
    OR?: Enumerable<ApiKeyWhereInput>
    NOT?: Enumerable<ApiKeyWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    name?: StringFilter | string
    websiteId?: StringFilter | string
    key?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    expires?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    website?: XOR<WebsiteRelationFilter, WebsiteWhereInput>
  }

  export type ApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    websiteId?: SortOrder
    key?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
    website?: WebsiteOrderByWithRelationInput
  }

  export type ApiKeyWhereUniqueInput = {
    id?: string
  }

  export type ApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    websiteId?: SortOrder
    key?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    expires?: SortOrder
    _count?: ApiKeyCountOrderByAggregateInput
    _max?: ApiKeyMaxOrderByAggregateInput
    _min?: ApiKeyMinOrderByAggregateInput
  }

  export type ApiKeyScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ApiKeyScalarWhereWithAggregatesInput>
    OR?: Enumerable<ApiKeyScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ApiKeyScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    websiteId?: StringWithAggregatesFilter | string
    key?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    expires?: DateTimeWithAggregatesFilter | Date | string
  }

  export type TeamWhereInput = {
    AND?: Enumerable<TeamWhereInput>
    OR?: Enumerable<TeamWhereInput>
    NOT?: Enumerable<TeamWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    name?: StringFilter | string
    TeamWebsite?: TeamWebsiteListRelationFilter
    TeamUser?: TeamUserListRelationFilter
    TeamUserInvite?: TeamUserInviteListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    TeamWebsite?: TeamWebsiteOrderByRelationAggregateInput
    TeamUser?: TeamUserOrderByRelationAggregateInput
    TeamUserInvite?: TeamUserInviteOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = {
    id?: string
  }

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    _count?: TeamCountOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TeamScalarWhereWithAggregatesInput>
    OR?: Enumerable<TeamScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TeamScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    name?: StringWithAggregatesFilter | string
  }

  export type TeamWebsiteWhereInput = {
    AND?: Enumerable<TeamWebsiteWhereInput>
    OR?: Enumerable<TeamWebsiteWhereInput>
    NOT?: Enumerable<TeamWebsiteWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    teamId?: StringFilter | string
    websiteId?: StringFilter | string
    Team?: XOR<TeamRelationFilter, TeamWhereInput>
    Website?: XOR<WebsiteRelationFilter, WebsiteWhereInput>
  }

  export type TeamWebsiteOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teamId?: SortOrder
    websiteId?: SortOrder
    Team?: TeamOrderByWithRelationInput
    Website?: WebsiteOrderByWithRelationInput
  }

  export type TeamWebsiteWhereUniqueInput = {
    id?: string
  }

  export type TeamWebsiteOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teamId?: SortOrder
    websiteId?: SortOrder
    _count?: TeamWebsiteCountOrderByAggregateInput
    _max?: TeamWebsiteMaxOrderByAggregateInput
    _min?: TeamWebsiteMinOrderByAggregateInput
  }

  export type TeamWebsiteScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TeamWebsiteScalarWhereWithAggregatesInput>
    OR?: Enumerable<TeamWebsiteScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TeamWebsiteScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    teamId?: StringWithAggregatesFilter | string
    websiteId?: StringWithAggregatesFilter | string
  }

  export type TeamUserWhereInput = {
    AND?: Enumerable<TeamUserWhereInput>
    OR?: Enumerable<TeamUserWhereInput>
    NOT?: Enumerable<TeamUserWhereInput>
    id?: StringFilter | string
    teamId?: StringFilter | string
    userId?: StringFilter | string
    role?: EnumROLEFilter | ROLE
    accepted?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    Team?: XOR<TeamRelationFilter, TeamWhereInput>
    User?: XOR<UserRelationFilter, UserWhereInput>
    TeamUserInvite?: TeamUserInviteListRelationFilter
  }

  export type TeamUserOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    accepted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Team?: TeamOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
    TeamUserInvite?: TeamUserInviteOrderByRelationAggregateInput
  }

  export type TeamUserWhereUniqueInput = {
    id?: string
  }

  export type TeamUserOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    accepted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeamUserCountOrderByAggregateInput
    _max?: TeamUserMaxOrderByAggregateInput
    _min?: TeamUserMinOrderByAggregateInput
  }

  export type TeamUserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TeamUserScalarWhereWithAggregatesInput>
    OR?: Enumerable<TeamUserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TeamUserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    teamId?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    role?: EnumROLEWithAggregatesFilter | ROLE
    accepted?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type TeamUserInviteWhereInput = {
    AND?: Enumerable<TeamUserInviteWhereInput>
    OR?: Enumerable<TeamUserInviteWhereInput>
    NOT?: Enumerable<TeamUserInviteWhereInput>
    id?: StringFilter | string
    teamId?: StringFilter | string
    userId?: StringFilter | string
    teamUserId?: StringFilter | string
    token?: StringFilter | string
    status?: EnumINVITE_STATUSFilter | INVITE_STATUS
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    Team?: XOR<TeamRelationFilter, TeamWhereInput>
    User?: XOR<UserRelationFilter, UserWhereInput>
    TeamUser?: XOR<TeamUserRelationFilter, TeamUserWhereInput>
  }

  export type TeamUserInviteOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    teamUserId?: SortOrder
    token?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Team?: TeamOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
    TeamUser?: TeamUserOrderByWithRelationInput
  }

  export type TeamUserInviteWhereUniqueInput = {
    id?: string
  }

  export type TeamUserInviteOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    teamUserId?: SortOrder
    token?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeamUserInviteCountOrderByAggregateInput
    _max?: TeamUserInviteMaxOrderByAggregateInput
    _min?: TeamUserInviteMinOrderByAggregateInput
  }

  export type TeamUserInviteScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TeamUserInviteScalarWhereWithAggregatesInput>
    OR?: Enumerable<TeamUserInviteScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TeamUserInviteScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    teamId?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    teamUserId?: StringWithAggregatesFilter | string
    token?: StringWithAggregatesFilter | string
    status?: EnumINVITE_STATUSWithAggregatesFilter | INVITE_STATUS
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type DisallowedWhereInput = {
    AND?: Enumerable<DisallowedWhereInput>
    OR?: Enumerable<DisallowedWhereInput>
    NOT?: Enumerable<DisallowedWhereInput>
    id?: StringFilter | string
    identity?: StringFilter | string
  }

  export type DisallowedOrderByWithRelationInput = {
    id?: SortOrder
    identity?: SortOrder
  }

  export type DisallowedWhereUniqueInput = {
    id?: string
  }

  export type DisallowedOrderByWithAggregationInput = {
    id?: SortOrder
    identity?: SortOrder
    _count?: DisallowedCountOrderByAggregateInput
    _max?: DisallowedMaxOrderByAggregateInput
    _min?: DisallowedMinOrderByAggregateInput
  }

  export type DisallowedScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DisallowedScalarWhereWithAggregatesInput>
    OR?: Enumerable<DisallowedScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DisallowedScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    identity?: StringWithAggregatesFilter | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    Website?: WebsiteCreateNestedManyWithoutUserInput
    ApiKey?: ApiKeyCreateNestedManyWithoutUserInput
    TeamUser?: TeamUserCreateNestedManyWithoutUserInput
    TeamUserInvite?: TeamUserInviteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Website?: WebsiteUncheckedCreateNestedManyWithoutUserInput
    ApiKey?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
    TeamUser?: TeamUserUncheckedCreateNestedManyWithoutUserInput
    TeamUserInvite?: TeamUserInviteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Website?: WebsiteUpdateManyWithoutUserNestedInput
    ApiKey?: ApiKeyUpdateManyWithoutUserNestedInput
    TeamUser?: TeamUserUpdateManyWithoutUserNestedInput
    TeamUserInvite?: TeamUserInviteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Website?: WebsiteUncheckedUpdateManyWithoutUserNestedInput
    ApiKey?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
    TeamUser?: TeamUserUncheckedUpdateManyWithoutUserNestedInput
    TeamUserInvite?: TeamUserInviteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebsiteCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    active?: boolean
    User: UserCreateNestedOneWithoutWebsiteInput
    WebVisitor?: WebVisitorCreateNestedManyWithoutWebsiteInput
    WebSession?: WebSessionCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    userId: string
    active?: boolean
    WebVisitor?: WebVisitorUncheckedCreateNestedManyWithoutWebsiteInput
    WebSession?: WebSessionUncheckedCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewUncheckedCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyUncheckedCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteUncheckedCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    User?: UserUpdateOneRequiredWithoutWebsiteNestedInput
    WebVisitor?: WebVisitorUpdateManyWithoutWebsiteNestedInput
    WebSession?: WebSessionUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUpdateManyWithoutWebsiteNestedInput
  }

  export type WebsiteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    WebVisitor?: WebVisitorUncheckedUpdateManyWithoutWebsiteNestedInput
    WebSession?: WebSessionUncheckedUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUncheckedUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUncheckedUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUncheckedUpdateManyWithoutWebsiteNestedInput
  }

  export type WebsiteCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    userId: string
    active?: boolean
  }

  export type WebsiteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WebsiteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WebVisitorCreateInput = {
    id?: string
    data?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Session?: WebSessionCreateNestedManyWithoutWebVisitorInput
    Pageview?: WebPageviewCreateNestedManyWithoutWebVisitorInput
    WebEvent?: WebEventCreateNestedManyWithoutUserInput
    Website: WebsiteCreateNestedOneWithoutWebVisitorInput
  }

  export type WebVisitorUncheckedCreateInput = {
    id?: string
    data?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    websiteId: string
    Session?: WebSessionUncheckedCreateNestedManyWithoutWebVisitorInput
    Pageview?: WebPageviewUncheckedCreateNestedManyWithoutWebVisitorInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type WebVisitorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: WebSessionUpdateManyWithoutWebVisitorNestedInput
    Pageview?: WebPageviewUpdateManyWithoutWebVisitorNestedInput
    WebEvent?: WebEventUpdateManyWithoutUserNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebVisitorNestedInput
  }

  export type WebVisitorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    websiteId?: StringFieldUpdateOperationsInput | string
    Session?: WebSessionUncheckedUpdateManyWithoutWebVisitorNestedInput
    Pageview?: WebPageviewUncheckedUpdateManyWithoutWebVisitorNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WebVisitorCreateManyInput = {
    id?: string
    data?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    websiteId: string
  }

  export type WebVisitorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebVisitorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type WebSessionCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    referrer?: string
    queryParams?: string
    duration?: number
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    language?: string | null
    WebPage?: WebPageviewCreateNestedManyWithoutWebSessionInput
    WebEvent?: WebEventCreateNestedManyWithoutWebSessionInput
    WebVisitor: WebVisitorCreateNestedOneWithoutSessionInput
    Website: WebsiteCreateNestedOneWithoutWebSessionInput
  }

  export type WebSessionUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    referrer?: string
    queryParams?: string
    duration?: number
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    language?: string | null
    visitorId: string
    websiteId: string
    WebPage?: WebPageviewUncheckedCreateNestedManyWithoutWebSessionInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutWebSessionInput
  }

  export type WebSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    WebPage?: WebPageviewUpdateManyWithoutWebSessionNestedInput
    WebEvent?: WebEventUpdateManyWithoutWebSessionNestedInput
    WebVisitor?: WebVisitorUpdateOneRequiredWithoutSessionNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebSessionNestedInput
  }

  export type WebSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
    WebPage?: WebPageviewUncheckedUpdateManyWithoutWebSessionNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutWebSessionNestedInput
  }

  export type WebSessionCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    referrer?: string
    queryParams?: string
    duration?: number
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    language?: string | null
    visitorId: string
    websiteId: string
  }

  export type WebSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type WebPageviewCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    Event?: WebEventCreateNestedManyWithoutPageInput
    WebSession: WebSessionCreateNestedOneWithoutWebPageInput
    WebVisitor: WebVisitorCreateNestedOneWithoutPageviewInput
    Website: WebsiteCreateNestedOneWithoutWebPageviewInput
  }

  export type WebPageviewUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    sessionId: string
    visitorId: string
    websiteId: string
    Event?: WebEventUncheckedCreateNestedManyWithoutPageInput
  }

  export type WebPageviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    Event?: WebEventUpdateManyWithoutPageNestedInput
    WebSession?: WebSessionUpdateOneRequiredWithoutWebPageNestedInput
    WebVisitor?: WebVisitorUpdateOneRequiredWithoutPageviewNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebPageviewNestedInput
  }

  export type WebPageviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    sessionId?: StringFieldUpdateOperationsInput | string
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
    Event?: WebEventUncheckedUpdateManyWithoutPageNestedInput
  }

  export type WebPageviewCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    sessionId: string
    visitorId: string
    websiteId: string
  }

  export type WebPageviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type WebPageviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    sessionId?: StringFieldUpdateOperationsInput | string
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type WebEventCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    Page: WebPageviewCreateNestedOneWithoutEventInput
    User: WebVisitorCreateNestedOneWithoutWebEventInput
    WebSession: WebSessionCreateNestedOneWithoutWebEventInput
    Website: WebsiteCreateNestedOneWithoutWebEventInput
  }

  export type WebEventUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    pageId: string
    sessionId: string
    visitorId: string
    websiteId: string
  }

  export type WebEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    Page?: WebPageviewUpdateOneRequiredWithoutEventNestedInput
    User?: WebVisitorUpdateOneRequiredWithoutWebEventNestedInput
    WebSession?: WebSessionUpdateOneRequiredWithoutWebEventNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebEventNestedInput
  }

  export type WebEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type WebEventCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    pageId: string
    sessionId: string
    visitorId: string
    websiteId: string
  }

  export type WebEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
  }

  export type WebEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type ApiKeyCreateInput = {
    id?: string
    name: string
    key?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    expires: Date | string
    user: UserCreateNestedOneWithoutApiKeyInput
    website: WebsiteCreateNestedOneWithoutApiKeyInput
  }

  export type ApiKeyUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    websiteId: string
    key?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    expires: Date | string
  }

  export type ApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutApiKeyNestedInput
    website?: WebsiteUpdateOneRequiredWithoutApiKeyNestedInput
  }

  export type ApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateManyInput = {
    id?: string
    userId: string
    name: string
    websiteId: string
    key?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    expires: Date | string
  }

  export type ApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    TeamWebsite?: TeamWebsiteCreateNestedManyWithoutTeamInput
    TeamUser?: TeamUserCreateNestedManyWithoutTeamInput
    TeamUserInvite?: TeamUserInviteCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    TeamWebsite?: TeamWebsiteUncheckedCreateNestedManyWithoutTeamInput
    TeamUser?: TeamUserUncheckedCreateNestedManyWithoutTeamInput
    TeamUserInvite?: TeamUserInviteUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    TeamWebsite?: TeamWebsiteUpdateManyWithoutTeamNestedInput
    TeamUser?: TeamUserUpdateManyWithoutTeamNestedInput
    TeamUserInvite?: TeamUserInviteUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    TeamWebsite?: TeamWebsiteUncheckedUpdateManyWithoutTeamNestedInput
    TeamUser?: TeamUserUncheckedUpdateManyWithoutTeamNestedInput
    TeamUserInvite?: TeamUserInviteUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
  }

  export type TeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TeamWebsiteCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Team: TeamCreateNestedOneWithoutTeamWebsiteInput
    Website: WebsiteCreateNestedOneWithoutTeamWebsiteInput
  }

  export type TeamWebsiteUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teamId: string
    websiteId: string
  }

  export type TeamWebsiteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Team?: TeamUpdateOneRequiredWithoutTeamWebsiteNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutTeamWebsiteNestedInput
  }

  export type TeamWebsiteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type TeamWebsiteCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teamId: string
    websiteId: string
  }

  export type TeamWebsiteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamWebsiteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type TeamUserCreateInput = {
    id?: string
    role?: ROLE
    accepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Team: TeamCreateNestedOneWithoutTeamUserInput
    User: UserCreateNestedOneWithoutTeamUserInput
    TeamUserInvite?: TeamUserInviteCreateNestedManyWithoutTeamUserInput
  }

  export type TeamUserUncheckedCreateInput = {
    id?: string
    teamId: string
    userId: string
    role?: ROLE
    accepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    TeamUserInvite?: TeamUserInviteUncheckedCreateNestedManyWithoutTeamUserInput
  }

  export type TeamUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | ROLE
    accepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Team?: TeamUpdateOneRequiredWithoutTeamUserNestedInput
    User?: UserUpdateOneRequiredWithoutTeamUserNestedInput
    TeamUserInvite?: TeamUserInviteUpdateManyWithoutTeamUserNestedInput
  }

  export type TeamUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | ROLE
    accepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TeamUserInvite?: TeamUserInviteUncheckedUpdateManyWithoutTeamUserNestedInput
  }

  export type TeamUserCreateManyInput = {
    id?: string
    teamId: string
    userId: string
    role?: ROLE
    accepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | ROLE
    accepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | ROLE
    accepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUserInviteCreateInput = {
    id?: string
    token: string
    status?: INVITE_STATUS
    createdAt?: Date | string
    updatedAt?: Date | string
    Team: TeamCreateNestedOneWithoutTeamUserInviteInput
    User: UserCreateNestedOneWithoutTeamUserInviteInput
    TeamUser: TeamUserCreateNestedOneWithoutTeamUserInviteInput
  }

  export type TeamUserInviteUncheckedCreateInput = {
    id?: string
    teamId: string
    userId: string
    teamUserId: string
    token: string
    status?: INVITE_STATUS
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUserInviteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumINVITE_STATUSFieldUpdateOperationsInput | INVITE_STATUS
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Team?: TeamUpdateOneRequiredWithoutTeamUserInviteNestedInput
    User?: UserUpdateOneRequiredWithoutTeamUserInviteNestedInput
    TeamUser?: TeamUserUpdateOneRequiredWithoutTeamUserInviteNestedInput
  }

  export type TeamUserInviteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    teamUserId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumINVITE_STATUSFieldUpdateOperationsInput | INVITE_STATUS
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUserInviteCreateManyInput = {
    id?: string
    teamId: string
    userId: string
    teamUserId: string
    token: string
    status?: INVITE_STATUS
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUserInviteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumINVITE_STATUSFieldUpdateOperationsInput | INVITE_STATUS
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUserInviteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    teamUserId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumINVITE_STATUSFieldUpdateOperationsInput | INVITE_STATUS
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisallowedCreateInput = {
    id?: string
    identity: string
  }

  export type DisallowedUncheckedCreateInput = {
    id?: string
    identity: string
  }

  export type DisallowedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identity?: StringFieldUpdateOperationsInput | string
  }

  export type DisallowedUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identity?: StringFieldUpdateOperationsInput | string
  }

  export type DisallowedCreateManyInput = {
    id?: string
    identity: string
  }

  export type DisallowedUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identity?: StringFieldUpdateOperationsInput | string
  }

  export type DisallowedUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identity?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type WebsiteListRelationFilter = {
    every?: WebsiteWhereInput
    some?: WebsiteWhereInput
    none?: WebsiteWhereInput
  }

  export type ApiKeyListRelationFilter = {
    every?: ApiKeyWhereInput
    some?: ApiKeyWhereInput
    none?: ApiKeyWhereInput
  }

  export type TeamUserListRelationFilter = {
    every?: TeamUserWhereInput
    some?: TeamUserWhereInput
    none?: TeamUserWhereInput
  }

  export type TeamUserInviteListRelationFilter = {
    every?: TeamUserInviteWhereInput
    some?: TeamUserInviteWhereInput
    none?: TeamUserInviteWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebsiteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApiKeyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamUserInviteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    stripeCurrentPeriodEnd?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    stripeCurrentPeriodEnd?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    stripeCurrentPeriodEnd?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type WebVisitorListRelationFilter = {
    every?: WebVisitorWhereInput
    some?: WebVisitorWhereInput
    none?: WebVisitorWhereInput
  }

  export type WebSessionListRelationFilter = {
    every?: WebSessionWhereInput
    some?: WebSessionWhereInput
    none?: WebSessionWhereInput
  }

  export type WebPageviewListRelationFilter = {
    every?: WebPageviewWhereInput
    some?: WebPageviewWhereInput
    none?: WebPageviewWhereInput
  }

  export type WebEventListRelationFilter = {
    every?: WebEventWhereInput
    some?: WebEventWhereInput
    none?: WebEventWhereInput
  }

  export type TeamWebsiteListRelationFilter = {
    every?: TeamWebsiteWhereInput
    some?: TeamWebsiteWhereInput
    none?: TeamWebsiteWhereInput
  }

  export type WebVisitorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebPageviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamWebsiteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebsiteCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    url?: SortOrder
    title?: SortOrder
    userId?: SortOrder
    active?: SortOrder
  }

  export type WebsiteMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    url?: SortOrder
    title?: SortOrder
    userId?: SortOrder
    active?: SortOrder
  }

  export type WebsiteMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    url?: SortOrder
    title?: SortOrder
    userId?: SortOrder
    active?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type WebsiteRelationFilter = {
    is?: WebsiteWhereInput
    isNot?: WebsiteWhereInput
  }

  export type WebVisitorCountOrderByAggregateInput = {
    id?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    websiteId?: SortOrder
  }

  export type WebVisitorMaxOrderByAggregateInput = {
    id?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    websiteId?: SortOrder
  }

  export type WebVisitorMinOrderByAggregateInput = {
    id?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    websiteId?: SortOrder
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type WebVisitorRelationFilter = {
    is?: WebVisitorWhereInput
    isNot?: WebVisitorWhereInput
  }

  export type WebSessionCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    referrer?: SortOrder
    queryParams?: SortOrder
    duration?: SortOrder
    country?: SortOrder
    city?: SortOrder
    device?: SortOrder
    os?: SortOrder
    browser?: SortOrder
    language?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
  }

  export type WebSessionAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type WebSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    referrer?: SortOrder
    queryParams?: SortOrder
    duration?: SortOrder
    country?: SortOrder
    city?: SortOrder
    device?: SortOrder
    os?: SortOrder
    browser?: SortOrder
    language?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
  }

  export type WebSessionMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    referrer?: SortOrder
    queryParams?: SortOrder
    duration?: SortOrder
    country?: SortOrder
    city?: SortOrder
    device?: SortOrder
    os?: SortOrder
    browser?: SortOrder
    language?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
  }

  export type WebSessionSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type WebSessionRelationFilter = {
    is?: WebSessionWhereInput
    isNot?: WebSessionWhereInput
  }

  export type WebPageviewCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    page?: SortOrder
    referrer?: SortOrder
    queryParams?: SortOrder
    duration?: SortOrder
    sessionId?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
  }

  export type WebPageviewAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type WebPageviewMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    page?: SortOrder
    referrer?: SortOrder
    queryParams?: SortOrder
    duration?: SortOrder
    sessionId?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
  }

  export type WebPageviewMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    page?: SortOrder
    referrer?: SortOrder
    queryParams?: SortOrder
    duration?: SortOrder
    sessionId?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
  }

  export type WebPageviewSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type WebPageviewRelationFilter = {
    is?: WebPageviewWhereInput
    isNot?: WebPageviewWhereInput
  }

  export type WebEventCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventType?: SortOrder
    eventName?: SortOrder
    payload?: SortOrder
    pageId?: SortOrder
    sessionId?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
  }

  export type WebEventMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventType?: SortOrder
    eventName?: SortOrder
    payload?: SortOrder
    pageId?: SortOrder
    sessionId?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
  }

  export type WebEventMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventType?: SortOrder
    eventName?: SortOrder
    payload?: SortOrder
    pageId?: SortOrder
    sessionId?: SortOrder
    visitorId?: SortOrder
    websiteId?: SortOrder
  }

  export type ApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    websiteId?: SortOrder
    key?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    expires?: SortOrder
  }

  export type ApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    websiteId?: SortOrder
    key?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    expires?: SortOrder
  }

  export type ApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    websiteId?: SortOrder
    key?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    expires?: SortOrder
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
  }

  export type TeamRelationFilter = {
    is?: TeamWhereInput
    isNot?: TeamWhereInput
  }

  export type TeamWebsiteCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teamId?: SortOrder
    websiteId?: SortOrder
  }

  export type TeamWebsiteMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teamId?: SortOrder
    websiteId?: SortOrder
  }

  export type TeamWebsiteMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teamId?: SortOrder
    websiteId?: SortOrder
  }

  export type EnumROLEFilter = {
    equals?: ROLE
    in?: Enumerable<ROLE>
    notIn?: Enumerable<ROLE>
    not?: NestedEnumROLEFilter | ROLE
  }

  export type TeamUserCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    accepted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamUserMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    accepted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamUserMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    accepted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumROLEWithAggregatesFilter = {
    equals?: ROLE
    in?: Enumerable<ROLE>
    notIn?: Enumerable<ROLE>
    not?: NestedEnumROLEWithAggregatesFilter | ROLE
    _count?: NestedIntFilter
    _min?: NestedEnumROLEFilter
    _max?: NestedEnumROLEFilter
  }

  export type EnumINVITE_STATUSFilter = {
    equals?: INVITE_STATUS
    in?: Enumerable<INVITE_STATUS>
    notIn?: Enumerable<INVITE_STATUS>
    not?: NestedEnumINVITE_STATUSFilter | INVITE_STATUS
  }

  export type TeamUserRelationFilter = {
    is?: TeamUserWhereInput
    isNot?: TeamUserWhereInput
  }

  export type TeamUserInviteCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    teamUserId?: SortOrder
    token?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamUserInviteMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    teamUserId?: SortOrder
    token?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamUserInviteMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    teamUserId?: SortOrder
    token?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumINVITE_STATUSWithAggregatesFilter = {
    equals?: INVITE_STATUS
    in?: Enumerable<INVITE_STATUS>
    notIn?: Enumerable<INVITE_STATUS>
    not?: NestedEnumINVITE_STATUSWithAggregatesFilter | INVITE_STATUS
    _count?: NestedIntFilter
    _min?: NestedEnumINVITE_STATUSFilter
    _max?: NestedEnumINVITE_STATUSFilter
  }

  export type DisallowedCountOrderByAggregateInput = {
    id?: SortOrder
    identity?: SortOrder
  }

  export type DisallowedMaxOrderByAggregateInput = {
    id?: SortOrder
    identity?: SortOrder
  }

  export type DisallowedMinOrderByAggregateInput = {
    id?: SortOrder
    identity?: SortOrder
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type WebsiteCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<WebsiteCreateWithoutUserInput>, Enumerable<WebsiteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WebsiteCreateOrConnectWithoutUserInput>
    createMany?: WebsiteCreateManyUserInputEnvelope
    connect?: Enumerable<WebsiteWhereUniqueInput>
  }

  export type ApiKeyCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ApiKeyCreateWithoutUserInput>, Enumerable<ApiKeyUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ApiKeyCreateOrConnectWithoutUserInput>
    createMany?: ApiKeyCreateManyUserInputEnvelope
    connect?: Enumerable<ApiKeyWhereUniqueInput>
  }

  export type TeamUserCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TeamUserCreateWithoutUserInput>, Enumerable<TeamUserUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TeamUserCreateOrConnectWithoutUserInput>
    createMany?: TeamUserCreateManyUserInputEnvelope
    connect?: Enumerable<TeamUserWhereUniqueInput>
  }

  export type TeamUserInviteCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TeamUserInviteCreateWithoutUserInput>, Enumerable<TeamUserInviteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TeamUserInviteCreateOrConnectWithoutUserInput>
    createMany?: TeamUserInviteCreateManyUserInputEnvelope
    connect?: Enumerable<TeamUserInviteWhereUniqueInput>
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type WebsiteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<WebsiteCreateWithoutUserInput>, Enumerable<WebsiteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WebsiteCreateOrConnectWithoutUserInput>
    createMany?: WebsiteCreateManyUserInputEnvelope
    connect?: Enumerable<WebsiteWhereUniqueInput>
  }

  export type ApiKeyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ApiKeyCreateWithoutUserInput>, Enumerable<ApiKeyUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ApiKeyCreateOrConnectWithoutUserInput>
    createMany?: ApiKeyCreateManyUserInputEnvelope
    connect?: Enumerable<ApiKeyWhereUniqueInput>
  }

  export type TeamUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TeamUserCreateWithoutUserInput>, Enumerable<TeamUserUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TeamUserCreateOrConnectWithoutUserInput>
    createMany?: TeamUserCreateManyUserInputEnvelope
    connect?: Enumerable<TeamUserWhereUniqueInput>
  }

  export type TeamUserInviteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TeamUserInviteCreateWithoutUserInput>, Enumerable<TeamUserInviteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TeamUserInviteCreateOrConnectWithoutUserInput>
    createMany?: TeamUserInviteCreateManyUserInputEnvelope
    connect?: Enumerable<TeamUserInviteWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccountUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    set?: Enumerable<AccountWhereUniqueInput>
    disconnect?: Enumerable<AccountWhereUniqueInput>
    delete?: Enumerable<AccountWhereUniqueInput>
    connect?: Enumerable<AccountWhereUniqueInput>
    update?: Enumerable<AccountUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccountUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccountScalarWhereInput>
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    connect?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type WebsiteUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<WebsiteCreateWithoutUserInput>, Enumerable<WebsiteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WebsiteCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<WebsiteUpsertWithWhereUniqueWithoutUserInput>
    createMany?: WebsiteCreateManyUserInputEnvelope
    set?: Enumerable<WebsiteWhereUniqueInput>
    disconnect?: Enumerable<WebsiteWhereUniqueInput>
    delete?: Enumerable<WebsiteWhereUniqueInput>
    connect?: Enumerable<WebsiteWhereUniqueInput>
    update?: Enumerable<WebsiteUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<WebsiteUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<WebsiteScalarWhereInput>
  }

  export type ApiKeyUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ApiKeyCreateWithoutUserInput>, Enumerable<ApiKeyUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ApiKeyCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ApiKeyUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ApiKeyCreateManyUserInputEnvelope
    set?: Enumerable<ApiKeyWhereUniqueInput>
    disconnect?: Enumerable<ApiKeyWhereUniqueInput>
    delete?: Enumerable<ApiKeyWhereUniqueInput>
    connect?: Enumerable<ApiKeyWhereUniqueInput>
    update?: Enumerable<ApiKeyUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ApiKeyUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ApiKeyScalarWhereInput>
  }

  export type TeamUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<TeamUserCreateWithoutUserInput>, Enumerable<TeamUserUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TeamUserCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<TeamUserUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TeamUserCreateManyUserInputEnvelope
    set?: Enumerable<TeamUserWhereUniqueInput>
    disconnect?: Enumerable<TeamUserWhereUniqueInput>
    delete?: Enumerable<TeamUserWhereUniqueInput>
    connect?: Enumerable<TeamUserWhereUniqueInput>
    update?: Enumerable<TeamUserUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TeamUserUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TeamUserScalarWhereInput>
  }

  export type TeamUserInviteUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<TeamUserInviteCreateWithoutUserInput>, Enumerable<TeamUserInviteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TeamUserInviteCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<TeamUserInviteUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TeamUserInviteCreateManyUserInputEnvelope
    set?: Enumerable<TeamUserInviteWhereUniqueInput>
    disconnect?: Enumerable<TeamUserInviteWhereUniqueInput>
    delete?: Enumerable<TeamUserInviteWhereUniqueInput>
    connect?: Enumerable<TeamUserInviteWhereUniqueInput>
    update?: Enumerable<TeamUserInviteUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TeamUserInviteUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TeamUserInviteScalarWhereInput>
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccountUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    set?: Enumerable<AccountWhereUniqueInput>
    disconnect?: Enumerable<AccountWhereUniqueInput>
    delete?: Enumerable<AccountWhereUniqueInput>
    connect?: Enumerable<AccountWhereUniqueInput>
    update?: Enumerable<AccountUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccountUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccountScalarWhereInput>
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    connect?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type WebsiteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<WebsiteCreateWithoutUserInput>, Enumerable<WebsiteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WebsiteCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<WebsiteUpsertWithWhereUniqueWithoutUserInput>
    createMany?: WebsiteCreateManyUserInputEnvelope
    set?: Enumerable<WebsiteWhereUniqueInput>
    disconnect?: Enumerable<WebsiteWhereUniqueInput>
    delete?: Enumerable<WebsiteWhereUniqueInput>
    connect?: Enumerable<WebsiteWhereUniqueInput>
    update?: Enumerable<WebsiteUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<WebsiteUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<WebsiteScalarWhereInput>
  }

  export type ApiKeyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ApiKeyCreateWithoutUserInput>, Enumerable<ApiKeyUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ApiKeyCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ApiKeyUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ApiKeyCreateManyUserInputEnvelope
    set?: Enumerable<ApiKeyWhereUniqueInput>
    disconnect?: Enumerable<ApiKeyWhereUniqueInput>
    delete?: Enumerable<ApiKeyWhereUniqueInput>
    connect?: Enumerable<ApiKeyWhereUniqueInput>
    update?: Enumerable<ApiKeyUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ApiKeyUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ApiKeyScalarWhereInput>
  }

  export type TeamUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<TeamUserCreateWithoutUserInput>, Enumerable<TeamUserUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TeamUserCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<TeamUserUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TeamUserCreateManyUserInputEnvelope
    set?: Enumerable<TeamUserWhereUniqueInput>
    disconnect?: Enumerable<TeamUserWhereUniqueInput>
    delete?: Enumerable<TeamUserWhereUniqueInput>
    connect?: Enumerable<TeamUserWhereUniqueInput>
    update?: Enumerable<TeamUserUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TeamUserUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TeamUserScalarWhereInput>
  }

  export type TeamUserInviteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<TeamUserInviteCreateWithoutUserInput>, Enumerable<TeamUserInviteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TeamUserInviteCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<TeamUserInviteUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TeamUserInviteCreateManyUserInputEnvelope
    set?: Enumerable<TeamUserInviteWhereUniqueInput>
    disconnect?: Enumerable<TeamUserInviteWhereUniqueInput>
    delete?: Enumerable<TeamUserInviteWhereUniqueInput>
    connect?: Enumerable<TeamUserInviteWhereUniqueInput>
    update?: Enumerable<TeamUserInviteUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TeamUserInviteUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TeamUserInviteScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutWebsiteInput = {
    create?: XOR<UserCreateWithoutWebsiteInput, UserUncheckedCreateWithoutWebsiteInput>
    connectOrCreate?: UserCreateOrConnectWithoutWebsiteInput
    connect?: UserWhereUniqueInput
  }

  export type WebVisitorCreateNestedManyWithoutWebsiteInput = {
    create?: XOR<Enumerable<WebVisitorCreateWithoutWebsiteInput>, Enumerable<WebVisitorUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebVisitorCreateOrConnectWithoutWebsiteInput>
    createMany?: WebVisitorCreateManyWebsiteInputEnvelope
    connect?: Enumerable<WebVisitorWhereUniqueInput>
  }

  export type WebSessionCreateNestedManyWithoutWebsiteInput = {
    create?: XOR<Enumerable<WebSessionCreateWithoutWebsiteInput>, Enumerable<WebSessionUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebSessionCreateOrConnectWithoutWebsiteInput>
    createMany?: WebSessionCreateManyWebsiteInputEnvelope
    connect?: Enumerable<WebSessionWhereUniqueInput>
  }

  export type WebPageviewCreateNestedManyWithoutWebsiteInput = {
    create?: XOR<Enumerable<WebPageviewCreateWithoutWebsiteInput>, Enumerable<WebPageviewUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebPageviewCreateOrConnectWithoutWebsiteInput>
    createMany?: WebPageviewCreateManyWebsiteInputEnvelope
    connect?: Enumerable<WebPageviewWhereUniqueInput>
  }

  export type WebEventCreateNestedManyWithoutWebsiteInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutWebsiteInput>, Enumerable<WebEventUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutWebsiteInput>
    createMany?: WebEventCreateManyWebsiteInputEnvelope
    connect?: Enumerable<WebEventWhereUniqueInput>
  }

  export type ApiKeyCreateNestedManyWithoutWebsiteInput = {
    create?: XOR<Enumerable<ApiKeyCreateWithoutWebsiteInput>, Enumerable<ApiKeyUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<ApiKeyCreateOrConnectWithoutWebsiteInput>
    createMany?: ApiKeyCreateManyWebsiteInputEnvelope
    connect?: Enumerable<ApiKeyWhereUniqueInput>
  }

  export type TeamWebsiteCreateNestedManyWithoutWebsiteInput = {
    create?: XOR<Enumerable<TeamWebsiteCreateWithoutWebsiteInput>, Enumerable<TeamWebsiteUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<TeamWebsiteCreateOrConnectWithoutWebsiteInput>
    createMany?: TeamWebsiteCreateManyWebsiteInputEnvelope
    connect?: Enumerable<TeamWebsiteWhereUniqueInput>
  }

  export type WebVisitorUncheckedCreateNestedManyWithoutWebsiteInput = {
    create?: XOR<Enumerable<WebVisitorCreateWithoutWebsiteInput>, Enumerable<WebVisitorUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebVisitorCreateOrConnectWithoutWebsiteInput>
    createMany?: WebVisitorCreateManyWebsiteInputEnvelope
    connect?: Enumerable<WebVisitorWhereUniqueInput>
  }

  export type WebSessionUncheckedCreateNestedManyWithoutWebsiteInput = {
    create?: XOR<Enumerable<WebSessionCreateWithoutWebsiteInput>, Enumerable<WebSessionUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebSessionCreateOrConnectWithoutWebsiteInput>
    createMany?: WebSessionCreateManyWebsiteInputEnvelope
    connect?: Enumerable<WebSessionWhereUniqueInput>
  }

  export type WebPageviewUncheckedCreateNestedManyWithoutWebsiteInput = {
    create?: XOR<Enumerable<WebPageviewCreateWithoutWebsiteInput>, Enumerable<WebPageviewUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebPageviewCreateOrConnectWithoutWebsiteInput>
    createMany?: WebPageviewCreateManyWebsiteInputEnvelope
    connect?: Enumerable<WebPageviewWhereUniqueInput>
  }

  export type WebEventUncheckedCreateNestedManyWithoutWebsiteInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutWebsiteInput>, Enumerable<WebEventUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutWebsiteInput>
    createMany?: WebEventCreateManyWebsiteInputEnvelope
    connect?: Enumerable<WebEventWhereUniqueInput>
  }

  export type ApiKeyUncheckedCreateNestedManyWithoutWebsiteInput = {
    create?: XOR<Enumerable<ApiKeyCreateWithoutWebsiteInput>, Enumerable<ApiKeyUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<ApiKeyCreateOrConnectWithoutWebsiteInput>
    createMany?: ApiKeyCreateManyWebsiteInputEnvelope
    connect?: Enumerable<ApiKeyWhereUniqueInput>
  }

  export type TeamWebsiteUncheckedCreateNestedManyWithoutWebsiteInput = {
    create?: XOR<Enumerable<TeamWebsiteCreateWithoutWebsiteInput>, Enumerable<TeamWebsiteUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<TeamWebsiteCreateOrConnectWithoutWebsiteInput>
    createMany?: TeamWebsiteCreateManyWebsiteInputEnvelope
    connect?: Enumerable<TeamWebsiteWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutWebsiteNestedInput = {
    create?: XOR<UserCreateWithoutWebsiteInput, UserUncheckedCreateWithoutWebsiteInput>
    connectOrCreate?: UserCreateOrConnectWithoutWebsiteInput
    upsert?: UserUpsertWithoutWebsiteInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutWebsiteInput, UserUncheckedUpdateWithoutWebsiteInput>
  }

  export type WebVisitorUpdateManyWithoutWebsiteNestedInput = {
    create?: XOR<Enumerable<WebVisitorCreateWithoutWebsiteInput>, Enumerable<WebVisitorUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebVisitorCreateOrConnectWithoutWebsiteInput>
    upsert?: Enumerable<WebVisitorUpsertWithWhereUniqueWithoutWebsiteInput>
    createMany?: WebVisitorCreateManyWebsiteInputEnvelope
    set?: Enumerable<WebVisitorWhereUniqueInput>
    disconnect?: Enumerable<WebVisitorWhereUniqueInput>
    delete?: Enumerable<WebVisitorWhereUniqueInput>
    connect?: Enumerable<WebVisitorWhereUniqueInput>
    update?: Enumerable<WebVisitorUpdateWithWhereUniqueWithoutWebsiteInput>
    updateMany?: Enumerable<WebVisitorUpdateManyWithWhereWithoutWebsiteInput>
    deleteMany?: Enumerable<WebVisitorScalarWhereInput>
  }

  export type WebSessionUpdateManyWithoutWebsiteNestedInput = {
    create?: XOR<Enumerable<WebSessionCreateWithoutWebsiteInput>, Enumerable<WebSessionUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebSessionCreateOrConnectWithoutWebsiteInput>
    upsert?: Enumerable<WebSessionUpsertWithWhereUniqueWithoutWebsiteInput>
    createMany?: WebSessionCreateManyWebsiteInputEnvelope
    set?: Enumerable<WebSessionWhereUniqueInput>
    disconnect?: Enumerable<WebSessionWhereUniqueInput>
    delete?: Enumerable<WebSessionWhereUniqueInput>
    connect?: Enumerable<WebSessionWhereUniqueInput>
    update?: Enumerable<WebSessionUpdateWithWhereUniqueWithoutWebsiteInput>
    updateMany?: Enumerable<WebSessionUpdateManyWithWhereWithoutWebsiteInput>
    deleteMany?: Enumerable<WebSessionScalarWhereInput>
  }

  export type WebPageviewUpdateManyWithoutWebsiteNestedInput = {
    create?: XOR<Enumerable<WebPageviewCreateWithoutWebsiteInput>, Enumerable<WebPageviewUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebPageviewCreateOrConnectWithoutWebsiteInput>
    upsert?: Enumerable<WebPageviewUpsertWithWhereUniqueWithoutWebsiteInput>
    createMany?: WebPageviewCreateManyWebsiteInputEnvelope
    set?: Enumerable<WebPageviewWhereUniqueInput>
    disconnect?: Enumerable<WebPageviewWhereUniqueInput>
    delete?: Enumerable<WebPageviewWhereUniqueInput>
    connect?: Enumerable<WebPageviewWhereUniqueInput>
    update?: Enumerable<WebPageviewUpdateWithWhereUniqueWithoutWebsiteInput>
    updateMany?: Enumerable<WebPageviewUpdateManyWithWhereWithoutWebsiteInput>
    deleteMany?: Enumerable<WebPageviewScalarWhereInput>
  }

  export type WebEventUpdateManyWithoutWebsiteNestedInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutWebsiteInput>, Enumerable<WebEventUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutWebsiteInput>
    upsert?: Enumerable<WebEventUpsertWithWhereUniqueWithoutWebsiteInput>
    createMany?: WebEventCreateManyWebsiteInputEnvelope
    set?: Enumerable<WebEventWhereUniqueInput>
    disconnect?: Enumerable<WebEventWhereUniqueInput>
    delete?: Enumerable<WebEventWhereUniqueInput>
    connect?: Enumerable<WebEventWhereUniqueInput>
    update?: Enumerable<WebEventUpdateWithWhereUniqueWithoutWebsiteInput>
    updateMany?: Enumerable<WebEventUpdateManyWithWhereWithoutWebsiteInput>
    deleteMany?: Enumerable<WebEventScalarWhereInput>
  }

  export type ApiKeyUpdateManyWithoutWebsiteNestedInput = {
    create?: XOR<Enumerable<ApiKeyCreateWithoutWebsiteInput>, Enumerable<ApiKeyUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<ApiKeyCreateOrConnectWithoutWebsiteInput>
    upsert?: Enumerable<ApiKeyUpsertWithWhereUniqueWithoutWebsiteInput>
    createMany?: ApiKeyCreateManyWebsiteInputEnvelope
    set?: Enumerable<ApiKeyWhereUniqueInput>
    disconnect?: Enumerable<ApiKeyWhereUniqueInput>
    delete?: Enumerable<ApiKeyWhereUniqueInput>
    connect?: Enumerable<ApiKeyWhereUniqueInput>
    update?: Enumerable<ApiKeyUpdateWithWhereUniqueWithoutWebsiteInput>
    updateMany?: Enumerable<ApiKeyUpdateManyWithWhereWithoutWebsiteInput>
    deleteMany?: Enumerable<ApiKeyScalarWhereInput>
  }

  export type TeamWebsiteUpdateManyWithoutWebsiteNestedInput = {
    create?: XOR<Enumerable<TeamWebsiteCreateWithoutWebsiteInput>, Enumerable<TeamWebsiteUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<TeamWebsiteCreateOrConnectWithoutWebsiteInput>
    upsert?: Enumerable<TeamWebsiteUpsertWithWhereUniqueWithoutWebsiteInput>
    createMany?: TeamWebsiteCreateManyWebsiteInputEnvelope
    set?: Enumerable<TeamWebsiteWhereUniqueInput>
    disconnect?: Enumerable<TeamWebsiteWhereUniqueInput>
    delete?: Enumerable<TeamWebsiteWhereUniqueInput>
    connect?: Enumerable<TeamWebsiteWhereUniqueInput>
    update?: Enumerable<TeamWebsiteUpdateWithWhereUniqueWithoutWebsiteInput>
    updateMany?: Enumerable<TeamWebsiteUpdateManyWithWhereWithoutWebsiteInput>
    deleteMany?: Enumerable<TeamWebsiteScalarWhereInput>
  }

  export type WebVisitorUncheckedUpdateManyWithoutWebsiteNestedInput = {
    create?: XOR<Enumerable<WebVisitorCreateWithoutWebsiteInput>, Enumerable<WebVisitorUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebVisitorCreateOrConnectWithoutWebsiteInput>
    upsert?: Enumerable<WebVisitorUpsertWithWhereUniqueWithoutWebsiteInput>
    createMany?: WebVisitorCreateManyWebsiteInputEnvelope
    set?: Enumerable<WebVisitorWhereUniqueInput>
    disconnect?: Enumerable<WebVisitorWhereUniqueInput>
    delete?: Enumerable<WebVisitorWhereUniqueInput>
    connect?: Enumerable<WebVisitorWhereUniqueInput>
    update?: Enumerable<WebVisitorUpdateWithWhereUniqueWithoutWebsiteInput>
    updateMany?: Enumerable<WebVisitorUpdateManyWithWhereWithoutWebsiteInput>
    deleteMany?: Enumerable<WebVisitorScalarWhereInput>
  }

  export type WebSessionUncheckedUpdateManyWithoutWebsiteNestedInput = {
    create?: XOR<Enumerable<WebSessionCreateWithoutWebsiteInput>, Enumerable<WebSessionUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebSessionCreateOrConnectWithoutWebsiteInput>
    upsert?: Enumerable<WebSessionUpsertWithWhereUniqueWithoutWebsiteInput>
    createMany?: WebSessionCreateManyWebsiteInputEnvelope
    set?: Enumerable<WebSessionWhereUniqueInput>
    disconnect?: Enumerable<WebSessionWhereUniqueInput>
    delete?: Enumerable<WebSessionWhereUniqueInput>
    connect?: Enumerable<WebSessionWhereUniqueInput>
    update?: Enumerable<WebSessionUpdateWithWhereUniqueWithoutWebsiteInput>
    updateMany?: Enumerable<WebSessionUpdateManyWithWhereWithoutWebsiteInput>
    deleteMany?: Enumerable<WebSessionScalarWhereInput>
  }

  export type WebPageviewUncheckedUpdateManyWithoutWebsiteNestedInput = {
    create?: XOR<Enumerable<WebPageviewCreateWithoutWebsiteInput>, Enumerable<WebPageviewUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebPageviewCreateOrConnectWithoutWebsiteInput>
    upsert?: Enumerable<WebPageviewUpsertWithWhereUniqueWithoutWebsiteInput>
    createMany?: WebPageviewCreateManyWebsiteInputEnvelope
    set?: Enumerable<WebPageviewWhereUniqueInput>
    disconnect?: Enumerable<WebPageviewWhereUniqueInput>
    delete?: Enumerable<WebPageviewWhereUniqueInput>
    connect?: Enumerable<WebPageviewWhereUniqueInput>
    update?: Enumerable<WebPageviewUpdateWithWhereUniqueWithoutWebsiteInput>
    updateMany?: Enumerable<WebPageviewUpdateManyWithWhereWithoutWebsiteInput>
    deleteMany?: Enumerable<WebPageviewScalarWhereInput>
  }

  export type WebEventUncheckedUpdateManyWithoutWebsiteNestedInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutWebsiteInput>, Enumerable<WebEventUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutWebsiteInput>
    upsert?: Enumerable<WebEventUpsertWithWhereUniqueWithoutWebsiteInput>
    createMany?: WebEventCreateManyWebsiteInputEnvelope
    set?: Enumerable<WebEventWhereUniqueInput>
    disconnect?: Enumerable<WebEventWhereUniqueInput>
    delete?: Enumerable<WebEventWhereUniqueInput>
    connect?: Enumerable<WebEventWhereUniqueInput>
    update?: Enumerable<WebEventUpdateWithWhereUniqueWithoutWebsiteInput>
    updateMany?: Enumerable<WebEventUpdateManyWithWhereWithoutWebsiteInput>
    deleteMany?: Enumerable<WebEventScalarWhereInput>
  }

  export type ApiKeyUncheckedUpdateManyWithoutWebsiteNestedInput = {
    create?: XOR<Enumerable<ApiKeyCreateWithoutWebsiteInput>, Enumerable<ApiKeyUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<ApiKeyCreateOrConnectWithoutWebsiteInput>
    upsert?: Enumerable<ApiKeyUpsertWithWhereUniqueWithoutWebsiteInput>
    createMany?: ApiKeyCreateManyWebsiteInputEnvelope
    set?: Enumerable<ApiKeyWhereUniqueInput>
    disconnect?: Enumerable<ApiKeyWhereUniqueInput>
    delete?: Enumerable<ApiKeyWhereUniqueInput>
    connect?: Enumerable<ApiKeyWhereUniqueInput>
    update?: Enumerable<ApiKeyUpdateWithWhereUniqueWithoutWebsiteInput>
    updateMany?: Enumerable<ApiKeyUpdateManyWithWhereWithoutWebsiteInput>
    deleteMany?: Enumerable<ApiKeyScalarWhereInput>
  }

  export type TeamWebsiteUncheckedUpdateManyWithoutWebsiteNestedInput = {
    create?: XOR<Enumerable<TeamWebsiteCreateWithoutWebsiteInput>, Enumerable<TeamWebsiteUncheckedCreateWithoutWebsiteInput>>
    connectOrCreate?: Enumerable<TeamWebsiteCreateOrConnectWithoutWebsiteInput>
    upsert?: Enumerable<TeamWebsiteUpsertWithWhereUniqueWithoutWebsiteInput>
    createMany?: TeamWebsiteCreateManyWebsiteInputEnvelope
    set?: Enumerable<TeamWebsiteWhereUniqueInput>
    disconnect?: Enumerable<TeamWebsiteWhereUniqueInput>
    delete?: Enumerable<TeamWebsiteWhereUniqueInput>
    connect?: Enumerable<TeamWebsiteWhereUniqueInput>
    update?: Enumerable<TeamWebsiteUpdateWithWhereUniqueWithoutWebsiteInput>
    updateMany?: Enumerable<TeamWebsiteUpdateManyWithWhereWithoutWebsiteInput>
    deleteMany?: Enumerable<TeamWebsiteScalarWhereInput>
  }

  export type WebSessionCreateNestedManyWithoutWebVisitorInput = {
    create?: XOR<Enumerable<WebSessionCreateWithoutWebVisitorInput>, Enumerable<WebSessionUncheckedCreateWithoutWebVisitorInput>>
    connectOrCreate?: Enumerable<WebSessionCreateOrConnectWithoutWebVisitorInput>
    createMany?: WebSessionCreateManyWebVisitorInputEnvelope
    connect?: Enumerable<WebSessionWhereUniqueInput>
  }

  export type WebPageviewCreateNestedManyWithoutWebVisitorInput = {
    create?: XOR<Enumerable<WebPageviewCreateWithoutWebVisitorInput>, Enumerable<WebPageviewUncheckedCreateWithoutWebVisitorInput>>
    connectOrCreate?: Enumerable<WebPageviewCreateOrConnectWithoutWebVisitorInput>
    createMany?: WebPageviewCreateManyWebVisitorInputEnvelope
    connect?: Enumerable<WebPageviewWhereUniqueInput>
  }

  export type WebEventCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutUserInput>, Enumerable<WebEventUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutUserInput>
    createMany?: WebEventCreateManyUserInputEnvelope
    connect?: Enumerable<WebEventWhereUniqueInput>
  }

  export type WebsiteCreateNestedOneWithoutWebVisitorInput = {
    create?: XOR<WebsiteCreateWithoutWebVisitorInput, WebsiteUncheckedCreateWithoutWebVisitorInput>
    connectOrCreate?: WebsiteCreateOrConnectWithoutWebVisitorInput
    connect?: WebsiteWhereUniqueInput
  }

  export type WebSessionUncheckedCreateNestedManyWithoutWebVisitorInput = {
    create?: XOR<Enumerable<WebSessionCreateWithoutWebVisitorInput>, Enumerable<WebSessionUncheckedCreateWithoutWebVisitorInput>>
    connectOrCreate?: Enumerable<WebSessionCreateOrConnectWithoutWebVisitorInput>
    createMany?: WebSessionCreateManyWebVisitorInputEnvelope
    connect?: Enumerable<WebSessionWhereUniqueInput>
  }

  export type WebPageviewUncheckedCreateNestedManyWithoutWebVisitorInput = {
    create?: XOR<Enumerable<WebPageviewCreateWithoutWebVisitorInput>, Enumerable<WebPageviewUncheckedCreateWithoutWebVisitorInput>>
    connectOrCreate?: Enumerable<WebPageviewCreateOrConnectWithoutWebVisitorInput>
    createMany?: WebPageviewCreateManyWebVisitorInputEnvelope
    connect?: Enumerable<WebPageviewWhereUniqueInput>
  }

  export type WebEventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutUserInput>, Enumerable<WebEventUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutUserInput>
    createMany?: WebEventCreateManyUserInputEnvelope
    connect?: Enumerable<WebEventWhereUniqueInput>
  }

  export type WebSessionUpdateManyWithoutWebVisitorNestedInput = {
    create?: XOR<Enumerable<WebSessionCreateWithoutWebVisitorInput>, Enumerable<WebSessionUncheckedCreateWithoutWebVisitorInput>>
    connectOrCreate?: Enumerable<WebSessionCreateOrConnectWithoutWebVisitorInput>
    upsert?: Enumerable<WebSessionUpsertWithWhereUniqueWithoutWebVisitorInput>
    createMany?: WebSessionCreateManyWebVisitorInputEnvelope
    set?: Enumerable<WebSessionWhereUniqueInput>
    disconnect?: Enumerable<WebSessionWhereUniqueInput>
    delete?: Enumerable<WebSessionWhereUniqueInput>
    connect?: Enumerable<WebSessionWhereUniqueInput>
    update?: Enumerable<WebSessionUpdateWithWhereUniqueWithoutWebVisitorInput>
    updateMany?: Enumerable<WebSessionUpdateManyWithWhereWithoutWebVisitorInput>
    deleteMany?: Enumerable<WebSessionScalarWhereInput>
  }

  export type WebPageviewUpdateManyWithoutWebVisitorNestedInput = {
    create?: XOR<Enumerable<WebPageviewCreateWithoutWebVisitorInput>, Enumerable<WebPageviewUncheckedCreateWithoutWebVisitorInput>>
    connectOrCreate?: Enumerable<WebPageviewCreateOrConnectWithoutWebVisitorInput>
    upsert?: Enumerable<WebPageviewUpsertWithWhereUniqueWithoutWebVisitorInput>
    createMany?: WebPageviewCreateManyWebVisitorInputEnvelope
    set?: Enumerable<WebPageviewWhereUniqueInput>
    disconnect?: Enumerable<WebPageviewWhereUniqueInput>
    delete?: Enumerable<WebPageviewWhereUniqueInput>
    connect?: Enumerable<WebPageviewWhereUniqueInput>
    update?: Enumerable<WebPageviewUpdateWithWhereUniqueWithoutWebVisitorInput>
    updateMany?: Enumerable<WebPageviewUpdateManyWithWhereWithoutWebVisitorInput>
    deleteMany?: Enumerable<WebPageviewScalarWhereInput>
  }

  export type WebEventUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutUserInput>, Enumerable<WebEventUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<WebEventUpsertWithWhereUniqueWithoutUserInput>
    createMany?: WebEventCreateManyUserInputEnvelope
    set?: Enumerable<WebEventWhereUniqueInput>
    disconnect?: Enumerable<WebEventWhereUniqueInput>
    delete?: Enumerable<WebEventWhereUniqueInput>
    connect?: Enumerable<WebEventWhereUniqueInput>
    update?: Enumerable<WebEventUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<WebEventUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<WebEventScalarWhereInput>
  }

  export type WebsiteUpdateOneRequiredWithoutWebVisitorNestedInput = {
    create?: XOR<WebsiteCreateWithoutWebVisitorInput, WebsiteUncheckedCreateWithoutWebVisitorInput>
    connectOrCreate?: WebsiteCreateOrConnectWithoutWebVisitorInput
    upsert?: WebsiteUpsertWithoutWebVisitorInput
    connect?: WebsiteWhereUniqueInput
    update?: XOR<WebsiteUpdateWithoutWebVisitorInput, WebsiteUncheckedUpdateWithoutWebVisitorInput>
  }

  export type WebSessionUncheckedUpdateManyWithoutWebVisitorNestedInput = {
    create?: XOR<Enumerable<WebSessionCreateWithoutWebVisitorInput>, Enumerable<WebSessionUncheckedCreateWithoutWebVisitorInput>>
    connectOrCreate?: Enumerable<WebSessionCreateOrConnectWithoutWebVisitorInput>
    upsert?: Enumerable<WebSessionUpsertWithWhereUniqueWithoutWebVisitorInput>
    createMany?: WebSessionCreateManyWebVisitorInputEnvelope
    set?: Enumerable<WebSessionWhereUniqueInput>
    disconnect?: Enumerable<WebSessionWhereUniqueInput>
    delete?: Enumerable<WebSessionWhereUniqueInput>
    connect?: Enumerable<WebSessionWhereUniqueInput>
    update?: Enumerable<WebSessionUpdateWithWhereUniqueWithoutWebVisitorInput>
    updateMany?: Enumerable<WebSessionUpdateManyWithWhereWithoutWebVisitorInput>
    deleteMany?: Enumerable<WebSessionScalarWhereInput>
  }

  export type WebPageviewUncheckedUpdateManyWithoutWebVisitorNestedInput = {
    create?: XOR<Enumerable<WebPageviewCreateWithoutWebVisitorInput>, Enumerable<WebPageviewUncheckedCreateWithoutWebVisitorInput>>
    connectOrCreate?: Enumerable<WebPageviewCreateOrConnectWithoutWebVisitorInput>
    upsert?: Enumerable<WebPageviewUpsertWithWhereUniqueWithoutWebVisitorInput>
    createMany?: WebPageviewCreateManyWebVisitorInputEnvelope
    set?: Enumerable<WebPageviewWhereUniqueInput>
    disconnect?: Enumerable<WebPageviewWhereUniqueInput>
    delete?: Enumerable<WebPageviewWhereUniqueInput>
    connect?: Enumerable<WebPageviewWhereUniqueInput>
    update?: Enumerable<WebPageviewUpdateWithWhereUniqueWithoutWebVisitorInput>
    updateMany?: Enumerable<WebPageviewUpdateManyWithWhereWithoutWebVisitorInput>
    deleteMany?: Enumerable<WebPageviewScalarWhereInput>
  }

  export type WebEventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutUserInput>, Enumerable<WebEventUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<WebEventUpsertWithWhereUniqueWithoutUserInput>
    createMany?: WebEventCreateManyUserInputEnvelope
    set?: Enumerable<WebEventWhereUniqueInput>
    disconnect?: Enumerable<WebEventWhereUniqueInput>
    delete?: Enumerable<WebEventWhereUniqueInput>
    connect?: Enumerable<WebEventWhereUniqueInput>
    update?: Enumerable<WebEventUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<WebEventUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<WebEventScalarWhereInput>
  }

  export type WebPageviewCreateNestedManyWithoutWebSessionInput = {
    create?: XOR<Enumerable<WebPageviewCreateWithoutWebSessionInput>, Enumerable<WebPageviewUncheckedCreateWithoutWebSessionInput>>
    connectOrCreate?: Enumerable<WebPageviewCreateOrConnectWithoutWebSessionInput>
    createMany?: WebPageviewCreateManyWebSessionInputEnvelope
    connect?: Enumerable<WebPageviewWhereUniqueInput>
  }

  export type WebEventCreateNestedManyWithoutWebSessionInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutWebSessionInput>, Enumerable<WebEventUncheckedCreateWithoutWebSessionInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutWebSessionInput>
    createMany?: WebEventCreateManyWebSessionInputEnvelope
    connect?: Enumerable<WebEventWhereUniqueInput>
  }

  export type WebVisitorCreateNestedOneWithoutSessionInput = {
    create?: XOR<WebVisitorCreateWithoutSessionInput, WebVisitorUncheckedCreateWithoutSessionInput>
    connectOrCreate?: WebVisitorCreateOrConnectWithoutSessionInput
    connect?: WebVisitorWhereUniqueInput
  }

  export type WebsiteCreateNestedOneWithoutWebSessionInput = {
    create?: XOR<WebsiteCreateWithoutWebSessionInput, WebsiteUncheckedCreateWithoutWebSessionInput>
    connectOrCreate?: WebsiteCreateOrConnectWithoutWebSessionInput
    connect?: WebsiteWhereUniqueInput
  }

  export type WebPageviewUncheckedCreateNestedManyWithoutWebSessionInput = {
    create?: XOR<Enumerable<WebPageviewCreateWithoutWebSessionInput>, Enumerable<WebPageviewUncheckedCreateWithoutWebSessionInput>>
    connectOrCreate?: Enumerable<WebPageviewCreateOrConnectWithoutWebSessionInput>
    createMany?: WebPageviewCreateManyWebSessionInputEnvelope
    connect?: Enumerable<WebPageviewWhereUniqueInput>
  }

  export type WebEventUncheckedCreateNestedManyWithoutWebSessionInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutWebSessionInput>, Enumerable<WebEventUncheckedCreateWithoutWebSessionInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutWebSessionInput>
    createMany?: WebEventCreateManyWebSessionInputEnvelope
    connect?: Enumerable<WebEventWhereUniqueInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WebPageviewUpdateManyWithoutWebSessionNestedInput = {
    create?: XOR<Enumerable<WebPageviewCreateWithoutWebSessionInput>, Enumerable<WebPageviewUncheckedCreateWithoutWebSessionInput>>
    connectOrCreate?: Enumerable<WebPageviewCreateOrConnectWithoutWebSessionInput>
    upsert?: Enumerable<WebPageviewUpsertWithWhereUniqueWithoutWebSessionInput>
    createMany?: WebPageviewCreateManyWebSessionInputEnvelope
    set?: Enumerable<WebPageviewWhereUniqueInput>
    disconnect?: Enumerable<WebPageviewWhereUniqueInput>
    delete?: Enumerable<WebPageviewWhereUniqueInput>
    connect?: Enumerable<WebPageviewWhereUniqueInput>
    update?: Enumerable<WebPageviewUpdateWithWhereUniqueWithoutWebSessionInput>
    updateMany?: Enumerable<WebPageviewUpdateManyWithWhereWithoutWebSessionInput>
    deleteMany?: Enumerable<WebPageviewScalarWhereInput>
  }

  export type WebEventUpdateManyWithoutWebSessionNestedInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutWebSessionInput>, Enumerable<WebEventUncheckedCreateWithoutWebSessionInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutWebSessionInput>
    upsert?: Enumerable<WebEventUpsertWithWhereUniqueWithoutWebSessionInput>
    createMany?: WebEventCreateManyWebSessionInputEnvelope
    set?: Enumerable<WebEventWhereUniqueInput>
    disconnect?: Enumerable<WebEventWhereUniqueInput>
    delete?: Enumerable<WebEventWhereUniqueInput>
    connect?: Enumerable<WebEventWhereUniqueInput>
    update?: Enumerable<WebEventUpdateWithWhereUniqueWithoutWebSessionInput>
    updateMany?: Enumerable<WebEventUpdateManyWithWhereWithoutWebSessionInput>
    deleteMany?: Enumerable<WebEventScalarWhereInput>
  }

  export type WebVisitorUpdateOneRequiredWithoutSessionNestedInput = {
    create?: XOR<WebVisitorCreateWithoutSessionInput, WebVisitorUncheckedCreateWithoutSessionInput>
    connectOrCreate?: WebVisitorCreateOrConnectWithoutSessionInput
    upsert?: WebVisitorUpsertWithoutSessionInput
    connect?: WebVisitorWhereUniqueInput
    update?: XOR<WebVisitorUpdateWithoutSessionInput, WebVisitorUncheckedUpdateWithoutSessionInput>
  }

  export type WebsiteUpdateOneRequiredWithoutWebSessionNestedInput = {
    create?: XOR<WebsiteCreateWithoutWebSessionInput, WebsiteUncheckedCreateWithoutWebSessionInput>
    connectOrCreate?: WebsiteCreateOrConnectWithoutWebSessionInput
    upsert?: WebsiteUpsertWithoutWebSessionInput
    connect?: WebsiteWhereUniqueInput
    update?: XOR<WebsiteUpdateWithoutWebSessionInput, WebsiteUncheckedUpdateWithoutWebSessionInput>
  }

  export type WebPageviewUncheckedUpdateManyWithoutWebSessionNestedInput = {
    create?: XOR<Enumerable<WebPageviewCreateWithoutWebSessionInput>, Enumerable<WebPageviewUncheckedCreateWithoutWebSessionInput>>
    connectOrCreate?: Enumerable<WebPageviewCreateOrConnectWithoutWebSessionInput>
    upsert?: Enumerable<WebPageviewUpsertWithWhereUniqueWithoutWebSessionInput>
    createMany?: WebPageviewCreateManyWebSessionInputEnvelope
    set?: Enumerable<WebPageviewWhereUniqueInput>
    disconnect?: Enumerable<WebPageviewWhereUniqueInput>
    delete?: Enumerable<WebPageviewWhereUniqueInput>
    connect?: Enumerable<WebPageviewWhereUniqueInput>
    update?: Enumerable<WebPageviewUpdateWithWhereUniqueWithoutWebSessionInput>
    updateMany?: Enumerable<WebPageviewUpdateManyWithWhereWithoutWebSessionInput>
    deleteMany?: Enumerable<WebPageviewScalarWhereInput>
  }

  export type WebEventUncheckedUpdateManyWithoutWebSessionNestedInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutWebSessionInput>, Enumerable<WebEventUncheckedCreateWithoutWebSessionInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutWebSessionInput>
    upsert?: Enumerable<WebEventUpsertWithWhereUniqueWithoutWebSessionInput>
    createMany?: WebEventCreateManyWebSessionInputEnvelope
    set?: Enumerable<WebEventWhereUniqueInput>
    disconnect?: Enumerable<WebEventWhereUniqueInput>
    delete?: Enumerable<WebEventWhereUniqueInput>
    connect?: Enumerable<WebEventWhereUniqueInput>
    update?: Enumerable<WebEventUpdateWithWhereUniqueWithoutWebSessionInput>
    updateMany?: Enumerable<WebEventUpdateManyWithWhereWithoutWebSessionInput>
    deleteMany?: Enumerable<WebEventScalarWhereInput>
  }

  export type WebEventCreateNestedManyWithoutPageInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutPageInput>, Enumerable<WebEventUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutPageInput>
    createMany?: WebEventCreateManyPageInputEnvelope
    connect?: Enumerable<WebEventWhereUniqueInput>
  }

  export type WebSessionCreateNestedOneWithoutWebPageInput = {
    create?: XOR<WebSessionCreateWithoutWebPageInput, WebSessionUncheckedCreateWithoutWebPageInput>
    connectOrCreate?: WebSessionCreateOrConnectWithoutWebPageInput
    connect?: WebSessionWhereUniqueInput
  }

  export type WebVisitorCreateNestedOneWithoutPageviewInput = {
    create?: XOR<WebVisitorCreateWithoutPageviewInput, WebVisitorUncheckedCreateWithoutPageviewInput>
    connectOrCreate?: WebVisitorCreateOrConnectWithoutPageviewInput
    connect?: WebVisitorWhereUniqueInput
  }

  export type WebsiteCreateNestedOneWithoutWebPageviewInput = {
    create?: XOR<WebsiteCreateWithoutWebPageviewInput, WebsiteUncheckedCreateWithoutWebPageviewInput>
    connectOrCreate?: WebsiteCreateOrConnectWithoutWebPageviewInput
    connect?: WebsiteWhereUniqueInput
  }

  export type WebEventUncheckedCreateNestedManyWithoutPageInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutPageInput>, Enumerable<WebEventUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutPageInput>
    createMany?: WebEventCreateManyPageInputEnvelope
    connect?: Enumerable<WebEventWhereUniqueInput>
  }

  export type WebEventUpdateManyWithoutPageNestedInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutPageInput>, Enumerable<WebEventUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutPageInput>
    upsert?: Enumerable<WebEventUpsertWithWhereUniqueWithoutPageInput>
    createMany?: WebEventCreateManyPageInputEnvelope
    set?: Enumerable<WebEventWhereUniqueInput>
    disconnect?: Enumerable<WebEventWhereUniqueInput>
    delete?: Enumerable<WebEventWhereUniqueInput>
    connect?: Enumerable<WebEventWhereUniqueInput>
    update?: Enumerable<WebEventUpdateWithWhereUniqueWithoutPageInput>
    updateMany?: Enumerable<WebEventUpdateManyWithWhereWithoutPageInput>
    deleteMany?: Enumerable<WebEventScalarWhereInput>
  }

  export type WebSessionUpdateOneRequiredWithoutWebPageNestedInput = {
    create?: XOR<WebSessionCreateWithoutWebPageInput, WebSessionUncheckedCreateWithoutWebPageInput>
    connectOrCreate?: WebSessionCreateOrConnectWithoutWebPageInput
    upsert?: WebSessionUpsertWithoutWebPageInput
    connect?: WebSessionWhereUniqueInput
    update?: XOR<WebSessionUpdateWithoutWebPageInput, WebSessionUncheckedUpdateWithoutWebPageInput>
  }

  export type WebVisitorUpdateOneRequiredWithoutPageviewNestedInput = {
    create?: XOR<WebVisitorCreateWithoutPageviewInput, WebVisitorUncheckedCreateWithoutPageviewInput>
    connectOrCreate?: WebVisitorCreateOrConnectWithoutPageviewInput
    upsert?: WebVisitorUpsertWithoutPageviewInput
    connect?: WebVisitorWhereUniqueInput
    update?: XOR<WebVisitorUpdateWithoutPageviewInput, WebVisitorUncheckedUpdateWithoutPageviewInput>
  }

  export type WebsiteUpdateOneRequiredWithoutWebPageviewNestedInput = {
    create?: XOR<WebsiteCreateWithoutWebPageviewInput, WebsiteUncheckedCreateWithoutWebPageviewInput>
    connectOrCreate?: WebsiteCreateOrConnectWithoutWebPageviewInput
    upsert?: WebsiteUpsertWithoutWebPageviewInput
    connect?: WebsiteWhereUniqueInput
    update?: XOR<WebsiteUpdateWithoutWebPageviewInput, WebsiteUncheckedUpdateWithoutWebPageviewInput>
  }

  export type WebEventUncheckedUpdateManyWithoutPageNestedInput = {
    create?: XOR<Enumerable<WebEventCreateWithoutPageInput>, Enumerable<WebEventUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<WebEventCreateOrConnectWithoutPageInput>
    upsert?: Enumerable<WebEventUpsertWithWhereUniqueWithoutPageInput>
    createMany?: WebEventCreateManyPageInputEnvelope
    set?: Enumerable<WebEventWhereUniqueInput>
    disconnect?: Enumerable<WebEventWhereUniqueInput>
    delete?: Enumerable<WebEventWhereUniqueInput>
    connect?: Enumerable<WebEventWhereUniqueInput>
    update?: Enumerable<WebEventUpdateWithWhereUniqueWithoutPageInput>
    updateMany?: Enumerable<WebEventUpdateManyWithWhereWithoutPageInput>
    deleteMany?: Enumerable<WebEventScalarWhereInput>
  }

  export type WebPageviewCreateNestedOneWithoutEventInput = {
    create?: XOR<WebPageviewCreateWithoutEventInput, WebPageviewUncheckedCreateWithoutEventInput>
    connectOrCreate?: WebPageviewCreateOrConnectWithoutEventInput
    connect?: WebPageviewWhereUniqueInput
  }

  export type WebVisitorCreateNestedOneWithoutWebEventInput = {
    create?: XOR<WebVisitorCreateWithoutWebEventInput, WebVisitorUncheckedCreateWithoutWebEventInput>
    connectOrCreate?: WebVisitorCreateOrConnectWithoutWebEventInput
    connect?: WebVisitorWhereUniqueInput
  }

  export type WebSessionCreateNestedOneWithoutWebEventInput = {
    create?: XOR<WebSessionCreateWithoutWebEventInput, WebSessionUncheckedCreateWithoutWebEventInput>
    connectOrCreate?: WebSessionCreateOrConnectWithoutWebEventInput
    connect?: WebSessionWhereUniqueInput
  }

  export type WebsiteCreateNestedOneWithoutWebEventInput = {
    create?: XOR<WebsiteCreateWithoutWebEventInput, WebsiteUncheckedCreateWithoutWebEventInput>
    connectOrCreate?: WebsiteCreateOrConnectWithoutWebEventInput
    connect?: WebsiteWhereUniqueInput
  }

  export type WebPageviewUpdateOneRequiredWithoutEventNestedInput = {
    create?: XOR<WebPageviewCreateWithoutEventInput, WebPageviewUncheckedCreateWithoutEventInput>
    connectOrCreate?: WebPageviewCreateOrConnectWithoutEventInput
    upsert?: WebPageviewUpsertWithoutEventInput
    connect?: WebPageviewWhereUniqueInput
    update?: XOR<WebPageviewUpdateWithoutEventInput, WebPageviewUncheckedUpdateWithoutEventInput>
  }

  export type WebVisitorUpdateOneRequiredWithoutWebEventNestedInput = {
    create?: XOR<WebVisitorCreateWithoutWebEventInput, WebVisitorUncheckedCreateWithoutWebEventInput>
    connectOrCreate?: WebVisitorCreateOrConnectWithoutWebEventInput
    upsert?: WebVisitorUpsertWithoutWebEventInput
    connect?: WebVisitorWhereUniqueInput
    update?: XOR<WebVisitorUpdateWithoutWebEventInput, WebVisitorUncheckedUpdateWithoutWebEventInput>
  }

  export type WebSessionUpdateOneRequiredWithoutWebEventNestedInput = {
    create?: XOR<WebSessionCreateWithoutWebEventInput, WebSessionUncheckedCreateWithoutWebEventInput>
    connectOrCreate?: WebSessionCreateOrConnectWithoutWebEventInput
    upsert?: WebSessionUpsertWithoutWebEventInput
    connect?: WebSessionWhereUniqueInput
    update?: XOR<WebSessionUpdateWithoutWebEventInput, WebSessionUncheckedUpdateWithoutWebEventInput>
  }

  export type WebsiteUpdateOneRequiredWithoutWebEventNestedInput = {
    create?: XOR<WebsiteCreateWithoutWebEventInput, WebsiteUncheckedCreateWithoutWebEventInput>
    connectOrCreate?: WebsiteCreateOrConnectWithoutWebEventInput
    upsert?: WebsiteUpsertWithoutWebEventInput
    connect?: WebsiteWhereUniqueInput
    update?: XOR<WebsiteUpdateWithoutWebEventInput, WebsiteUncheckedUpdateWithoutWebEventInput>
  }

  export type UserCreateNestedOneWithoutApiKeyInput = {
    create?: XOR<UserCreateWithoutApiKeyInput, UserUncheckedCreateWithoutApiKeyInput>
    connectOrCreate?: UserCreateOrConnectWithoutApiKeyInput
    connect?: UserWhereUniqueInput
  }

  export type WebsiteCreateNestedOneWithoutApiKeyInput = {
    create?: XOR<WebsiteCreateWithoutApiKeyInput, WebsiteUncheckedCreateWithoutApiKeyInput>
    connectOrCreate?: WebsiteCreateOrConnectWithoutApiKeyInput
    connect?: WebsiteWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutApiKeyNestedInput = {
    create?: XOR<UserCreateWithoutApiKeyInput, UserUncheckedCreateWithoutApiKeyInput>
    connectOrCreate?: UserCreateOrConnectWithoutApiKeyInput
    upsert?: UserUpsertWithoutApiKeyInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutApiKeyInput, UserUncheckedUpdateWithoutApiKeyInput>
  }

  export type WebsiteUpdateOneRequiredWithoutApiKeyNestedInput = {
    create?: XOR<WebsiteCreateWithoutApiKeyInput, WebsiteUncheckedCreateWithoutApiKeyInput>
    connectOrCreate?: WebsiteCreateOrConnectWithoutApiKeyInput
    upsert?: WebsiteUpsertWithoutApiKeyInput
    connect?: WebsiteWhereUniqueInput
    update?: XOR<WebsiteUpdateWithoutApiKeyInput, WebsiteUncheckedUpdateWithoutApiKeyInput>
  }

  export type TeamWebsiteCreateNestedManyWithoutTeamInput = {
    create?: XOR<Enumerable<TeamWebsiteCreateWithoutTeamInput>, Enumerable<TeamWebsiteUncheckedCreateWithoutTeamInput>>
    connectOrCreate?: Enumerable<TeamWebsiteCreateOrConnectWithoutTeamInput>
    createMany?: TeamWebsiteCreateManyTeamInputEnvelope
    connect?: Enumerable<TeamWebsiteWhereUniqueInput>
  }

  export type TeamUserCreateNestedManyWithoutTeamInput = {
    create?: XOR<Enumerable<TeamUserCreateWithoutTeamInput>, Enumerable<TeamUserUncheckedCreateWithoutTeamInput>>
    connectOrCreate?: Enumerable<TeamUserCreateOrConnectWithoutTeamInput>
    createMany?: TeamUserCreateManyTeamInputEnvelope
    connect?: Enumerable<TeamUserWhereUniqueInput>
  }

  export type TeamUserInviteCreateNestedManyWithoutTeamInput = {
    create?: XOR<Enumerable<TeamUserInviteCreateWithoutTeamInput>, Enumerable<TeamUserInviteUncheckedCreateWithoutTeamInput>>
    connectOrCreate?: Enumerable<TeamUserInviteCreateOrConnectWithoutTeamInput>
    createMany?: TeamUserInviteCreateManyTeamInputEnvelope
    connect?: Enumerable<TeamUserInviteWhereUniqueInput>
  }

  export type TeamWebsiteUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<Enumerable<TeamWebsiteCreateWithoutTeamInput>, Enumerable<TeamWebsiteUncheckedCreateWithoutTeamInput>>
    connectOrCreate?: Enumerable<TeamWebsiteCreateOrConnectWithoutTeamInput>
    createMany?: TeamWebsiteCreateManyTeamInputEnvelope
    connect?: Enumerable<TeamWebsiteWhereUniqueInput>
  }

  export type TeamUserUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<Enumerable<TeamUserCreateWithoutTeamInput>, Enumerable<TeamUserUncheckedCreateWithoutTeamInput>>
    connectOrCreate?: Enumerable<TeamUserCreateOrConnectWithoutTeamInput>
    createMany?: TeamUserCreateManyTeamInputEnvelope
    connect?: Enumerable<TeamUserWhereUniqueInput>
  }

  export type TeamUserInviteUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<Enumerable<TeamUserInviteCreateWithoutTeamInput>, Enumerable<TeamUserInviteUncheckedCreateWithoutTeamInput>>
    connectOrCreate?: Enumerable<TeamUserInviteCreateOrConnectWithoutTeamInput>
    createMany?: TeamUserInviteCreateManyTeamInputEnvelope
    connect?: Enumerable<TeamUserInviteWhereUniqueInput>
  }

  export type TeamWebsiteUpdateManyWithoutTeamNestedInput = {
    create?: XOR<Enumerable<TeamWebsiteCreateWithoutTeamInput>, Enumerable<TeamWebsiteUncheckedCreateWithoutTeamInput>>
    connectOrCreate?: Enumerable<TeamWebsiteCreateOrConnectWithoutTeamInput>
    upsert?: Enumerable<TeamWebsiteUpsertWithWhereUniqueWithoutTeamInput>
    createMany?: TeamWebsiteCreateManyTeamInputEnvelope
    set?: Enumerable<TeamWebsiteWhereUniqueInput>
    disconnect?: Enumerable<TeamWebsiteWhereUniqueInput>
    delete?: Enumerable<TeamWebsiteWhereUniqueInput>
    connect?: Enumerable<TeamWebsiteWhereUniqueInput>
    update?: Enumerable<TeamWebsiteUpdateWithWhereUniqueWithoutTeamInput>
    updateMany?: Enumerable<TeamWebsiteUpdateManyWithWhereWithoutTeamInput>
    deleteMany?: Enumerable<TeamWebsiteScalarWhereInput>
  }

  export type TeamUserUpdateManyWithoutTeamNestedInput = {
    create?: XOR<Enumerable<TeamUserCreateWithoutTeamInput>, Enumerable<TeamUserUncheckedCreateWithoutTeamInput>>
    connectOrCreate?: Enumerable<TeamUserCreateOrConnectWithoutTeamInput>
    upsert?: Enumerable<TeamUserUpsertWithWhereUniqueWithoutTeamInput>
    createMany?: TeamUserCreateManyTeamInputEnvelope
    set?: Enumerable<TeamUserWhereUniqueInput>
    disconnect?: Enumerable<TeamUserWhereUniqueInput>
    delete?: Enumerable<TeamUserWhereUniqueInput>
    connect?: Enumerable<TeamUserWhereUniqueInput>
    update?: Enumerable<TeamUserUpdateWithWhereUniqueWithoutTeamInput>
    updateMany?: Enumerable<TeamUserUpdateManyWithWhereWithoutTeamInput>
    deleteMany?: Enumerable<TeamUserScalarWhereInput>
  }

  export type TeamUserInviteUpdateManyWithoutTeamNestedInput = {
    create?: XOR<Enumerable<TeamUserInviteCreateWithoutTeamInput>, Enumerable<TeamUserInviteUncheckedCreateWithoutTeamInput>>
    connectOrCreate?: Enumerable<TeamUserInviteCreateOrConnectWithoutTeamInput>
    upsert?: Enumerable<TeamUserInviteUpsertWithWhereUniqueWithoutTeamInput>
    createMany?: TeamUserInviteCreateManyTeamInputEnvelope
    set?: Enumerable<TeamUserInviteWhereUniqueInput>
    disconnect?: Enumerable<TeamUserInviteWhereUniqueInput>
    delete?: Enumerable<TeamUserInviteWhereUniqueInput>
    connect?: Enumerable<TeamUserInviteWhereUniqueInput>
    update?: Enumerable<TeamUserInviteUpdateWithWhereUniqueWithoutTeamInput>
    updateMany?: Enumerable<TeamUserInviteUpdateManyWithWhereWithoutTeamInput>
    deleteMany?: Enumerable<TeamUserInviteScalarWhereInput>
  }

  export type TeamWebsiteUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<Enumerable<TeamWebsiteCreateWithoutTeamInput>, Enumerable<TeamWebsiteUncheckedCreateWithoutTeamInput>>
    connectOrCreate?: Enumerable<TeamWebsiteCreateOrConnectWithoutTeamInput>
    upsert?: Enumerable<TeamWebsiteUpsertWithWhereUniqueWithoutTeamInput>
    createMany?: TeamWebsiteCreateManyTeamInputEnvelope
    set?: Enumerable<TeamWebsiteWhereUniqueInput>
    disconnect?: Enumerable<TeamWebsiteWhereUniqueInput>
    delete?: Enumerable<TeamWebsiteWhereUniqueInput>
    connect?: Enumerable<TeamWebsiteWhereUniqueInput>
    update?: Enumerable<TeamWebsiteUpdateWithWhereUniqueWithoutTeamInput>
    updateMany?: Enumerable<TeamWebsiteUpdateManyWithWhereWithoutTeamInput>
    deleteMany?: Enumerable<TeamWebsiteScalarWhereInput>
  }

  export type TeamUserUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<Enumerable<TeamUserCreateWithoutTeamInput>, Enumerable<TeamUserUncheckedCreateWithoutTeamInput>>
    connectOrCreate?: Enumerable<TeamUserCreateOrConnectWithoutTeamInput>
    upsert?: Enumerable<TeamUserUpsertWithWhereUniqueWithoutTeamInput>
    createMany?: TeamUserCreateManyTeamInputEnvelope
    set?: Enumerable<TeamUserWhereUniqueInput>
    disconnect?: Enumerable<TeamUserWhereUniqueInput>
    delete?: Enumerable<TeamUserWhereUniqueInput>
    connect?: Enumerable<TeamUserWhereUniqueInput>
    update?: Enumerable<TeamUserUpdateWithWhereUniqueWithoutTeamInput>
    updateMany?: Enumerable<TeamUserUpdateManyWithWhereWithoutTeamInput>
    deleteMany?: Enumerable<TeamUserScalarWhereInput>
  }

  export type TeamUserInviteUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<Enumerable<TeamUserInviteCreateWithoutTeamInput>, Enumerable<TeamUserInviteUncheckedCreateWithoutTeamInput>>
    connectOrCreate?: Enumerable<TeamUserInviteCreateOrConnectWithoutTeamInput>
    upsert?: Enumerable<TeamUserInviteUpsertWithWhereUniqueWithoutTeamInput>
    createMany?: TeamUserInviteCreateManyTeamInputEnvelope
    set?: Enumerable<TeamUserInviteWhereUniqueInput>
    disconnect?: Enumerable<TeamUserInviteWhereUniqueInput>
    delete?: Enumerable<TeamUserInviteWhereUniqueInput>
    connect?: Enumerable<TeamUserInviteWhereUniqueInput>
    update?: Enumerable<TeamUserInviteUpdateWithWhereUniqueWithoutTeamInput>
    updateMany?: Enumerable<TeamUserInviteUpdateManyWithWhereWithoutTeamInput>
    deleteMany?: Enumerable<TeamUserInviteScalarWhereInput>
  }

  export type TeamCreateNestedOneWithoutTeamWebsiteInput = {
    create?: XOR<TeamCreateWithoutTeamWebsiteInput, TeamUncheckedCreateWithoutTeamWebsiteInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamWebsiteInput
    connect?: TeamWhereUniqueInput
  }

  export type WebsiteCreateNestedOneWithoutTeamWebsiteInput = {
    create?: XOR<WebsiteCreateWithoutTeamWebsiteInput, WebsiteUncheckedCreateWithoutTeamWebsiteInput>
    connectOrCreate?: WebsiteCreateOrConnectWithoutTeamWebsiteInput
    connect?: WebsiteWhereUniqueInput
  }

  export type TeamUpdateOneRequiredWithoutTeamWebsiteNestedInput = {
    create?: XOR<TeamCreateWithoutTeamWebsiteInput, TeamUncheckedCreateWithoutTeamWebsiteInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamWebsiteInput
    upsert?: TeamUpsertWithoutTeamWebsiteInput
    connect?: TeamWhereUniqueInput
    update?: XOR<TeamUpdateWithoutTeamWebsiteInput, TeamUncheckedUpdateWithoutTeamWebsiteInput>
  }

  export type WebsiteUpdateOneRequiredWithoutTeamWebsiteNestedInput = {
    create?: XOR<WebsiteCreateWithoutTeamWebsiteInput, WebsiteUncheckedCreateWithoutTeamWebsiteInput>
    connectOrCreate?: WebsiteCreateOrConnectWithoutTeamWebsiteInput
    upsert?: WebsiteUpsertWithoutTeamWebsiteInput
    connect?: WebsiteWhereUniqueInput
    update?: XOR<WebsiteUpdateWithoutTeamWebsiteInput, WebsiteUncheckedUpdateWithoutTeamWebsiteInput>
  }

  export type TeamCreateNestedOneWithoutTeamUserInput = {
    create?: XOR<TeamCreateWithoutTeamUserInput, TeamUncheckedCreateWithoutTeamUserInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamUserInput
    connect?: TeamWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTeamUserInput = {
    create?: XOR<UserCreateWithoutTeamUserInput, UserUncheckedCreateWithoutTeamUserInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamUserInput
    connect?: UserWhereUniqueInput
  }

  export type TeamUserInviteCreateNestedManyWithoutTeamUserInput = {
    create?: XOR<Enumerable<TeamUserInviteCreateWithoutTeamUserInput>, Enumerable<TeamUserInviteUncheckedCreateWithoutTeamUserInput>>
    connectOrCreate?: Enumerable<TeamUserInviteCreateOrConnectWithoutTeamUserInput>
    createMany?: TeamUserInviteCreateManyTeamUserInputEnvelope
    connect?: Enumerable<TeamUserInviteWhereUniqueInput>
  }

  export type TeamUserInviteUncheckedCreateNestedManyWithoutTeamUserInput = {
    create?: XOR<Enumerable<TeamUserInviteCreateWithoutTeamUserInput>, Enumerable<TeamUserInviteUncheckedCreateWithoutTeamUserInput>>
    connectOrCreate?: Enumerable<TeamUserInviteCreateOrConnectWithoutTeamUserInput>
    createMany?: TeamUserInviteCreateManyTeamUserInputEnvelope
    connect?: Enumerable<TeamUserInviteWhereUniqueInput>
  }

  export type EnumROLEFieldUpdateOperationsInput = {
    set?: ROLE
  }

  export type TeamUpdateOneRequiredWithoutTeamUserNestedInput = {
    create?: XOR<TeamCreateWithoutTeamUserInput, TeamUncheckedCreateWithoutTeamUserInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamUserInput
    upsert?: TeamUpsertWithoutTeamUserInput
    connect?: TeamWhereUniqueInput
    update?: XOR<TeamUpdateWithoutTeamUserInput, TeamUncheckedUpdateWithoutTeamUserInput>
  }

  export type UserUpdateOneRequiredWithoutTeamUserNestedInput = {
    create?: XOR<UserCreateWithoutTeamUserInput, UserUncheckedCreateWithoutTeamUserInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamUserInput
    upsert?: UserUpsertWithoutTeamUserInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutTeamUserInput, UserUncheckedUpdateWithoutTeamUserInput>
  }

  export type TeamUserInviteUpdateManyWithoutTeamUserNestedInput = {
    create?: XOR<Enumerable<TeamUserInviteCreateWithoutTeamUserInput>, Enumerable<TeamUserInviteUncheckedCreateWithoutTeamUserInput>>
    connectOrCreate?: Enumerable<TeamUserInviteCreateOrConnectWithoutTeamUserInput>
    upsert?: Enumerable<TeamUserInviteUpsertWithWhereUniqueWithoutTeamUserInput>
    createMany?: TeamUserInviteCreateManyTeamUserInputEnvelope
    set?: Enumerable<TeamUserInviteWhereUniqueInput>
    disconnect?: Enumerable<TeamUserInviteWhereUniqueInput>
    delete?: Enumerable<TeamUserInviteWhereUniqueInput>
    connect?: Enumerable<TeamUserInviteWhereUniqueInput>
    update?: Enumerable<TeamUserInviteUpdateWithWhereUniqueWithoutTeamUserInput>
    updateMany?: Enumerable<TeamUserInviteUpdateManyWithWhereWithoutTeamUserInput>
    deleteMany?: Enumerable<TeamUserInviteScalarWhereInput>
  }

  export type TeamUserInviteUncheckedUpdateManyWithoutTeamUserNestedInput = {
    create?: XOR<Enumerable<TeamUserInviteCreateWithoutTeamUserInput>, Enumerable<TeamUserInviteUncheckedCreateWithoutTeamUserInput>>
    connectOrCreate?: Enumerable<TeamUserInviteCreateOrConnectWithoutTeamUserInput>
    upsert?: Enumerable<TeamUserInviteUpsertWithWhereUniqueWithoutTeamUserInput>
    createMany?: TeamUserInviteCreateManyTeamUserInputEnvelope
    set?: Enumerable<TeamUserInviteWhereUniqueInput>
    disconnect?: Enumerable<TeamUserInviteWhereUniqueInput>
    delete?: Enumerable<TeamUserInviteWhereUniqueInput>
    connect?: Enumerable<TeamUserInviteWhereUniqueInput>
    update?: Enumerable<TeamUserInviteUpdateWithWhereUniqueWithoutTeamUserInput>
    updateMany?: Enumerable<TeamUserInviteUpdateManyWithWhereWithoutTeamUserInput>
    deleteMany?: Enumerable<TeamUserInviteScalarWhereInput>
  }

  export type TeamCreateNestedOneWithoutTeamUserInviteInput = {
    create?: XOR<TeamCreateWithoutTeamUserInviteInput, TeamUncheckedCreateWithoutTeamUserInviteInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamUserInviteInput
    connect?: TeamWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTeamUserInviteInput = {
    create?: XOR<UserCreateWithoutTeamUserInviteInput, UserUncheckedCreateWithoutTeamUserInviteInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamUserInviteInput
    connect?: UserWhereUniqueInput
  }

  export type TeamUserCreateNestedOneWithoutTeamUserInviteInput = {
    create?: XOR<TeamUserCreateWithoutTeamUserInviteInput, TeamUserUncheckedCreateWithoutTeamUserInviteInput>
    connectOrCreate?: TeamUserCreateOrConnectWithoutTeamUserInviteInput
    connect?: TeamUserWhereUniqueInput
  }

  export type EnumINVITE_STATUSFieldUpdateOperationsInput = {
    set?: INVITE_STATUS
  }

  export type TeamUpdateOneRequiredWithoutTeamUserInviteNestedInput = {
    create?: XOR<TeamCreateWithoutTeamUserInviteInput, TeamUncheckedCreateWithoutTeamUserInviteInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamUserInviteInput
    upsert?: TeamUpsertWithoutTeamUserInviteInput
    connect?: TeamWhereUniqueInput
    update?: XOR<TeamUpdateWithoutTeamUserInviteInput, TeamUncheckedUpdateWithoutTeamUserInviteInput>
  }

  export type UserUpdateOneRequiredWithoutTeamUserInviteNestedInput = {
    create?: XOR<UserCreateWithoutTeamUserInviteInput, UserUncheckedCreateWithoutTeamUserInviteInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamUserInviteInput
    upsert?: UserUpsertWithoutTeamUserInviteInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutTeamUserInviteInput, UserUncheckedUpdateWithoutTeamUserInviteInput>
  }

  export type TeamUserUpdateOneRequiredWithoutTeamUserInviteNestedInput = {
    create?: XOR<TeamUserCreateWithoutTeamUserInviteInput, TeamUserUncheckedCreateWithoutTeamUserInviteInput>
    connectOrCreate?: TeamUserCreateOrConnectWithoutTeamUserInviteInput
    upsert?: TeamUserUpsertWithoutTeamUserInviteInput
    connect?: TeamUserWhereUniqueInput
    update?: XOR<TeamUserUpdateWithoutTeamUserInviteInput, TeamUserUncheckedUpdateWithoutTeamUserInviteInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedEnumROLEFilter = {
    equals?: ROLE
    in?: Enumerable<ROLE>
    notIn?: Enumerable<ROLE>
    not?: NestedEnumROLEFilter | ROLE
  }

  export type NestedEnumROLEWithAggregatesFilter = {
    equals?: ROLE
    in?: Enumerable<ROLE>
    notIn?: Enumerable<ROLE>
    not?: NestedEnumROLEWithAggregatesFilter | ROLE
    _count?: NestedIntFilter
    _min?: NestedEnumROLEFilter
    _max?: NestedEnumROLEFilter
  }

  export type NestedEnumINVITE_STATUSFilter = {
    equals?: INVITE_STATUS
    in?: Enumerable<INVITE_STATUS>
    notIn?: Enumerable<INVITE_STATUS>
    not?: NestedEnumINVITE_STATUSFilter | INVITE_STATUS
  }

  export type NestedEnumINVITE_STATUSWithAggregatesFilter = {
    equals?: INVITE_STATUS
    in?: Enumerable<INVITE_STATUS>
    notIn?: Enumerable<INVITE_STATUS>
    not?: NestedEnumINVITE_STATUSWithAggregatesFilter | INVITE_STATUS
    _count?: NestedIntFilter
    _min?: NestedEnumINVITE_STATUSFilter
    _max?: NestedEnumINVITE_STATUSFilter
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    Website?: WebsiteCreateNestedManyWithoutUserInput
    ApiKey?: ApiKeyCreateNestedManyWithoutUserInput
    TeamUser?: TeamUserCreateNestedManyWithoutUserInput
    TeamUserInvite?: TeamUserInviteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Website?: WebsiteUncheckedCreateNestedManyWithoutUserInput
    ApiKey?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
    TeamUser?: TeamUserUncheckedCreateNestedManyWithoutUserInput
    TeamUserInvite?: TeamUserInviteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Website?: WebsiteUpdateManyWithoutUserNestedInput
    ApiKey?: ApiKeyUpdateManyWithoutUserNestedInput
    TeamUser?: TeamUserUpdateManyWithoutUserNestedInput
    TeamUserInvite?: TeamUserInviteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Website?: WebsiteUncheckedUpdateManyWithoutUserNestedInput
    ApiKey?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
    TeamUser?: TeamUserUncheckedUpdateManyWithoutUserNestedInput
    TeamUserInvite?: TeamUserInviteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    Website?: WebsiteCreateNestedManyWithoutUserInput
    ApiKey?: ApiKeyCreateNestedManyWithoutUserInput
    TeamUser?: TeamUserCreateNestedManyWithoutUserInput
    TeamUserInvite?: TeamUserInviteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    Website?: WebsiteUncheckedCreateNestedManyWithoutUserInput
    ApiKey?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
    TeamUser?: TeamUserUncheckedCreateNestedManyWithoutUserInput
    TeamUserInvite?: TeamUserInviteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    Website?: WebsiteUpdateManyWithoutUserNestedInput
    ApiKey?: ApiKeyUpdateManyWithoutUserNestedInput
    TeamUser?: TeamUserUpdateManyWithoutUserNestedInput
    TeamUserInvite?: TeamUserInviteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    Website?: WebsiteUncheckedUpdateManyWithoutUserNestedInput
    ApiKey?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
    TeamUser?: TeamUserUncheckedUpdateManyWithoutUserNestedInput
    TeamUserInvite?: TeamUserInviteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: Enumerable<AccountCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: Enumerable<SessionCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type WebsiteCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    active?: boolean
    WebVisitor?: WebVisitorCreateNestedManyWithoutWebsiteInput
    WebSession?: WebSessionCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    active?: boolean
    WebVisitor?: WebVisitorUncheckedCreateNestedManyWithoutWebsiteInput
    WebSession?: WebSessionUncheckedCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewUncheckedCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyUncheckedCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteUncheckedCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteCreateOrConnectWithoutUserInput = {
    where: WebsiteWhereUniqueInput
    create: XOR<WebsiteCreateWithoutUserInput, WebsiteUncheckedCreateWithoutUserInput>
  }

  export type WebsiteCreateManyUserInputEnvelope = {
    data: Enumerable<WebsiteCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ApiKeyCreateWithoutUserInput = {
    id?: string
    name: string
    key?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    expires: Date | string
    website: WebsiteCreateNestedOneWithoutApiKeyInput
  }

  export type ApiKeyUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    websiteId: string
    key?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    expires: Date | string
  }

  export type ApiKeyCreateOrConnectWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    create: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput>
  }

  export type ApiKeyCreateManyUserInputEnvelope = {
    data: Enumerable<ApiKeyCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type TeamUserCreateWithoutUserInput = {
    id?: string
    role?: ROLE
    accepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Team: TeamCreateNestedOneWithoutTeamUserInput
    TeamUserInvite?: TeamUserInviteCreateNestedManyWithoutTeamUserInput
  }

  export type TeamUserUncheckedCreateWithoutUserInput = {
    id?: string
    teamId: string
    role?: ROLE
    accepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    TeamUserInvite?: TeamUserInviteUncheckedCreateNestedManyWithoutTeamUserInput
  }

  export type TeamUserCreateOrConnectWithoutUserInput = {
    where: TeamUserWhereUniqueInput
    create: XOR<TeamUserCreateWithoutUserInput, TeamUserUncheckedCreateWithoutUserInput>
  }

  export type TeamUserCreateManyUserInputEnvelope = {
    data: Enumerable<TeamUserCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type TeamUserInviteCreateWithoutUserInput = {
    id?: string
    token: string
    status?: INVITE_STATUS
    createdAt?: Date | string
    updatedAt?: Date | string
    Team: TeamCreateNestedOneWithoutTeamUserInviteInput
    TeamUser: TeamUserCreateNestedOneWithoutTeamUserInviteInput
  }

  export type TeamUserInviteUncheckedCreateWithoutUserInput = {
    id?: string
    teamId: string
    teamUserId: string
    token: string
    status?: INVITE_STATUS
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUserInviteCreateOrConnectWithoutUserInput = {
    where: TeamUserInviteWhereUniqueInput
    create: XOR<TeamUserInviteCreateWithoutUserInput, TeamUserInviteUncheckedCreateWithoutUserInput>
  }

  export type TeamUserInviteCreateManyUserInputEnvelope = {
    data: Enumerable<TeamUserInviteCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutAccountsInput>
  }

  export type AccountScalarWhereInput = {
    AND?: Enumerable<AccountScalarWhereInput>
    OR?: Enumerable<AccountScalarWhereInput>
    NOT?: Enumerable<AccountScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    type?: StringFilter | string
    provider?: StringFilter | string
    providerAccountId?: StringFilter | string
    refresh_token?: StringNullableFilter | string | null
    access_token?: StringNullableFilter | string | null
    expires_at?: IntNullableFilter | number | null
    token_type?: StringNullableFilter | string | null
    scope?: StringNullableFilter | string | null
    id_token?: StringNullableFilter | string | null
    session_state?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutSessionsInput>
  }

  export type SessionScalarWhereInput = {
    AND?: Enumerable<SessionScalarWhereInput>
    OR?: Enumerable<SessionScalarWhereInput>
    NOT?: Enumerable<SessionScalarWhereInput>
    id?: StringFilter | string
    sessionToken?: StringFilter | string
    userId?: StringFilter | string
    expires?: DateTimeFilter | Date | string
  }

  export type WebsiteUpsertWithWhereUniqueWithoutUserInput = {
    where: WebsiteWhereUniqueInput
    update: XOR<WebsiteUpdateWithoutUserInput, WebsiteUncheckedUpdateWithoutUserInput>
    create: XOR<WebsiteCreateWithoutUserInput, WebsiteUncheckedCreateWithoutUserInput>
  }

  export type WebsiteUpdateWithWhereUniqueWithoutUserInput = {
    where: WebsiteWhereUniqueInput
    data: XOR<WebsiteUpdateWithoutUserInput, WebsiteUncheckedUpdateWithoutUserInput>
  }

  export type WebsiteUpdateManyWithWhereWithoutUserInput = {
    where: WebsiteScalarWhereInput
    data: XOR<WebsiteUpdateManyMutationInput, WebsiteUncheckedUpdateManyWithoutWebsiteInput>
  }

  export type WebsiteScalarWhereInput = {
    AND?: Enumerable<WebsiteScalarWhereInput>
    OR?: Enumerable<WebsiteScalarWhereInput>
    NOT?: Enumerable<WebsiteScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    url?: StringFilter | string
    title?: StringNullableFilter | string | null
    userId?: StringFilter | string
    active?: BoolFilter | boolean
  }

  export type ApiKeyUpsertWithWhereUniqueWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    update: XOR<ApiKeyUpdateWithoutUserInput, ApiKeyUncheckedUpdateWithoutUserInput>
    create: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput>
  }

  export type ApiKeyUpdateWithWhereUniqueWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    data: XOR<ApiKeyUpdateWithoutUserInput, ApiKeyUncheckedUpdateWithoutUserInput>
  }

  export type ApiKeyUpdateManyWithWhereWithoutUserInput = {
    where: ApiKeyScalarWhereInput
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyWithoutApiKeyInput>
  }

  export type ApiKeyScalarWhereInput = {
    AND?: Enumerable<ApiKeyScalarWhereInput>
    OR?: Enumerable<ApiKeyScalarWhereInput>
    NOT?: Enumerable<ApiKeyScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    name?: StringFilter | string
    websiteId?: StringFilter | string
    key?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    expires?: DateTimeFilter | Date | string
  }

  export type TeamUserUpsertWithWhereUniqueWithoutUserInput = {
    where: TeamUserWhereUniqueInput
    update: XOR<TeamUserUpdateWithoutUserInput, TeamUserUncheckedUpdateWithoutUserInput>
    create: XOR<TeamUserCreateWithoutUserInput, TeamUserUncheckedCreateWithoutUserInput>
  }

  export type TeamUserUpdateWithWhereUniqueWithoutUserInput = {
    where: TeamUserWhereUniqueInput
    data: XOR<TeamUserUpdateWithoutUserInput, TeamUserUncheckedUpdateWithoutUserInput>
  }

  export type TeamUserUpdateManyWithWhereWithoutUserInput = {
    where: TeamUserScalarWhereInput
    data: XOR<TeamUserUpdateManyMutationInput, TeamUserUncheckedUpdateManyWithoutTeamUserInput>
  }

  export type TeamUserScalarWhereInput = {
    AND?: Enumerable<TeamUserScalarWhereInput>
    OR?: Enumerable<TeamUserScalarWhereInput>
    NOT?: Enumerable<TeamUserScalarWhereInput>
    id?: StringFilter | string
    teamId?: StringFilter | string
    userId?: StringFilter | string
    role?: EnumROLEFilter | ROLE
    accepted?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type TeamUserInviteUpsertWithWhereUniqueWithoutUserInput = {
    where: TeamUserInviteWhereUniqueInput
    update: XOR<TeamUserInviteUpdateWithoutUserInput, TeamUserInviteUncheckedUpdateWithoutUserInput>
    create: XOR<TeamUserInviteCreateWithoutUserInput, TeamUserInviteUncheckedCreateWithoutUserInput>
  }

  export type TeamUserInviteUpdateWithWhereUniqueWithoutUserInput = {
    where: TeamUserInviteWhereUniqueInput
    data: XOR<TeamUserInviteUpdateWithoutUserInput, TeamUserInviteUncheckedUpdateWithoutUserInput>
  }

  export type TeamUserInviteUpdateManyWithWhereWithoutUserInput = {
    where: TeamUserInviteScalarWhereInput
    data: XOR<TeamUserInviteUpdateManyMutationInput, TeamUserInviteUncheckedUpdateManyWithoutTeamUserInviteInput>
  }

  export type TeamUserInviteScalarWhereInput = {
    AND?: Enumerable<TeamUserInviteScalarWhereInput>
    OR?: Enumerable<TeamUserInviteScalarWhereInput>
    NOT?: Enumerable<TeamUserInviteScalarWhereInput>
    id?: StringFilter | string
    teamId?: StringFilter | string
    userId?: StringFilter | string
    teamUserId?: StringFilter | string
    token?: StringFilter | string
    status?: EnumINVITE_STATUSFilter | INVITE_STATUS
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserCreateWithoutWebsiteInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    ApiKey?: ApiKeyCreateNestedManyWithoutUserInput
    TeamUser?: TeamUserCreateNestedManyWithoutUserInput
    TeamUserInvite?: TeamUserInviteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWebsiteInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    ApiKey?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
    TeamUser?: TeamUserUncheckedCreateNestedManyWithoutUserInput
    TeamUserInvite?: TeamUserInviteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWebsiteInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWebsiteInput, UserUncheckedCreateWithoutWebsiteInput>
  }

  export type WebVisitorCreateWithoutWebsiteInput = {
    id?: string
    data?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Session?: WebSessionCreateNestedManyWithoutWebVisitorInput
    Pageview?: WebPageviewCreateNestedManyWithoutWebVisitorInput
    WebEvent?: WebEventCreateNestedManyWithoutUserInput
  }

  export type WebVisitorUncheckedCreateWithoutWebsiteInput = {
    id?: string
    data?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Session?: WebSessionUncheckedCreateNestedManyWithoutWebVisitorInput
    Pageview?: WebPageviewUncheckedCreateNestedManyWithoutWebVisitorInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type WebVisitorCreateOrConnectWithoutWebsiteInput = {
    where: WebVisitorWhereUniqueInput
    create: XOR<WebVisitorCreateWithoutWebsiteInput, WebVisitorUncheckedCreateWithoutWebsiteInput>
  }

  export type WebVisitorCreateManyWebsiteInputEnvelope = {
    data: Enumerable<WebVisitorCreateManyWebsiteInput>
    skipDuplicates?: boolean
  }

  export type WebSessionCreateWithoutWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    referrer?: string
    queryParams?: string
    duration?: number
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    language?: string | null
    WebPage?: WebPageviewCreateNestedManyWithoutWebSessionInput
    WebEvent?: WebEventCreateNestedManyWithoutWebSessionInput
    WebVisitor: WebVisitorCreateNestedOneWithoutSessionInput
  }

  export type WebSessionUncheckedCreateWithoutWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    referrer?: string
    queryParams?: string
    duration?: number
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    language?: string | null
    visitorId: string
    WebPage?: WebPageviewUncheckedCreateNestedManyWithoutWebSessionInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutWebSessionInput
  }

  export type WebSessionCreateOrConnectWithoutWebsiteInput = {
    where: WebSessionWhereUniqueInput
    create: XOR<WebSessionCreateWithoutWebsiteInput, WebSessionUncheckedCreateWithoutWebsiteInput>
  }

  export type WebSessionCreateManyWebsiteInputEnvelope = {
    data: Enumerable<WebSessionCreateManyWebsiteInput>
    skipDuplicates?: boolean
  }

  export type WebPageviewCreateWithoutWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    Event?: WebEventCreateNestedManyWithoutPageInput
    WebSession: WebSessionCreateNestedOneWithoutWebPageInput
    WebVisitor: WebVisitorCreateNestedOneWithoutPageviewInput
  }

  export type WebPageviewUncheckedCreateWithoutWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    sessionId: string
    visitorId: string
    Event?: WebEventUncheckedCreateNestedManyWithoutPageInput
  }

  export type WebPageviewCreateOrConnectWithoutWebsiteInput = {
    where: WebPageviewWhereUniqueInput
    create: XOR<WebPageviewCreateWithoutWebsiteInput, WebPageviewUncheckedCreateWithoutWebsiteInput>
  }

  export type WebPageviewCreateManyWebsiteInputEnvelope = {
    data: Enumerable<WebPageviewCreateManyWebsiteInput>
    skipDuplicates?: boolean
  }

  export type WebEventCreateWithoutWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    Page: WebPageviewCreateNestedOneWithoutEventInput
    User: WebVisitorCreateNestedOneWithoutWebEventInput
    WebSession: WebSessionCreateNestedOneWithoutWebEventInput
  }

  export type WebEventUncheckedCreateWithoutWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    pageId: string
    sessionId: string
    visitorId: string
  }

  export type WebEventCreateOrConnectWithoutWebsiteInput = {
    where: WebEventWhereUniqueInput
    create: XOR<WebEventCreateWithoutWebsiteInput, WebEventUncheckedCreateWithoutWebsiteInput>
  }

  export type WebEventCreateManyWebsiteInputEnvelope = {
    data: Enumerable<WebEventCreateManyWebsiteInput>
    skipDuplicates?: boolean
  }

  export type ApiKeyCreateWithoutWebsiteInput = {
    id?: string
    name: string
    key?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    expires: Date | string
    user: UserCreateNestedOneWithoutApiKeyInput
  }

  export type ApiKeyUncheckedCreateWithoutWebsiteInput = {
    id?: string
    userId: string
    name: string
    key?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    expires: Date | string
  }

  export type ApiKeyCreateOrConnectWithoutWebsiteInput = {
    where: ApiKeyWhereUniqueInput
    create: XOR<ApiKeyCreateWithoutWebsiteInput, ApiKeyUncheckedCreateWithoutWebsiteInput>
  }

  export type ApiKeyCreateManyWebsiteInputEnvelope = {
    data: Enumerable<ApiKeyCreateManyWebsiteInput>
    skipDuplicates?: boolean
  }

  export type TeamWebsiteCreateWithoutWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Team: TeamCreateNestedOneWithoutTeamWebsiteInput
  }

  export type TeamWebsiteUncheckedCreateWithoutWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teamId: string
  }

  export type TeamWebsiteCreateOrConnectWithoutWebsiteInput = {
    where: TeamWebsiteWhereUniqueInput
    create: XOR<TeamWebsiteCreateWithoutWebsiteInput, TeamWebsiteUncheckedCreateWithoutWebsiteInput>
  }

  export type TeamWebsiteCreateManyWebsiteInputEnvelope = {
    data: Enumerable<TeamWebsiteCreateManyWebsiteInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWebsiteInput = {
    update: XOR<UserUpdateWithoutWebsiteInput, UserUncheckedUpdateWithoutWebsiteInput>
    create: XOR<UserCreateWithoutWebsiteInput, UserUncheckedCreateWithoutWebsiteInput>
  }

  export type UserUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    ApiKey?: ApiKeyUpdateManyWithoutUserNestedInput
    TeamUser?: TeamUserUpdateManyWithoutUserNestedInput
    TeamUserInvite?: TeamUserInviteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    ApiKey?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
    TeamUser?: TeamUserUncheckedUpdateManyWithoutUserNestedInput
    TeamUserInvite?: TeamUserInviteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WebVisitorUpsertWithWhereUniqueWithoutWebsiteInput = {
    where: WebVisitorWhereUniqueInput
    update: XOR<WebVisitorUpdateWithoutWebsiteInput, WebVisitorUncheckedUpdateWithoutWebsiteInput>
    create: XOR<WebVisitorCreateWithoutWebsiteInput, WebVisitorUncheckedCreateWithoutWebsiteInput>
  }

  export type WebVisitorUpdateWithWhereUniqueWithoutWebsiteInput = {
    where: WebVisitorWhereUniqueInput
    data: XOR<WebVisitorUpdateWithoutWebsiteInput, WebVisitorUncheckedUpdateWithoutWebsiteInput>
  }

  export type WebVisitorUpdateManyWithWhereWithoutWebsiteInput = {
    where: WebVisitorScalarWhereInput
    data: XOR<WebVisitorUpdateManyMutationInput, WebVisitorUncheckedUpdateManyWithoutWebVisitorInput>
  }

  export type WebVisitorScalarWhereInput = {
    AND?: Enumerable<WebVisitorScalarWhereInput>
    OR?: Enumerable<WebVisitorScalarWhereInput>
    NOT?: Enumerable<WebVisitorScalarWhereInput>
    id?: StringFilter | string
    data?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    websiteId?: StringFilter | string
  }

  export type WebSessionUpsertWithWhereUniqueWithoutWebsiteInput = {
    where: WebSessionWhereUniqueInput
    update: XOR<WebSessionUpdateWithoutWebsiteInput, WebSessionUncheckedUpdateWithoutWebsiteInput>
    create: XOR<WebSessionCreateWithoutWebsiteInput, WebSessionUncheckedCreateWithoutWebsiteInput>
  }

  export type WebSessionUpdateWithWhereUniqueWithoutWebsiteInput = {
    where: WebSessionWhereUniqueInput
    data: XOR<WebSessionUpdateWithoutWebsiteInput, WebSessionUncheckedUpdateWithoutWebsiteInput>
  }

  export type WebSessionUpdateManyWithWhereWithoutWebsiteInput = {
    where: WebSessionScalarWhereInput
    data: XOR<WebSessionUpdateManyMutationInput, WebSessionUncheckedUpdateManyWithoutWebSessionInput>
  }

  export type WebSessionScalarWhereInput = {
    AND?: Enumerable<WebSessionScalarWhereInput>
    OR?: Enumerable<WebSessionScalarWhereInput>
    NOT?: Enumerable<WebSessionScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    referrer?: StringFilter | string
    queryParams?: StringFilter | string
    duration?: IntFilter | number
    country?: StringNullableFilter | string | null
    city?: StringNullableFilter | string | null
    device?: StringNullableFilter | string | null
    os?: StringNullableFilter | string | null
    browser?: StringNullableFilter | string | null
    language?: StringNullableFilter | string | null
    visitorId?: StringFilter | string
    websiteId?: StringFilter | string
  }

  export type WebPageviewUpsertWithWhereUniqueWithoutWebsiteInput = {
    where: WebPageviewWhereUniqueInput
    update: XOR<WebPageviewUpdateWithoutWebsiteInput, WebPageviewUncheckedUpdateWithoutWebsiteInput>
    create: XOR<WebPageviewCreateWithoutWebsiteInput, WebPageviewUncheckedCreateWithoutWebsiteInput>
  }

  export type WebPageviewUpdateWithWhereUniqueWithoutWebsiteInput = {
    where: WebPageviewWhereUniqueInput
    data: XOR<WebPageviewUpdateWithoutWebsiteInput, WebPageviewUncheckedUpdateWithoutWebsiteInput>
  }

  export type WebPageviewUpdateManyWithWhereWithoutWebsiteInput = {
    where: WebPageviewScalarWhereInput
    data: XOR<WebPageviewUpdateManyMutationInput, WebPageviewUncheckedUpdateManyWithoutWebPageviewInput>
  }

  export type WebPageviewScalarWhereInput = {
    AND?: Enumerable<WebPageviewScalarWhereInput>
    OR?: Enumerable<WebPageviewScalarWhereInput>
    NOT?: Enumerable<WebPageviewScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    page?: StringFilter | string
    referrer?: StringFilter | string
    queryParams?: StringFilter | string
    duration?: IntFilter | number
    sessionId?: StringFilter | string
    visitorId?: StringFilter | string
    websiteId?: StringFilter | string
  }

  export type WebEventUpsertWithWhereUniqueWithoutWebsiteInput = {
    where: WebEventWhereUniqueInput
    update: XOR<WebEventUpdateWithoutWebsiteInput, WebEventUncheckedUpdateWithoutWebsiteInput>
    create: XOR<WebEventCreateWithoutWebsiteInput, WebEventUncheckedCreateWithoutWebsiteInput>
  }

  export type WebEventUpdateWithWhereUniqueWithoutWebsiteInput = {
    where: WebEventWhereUniqueInput
    data: XOR<WebEventUpdateWithoutWebsiteInput, WebEventUncheckedUpdateWithoutWebsiteInput>
  }

  export type WebEventUpdateManyWithWhereWithoutWebsiteInput = {
    where: WebEventScalarWhereInput
    data: XOR<WebEventUpdateManyMutationInput, WebEventUncheckedUpdateManyWithoutWebEventInput>
  }

  export type WebEventScalarWhereInput = {
    AND?: Enumerable<WebEventScalarWhereInput>
    OR?: Enumerable<WebEventScalarWhereInput>
    NOT?: Enumerable<WebEventScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    eventType?: StringFilter | string
    eventName?: StringFilter | string
    payload?: StringFilter | string
    pageId?: StringFilter | string
    sessionId?: StringFilter | string
    visitorId?: StringFilter | string
    websiteId?: StringFilter | string
  }

  export type ApiKeyUpsertWithWhereUniqueWithoutWebsiteInput = {
    where: ApiKeyWhereUniqueInput
    update: XOR<ApiKeyUpdateWithoutWebsiteInput, ApiKeyUncheckedUpdateWithoutWebsiteInput>
    create: XOR<ApiKeyCreateWithoutWebsiteInput, ApiKeyUncheckedCreateWithoutWebsiteInput>
  }

  export type ApiKeyUpdateWithWhereUniqueWithoutWebsiteInput = {
    where: ApiKeyWhereUniqueInput
    data: XOR<ApiKeyUpdateWithoutWebsiteInput, ApiKeyUncheckedUpdateWithoutWebsiteInput>
  }

  export type ApiKeyUpdateManyWithWhereWithoutWebsiteInput = {
    where: ApiKeyScalarWhereInput
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyWithoutApiKeyInput>
  }

  export type TeamWebsiteUpsertWithWhereUniqueWithoutWebsiteInput = {
    where: TeamWebsiteWhereUniqueInput
    update: XOR<TeamWebsiteUpdateWithoutWebsiteInput, TeamWebsiteUncheckedUpdateWithoutWebsiteInput>
    create: XOR<TeamWebsiteCreateWithoutWebsiteInput, TeamWebsiteUncheckedCreateWithoutWebsiteInput>
  }

  export type TeamWebsiteUpdateWithWhereUniqueWithoutWebsiteInput = {
    where: TeamWebsiteWhereUniqueInput
    data: XOR<TeamWebsiteUpdateWithoutWebsiteInput, TeamWebsiteUncheckedUpdateWithoutWebsiteInput>
  }

  export type TeamWebsiteUpdateManyWithWhereWithoutWebsiteInput = {
    where: TeamWebsiteScalarWhereInput
    data: XOR<TeamWebsiteUpdateManyMutationInput, TeamWebsiteUncheckedUpdateManyWithoutTeamWebsiteInput>
  }

  export type TeamWebsiteScalarWhereInput = {
    AND?: Enumerable<TeamWebsiteScalarWhereInput>
    OR?: Enumerable<TeamWebsiteScalarWhereInput>
    NOT?: Enumerable<TeamWebsiteScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    teamId?: StringFilter | string
    websiteId?: StringFilter | string
  }

  export type WebSessionCreateWithoutWebVisitorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    referrer?: string
    queryParams?: string
    duration?: number
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    language?: string | null
    WebPage?: WebPageviewCreateNestedManyWithoutWebSessionInput
    WebEvent?: WebEventCreateNestedManyWithoutWebSessionInput
    Website: WebsiteCreateNestedOneWithoutWebSessionInput
  }

  export type WebSessionUncheckedCreateWithoutWebVisitorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    referrer?: string
    queryParams?: string
    duration?: number
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    language?: string | null
    websiteId: string
    WebPage?: WebPageviewUncheckedCreateNestedManyWithoutWebSessionInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutWebSessionInput
  }

  export type WebSessionCreateOrConnectWithoutWebVisitorInput = {
    where: WebSessionWhereUniqueInput
    create: XOR<WebSessionCreateWithoutWebVisitorInput, WebSessionUncheckedCreateWithoutWebVisitorInput>
  }

  export type WebSessionCreateManyWebVisitorInputEnvelope = {
    data: Enumerable<WebSessionCreateManyWebVisitorInput>
    skipDuplicates?: boolean
  }

  export type WebPageviewCreateWithoutWebVisitorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    Event?: WebEventCreateNestedManyWithoutPageInput
    WebSession: WebSessionCreateNestedOneWithoutWebPageInput
    Website: WebsiteCreateNestedOneWithoutWebPageviewInput
  }

  export type WebPageviewUncheckedCreateWithoutWebVisitorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    sessionId: string
    websiteId: string
    Event?: WebEventUncheckedCreateNestedManyWithoutPageInput
  }

  export type WebPageviewCreateOrConnectWithoutWebVisitorInput = {
    where: WebPageviewWhereUniqueInput
    create: XOR<WebPageviewCreateWithoutWebVisitorInput, WebPageviewUncheckedCreateWithoutWebVisitorInput>
  }

  export type WebPageviewCreateManyWebVisitorInputEnvelope = {
    data: Enumerable<WebPageviewCreateManyWebVisitorInput>
    skipDuplicates?: boolean
  }

  export type WebEventCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    Page: WebPageviewCreateNestedOneWithoutEventInput
    WebSession: WebSessionCreateNestedOneWithoutWebEventInput
    Website: WebsiteCreateNestedOneWithoutWebEventInput
  }

  export type WebEventUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    pageId: string
    sessionId: string
    websiteId: string
  }

  export type WebEventCreateOrConnectWithoutUserInput = {
    where: WebEventWhereUniqueInput
    create: XOR<WebEventCreateWithoutUserInput, WebEventUncheckedCreateWithoutUserInput>
  }

  export type WebEventCreateManyUserInputEnvelope = {
    data: Enumerable<WebEventCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type WebsiteCreateWithoutWebVisitorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    active?: boolean
    User: UserCreateNestedOneWithoutWebsiteInput
    WebSession?: WebSessionCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteUncheckedCreateWithoutWebVisitorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    userId: string
    active?: boolean
    WebSession?: WebSessionUncheckedCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewUncheckedCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyUncheckedCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteUncheckedCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteCreateOrConnectWithoutWebVisitorInput = {
    where: WebsiteWhereUniqueInput
    create: XOR<WebsiteCreateWithoutWebVisitorInput, WebsiteUncheckedCreateWithoutWebVisitorInput>
  }

  export type WebSessionUpsertWithWhereUniqueWithoutWebVisitorInput = {
    where: WebSessionWhereUniqueInput
    update: XOR<WebSessionUpdateWithoutWebVisitorInput, WebSessionUncheckedUpdateWithoutWebVisitorInput>
    create: XOR<WebSessionCreateWithoutWebVisitorInput, WebSessionUncheckedCreateWithoutWebVisitorInput>
  }

  export type WebSessionUpdateWithWhereUniqueWithoutWebVisitorInput = {
    where: WebSessionWhereUniqueInput
    data: XOR<WebSessionUpdateWithoutWebVisitorInput, WebSessionUncheckedUpdateWithoutWebVisitorInput>
  }

  export type WebSessionUpdateManyWithWhereWithoutWebVisitorInput = {
    where: WebSessionScalarWhereInput
    data: XOR<WebSessionUpdateManyMutationInput, WebSessionUncheckedUpdateManyWithoutSessionInput>
  }

  export type WebPageviewUpsertWithWhereUniqueWithoutWebVisitorInput = {
    where: WebPageviewWhereUniqueInput
    update: XOR<WebPageviewUpdateWithoutWebVisitorInput, WebPageviewUncheckedUpdateWithoutWebVisitorInput>
    create: XOR<WebPageviewCreateWithoutWebVisitorInput, WebPageviewUncheckedCreateWithoutWebVisitorInput>
  }

  export type WebPageviewUpdateWithWhereUniqueWithoutWebVisitorInput = {
    where: WebPageviewWhereUniqueInput
    data: XOR<WebPageviewUpdateWithoutWebVisitorInput, WebPageviewUncheckedUpdateWithoutWebVisitorInput>
  }

  export type WebPageviewUpdateManyWithWhereWithoutWebVisitorInput = {
    where: WebPageviewScalarWhereInput
    data: XOR<WebPageviewUpdateManyMutationInput, WebPageviewUncheckedUpdateManyWithoutPageviewInput>
  }

  export type WebEventUpsertWithWhereUniqueWithoutUserInput = {
    where: WebEventWhereUniqueInput
    update: XOR<WebEventUpdateWithoutUserInput, WebEventUncheckedUpdateWithoutUserInput>
    create: XOR<WebEventCreateWithoutUserInput, WebEventUncheckedCreateWithoutUserInput>
  }

  export type WebEventUpdateWithWhereUniqueWithoutUserInput = {
    where: WebEventWhereUniqueInput
    data: XOR<WebEventUpdateWithoutUserInput, WebEventUncheckedUpdateWithoutUserInput>
  }

  export type WebEventUpdateManyWithWhereWithoutUserInput = {
    where: WebEventScalarWhereInput
    data: XOR<WebEventUpdateManyMutationInput, WebEventUncheckedUpdateManyWithoutWebEventInput>
  }

  export type WebsiteUpsertWithoutWebVisitorInput = {
    update: XOR<WebsiteUpdateWithoutWebVisitorInput, WebsiteUncheckedUpdateWithoutWebVisitorInput>
    create: XOR<WebsiteCreateWithoutWebVisitorInput, WebsiteUncheckedCreateWithoutWebVisitorInput>
  }

  export type WebsiteUpdateWithoutWebVisitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    User?: UserUpdateOneRequiredWithoutWebsiteNestedInput
    WebSession?: WebSessionUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUpdateManyWithoutWebsiteNestedInput
  }

  export type WebsiteUncheckedUpdateWithoutWebVisitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    WebSession?: WebSessionUncheckedUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUncheckedUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUncheckedUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUncheckedUpdateManyWithoutWebsiteNestedInput
  }

  export type WebPageviewCreateWithoutWebSessionInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    Event?: WebEventCreateNestedManyWithoutPageInput
    WebVisitor: WebVisitorCreateNestedOneWithoutPageviewInput
    Website: WebsiteCreateNestedOneWithoutWebPageviewInput
  }

  export type WebPageviewUncheckedCreateWithoutWebSessionInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    visitorId: string
    websiteId: string
    Event?: WebEventUncheckedCreateNestedManyWithoutPageInput
  }

  export type WebPageviewCreateOrConnectWithoutWebSessionInput = {
    where: WebPageviewWhereUniqueInput
    create: XOR<WebPageviewCreateWithoutWebSessionInput, WebPageviewUncheckedCreateWithoutWebSessionInput>
  }

  export type WebPageviewCreateManyWebSessionInputEnvelope = {
    data: Enumerable<WebPageviewCreateManyWebSessionInput>
    skipDuplicates?: boolean
  }

  export type WebEventCreateWithoutWebSessionInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    Page: WebPageviewCreateNestedOneWithoutEventInput
    User: WebVisitorCreateNestedOneWithoutWebEventInput
    Website: WebsiteCreateNestedOneWithoutWebEventInput
  }

  export type WebEventUncheckedCreateWithoutWebSessionInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    pageId: string
    visitorId: string
    websiteId: string
  }

  export type WebEventCreateOrConnectWithoutWebSessionInput = {
    where: WebEventWhereUniqueInput
    create: XOR<WebEventCreateWithoutWebSessionInput, WebEventUncheckedCreateWithoutWebSessionInput>
  }

  export type WebEventCreateManyWebSessionInputEnvelope = {
    data: Enumerable<WebEventCreateManyWebSessionInput>
    skipDuplicates?: boolean
  }

  export type WebVisitorCreateWithoutSessionInput = {
    id?: string
    data?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Pageview?: WebPageviewCreateNestedManyWithoutWebVisitorInput
    WebEvent?: WebEventCreateNestedManyWithoutUserInput
    Website: WebsiteCreateNestedOneWithoutWebVisitorInput
  }

  export type WebVisitorUncheckedCreateWithoutSessionInput = {
    id?: string
    data?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    websiteId: string
    Pageview?: WebPageviewUncheckedCreateNestedManyWithoutWebVisitorInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type WebVisitorCreateOrConnectWithoutSessionInput = {
    where: WebVisitorWhereUniqueInput
    create: XOR<WebVisitorCreateWithoutSessionInput, WebVisitorUncheckedCreateWithoutSessionInput>
  }

  export type WebsiteCreateWithoutWebSessionInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    active?: boolean
    User: UserCreateNestedOneWithoutWebsiteInput
    WebVisitor?: WebVisitorCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteUncheckedCreateWithoutWebSessionInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    userId: string
    active?: boolean
    WebVisitor?: WebVisitorUncheckedCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewUncheckedCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyUncheckedCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteUncheckedCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteCreateOrConnectWithoutWebSessionInput = {
    where: WebsiteWhereUniqueInput
    create: XOR<WebsiteCreateWithoutWebSessionInput, WebsiteUncheckedCreateWithoutWebSessionInput>
  }

  export type WebPageviewUpsertWithWhereUniqueWithoutWebSessionInput = {
    where: WebPageviewWhereUniqueInput
    update: XOR<WebPageviewUpdateWithoutWebSessionInput, WebPageviewUncheckedUpdateWithoutWebSessionInput>
    create: XOR<WebPageviewCreateWithoutWebSessionInput, WebPageviewUncheckedCreateWithoutWebSessionInput>
  }

  export type WebPageviewUpdateWithWhereUniqueWithoutWebSessionInput = {
    where: WebPageviewWhereUniqueInput
    data: XOR<WebPageviewUpdateWithoutWebSessionInput, WebPageviewUncheckedUpdateWithoutWebSessionInput>
  }

  export type WebPageviewUpdateManyWithWhereWithoutWebSessionInput = {
    where: WebPageviewScalarWhereInput
    data: XOR<WebPageviewUpdateManyMutationInput, WebPageviewUncheckedUpdateManyWithoutWebPageInput>
  }

  export type WebEventUpsertWithWhereUniqueWithoutWebSessionInput = {
    where: WebEventWhereUniqueInput
    update: XOR<WebEventUpdateWithoutWebSessionInput, WebEventUncheckedUpdateWithoutWebSessionInput>
    create: XOR<WebEventCreateWithoutWebSessionInput, WebEventUncheckedCreateWithoutWebSessionInput>
  }

  export type WebEventUpdateWithWhereUniqueWithoutWebSessionInput = {
    where: WebEventWhereUniqueInput
    data: XOR<WebEventUpdateWithoutWebSessionInput, WebEventUncheckedUpdateWithoutWebSessionInput>
  }

  export type WebEventUpdateManyWithWhereWithoutWebSessionInput = {
    where: WebEventScalarWhereInput
    data: XOR<WebEventUpdateManyMutationInput, WebEventUncheckedUpdateManyWithoutWebEventInput>
  }

  export type WebVisitorUpsertWithoutSessionInput = {
    update: XOR<WebVisitorUpdateWithoutSessionInput, WebVisitorUncheckedUpdateWithoutSessionInput>
    create: XOR<WebVisitorCreateWithoutSessionInput, WebVisitorUncheckedCreateWithoutSessionInput>
  }

  export type WebVisitorUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Pageview?: WebPageviewUpdateManyWithoutWebVisitorNestedInput
    WebEvent?: WebEventUpdateManyWithoutUserNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebVisitorNestedInput
  }

  export type WebVisitorUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    websiteId?: StringFieldUpdateOperationsInput | string
    Pageview?: WebPageviewUncheckedUpdateManyWithoutWebVisitorNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WebsiteUpsertWithoutWebSessionInput = {
    update: XOR<WebsiteUpdateWithoutWebSessionInput, WebsiteUncheckedUpdateWithoutWebSessionInput>
    create: XOR<WebsiteCreateWithoutWebSessionInput, WebsiteUncheckedCreateWithoutWebSessionInput>
  }

  export type WebsiteUpdateWithoutWebSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    User?: UserUpdateOneRequiredWithoutWebsiteNestedInput
    WebVisitor?: WebVisitorUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUpdateManyWithoutWebsiteNestedInput
  }

  export type WebsiteUncheckedUpdateWithoutWebSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    WebVisitor?: WebVisitorUncheckedUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUncheckedUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUncheckedUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUncheckedUpdateManyWithoutWebsiteNestedInput
  }

  export type WebEventCreateWithoutPageInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    User: WebVisitorCreateNestedOneWithoutWebEventInput
    WebSession: WebSessionCreateNestedOneWithoutWebEventInput
    Website: WebsiteCreateNestedOneWithoutWebEventInput
  }

  export type WebEventUncheckedCreateWithoutPageInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    sessionId: string
    visitorId: string
    websiteId: string
  }

  export type WebEventCreateOrConnectWithoutPageInput = {
    where: WebEventWhereUniqueInput
    create: XOR<WebEventCreateWithoutPageInput, WebEventUncheckedCreateWithoutPageInput>
  }

  export type WebEventCreateManyPageInputEnvelope = {
    data: Enumerable<WebEventCreateManyPageInput>
    skipDuplicates?: boolean
  }

  export type WebSessionCreateWithoutWebPageInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    referrer?: string
    queryParams?: string
    duration?: number
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    language?: string | null
    WebEvent?: WebEventCreateNestedManyWithoutWebSessionInput
    WebVisitor: WebVisitorCreateNestedOneWithoutSessionInput
    Website: WebsiteCreateNestedOneWithoutWebSessionInput
  }

  export type WebSessionUncheckedCreateWithoutWebPageInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    referrer?: string
    queryParams?: string
    duration?: number
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    language?: string | null
    visitorId: string
    websiteId: string
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutWebSessionInput
  }

  export type WebSessionCreateOrConnectWithoutWebPageInput = {
    where: WebSessionWhereUniqueInput
    create: XOR<WebSessionCreateWithoutWebPageInput, WebSessionUncheckedCreateWithoutWebPageInput>
  }

  export type WebVisitorCreateWithoutPageviewInput = {
    id?: string
    data?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Session?: WebSessionCreateNestedManyWithoutWebVisitorInput
    WebEvent?: WebEventCreateNestedManyWithoutUserInput
    Website: WebsiteCreateNestedOneWithoutWebVisitorInput
  }

  export type WebVisitorUncheckedCreateWithoutPageviewInput = {
    id?: string
    data?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    websiteId: string
    Session?: WebSessionUncheckedCreateNestedManyWithoutWebVisitorInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type WebVisitorCreateOrConnectWithoutPageviewInput = {
    where: WebVisitorWhereUniqueInput
    create: XOR<WebVisitorCreateWithoutPageviewInput, WebVisitorUncheckedCreateWithoutPageviewInput>
  }

  export type WebsiteCreateWithoutWebPageviewInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    active?: boolean
    User: UserCreateNestedOneWithoutWebsiteInput
    WebVisitor?: WebVisitorCreateNestedManyWithoutWebsiteInput
    WebSession?: WebSessionCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteUncheckedCreateWithoutWebPageviewInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    userId: string
    active?: boolean
    WebVisitor?: WebVisitorUncheckedCreateNestedManyWithoutWebsiteInput
    WebSession?: WebSessionUncheckedCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyUncheckedCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteUncheckedCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteCreateOrConnectWithoutWebPageviewInput = {
    where: WebsiteWhereUniqueInput
    create: XOR<WebsiteCreateWithoutWebPageviewInput, WebsiteUncheckedCreateWithoutWebPageviewInput>
  }

  export type WebEventUpsertWithWhereUniqueWithoutPageInput = {
    where: WebEventWhereUniqueInput
    update: XOR<WebEventUpdateWithoutPageInput, WebEventUncheckedUpdateWithoutPageInput>
    create: XOR<WebEventCreateWithoutPageInput, WebEventUncheckedCreateWithoutPageInput>
  }

  export type WebEventUpdateWithWhereUniqueWithoutPageInput = {
    where: WebEventWhereUniqueInput
    data: XOR<WebEventUpdateWithoutPageInput, WebEventUncheckedUpdateWithoutPageInput>
  }

  export type WebEventUpdateManyWithWhereWithoutPageInput = {
    where: WebEventScalarWhereInput
    data: XOR<WebEventUpdateManyMutationInput, WebEventUncheckedUpdateManyWithoutEventInput>
  }

  export type WebSessionUpsertWithoutWebPageInput = {
    update: XOR<WebSessionUpdateWithoutWebPageInput, WebSessionUncheckedUpdateWithoutWebPageInput>
    create: XOR<WebSessionCreateWithoutWebPageInput, WebSessionUncheckedCreateWithoutWebPageInput>
  }

  export type WebSessionUpdateWithoutWebPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    WebEvent?: WebEventUpdateManyWithoutWebSessionNestedInput
    WebVisitor?: WebVisitorUpdateOneRequiredWithoutSessionNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebSessionNestedInput
  }

  export type WebSessionUncheckedUpdateWithoutWebPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
    WebEvent?: WebEventUncheckedUpdateManyWithoutWebSessionNestedInput
  }

  export type WebVisitorUpsertWithoutPageviewInput = {
    update: XOR<WebVisitorUpdateWithoutPageviewInput, WebVisitorUncheckedUpdateWithoutPageviewInput>
    create: XOR<WebVisitorCreateWithoutPageviewInput, WebVisitorUncheckedCreateWithoutPageviewInput>
  }

  export type WebVisitorUpdateWithoutPageviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: WebSessionUpdateManyWithoutWebVisitorNestedInput
    WebEvent?: WebEventUpdateManyWithoutUserNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebVisitorNestedInput
  }

  export type WebVisitorUncheckedUpdateWithoutPageviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    websiteId?: StringFieldUpdateOperationsInput | string
    Session?: WebSessionUncheckedUpdateManyWithoutWebVisitorNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WebsiteUpsertWithoutWebPageviewInput = {
    update: XOR<WebsiteUpdateWithoutWebPageviewInput, WebsiteUncheckedUpdateWithoutWebPageviewInput>
    create: XOR<WebsiteCreateWithoutWebPageviewInput, WebsiteUncheckedCreateWithoutWebPageviewInput>
  }

  export type WebsiteUpdateWithoutWebPageviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    User?: UserUpdateOneRequiredWithoutWebsiteNestedInput
    WebVisitor?: WebVisitorUpdateManyWithoutWebsiteNestedInput
    WebSession?: WebSessionUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUpdateManyWithoutWebsiteNestedInput
  }

  export type WebsiteUncheckedUpdateWithoutWebPageviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    WebVisitor?: WebVisitorUncheckedUpdateManyWithoutWebsiteNestedInput
    WebSession?: WebSessionUncheckedUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUncheckedUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUncheckedUpdateManyWithoutWebsiteNestedInput
  }

  export type WebPageviewCreateWithoutEventInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    WebSession: WebSessionCreateNestedOneWithoutWebPageInput
    WebVisitor: WebVisitorCreateNestedOneWithoutPageviewInput
    Website: WebsiteCreateNestedOneWithoutWebPageviewInput
  }

  export type WebPageviewUncheckedCreateWithoutEventInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    sessionId: string
    visitorId: string
    websiteId: string
  }

  export type WebPageviewCreateOrConnectWithoutEventInput = {
    where: WebPageviewWhereUniqueInput
    create: XOR<WebPageviewCreateWithoutEventInput, WebPageviewUncheckedCreateWithoutEventInput>
  }

  export type WebVisitorCreateWithoutWebEventInput = {
    id?: string
    data?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Session?: WebSessionCreateNestedManyWithoutWebVisitorInput
    Pageview?: WebPageviewCreateNestedManyWithoutWebVisitorInput
    Website: WebsiteCreateNestedOneWithoutWebVisitorInput
  }

  export type WebVisitorUncheckedCreateWithoutWebEventInput = {
    id?: string
    data?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    websiteId: string
    Session?: WebSessionUncheckedCreateNestedManyWithoutWebVisitorInput
    Pageview?: WebPageviewUncheckedCreateNestedManyWithoutWebVisitorInput
  }

  export type WebVisitorCreateOrConnectWithoutWebEventInput = {
    where: WebVisitorWhereUniqueInput
    create: XOR<WebVisitorCreateWithoutWebEventInput, WebVisitorUncheckedCreateWithoutWebEventInput>
  }

  export type WebSessionCreateWithoutWebEventInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    referrer?: string
    queryParams?: string
    duration?: number
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    language?: string | null
    WebPage?: WebPageviewCreateNestedManyWithoutWebSessionInput
    WebVisitor: WebVisitorCreateNestedOneWithoutSessionInput
    Website: WebsiteCreateNestedOneWithoutWebSessionInput
  }

  export type WebSessionUncheckedCreateWithoutWebEventInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    referrer?: string
    queryParams?: string
    duration?: number
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    language?: string | null
    visitorId: string
    websiteId: string
    WebPage?: WebPageviewUncheckedCreateNestedManyWithoutWebSessionInput
  }

  export type WebSessionCreateOrConnectWithoutWebEventInput = {
    where: WebSessionWhereUniqueInput
    create: XOR<WebSessionCreateWithoutWebEventInput, WebSessionUncheckedCreateWithoutWebEventInput>
  }

  export type WebsiteCreateWithoutWebEventInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    active?: boolean
    User: UserCreateNestedOneWithoutWebsiteInput
    WebVisitor?: WebVisitorCreateNestedManyWithoutWebsiteInput
    WebSession?: WebSessionCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteUncheckedCreateWithoutWebEventInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    userId: string
    active?: boolean
    WebVisitor?: WebVisitorUncheckedCreateNestedManyWithoutWebsiteInput
    WebSession?: WebSessionUncheckedCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewUncheckedCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyUncheckedCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteUncheckedCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteCreateOrConnectWithoutWebEventInput = {
    where: WebsiteWhereUniqueInput
    create: XOR<WebsiteCreateWithoutWebEventInput, WebsiteUncheckedCreateWithoutWebEventInput>
  }

  export type WebPageviewUpsertWithoutEventInput = {
    update: XOR<WebPageviewUpdateWithoutEventInput, WebPageviewUncheckedUpdateWithoutEventInput>
    create: XOR<WebPageviewCreateWithoutEventInput, WebPageviewUncheckedCreateWithoutEventInput>
  }

  export type WebPageviewUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    WebSession?: WebSessionUpdateOneRequiredWithoutWebPageNestedInput
    WebVisitor?: WebVisitorUpdateOneRequiredWithoutPageviewNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebPageviewNestedInput
  }

  export type WebPageviewUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    sessionId?: StringFieldUpdateOperationsInput | string
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type WebVisitorUpsertWithoutWebEventInput = {
    update: XOR<WebVisitorUpdateWithoutWebEventInput, WebVisitorUncheckedUpdateWithoutWebEventInput>
    create: XOR<WebVisitorCreateWithoutWebEventInput, WebVisitorUncheckedCreateWithoutWebEventInput>
  }

  export type WebVisitorUpdateWithoutWebEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: WebSessionUpdateManyWithoutWebVisitorNestedInput
    Pageview?: WebPageviewUpdateManyWithoutWebVisitorNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebVisitorNestedInput
  }

  export type WebVisitorUncheckedUpdateWithoutWebEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    websiteId?: StringFieldUpdateOperationsInput | string
    Session?: WebSessionUncheckedUpdateManyWithoutWebVisitorNestedInput
    Pageview?: WebPageviewUncheckedUpdateManyWithoutWebVisitorNestedInput
  }

  export type WebSessionUpsertWithoutWebEventInput = {
    update: XOR<WebSessionUpdateWithoutWebEventInput, WebSessionUncheckedUpdateWithoutWebEventInput>
    create: XOR<WebSessionCreateWithoutWebEventInput, WebSessionUncheckedCreateWithoutWebEventInput>
  }

  export type WebSessionUpdateWithoutWebEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    WebPage?: WebPageviewUpdateManyWithoutWebSessionNestedInput
    WebVisitor?: WebVisitorUpdateOneRequiredWithoutSessionNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebSessionNestedInput
  }

  export type WebSessionUncheckedUpdateWithoutWebEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
    WebPage?: WebPageviewUncheckedUpdateManyWithoutWebSessionNestedInput
  }

  export type WebsiteUpsertWithoutWebEventInput = {
    update: XOR<WebsiteUpdateWithoutWebEventInput, WebsiteUncheckedUpdateWithoutWebEventInput>
    create: XOR<WebsiteCreateWithoutWebEventInput, WebsiteUncheckedCreateWithoutWebEventInput>
  }

  export type WebsiteUpdateWithoutWebEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    User?: UserUpdateOneRequiredWithoutWebsiteNestedInput
    WebVisitor?: WebVisitorUpdateManyWithoutWebsiteNestedInput
    WebSession?: WebSessionUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUpdateManyWithoutWebsiteNestedInput
  }

  export type WebsiteUncheckedUpdateWithoutWebEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    WebVisitor?: WebVisitorUncheckedUpdateManyWithoutWebsiteNestedInput
    WebSession?: WebSessionUncheckedUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUncheckedUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUncheckedUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUncheckedUpdateManyWithoutWebsiteNestedInput
  }

  export type UserCreateWithoutApiKeyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    Website?: WebsiteCreateNestedManyWithoutUserInput
    TeamUser?: TeamUserCreateNestedManyWithoutUserInput
    TeamUserInvite?: TeamUserInviteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApiKeyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Website?: WebsiteUncheckedCreateNestedManyWithoutUserInput
    TeamUser?: TeamUserUncheckedCreateNestedManyWithoutUserInput
    TeamUserInvite?: TeamUserInviteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApiKeyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApiKeyInput, UserUncheckedCreateWithoutApiKeyInput>
  }

  export type WebsiteCreateWithoutApiKeyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    active?: boolean
    User: UserCreateNestedOneWithoutWebsiteInput
    WebVisitor?: WebVisitorCreateNestedManyWithoutWebsiteInput
    WebSession?: WebSessionCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteUncheckedCreateWithoutApiKeyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    userId: string
    active?: boolean
    WebVisitor?: WebVisitorUncheckedCreateNestedManyWithoutWebsiteInput
    WebSession?: WebSessionUncheckedCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewUncheckedCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutWebsiteInput
    TeamWebsite?: TeamWebsiteUncheckedCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteCreateOrConnectWithoutApiKeyInput = {
    where: WebsiteWhereUniqueInput
    create: XOR<WebsiteCreateWithoutApiKeyInput, WebsiteUncheckedCreateWithoutApiKeyInput>
  }

  export type UserUpsertWithoutApiKeyInput = {
    update: XOR<UserUpdateWithoutApiKeyInput, UserUncheckedUpdateWithoutApiKeyInput>
    create: XOR<UserCreateWithoutApiKeyInput, UserUncheckedCreateWithoutApiKeyInput>
  }

  export type UserUpdateWithoutApiKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Website?: WebsiteUpdateManyWithoutUserNestedInput
    TeamUser?: TeamUserUpdateManyWithoutUserNestedInput
    TeamUserInvite?: TeamUserInviteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApiKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Website?: WebsiteUncheckedUpdateManyWithoutUserNestedInput
    TeamUser?: TeamUserUncheckedUpdateManyWithoutUserNestedInput
    TeamUserInvite?: TeamUserInviteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WebsiteUpsertWithoutApiKeyInput = {
    update: XOR<WebsiteUpdateWithoutApiKeyInput, WebsiteUncheckedUpdateWithoutApiKeyInput>
    create: XOR<WebsiteCreateWithoutApiKeyInput, WebsiteUncheckedCreateWithoutApiKeyInput>
  }

  export type WebsiteUpdateWithoutApiKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    User?: UserUpdateOneRequiredWithoutWebsiteNestedInput
    WebVisitor?: WebVisitorUpdateManyWithoutWebsiteNestedInput
    WebSession?: WebSessionUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUpdateManyWithoutWebsiteNestedInput
  }

  export type WebsiteUncheckedUpdateWithoutApiKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    WebVisitor?: WebVisitorUncheckedUpdateManyWithoutWebsiteNestedInput
    WebSession?: WebSessionUncheckedUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUncheckedUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUncheckedUpdateManyWithoutWebsiteNestedInput
  }

  export type TeamWebsiteCreateWithoutTeamInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Website: WebsiteCreateNestedOneWithoutTeamWebsiteInput
  }

  export type TeamWebsiteUncheckedCreateWithoutTeamInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    websiteId: string
  }

  export type TeamWebsiteCreateOrConnectWithoutTeamInput = {
    where: TeamWebsiteWhereUniqueInput
    create: XOR<TeamWebsiteCreateWithoutTeamInput, TeamWebsiteUncheckedCreateWithoutTeamInput>
  }

  export type TeamWebsiteCreateManyTeamInputEnvelope = {
    data: Enumerable<TeamWebsiteCreateManyTeamInput>
    skipDuplicates?: boolean
  }

  export type TeamUserCreateWithoutTeamInput = {
    id?: string
    role?: ROLE
    accepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    User: UserCreateNestedOneWithoutTeamUserInput
    TeamUserInvite?: TeamUserInviteCreateNestedManyWithoutTeamUserInput
  }

  export type TeamUserUncheckedCreateWithoutTeamInput = {
    id?: string
    userId: string
    role?: ROLE
    accepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    TeamUserInvite?: TeamUserInviteUncheckedCreateNestedManyWithoutTeamUserInput
  }

  export type TeamUserCreateOrConnectWithoutTeamInput = {
    where: TeamUserWhereUniqueInput
    create: XOR<TeamUserCreateWithoutTeamInput, TeamUserUncheckedCreateWithoutTeamInput>
  }

  export type TeamUserCreateManyTeamInputEnvelope = {
    data: Enumerable<TeamUserCreateManyTeamInput>
    skipDuplicates?: boolean
  }

  export type TeamUserInviteCreateWithoutTeamInput = {
    id?: string
    token: string
    status?: INVITE_STATUS
    createdAt?: Date | string
    updatedAt?: Date | string
    User: UserCreateNestedOneWithoutTeamUserInviteInput
    TeamUser: TeamUserCreateNestedOneWithoutTeamUserInviteInput
  }

  export type TeamUserInviteUncheckedCreateWithoutTeamInput = {
    id?: string
    userId: string
    teamUserId: string
    token: string
    status?: INVITE_STATUS
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUserInviteCreateOrConnectWithoutTeamInput = {
    where: TeamUserInviteWhereUniqueInput
    create: XOR<TeamUserInviteCreateWithoutTeamInput, TeamUserInviteUncheckedCreateWithoutTeamInput>
  }

  export type TeamUserInviteCreateManyTeamInputEnvelope = {
    data: Enumerable<TeamUserInviteCreateManyTeamInput>
    skipDuplicates?: boolean
  }

  export type TeamWebsiteUpsertWithWhereUniqueWithoutTeamInput = {
    where: TeamWebsiteWhereUniqueInput
    update: XOR<TeamWebsiteUpdateWithoutTeamInput, TeamWebsiteUncheckedUpdateWithoutTeamInput>
    create: XOR<TeamWebsiteCreateWithoutTeamInput, TeamWebsiteUncheckedCreateWithoutTeamInput>
  }

  export type TeamWebsiteUpdateWithWhereUniqueWithoutTeamInput = {
    where: TeamWebsiteWhereUniqueInput
    data: XOR<TeamWebsiteUpdateWithoutTeamInput, TeamWebsiteUncheckedUpdateWithoutTeamInput>
  }

  export type TeamWebsiteUpdateManyWithWhereWithoutTeamInput = {
    where: TeamWebsiteScalarWhereInput
    data: XOR<TeamWebsiteUpdateManyMutationInput, TeamWebsiteUncheckedUpdateManyWithoutTeamWebsiteInput>
  }

  export type TeamUserUpsertWithWhereUniqueWithoutTeamInput = {
    where: TeamUserWhereUniqueInput
    update: XOR<TeamUserUpdateWithoutTeamInput, TeamUserUncheckedUpdateWithoutTeamInput>
    create: XOR<TeamUserCreateWithoutTeamInput, TeamUserUncheckedCreateWithoutTeamInput>
  }

  export type TeamUserUpdateWithWhereUniqueWithoutTeamInput = {
    where: TeamUserWhereUniqueInput
    data: XOR<TeamUserUpdateWithoutTeamInput, TeamUserUncheckedUpdateWithoutTeamInput>
  }

  export type TeamUserUpdateManyWithWhereWithoutTeamInput = {
    where: TeamUserScalarWhereInput
    data: XOR<TeamUserUpdateManyMutationInput, TeamUserUncheckedUpdateManyWithoutTeamUserInput>
  }

  export type TeamUserInviteUpsertWithWhereUniqueWithoutTeamInput = {
    where: TeamUserInviteWhereUniqueInput
    update: XOR<TeamUserInviteUpdateWithoutTeamInput, TeamUserInviteUncheckedUpdateWithoutTeamInput>
    create: XOR<TeamUserInviteCreateWithoutTeamInput, TeamUserInviteUncheckedCreateWithoutTeamInput>
  }

  export type TeamUserInviteUpdateWithWhereUniqueWithoutTeamInput = {
    where: TeamUserInviteWhereUniqueInput
    data: XOR<TeamUserInviteUpdateWithoutTeamInput, TeamUserInviteUncheckedUpdateWithoutTeamInput>
  }

  export type TeamUserInviteUpdateManyWithWhereWithoutTeamInput = {
    where: TeamUserInviteScalarWhereInput
    data: XOR<TeamUserInviteUpdateManyMutationInput, TeamUserInviteUncheckedUpdateManyWithoutTeamUserInviteInput>
  }

  export type TeamCreateWithoutTeamWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    TeamUser?: TeamUserCreateNestedManyWithoutTeamInput
    TeamUserInvite?: TeamUserInviteCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutTeamWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    TeamUser?: TeamUserUncheckedCreateNestedManyWithoutTeamInput
    TeamUserInvite?: TeamUserInviteUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutTeamWebsiteInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutTeamWebsiteInput, TeamUncheckedCreateWithoutTeamWebsiteInput>
  }

  export type WebsiteCreateWithoutTeamWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    active?: boolean
    User: UserCreateNestedOneWithoutWebsiteInput
    WebVisitor?: WebVisitorCreateNestedManyWithoutWebsiteInput
    WebSession?: WebSessionCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteUncheckedCreateWithoutTeamWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    userId: string
    active?: boolean
    WebVisitor?: WebVisitorUncheckedCreateNestedManyWithoutWebsiteInput
    WebSession?: WebSessionUncheckedCreateNestedManyWithoutWebsiteInput
    WebPageview?: WebPageviewUncheckedCreateNestedManyWithoutWebsiteInput
    WebEvent?: WebEventUncheckedCreateNestedManyWithoutWebsiteInput
    ApiKey?: ApiKeyUncheckedCreateNestedManyWithoutWebsiteInput
  }

  export type WebsiteCreateOrConnectWithoutTeamWebsiteInput = {
    where: WebsiteWhereUniqueInput
    create: XOR<WebsiteCreateWithoutTeamWebsiteInput, WebsiteUncheckedCreateWithoutTeamWebsiteInput>
  }

  export type TeamUpsertWithoutTeamWebsiteInput = {
    update: XOR<TeamUpdateWithoutTeamWebsiteInput, TeamUncheckedUpdateWithoutTeamWebsiteInput>
    create: XOR<TeamCreateWithoutTeamWebsiteInput, TeamUncheckedCreateWithoutTeamWebsiteInput>
  }

  export type TeamUpdateWithoutTeamWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    TeamUser?: TeamUserUpdateManyWithoutTeamNestedInput
    TeamUserInvite?: TeamUserInviteUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutTeamWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    TeamUser?: TeamUserUncheckedUpdateManyWithoutTeamNestedInput
    TeamUserInvite?: TeamUserInviteUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type WebsiteUpsertWithoutTeamWebsiteInput = {
    update: XOR<WebsiteUpdateWithoutTeamWebsiteInput, WebsiteUncheckedUpdateWithoutTeamWebsiteInput>
    create: XOR<WebsiteCreateWithoutTeamWebsiteInput, WebsiteUncheckedCreateWithoutTeamWebsiteInput>
  }

  export type WebsiteUpdateWithoutTeamWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    User?: UserUpdateOneRequiredWithoutWebsiteNestedInput
    WebVisitor?: WebVisitorUpdateManyWithoutWebsiteNestedInput
    WebSession?: WebSessionUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUpdateManyWithoutWebsiteNestedInput
  }

  export type WebsiteUncheckedUpdateWithoutTeamWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    WebVisitor?: WebVisitorUncheckedUpdateManyWithoutWebsiteNestedInput
    WebSession?: WebSessionUncheckedUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUncheckedUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUncheckedUpdateManyWithoutWebsiteNestedInput
  }

  export type TeamCreateWithoutTeamUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    TeamWebsite?: TeamWebsiteCreateNestedManyWithoutTeamInput
    TeamUserInvite?: TeamUserInviteCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutTeamUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    TeamWebsite?: TeamWebsiteUncheckedCreateNestedManyWithoutTeamInput
    TeamUserInvite?: TeamUserInviteUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutTeamUserInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutTeamUserInput, TeamUncheckedCreateWithoutTeamUserInput>
  }

  export type UserCreateWithoutTeamUserInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    Website?: WebsiteCreateNestedManyWithoutUserInput
    ApiKey?: ApiKeyCreateNestedManyWithoutUserInput
    TeamUserInvite?: TeamUserInviteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTeamUserInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Website?: WebsiteUncheckedCreateNestedManyWithoutUserInput
    ApiKey?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
    TeamUserInvite?: TeamUserInviteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTeamUserInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTeamUserInput, UserUncheckedCreateWithoutTeamUserInput>
  }

  export type TeamUserInviteCreateWithoutTeamUserInput = {
    id?: string
    token: string
    status?: INVITE_STATUS
    createdAt?: Date | string
    updatedAt?: Date | string
    Team: TeamCreateNestedOneWithoutTeamUserInviteInput
    User: UserCreateNestedOneWithoutTeamUserInviteInput
  }

  export type TeamUserInviteUncheckedCreateWithoutTeamUserInput = {
    id?: string
    teamId: string
    userId: string
    token: string
    status?: INVITE_STATUS
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUserInviteCreateOrConnectWithoutTeamUserInput = {
    where: TeamUserInviteWhereUniqueInput
    create: XOR<TeamUserInviteCreateWithoutTeamUserInput, TeamUserInviteUncheckedCreateWithoutTeamUserInput>
  }

  export type TeamUserInviteCreateManyTeamUserInputEnvelope = {
    data: Enumerable<TeamUserInviteCreateManyTeamUserInput>
    skipDuplicates?: boolean
  }

  export type TeamUpsertWithoutTeamUserInput = {
    update: XOR<TeamUpdateWithoutTeamUserInput, TeamUncheckedUpdateWithoutTeamUserInput>
    create: XOR<TeamCreateWithoutTeamUserInput, TeamUncheckedCreateWithoutTeamUserInput>
  }

  export type TeamUpdateWithoutTeamUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    TeamWebsite?: TeamWebsiteUpdateManyWithoutTeamNestedInput
    TeamUserInvite?: TeamUserInviteUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutTeamUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    TeamWebsite?: TeamWebsiteUncheckedUpdateManyWithoutTeamNestedInput
    TeamUserInvite?: TeamUserInviteUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type UserUpsertWithoutTeamUserInput = {
    update: XOR<UserUpdateWithoutTeamUserInput, UserUncheckedUpdateWithoutTeamUserInput>
    create: XOR<UserCreateWithoutTeamUserInput, UserUncheckedCreateWithoutTeamUserInput>
  }

  export type UserUpdateWithoutTeamUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Website?: WebsiteUpdateManyWithoutUserNestedInput
    ApiKey?: ApiKeyUpdateManyWithoutUserNestedInput
    TeamUserInvite?: TeamUserInviteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTeamUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Website?: WebsiteUncheckedUpdateManyWithoutUserNestedInput
    ApiKey?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
    TeamUserInvite?: TeamUserInviteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TeamUserInviteUpsertWithWhereUniqueWithoutTeamUserInput = {
    where: TeamUserInviteWhereUniqueInput
    update: XOR<TeamUserInviteUpdateWithoutTeamUserInput, TeamUserInviteUncheckedUpdateWithoutTeamUserInput>
    create: XOR<TeamUserInviteCreateWithoutTeamUserInput, TeamUserInviteUncheckedCreateWithoutTeamUserInput>
  }

  export type TeamUserInviteUpdateWithWhereUniqueWithoutTeamUserInput = {
    where: TeamUserInviteWhereUniqueInput
    data: XOR<TeamUserInviteUpdateWithoutTeamUserInput, TeamUserInviteUncheckedUpdateWithoutTeamUserInput>
  }

  export type TeamUserInviteUpdateManyWithWhereWithoutTeamUserInput = {
    where: TeamUserInviteScalarWhereInput
    data: XOR<TeamUserInviteUpdateManyMutationInput, TeamUserInviteUncheckedUpdateManyWithoutTeamUserInviteInput>
  }

  export type TeamCreateWithoutTeamUserInviteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    TeamWebsite?: TeamWebsiteCreateNestedManyWithoutTeamInput
    TeamUser?: TeamUserCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutTeamUserInviteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    TeamWebsite?: TeamWebsiteUncheckedCreateNestedManyWithoutTeamInput
    TeamUser?: TeamUserUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutTeamUserInviteInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutTeamUserInviteInput, TeamUncheckedCreateWithoutTeamUserInviteInput>
  }

  export type UserCreateWithoutTeamUserInviteInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    Website?: WebsiteCreateNestedManyWithoutUserInput
    ApiKey?: ApiKeyCreateNestedManyWithoutUserInput
    TeamUser?: TeamUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTeamUserInviteInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Website?: WebsiteUncheckedCreateNestedManyWithoutUserInput
    ApiKey?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
    TeamUser?: TeamUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTeamUserInviteInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTeamUserInviteInput, UserUncheckedCreateWithoutTeamUserInviteInput>
  }

  export type TeamUserCreateWithoutTeamUserInviteInput = {
    id?: string
    role?: ROLE
    accepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Team: TeamCreateNestedOneWithoutTeamUserInput
    User: UserCreateNestedOneWithoutTeamUserInput
  }

  export type TeamUserUncheckedCreateWithoutTeamUserInviteInput = {
    id?: string
    teamId: string
    userId: string
    role?: ROLE
    accepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUserCreateOrConnectWithoutTeamUserInviteInput = {
    where: TeamUserWhereUniqueInput
    create: XOR<TeamUserCreateWithoutTeamUserInviteInput, TeamUserUncheckedCreateWithoutTeamUserInviteInput>
  }

  export type TeamUpsertWithoutTeamUserInviteInput = {
    update: XOR<TeamUpdateWithoutTeamUserInviteInput, TeamUncheckedUpdateWithoutTeamUserInviteInput>
    create: XOR<TeamCreateWithoutTeamUserInviteInput, TeamUncheckedCreateWithoutTeamUserInviteInput>
  }

  export type TeamUpdateWithoutTeamUserInviteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    TeamWebsite?: TeamWebsiteUpdateManyWithoutTeamNestedInput
    TeamUser?: TeamUserUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutTeamUserInviteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    TeamWebsite?: TeamWebsiteUncheckedUpdateManyWithoutTeamNestedInput
    TeamUser?: TeamUserUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type UserUpsertWithoutTeamUserInviteInput = {
    update: XOR<UserUpdateWithoutTeamUserInviteInput, UserUncheckedUpdateWithoutTeamUserInviteInput>
    create: XOR<UserCreateWithoutTeamUserInviteInput, UserUncheckedCreateWithoutTeamUserInviteInput>
  }

  export type UserUpdateWithoutTeamUserInviteInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Website?: WebsiteUpdateManyWithoutUserNestedInput
    ApiKey?: ApiKeyUpdateManyWithoutUserNestedInput
    TeamUser?: TeamUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTeamUserInviteInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Website?: WebsiteUncheckedUpdateManyWithoutUserNestedInput
    ApiKey?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
    TeamUser?: TeamUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TeamUserUpsertWithoutTeamUserInviteInput = {
    update: XOR<TeamUserUpdateWithoutTeamUserInviteInput, TeamUserUncheckedUpdateWithoutTeamUserInviteInput>
    create: XOR<TeamUserCreateWithoutTeamUserInviteInput, TeamUserUncheckedCreateWithoutTeamUserInviteInput>
  }

  export type TeamUserUpdateWithoutTeamUserInviteInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | ROLE
    accepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Team?: TeamUpdateOneRequiredWithoutTeamUserNestedInput
    User?: UserUpdateOneRequiredWithoutTeamUserNestedInput
  }

  export type TeamUserUncheckedUpdateWithoutTeamUserInviteInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | ROLE
    accepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type WebsiteCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    url: string
    title?: string | null
    active?: boolean
  }

  export type ApiKeyCreateManyUserInput = {
    id?: string
    name: string
    websiteId: string
    key?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    expires: Date | string
  }

  export type TeamUserCreateManyUserInput = {
    id?: string
    teamId: string
    role?: ROLE
    accepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUserInviteCreateManyUserInput = {
    id?: string
    teamId: string
    teamUserId: string
    token: string
    status?: INVITE_STATUS
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebsiteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    WebVisitor?: WebVisitorUpdateManyWithoutWebsiteNestedInput
    WebSession?: WebSessionUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUpdateManyWithoutWebsiteNestedInput
  }

  export type WebsiteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    WebVisitor?: WebVisitorUncheckedUpdateManyWithoutWebsiteNestedInput
    WebSession?: WebSessionUncheckedUpdateManyWithoutWebsiteNestedInput
    WebPageview?: WebPageviewUncheckedUpdateManyWithoutWebsiteNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutWebsiteNestedInput
    ApiKey?: ApiKeyUncheckedUpdateManyWithoutWebsiteNestedInput
    TeamWebsite?: TeamWebsiteUncheckedUpdateManyWithoutWebsiteNestedInput
  }

  export type WebsiteUncheckedUpdateManyWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ApiKeyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    website?: WebsiteUpdateOneRequiredWithoutApiKeyNestedInput
  }

  export type ApiKeyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyWithoutApiKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUserUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | ROLE
    accepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Team?: TeamUpdateOneRequiredWithoutTeamUserNestedInput
    TeamUserInvite?: TeamUserInviteUpdateManyWithoutTeamUserNestedInput
  }

  export type TeamUserUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | ROLE
    accepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TeamUserInvite?: TeamUserInviteUncheckedUpdateManyWithoutTeamUserNestedInput
  }

  export type TeamUserUncheckedUpdateManyWithoutTeamUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | ROLE
    accepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUserInviteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumINVITE_STATUSFieldUpdateOperationsInput | INVITE_STATUS
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Team?: TeamUpdateOneRequiredWithoutTeamUserInviteNestedInput
    TeamUser?: TeamUserUpdateOneRequiredWithoutTeamUserInviteNestedInput
  }

  export type TeamUserInviteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    teamUserId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumINVITE_STATUSFieldUpdateOperationsInput | INVITE_STATUS
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUserInviteUncheckedUpdateManyWithoutTeamUserInviteInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    teamUserId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumINVITE_STATUSFieldUpdateOperationsInput | INVITE_STATUS
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebVisitorCreateManyWebsiteInput = {
    id?: string
    data?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebSessionCreateManyWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    referrer?: string
    queryParams?: string
    duration?: number
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    language?: string | null
    visitorId: string
  }

  export type WebPageviewCreateManyWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    sessionId: string
    visitorId: string
  }

  export type WebEventCreateManyWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    pageId: string
    sessionId: string
    visitorId: string
  }

  export type ApiKeyCreateManyWebsiteInput = {
    id?: string
    userId: string
    name: string
    key?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    expires: Date | string
  }

  export type TeamWebsiteCreateManyWebsiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teamId: string
  }

  export type WebVisitorUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: WebSessionUpdateManyWithoutWebVisitorNestedInput
    Pageview?: WebPageviewUpdateManyWithoutWebVisitorNestedInput
    WebEvent?: WebEventUpdateManyWithoutUserNestedInput
  }

  export type WebVisitorUncheckedUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: WebSessionUncheckedUpdateManyWithoutWebVisitorNestedInput
    Pageview?: WebPageviewUncheckedUpdateManyWithoutWebVisitorNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WebVisitorUncheckedUpdateManyWithoutWebVisitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebSessionUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    WebPage?: WebPageviewUpdateManyWithoutWebSessionNestedInput
    WebEvent?: WebEventUpdateManyWithoutWebSessionNestedInput
    WebVisitor?: WebVisitorUpdateOneRequiredWithoutSessionNestedInput
  }

  export type WebSessionUncheckedUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    visitorId?: StringFieldUpdateOperationsInput | string
    WebPage?: WebPageviewUncheckedUpdateManyWithoutWebSessionNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutWebSessionNestedInput
  }

  export type WebSessionUncheckedUpdateManyWithoutWebSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    visitorId?: StringFieldUpdateOperationsInput | string
  }

  export type WebPageviewUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    Event?: WebEventUpdateManyWithoutPageNestedInput
    WebSession?: WebSessionUpdateOneRequiredWithoutWebPageNestedInput
    WebVisitor?: WebVisitorUpdateOneRequiredWithoutPageviewNestedInput
  }

  export type WebPageviewUncheckedUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    sessionId?: StringFieldUpdateOperationsInput | string
    visitorId?: StringFieldUpdateOperationsInput | string
    Event?: WebEventUncheckedUpdateManyWithoutPageNestedInput
  }

  export type WebPageviewUncheckedUpdateManyWithoutWebPageviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    sessionId?: StringFieldUpdateOperationsInput | string
    visitorId?: StringFieldUpdateOperationsInput | string
  }

  export type WebEventUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    Page?: WebPageviewUpdateOneRequiredWithoutEventNestedInput
    User?: WebVisitorUpdateOneRequiredWithoutWebEventNestedInput
    WebSession?: WebSessionUpdateOneRequiredWithoutWebEventNestedInput
  }

  export type WebEventUncheckedUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    visitorId?: StringFieldUpdateOperationsInput | string
  }

  export type WebEventUncheckedUpdateManyWithoutWebEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    visitorId?: StringFieldUpdateOperationsInput | string
  }

  export type ApiKeyUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutApiKeyNestedInput
  }

  export type ApiKeyUncheckedUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamWebsiteUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Team?: TeamUpdateOneRequiredWithoutTeamWebsiteNestedInput
  }

  export type TeamWebsiteUncheckedUpdateWithoutWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamId?: StringFieldUpdateOperationsInput | string
  }

  export type TeamWebsiteUncheckedUpdateManyWithoutTeamWebsiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamId?: StringFieldUpdateOperationsInput | string
  }

  export type WebSessionCreateManyWebVisitorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    referrer?: string
    queryParams?: string
    duration?: number
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    language?: string | null
    websiteId: string
  }

  export type WebPageviewCreateManyWebVisitorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    sessionId: string
    websiteId: string
  }

  export type WebEventCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    pageId: string
    sessionId: string
    websiteId: string
  }

  export type WebSessionUpdateWithoutWebVisitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    WebPage?: WebPageviewUpdateManyWithoutWebSessionNestedInput
    WebEvent?: WebEventUpdateManyWithoutWebSessionNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebSessionNestedInput
  }

  export type WebSessionUncheckedUpdateWithoutWebVisitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    websiteId?: StringFieldUpdateOperationsInput | string
    WebPage?: WebPageviewUncheckedUpdateManyWithoutWebSessionNestedInput
    WebEvent?: WebEventUncheckedUpdateManyWithoutWebSessionNestedInput
  }

  export type WebSessionUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type WebPageviewUpdateWithoutWebVisitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    Event?: WebEventUpdateManyWithoutPageNestedInput
    WebSession?: WebSessionUpdateOneRequiredWithoutWebPageNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebPageviewNestedInput
  }

  export type WebPageviewUncheckedUpdateWithoutWebVisitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    sessionId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
    Event?: WebEventUncheckedUpdateManyWithoutPageNestedInput
  }

  export type WebPageviewUncheckedUpdateManyWithoutPageviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    sessionId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type WebEventUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    Page?: WebPageviewUpdateOneRequiredWithoutEventNestedInput
    WebSession?: WebSessionUpdateOneRequiredWithoutWebEventNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebEventNestedInput
  }

  export type WebEventUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type WebPageviewCreateManyWebSessionInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    page: string
    referrer?: string
    queryParams?: string
    duration?: number
    visitorId: string
    websiteId: string
  }

  export type WebEventCreateManyWebSessionInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    pageId: string
    visitorId: string
    websiteId: string
  }

  export type WebPageviewUpdateWithoutWebSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    Event?: WebEventUpdateManyWithoutPageNestedInput
    WebVisitor?: WebVisitorUpdateOneRequiredWithoutPageviewNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebPageviewNestedInput
  }

  export type WebPageviewUncheckedUpdateWithoutWebSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
    Event?: WebEventUncheckedUpdateManyWithoutPageNestedInput
  }

  export type WebPageviewUncheckedUpdateManyWithoutWebPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: StringFieldUpdateOperationsInput | string
    referrer?: StringFieldUpdateOperationsInput | string
    queryParams?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type WebEventUpdateWithoutWebSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    Page?: WebPageviewUpdateOneRequiredWithoutEventNestedInput
    User?: WebVisitorUpdateOneRequiredWithoutWebEventNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebEventNestedInput
  }

  export type WebEventUncheckedUpdateWithoutWebSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type WebEventCreateManyPageInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    eventName: string
    payload?: string
    sessionId: string
    visitorId: string
    websiteId: string
  }

  export type WebEventUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    User?: WebVisitorUpdateOneRequiredWithoutWebEventNestedInput
    WebSession?: WebSessionUpdateOneRequiredWithoutWebEventNestedInput
    Website?: WebsiteUpdateOneRequiredWithoutWebEventNestedInput
  }

  export type WebEventUncheckedUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type WebEventUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    visitorId?: StringFieldUpdateOperationsInput | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type TeamWebsiteCreateManyTeamInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    websiteId: string
  }

  export type TeamUserCreateManyTeamInput = {
    id?: string
    userId: string
    role?: ROLE
    accepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUserInviteCreateManyTeamInput = {
    id?: string
    userId: string
    teamUserId: string
    token: string
    status?: INVITE_STATUS
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamWebsiteUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Website?: WebsiteUpdateOneRequiredWithoutTeamWebsiteNestedInput
  }

  export type TeamWebsiteUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    websiteId?: StringFieldUpdateOperationsInput | string
  }

  export type TeamUserUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | ROLE
    accepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutTeamUserNestedInput
    TeamUserInvite?: TeamUserInviteUpdateManyWithoutTeamUserNestedInput
  }

  export type TeamUserUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | ROLE
    accepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TeamUserInvite?: TeamUserInviteUncheckedUpdateManyWithoutTeamUserNestedInput
  }

  export type TeamUserInviteUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumINVITE_STATUSFieldUpdateOperationsInput | INVITE_STATUS
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutTeamUserInviteNestedInput
    TeamUser?: TeamUserUpdateOneRequiredWithoutTeamUserInviteNestedInput
  }

  export type TeamUserInviteUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    teamUserId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumINVITE_STATUSFieldUpdateOperationsInput | INVITE_STATUS
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUserInviteCreateManyTeamUserInput = {
    id?: string
    teamId: string
    userId: string
    token: string
    status?: INVITE_STATUS
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUserInviteUpdateWithoutTeamUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumINVITE_STATUSFieldUpdateOperationsInput | INVITE_STATUS
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Team?: TeamUpdateOneRequiredWithoutTeamUserInviteNestedInput
    User?: UserUpdateOneRequiredWithoutTeamUserInviteNestedInput
  }

  export type TeamUserInviteUncheckedUpdateWithoutTeamUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    status?: EnumINVITE_STATUSFieldUpdateOperationsInput | INVITE_STATUS
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}