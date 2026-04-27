create table if not exists public.bookings (
  id                        uuid primary key default gen_random_uuid(),
  user_id                   uuid references public.profiles(id) on delete set null,
  guest_email               text,
  guest_name                text,
  court_id                  uuid not null references public.courts(id),
  session_type_id           uuid not null references public.session_types(id),
  booking_date              date not null,
  slot_time                 time not null,
  price_paid                int  not null,
  status                    text not null default 'pending',
  stripe_payment_intent_id  text,
  stripe_charge_id          text,
  created_at                timestamptz not null default now(),
  cancelled_at              timestamptz
);

create unique index bookings_no_double_book
  on public.bookings (booking_date, slot_time, court_id, session_type_id)
  where status != 'cancelled';

create index bookings_user_id_idx on public.bookings (user_id);
create index bookings_date_idx    on public.bookings (booking_date);

alter table public.bookings enable row level security;
create policy "service role only" on public.bookings using (false);
