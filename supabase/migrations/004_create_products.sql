create table if not exists public.products (
  id             int  primary key,
  sku            text unique,
  name_en        text not null,
  name_zh        text not null,
  category       text not null,
  price          int  not null,
  member_price   int  not null,
  description_en text,
  description_zh text,
  badge_en       text,
  badge_zh       text,
  in_stock       boolean not null default true,
  image_url      text,
  sort_order     int not null default 0
);

alter table public.products enable row level security;
create policy "public read products" on public.products for select using (true);
