create table if not exists public.contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  email      text,
  subject    text,
  message    text,
  created_at timestamptz not null default now()
);

create table if not exists public.tournaments (
  id           uuid primary key default gen_random_uuid(),
  key          text unique not null,
  name_en      text not null,
  name_zh      text not null,
  date_label   text,
  capacity     int,
  members_only boolean not null default false,
  active       boolean not null default true,
  sort_order   int not null default 0
);

create table if not exists public.tournament_registrations (
  id              uuid primary key default gen_random_uuid(),
  tournament_key  text not null,
  user_id         uuid references public.profiles(id) on delete set null,
  partner_name    text,
  notes           text,
  created_at      timestamptz not null default now(),
  unique (tournament_key, user_id)
);

create table if not exists public.membership_subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null references public.profiles(id) on delete cascade,
  tier                   text not null,
  stripe_subscription_id text,
  stripe_price_id        text,
  status                 text not null default 'active',
  current_period_start   timestamptz,
  current_period_end     timestamptz,
  created_at             timestamptz not null default now()
);

alter table public.contact_submissions        enable row level security;
alter table public.tournaments                enable row level security;
alter table public.tournament_registrations   enable row level security;
alter table public.membership_subscriptions   enable row level security;

create policy "service role only" on public.contact_submissions      using (false);
create policy "public read tournaments"       on public.tournaments   for select using (true);
create policy "service role only" on public.tournament_registrations  using (false);
create policy "service role only" on public.membership_subscriptions  using (false);
