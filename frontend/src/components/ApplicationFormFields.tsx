import { Building2, CalendarDays, GraduationCap, MapPin, Shield, Users } from 'lucide-react';
import React, { ReactNode } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { HostelApplicationPayload } from '../types/application';

export const emptyApplication: HostelApplicationPayload = {
  studentName: '',
  parentName: '',
  parentContactNo: '',
  dateOfJoining: '',
  dateOfBirth: '',
  gender: 'MALE',
  course: '',
  registerNumber: '',
  studentMobileNo: '',
  residenceAddress: '',
  permanentAddress: '',
  localGuardianName: '',
  localGuardianContactNo: '',
  localGuardianAddress: '',
  hostelName: '',
  floorNo: '',
  roomNo: '',
  bedNo: '',
  wardenName: '',
  wardenContactNo: '',
};

/* ─── Field ────────────────────────────────────────────────────── */
function Field({ label, name, register, errors, type = 'text', required = true }: {
  label: string;
  name: keyof HostelApplicationPayload;
  register: UseFormRegister<HostelApplicationPayload>;
  errors: FieldErrors<HostelApplicationPayload>;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input id={name} type={type} {...register(name)} />
      {errors[name] && (
        <p className="mt-1 text-xs font-medium text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
}

/* ─── TextArea ─────────────────────────────────────────────────── */
function TextArea({ label, name, register, errors, required = true }: {
  label: string;
  name: keyof HostelApplicationPayload;
  register: UseFormRegister<HostelApplicationPayload>;
  errors: FieldErrors<HostelApplicationPayload>;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea id={name} rows={3} {...register(name)} />
      {errors[name] && (
        <p className="mt-1 text-xs font-medium text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────────────── */
function Section({
  title,
  Icon,
  children,
}: {
  title: string;
  Icon: React.ElementType;
  children: ReactNode;
}) {
  return (
    <section className="bg-white py-5 sm:rounded-2xl sm:p-6">
      {/* ── Mobile section header ── */}
      <div className="mb-4 flex items-center gap-2.5 sm:mb-5">
        {/* Lucide icon badge — mobile only */}
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-royal ring-1 ring-blue-100 sm:hidden">
          <Icon className="h-3.5 w-3.5" />
        </span>
        {/* Desktop accent bar */}
        <span className="hidden h-4 w-1 shrink-0 rounded-full bg-royal sm:block" />
        <h2 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500 sm:text-sm sm:tracking-widest sm:text-royal">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-4 lg:gap-6">{children}</div>
    </section>
  );
}

/* ─── Main export ──────────────────────────────────────────────── */
export default function ApplicationFormFields({
  register,
  errors,
}: {
  register: UseFormRegister<HostelApplicationPayload>;
  errors: FieldErrors<HostelApplicationPayload>;
}) {
  return (
    <div className="divide-y divide-slate-100">
      <Section title="Student Information" Icon={GraduationCap}>
        <Field label="Name of the Student" name="studentName" register={register} errors={errors} />
        <Field label="Register Number" name="registerNumber" register={register} errors={errors} />
        <Field label="Course" name="course" register={register} errors={errors} />
        <Field label="Student Mobile No" name="studentMobileNo" register={register} errors={errors} />
        <div>
          <label htmlFor="gender">
            Gender <span className="text-red-500">*</span>
          </label>
          <select id="gender" {...register('gender')}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-xs font-medium text-red-500">{errors.gender.message}</p>
          )}
        </div>
        <Field label="Date of Birth" name="dateOfBirth" type="date" register={register} errors={errors} />
      </Section>

      <Section title="Parent Details" Icon={Users}>
        <Field label="Name of the Parent" name="parentName" register={register} errors={errors} />
        <Field label="Parent Contact No" name="parentContactNo" register={register} errors={errors} />
      </Section>

      <Section title="Admission Details" Icon={CalendarDays}>
        <Field label="Date of Admission" name="dateOfJoining" type="date" register={register} errors={errors} />
      </Section>

      <Section title="Address Details" Icon={MapPin}>
        <TextArea label="Residence Address" name="residenceAddress" register={register} errors={errors} />
        <TextArea label="Permanent Address" name="permanentAddress" register={register} errors={errors} />
      </Section>

      <Section title="Local Guardian" Icon={Shield}>
        <Field label="Local Guardian Name" name="localGuardianName" register={register} errors={errors} />
        <Field label="Local Guardian Contact No" name="localGuardianContactNo" register={register} errors={errors} />
        <TextArea label="Local Guardian Address" name="localGuardianAddress" register={register} errors={errors} />
      </Section>

      <Section title="Hostel Allocation" Icon={Building2}>
        <Field label="Hostel Name" name="hostelName" register={register} errors={errors} />
        <Field label="Floor No" name="floorNo" register={register} errors={errors} />
        <Field label="Room No" name="roomNo" register={register} errors={errors} />
        <Field label="Bed No" name="bedNo" register={register} errors={errors} required={false} />
        <Field label="Warden Name" name="wardenName" register={register} errors={errors} />
        <Field label="Warden Contact No" name="wardenContactNo" register={register} errors={errors} required={false} />
      </Section>
    </div>
  );
}
