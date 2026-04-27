create table if not exists public.orders (
  id                       uuid primary key default gen_random_uuid(),
  user_id                  uuid references public.profiles(id) on delete set null,
  guest_email              text,
  guest_name               text,
  status                   text not null default 'pending',
  total_hkd                int  not null,
  stripe_payment_intent_id text,
  stripe_charge_id         text,
  created_at               timestamptz not null default now()
);

create table if not exists public.order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders(id) on delete cascade,
  item_type   text not null,  -- 'product' | 'social_session' | 'court_booking'
  product_id  int,
  name        text,
  detail      text,
  quantity    int  not null default 1,
  unit_price  int  not null
);

alter table public.orders      enable row level security;
alter table public.order_items enable row level security;
create policy "service role only" on public.orders      using (false);
create policy "service role only" on public.order_items using (false);
