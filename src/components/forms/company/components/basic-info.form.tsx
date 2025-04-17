import { CompanyStatusBadge } from '@/components/app-badge';
import { RHFInput, RHFTextarea } from '@/lib/rhf';
import { TCreateCompanySchema, TSelectCompanySchema } from '@/lib/zod';
import { useTranslations } from 'next-intl';

export const BasicInfoForm = ({ company }: { company: TSelectCompanySchema }) => {
  const t = useTranslations('forms.create_edit_view_company');

  return (
    <div className="space-y-4">
      <RHFInput<TCreateCompanySchema>
        name="name"
        label={t('input_name_label')}
        placeholder={t('input_name_placeholder')}
        labelClassName="!text-foreground"
      />
      <RHFTextarea<TCreateCompanySchema>
        name="description"
        label={t('input_description_label')}
        placeholder={t('input_description_placeholder')}
        labelClassName="!text-foreground"
      />
    </div>
  );
};

export const BasicInfoView = ({ company }: { company: TSelectCompanySchema }) => {
  const t = useTranslations('forms.create_edit_view_company');

  return (
    <div className="space-y-4">
      <div>
        <h4 className="h4 mb-1 text-muted-foreground">{t('company_name')}</h4>
        <p className="text-lg font-medium">{company.name}</p>
      </div>

      <div>
        <h4 className="h4 mb-1 text-muted-foreground">{t('company_status')}</h4>
        <CompanyStatusBadge status={company.status} />
      </div>

      <div>
        <h3 className="h4 text-muted-foreground">{t('input_description_label')}</h3>
        <p className="text-1">{company.description || '-'}</p>
      </div>
    </div>
  );
};
