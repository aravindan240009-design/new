import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { submitApplication } from '../api/applicationApi';
import ApplicationFormFields, { emptyApplication } from '../components/ApplicationFormFields';
import Navbar from '../components/Navbar';
import { HostelApplicationPayload } from '../types/application';

export const applicationSchema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  parentName: z.string().min(1, 'Parent name is required'),
  parentContactNo: z.string().regex(/^\d{10}$/, 'Parent contact number must be exactly 10 digits'),
  dateOfJoining: z.string().min(1, 'Date of joining is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required').refine((date) => new Date(date) <= new Date(), 'Date of birth cannot be in the future'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  course: z.string().min(1, 'Course is required'),
  registerNumber: z.string().min(1, 'Register number is required'),
  studentMobileNo: z.string().regex(/^\d{10}$/, 'Student mobile number must be exactly 10 digits'),
  residenceAddress: z.string().min(1, 'Residence address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  localGuardianName: z.string().min(1, 'Local guardian name is required'),
  localGuardianContactNo: z.string().regex(/^\d{10}$/, 'Local guardian contact number must be exactly 10 digits'),
  localGuardianAddress: z.string().min(1, 'Local guardian address is required'),
  personalHistory: z.string().optional(),
});

export default function StudentApplicationForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<HostelApplicationPayload>({
    resolver: zodResolver(applicationSchema),
    defaultValues: emptyApplication,
  });

  const onSubmit = async (payload: HostelApplicationPayload) => {
    setLoading(true);
    try {
      const saved = await submitApplication(payload);
      toast.success('Application submitted successfully');
      navigate('/success', { state: { registerNumber: saved.registerNumber } });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
        <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-royal"><ArrowLeft className="h-4 w-4" />Back to home</Link>
        <form onSubmit={handleSubmit(onSubmit)} className="panel p-5 sm:p-6 md:p-8">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-wide text-royal">Hostel Office Record</p>
            <h1 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">Hostel Joining Form</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">Fill every required field carefully. Your details will be saved for hostel office records.</p>
          </div>
          <ApplicationFormFields register={register} errors={errors} />
          <div className="mt-8 flex justify-end">
            <button className="btn-primary w-full sm:w-auto" disabled={loading}><Send className="h-4 w-4" />{loading ? 'Saving details...' : 'Save Joining Details'}</button>
          </div>
        </form>
      </main>
    </div>
  );
}
