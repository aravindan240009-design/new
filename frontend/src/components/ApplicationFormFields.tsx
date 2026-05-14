import type { ReactNode } from 'react';
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
      <label htmlFor={name}>{label} {required && <span className="text-red-600">*</span>}</label>
      <input id={name} type={type} {...register(name)} />
      {errors[name] && <p className="mt-1 text-xs font-semibold text-red-600">{errors[name]?.message}</p>}
    </div>
  );
}

function TextArea({ label, name, register, errors, required = true }: {
  label: string;
  name: keyof HostelApplicationPayload;
  register: UseFormRegister<HostelApplicationPayload>;
  errors: FieldErrors<HostelApplicationPayload>;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name}>{label} {required && <span className="text-red-600">*</span>}</label>
      <textarea id={name} rows={4} {...register(name)} />
      {errors[name] && <p className="mt-1 text-xs font-semibold text-red-600">{errors[name]?.message}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_32px_rgba(15,37,68,0.06)] sm:p-6">
      <h2 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-royal">
        <span className="h-1.5 w-1.5 rounded-full bg-royal" />
        {title}
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:gap-6">{children}</div>
    </section>
  );
}

export default function ApplicationFormFields({ register, errors }: {
  register: UseFormRegister<HostelApplicationPayload>;
  errors: FieldErrors<HostelApplicationPayload>;
}) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <Section title="Student Details">
        <Field label="Name of the Student" name="studentName" register={register} errors={errors} />
        <Field label="Register Number" name="registerNumber" register={register} errors={errors} />
        <Field label="Course" name="course" register={register} errors={errors} />
        <Field label="Student Mobile No" name="studentMobileNo" register={register} errors={errors} />
        <div>
          <label htmlFor="gender">Gender <span className="text-red-600">*</span></label>
          <select id="gender" {...register('gender')}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.gender && <p className="mt-1 text-xs font-semibold text-red-600">{errors.gender.message}</p>}
        </div>
        <Field label="Date of Birth" name="dateOfBirth" type="date" register={register} errors={errors} />
      </Section>

      <Section title="Parent Details">
        <Field label="Name of the Parent" name="parentName" register={register} errors={errors} />
        <Field label="Parent Contact No" name="parentContactNo" register={register} errors={errors} />
      </Section>

      <Section title="Course & Joining Details">
        <Field label="Date of Admission" name="dateOfJoining" type="date" register={register} errors={errors} />
      </Section>

      <Section title="Address Details">
        <TextArea label="Residence Address" name="residenceAddress" register={register} errors={errors} />
        <TextArea label="Permanent Address" name="permanentAddress" register={register} errors={errors} />
      </Section>

      <Section title="Local Guardian Details">
        <Field label="Local Guardian Name" name="localGuardianName" register={register} errors={errors} />
        <Field label="Local Guardian Contact No" name="localGuardianContactNo" register={register} errors={errors} />
        <div className="md:col-span-2">
          <TextArea label="Local Guardian Address" name="localGuardianAddress" register={register} errors={errors} />
        </div>
      </Section>

      <Section title="Hostel Allocation Details">
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
