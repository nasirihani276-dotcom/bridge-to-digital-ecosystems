-- افزودن فیلدهای درخواستی بخش «اطلاعات حقوقی» به جدول company_legal.
-- اجرای این migration باید پیش از هرگونه درج داده در این ستون‌ها انجام شود.

alter table public.company_legal
  add column if not exists trade_name text,
  add column if not exists province_city text,
  add column if not exists status text,
  add column if not exists registration_unit text,
  add column if not exists postal_code text,
  add column if not exists signatories text,
  add column if not exists phone text;
