//all events table
CREATE TABLE loglib.event (
    id String,
    event String,
    sessionId String,
    visitorId String,
    properties String DEFAULT '{}',
    timestamp DateTime DEFAULT now(),
    websiteId String,
    sign Int8
) ENGINE = CollapsingMergeTree(sign)
ORDER BY (id)

//visitor: records in this table are created on identfying a visitor
CREATE TABLE loglib.visitor (
    id String,
    identfiedId String,
    properties String DEFAULT '{}',
    timestamp DateTime DEFAULT now(),
    websiteId String,
    sign Int8
) ENGINE = CollapsingMergeTree(sign)
ORDER BY (id)