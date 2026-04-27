create table if not exists public.courts (
  id     uuid primary key default gen_random_uuid(),
  name   text not null,
  active boolean not null default true
);

create table if not exists public.session_types (
  id           uuid primary key default gen_random_uuid(),
  key          text unique not null,
  label_en     text not null,
  label_zh     text not null,
  price_guest  int  not null,
  price_member int  not null,
  slot_type    text not null  -- 'peak' | 'nonpeak' | 'class'
);

alter table public.courts        enable row level security;
alter table public.session_types enable row level security;

create policy "public read courts"        on public.courts        for select using (true);
create policy "public read session_types" on public.session_types for select using (true);
