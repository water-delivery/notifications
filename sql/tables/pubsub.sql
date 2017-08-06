CREATE TYPE ENUM_PUBSUB_STATE AS ENUM ('loggedIn', 'loggedOut', 'anon');

CREATE TABLE public.pubsub (
  id SERIAL PRIMARY KEY,
  "deviceId" CHARACTER VARYING(255),
  "userId" INTEGER,
  token CHARACTER VARYING(255) NOT NULL,
  contact CHARACTER VARYING(255),
  "firstName" CHARACTER VARYING(255),
  state ENUM_PUBSUB_STATE DEFAULT 'anon'::enum_pubsub_state,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);
CREATE UNIQUE INDEX pubsub_token_key ON pubsub USING BTREE (token);
