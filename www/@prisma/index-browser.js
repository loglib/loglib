
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.14.0
 * Query Engine version: d9a4c5988f480fa576d43970d5a23641aa77bc9c
 */
Prisma.prismaVersion = {
  client: "4.14.0",
  engine: "d9a4c5988f480fa576d43970d5a23641aa77bc9c"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.AccountScalarFieldEnum = {
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

exports.Prisma.ApiKeyScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  websiteId: 'websiteId',
  key: 'key',
  createdAt: 'createdAt',
  deletedAt: 'deletedAt',
  expires: 'expires'
};

exports.Prisma.DisallowedScalarFieldEnum = {
  id: 'id',
  identity: 'identity'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.TeamScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  name: 'name'
};

exports.Prisma.TeamUserInviteScalarFieldEnum = {
  id: 'id',
  teamId: 'teamId',
  userId: 'userId',
  teamUserId: 'teamUserId',
  token: 'token',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TeamUserScalarFieldEnum = {
  id: 'id',
  teamId: 'teamId',
  userId: 'userId',
  role: 'role',
  accepted: 'accepted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TeamWebsiteScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  teamId: 'teamId',
  websiteId: 'websiteId'
};

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
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

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.WebEventScalarFieldEnum = {
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

exports.Prisma.WebPageviewScalarFieldEnum = {
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

exports.Prisma.WebSessionScalarFieldEnum = {
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

exports.Prisma.WebVisitorScalarFieldEnum = {
  id: 'id',
  data: 'data',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  websiteId: 'websiteId'
};

exports.Prisma.WebsiteScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  url: 'url',
  title: 'title',
  userId: 'userId',
  active: 'active'
};
exports.INVITE_STATUS = {
  sent: 'sent',
  accepted: 'accepted',
  expired: 'expired'
};

exports.ROLE = {
  owner: 'owner',
  admin: 'admin',
  viewer: 'viewer'
};

exports.Prisma.ModelName = {
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

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
