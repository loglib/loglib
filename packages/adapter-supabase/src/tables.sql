create table if not exists
  public.web_user (
    id text not null,
    data text not null default '{}'::text,
    created_at timestamp without time zone not null default current_timestamp,
    updated_at timestamp without time zone not null,
    constraint web_user_pkey primary key (id)
  ) tablespace pg_default;

create table if not exists
  public.web_session (
    id text not null,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    referrer text not null default ''::text,
    query_params text not null default ''::text,
    duration integer not null default 0,
    country text null,
    city text null,
    device text null,
    os text null,
    browser text null,
    language text null,
    user_id text not null,
    constraint web_session_pkey primary key (id),
    constraint web_session_user_id_fkey foreign key (user_id) references web_user (id) on update cascade on delete cascade
  ) tablespace pg_default;

create table if not exists
  public.web_pageview (
    id text not null,
    created_at timestamp without time zone not null default current_timestamp,
    updated_at timestamp without time zone not null,
    page text not null,
    referrer text not null default ''::text,
    query_params text not null default ''::text,
    duration integer not null default 0,
    session_id text not null,
    user_id text not null,
    constraint web_page_pkey primary key (id),
    constraint web_pageview_session_id_fkey foreign key (session_id) references web_session (id) on delete cascade,
    constraint web_pageview_user_id_fkey foreign key (user_id) references web_user (id) on delete cascade
  ) tablespace pg_default;

create table if not exists
  public.web_event (
    id text not null,
    created_at timestamp without time zone not null default current_timestamp,
    updated_at timestamp without time zone not null,
    event_type text not null,
    event_name text not null,
    payload text not null default ''::text,
    page_id text not null,
    session_id text not null,
    user_id text not null,
    constraint web_event_pkey primary key (id),
    constraint web_event_page_id_fkey foreign key (page_id) references web_pageview (id) on update cascade on delete cascade,
    constraint web_event_session_id_fkey foreign key (session_id) references web_session (id) on delete cascade,
    constraint web_event_user_id_fkey foreign key (user_id) references web_user (id) on update cascade on delete cascade
  ) tablespace pg_default;