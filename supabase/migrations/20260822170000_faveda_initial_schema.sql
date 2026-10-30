-- Faveda initial schema for Supabase PostgreSQL
-- Apply with: supabase db push
-- The Next.js server connects using SUPABASE_DATABASE_URL + Drizzle.
-- RLS is enabled so the Supabase Data API never exposes commerce data publicly.

create table if not exists public.products (
  id serial primary key,
  slug varchar(120) not null unique,
  name varchar(200) not null,
  subtitle varchar(240) not null,
  description text not null,
  usage text not null,
  ingredients text not null,
  volume varchar(80) not null,
  category varchar(80) not null,
  price integer not null,
  image varchar(300) not null,
  benefits text not null default '[]',
  stock integer not null default 40,
  featured boolean not null default false,
  created_at timestamp not null default now()
);

create table if not exists public.drivers (
  id serial primary key,
  name varchar(120) not null,
  phone varchar(40) not null,
  vehicle varchar(80) not null,
  zone varchar(120) not null,
  status varchar(30) not null default 'available',
  username varchar(60) not null default '',
  password_hash varchar(200) not null default '',
  created_at timestamp not null default now()
);

create unique index if not exists drivers_username_unique_nonempty
  on public.drivers (username)
  where username <> '';

create table if not exists public.admin_users (
  id serial primary key,
  name varchar(120) not null,
  username varchar(60) not null unique,
  password_hash varchar(200) not null,
  role varchar(30) not null default 'manager',
  active boolean not null default true,
  must_change_password boolean not null default false,
  last_login_at timestamp,
  created_at timestamp not null default now()
);

create table if not exists public.orders (
  id serial primary key,
  tracking_code varchar(20) not null unique,
  confirmation_code varchar(4) not null,
  customer_name varchar(160) not null,
  customer_phone varchar(40) not null,
  customer_email varchar(160),
  address text not null,
  city varchar(120) not null,
  landmark varchar(200),
  notes text,
  latitude double precision,
  longitude double precision,
  payment_method varchar(40) not null,
  payment_phone varchar(40),
  status varchar(30) not null default 'pending',
  driver_id integer references public.drivers(id),
  subtotal integer not null,
  delivery_fee integer not null default 1500,
  discount integer not null default 0,
  total integer not null,
  promo_code varchar(40),
  admin_notes text,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),
  delivered_at timestamp
);

create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_driver_id_idx on public.orders(driver_id);
create index if not exists orders_created_at_idx on public.orders(created_at desc);

create table if not exists public.order_items (
  id serial primary key,
  order_id integer not null references public.orders(id) on delete cascade,
  product_id integer not null references public.products(id),
  product_name varchar(200) not null,
  product_image varchar(300) not null,
  unit_price integer not null,
  quantity integer not null
);

create index if not exists order_items_order_id_idx on public.order_items(order_id);

create table if not exists public.notifications (
  id serial primary key,
  audience varchar(20) not null default 'admin',
  type varchar(40) not null,
  title varchar(200) not null,
  body text not null,
  order_id integer,
  tracking_code varchar(20),
  read boolean not null default false,
  created_at timestamp not null default now()
);

create index if not exists notifications_audience_created_at_idx
  on public.notifications(audience, created_at desc);
create index if not exists notifications_tracking_code_idx
  on public.notifications(tracking_code);

create table if not exists public.admin_audit_logs (
  id serial primary key,
  actor_admin_id integer references public.admin_users(id),
  action varchar(80) not null,
  entity_type varchar(40) not null,
  entity_id varchar(80),
  description text not null,
  meta text,
  created_at timestamp not null default now()
);

create index if not exists admin_audit_actor_created_at_idx
  on public.admin_audit_logs(actor_admin_id, created_at desc);
create index if not exists admin_audit_action_idx on public.admin_audit_logs(action);

create table if not exists public.messages (
  id serial primary key,
  name varchar(160) not null,
  phone varchar(40),
  email varchar(160),
  kind varchar(30) not null default 'contact',
  content text not null,
  rating integer,
  created_at timestamp not null default now()
);

create index if not exists messages_kind_created_at_idx on public.messages(kind, created_at desc);

create table if not exists public.jobs (
  id serial primary key,
  title varchar(200) not null,
  department varchar(120) not null,
  location varchar(120) not null,
  contract varchar(80) not null,
  description text not null,
  requirements text not null,
  active boolean not null default true,
  created_at timestamp not null default now()
);

create table if not exists public.applications (
  id serial primary key,
  job_id integer references public.jobs(id) on delete set null,
  kind varchar(30) not null default 'spontaneous',
  full_name varchar(160) not null,
  email varchar(160),
  phone varchar(40),
  city varchar(120),
  experience varchar(120),
  profile_link varchar(300),
  message text not null,
  status varchar(30) not null default 'new',
  created_at timestamp not null default now()
);

create index if not exists applications_job_id_idx on public.applications(job_id);
create index if not exists applications_status_idx on public.applications(status, created_at desc);

create table if not exists public.videos (
  id serial primary key,
  slug varchar(120) not null unique,
  title varchar(200) not null,
  description text not null,
  category varchar(60) not null,
  thumbnail varchar(400) not null,
  video_url varchar(400) not null,
  platform varchar(40) not null default 'faveda',
  external_url varchar(400),
  duration integer not null default 0,
  views integer not null default 0,
  product_slug varchar(120),
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamp not null default now()
);

create index if not exists videos_published_featured_idx
  on public.videos(published, featured);

-- Do not expose sensitive operational data over the public Supabase REST API.
alter table public.products enable row level security;
alter table public.drivers enable row level security;
alter table public.admin_users enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.notifications enable row level security;
alter table public.admin_audit_logs enable row level security;
alter table public.messages enable row level security;
alter table public.videos enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;

-- The application connects using the server-side PostgreSQL connection string.
-- Add explicit RLS policies only if you later consume these tables from the browser
-- through Supabase Auth / the Data API.
