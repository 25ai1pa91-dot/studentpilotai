import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Building, GraduationCap, Award, ArrowRight } from 'lucide-react';
import { profileSetupSchema, ProfileSetupFormData } from '../../lib/auth-schemas';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { FileUpload } from '../../components/ui/FileUpload';
import { Button } from '../../components/ui/Button';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { toast } from '../../components/ui/ToastProvider';

export interface ProfileSetupPageProps {
  onNavigate: (path: string) => void;
}

export const ProfileSetupPage: React.FC<ProfileSetupPageProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSetupFormData>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      fullName: 'Paras Jain',
      college: 'BMS College of Engineering',
      degree: 'B.Tech / B.E.',
      branch: 'Computer Science & AI',
      year: '2nd Year',
      targetCompany: 'Google / FAANG',
    },
  });

  const onSubmit = (data: ProfileSetupFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Academic profile saved! Let\'s personalize your learning targets.');
      onNavigate('/onboarding');
    }, 1000);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-center space-y-1 mb-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 font-bold">Step 1 of 2</span>
          <h2 className="text-lg font-bold text-white">Academic & Career Profile</h2>
          <p className="text-xs text-zinc-400">Tell us about your background so we can calculate your placement vector.</p>
        </div>

        <Input
          label="Full Name"
          placeholder="Paras Jain"
          leftIcon={<User className="w-4 h-4 text-zinc-500" />}
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        <Input
          label="College / University"
          placeholder="e.g. BMS College of Engineering"
          leftIcon={<Building className="w-4 h-4 text-zinc-500" />}
          error={errors.college?.message}
          {...register('college')}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Degree"
            options={[
              { value: 'B.Tech / B.E.', label: 'B.Tech / B.E.' },
              { value: 'BCA / B.Sc', label: 'BCA / B.Sc' },
              { value: 'M.Tech / MCA', label: 'M.Tech / MCA' },
            ]}
            {...register('degree')}
          />

          <Select
            label="Current Year"
            options={[
              { value: '1st Year', label: '1st Year' },
              { value: '2nd Year', label: '2nd Year' },
              { value: '3rd Year', label: '3rd Year' },
              { value: '4th Year', label: '4th Year' },
            ]}
            {...register('year')}
          />
        </div>

        <Input
          label="Branch / Specialization"
          placeholder="e.g. Computer Science & AI"
          leftIcon={<GraduationCap className="w-4 h-4 text-zinc-500" />}
          error={errors.branch?.message}
          {...register('branch')}
        />

        <Input
          label="Target Career Goal / Company"
          placeholder="e.g. Google, Amazon, Tier 1 Tech"
          leftIcon={<Award className="w-4 h-4 text-zinc-500" />}
          error={errors.targetCompany?.message}
          {...register('targetCompany')}
        />

        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-300">Upload Avatar Photo (Optional)</label>
          <FileUpload onFileSelect={() => {}} accept=".jpg,.png" label="Drop your profile picture here" />
        </div>

        <Button
          type="submit"
          variant="brand"
          size="lg"
          isLoading={isLoading}
          className="w-full mt-2"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Onboarding Wizard
        </Button>
      </form>
    </AuthLayout>
  );
};
