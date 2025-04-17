import { RHFInput } from '@/lib/rhf';
import { TCreateCompanySchema, TSelectCompanySchema } from '@/lib/zod';
import { useTranslations } from 'next-intl';

export const ContactsForm = ({ company }: { company: TSelectCompanySchema }) => {
  const t = useTranslations('forms.create_edit_view_company');
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <RHFInput<TCreateCompanySchema>
          name="email"
          label={t('input_email_label')}
          placeholder={t('input_email_placeholder')}
          labelClassName="!text-foreground"
        />
        <RHFInput<TCreateCompanySchema>
          name="phone"
          label={t('input_phone_label')}
          placeholder={t('input_phone_placeholder')}
          labelClassName="!text-foreground"
        />
      </div>
      <RHFInput<TCreateCompanySchema>
        name="website"
        label={t('input_website_label')}
        placeholder={t('input_website_placeholder')}
        labelClassName="!text-foreground"
      />
      <div className="pb-2 pt-4">
        <h3 className="text-lg font-medium">{t('info_company_address')}</h3>
        <p className="text-sm text-muted-foreground">{t('info_company_address_description')}</p>
      </div>

      <RHFInput<TCreateCompanySchema>
        name="address.country"
        label={t('input_address_country_label')}
        placeholder={t('input_address_country_placeholder')}
        labelClassName="!text-foreground"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <RHFInput<TCreateCompanySchema>
          name="address.city"
          label={t('input_address_city_label')}
          placeholder={t('input_address_city_placeholder')}
          labelClassName="!text-foreground"
        />
        <RHFInput<TCreateCompanySchema>
          name="address.state"
          label={t('input_address_state_label')}
          placeholder={t('input_address_state_placeholder')}
          labelClassName="!text-foreground"
        />
        <RHFInput<TCreateCompanySchema>
          name="address.street"
          label={t('input_address_street_label')}
          placeholder={t('input_address_street_placeholder')}
          labelClassName="!text-foreground"
        />
        <RHFInput<TCreateCompanySchema>
          name="address.postalCode"
          label={t('input_address_postalCode_label')}
          placeholder={t('input_address_postalCode_placeholder')}
          labelClassName="!text-foreground"
        />
      </div>
    </div>
  );
};

export const ContactsView = ({ company }: { company: TSelectCompanySchema }) => {
  const t = useTranslations('forms.create_edit_view_company');

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="h4 mb-1 text-muted-foreground">{t('input_email_label')}</h4>
          <p className="text-lg font-medium">{company.email}</p>
        </div>
        <div>
          <h4 className="h4 mb-1 text-muted-foreground">{t('input_phone_label')}</h4>
          <p className="text-lg font-medium">{company.phone}</p>
        </div>
      </div>

      <div>
        <h4 className="h4 mb-1 text-muted-foreground">{t('input_website_label')}</h4>
        <p className="text-lg font-medium">{company.website}</p>
      </div>

      <div className="pb-2 pt-4">
        <h3 className="text-lg font-medium">{t('info_company_address')}</h3>
        <p className="text-sm text-muted-foreground">{t('info_company_address_description')}</p>
      </div>
      <div>
        <h4 className="h4 mb-1 text-muted-foreground">{t('input_address_country_label')}</h4>
        <p className="text-lg font-medium">{company.address?.country || '-'}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="h4 mb-1 text-muted-foreground">{t('input_address_city_label')}</h4>
          <p className="text-lg font-medium">{company.address?.city || '-'}</p>
        </div>
        <div>
          <h4 className="h4 mb-1 text-muted-foreground">{t('input_address_state_label')}</h4>
          <p className="text-lg font-medium">{company.address?.state || '-'}</p>
        </div>
        <div>
          <h4 className="h4 mb-1 text-muted-foreground">{t('input_address_street_placeholder')}</h4>
          <p className="text-lg font-medium">{company.address?.street || '-'}</p>
        </div>
        <div>
          <h4 className="h4 mb-1 text-muted-foreground">{t('input_address_postalCode_label')}</h4>
          <p className="text-lg font-medium">{company.address?.postalCode || '-'}</p>
        </div>
      </div>
    </div>
  );
};
