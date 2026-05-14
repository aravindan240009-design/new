create table if not exists hostel_applications (
  id bigserial primary key,
  student_name varchar(255) not null,
  parent_name varchar(255) not null,
  parent_contact_no varchar(10) not null check (parent_contact_no ~ '^[0-9]{10}$'),
  date_of_joining date not null,
  date_of_birth date not null check (date_of_birth <= current_date),
  gender varchar(20) not null check (gender in ('MALE', 'FEMALE', 'OTHER')),
  course varchar(255) not null,
  register_number varchar(255) not null unique,
  student_mobile_no varchar(10) not null check (student_mobile_no ~ '^[0-9]{10}$'),
  residence_address text not null,
  permanent_address text not null,
  local_guardian_name varchar(255) not null,
  local_guardian_contact_no varchar(10) not null check (local_guardian_contact_no ~ '^[0-9]{10}$'),
  local_guardian_address text not null,
  hostel_name varchar(255),
  floor_no varchar(80),
  room_no varchar(255),
  bed_no varchar(80),
  warden_name varchar(255),
  warden_contact_no varchar(10) check (warden_contact_no is null or warden_contact_no ~ '^[0-9]{10}$'),
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

alter table hostel_applications add column if not exists hostel_name varchar(255);
alter table hostel_applications add column if not exists floor_no varchar(80);
alter table hostel_applications add column if not exists room_no varchar(255);
alter table hostel_applications add column if not exists bed_no varchar(80);
alter table hostel_applications add column if not exists warden_name varchar(255);
alter table hostel_applications add column if not exists warden_contact_no varchar(10);

create index if not exists idx_hostel_applications_gender on hostel_applications(gender);
create index if not exists idx_hostel_applications_course on hostel_applications(course);
create index if not exists idx_hostel_applications_created_at on hostel_applications(created_at desc);

create table if not exists admin_users (
  id bigserial primary key,
  username varchar(80) not null unique,
  password varchar(255) not null,
  role varchar(40) not null default 'ADMIN',
  created_at timestamp not null default current_timestamp
);

-- The Spring Boot app seeds username admin / password admin123 only when no admin exists.
-- Change this password immediately in production.
