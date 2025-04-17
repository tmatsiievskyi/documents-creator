'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { TSelectCompanySchema, TUpdateCompanySchemaFE, updateCompanySchemaFE } from '@/lib/zod';
import { useTranslations } from 'next-intl';
import {
  AppearanceForm,
  AppearanceView,
  BasicInfoForm,
  BasicInfoView,
  ContactsForm,
  ContactsView,
} from './components';
import { Form } from '@/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/ui/button';
import { useServerAction } from 'zsa-react';
import { updateCompanyInfoAction } from '@/app/[locale]/(platform)/settings/company/[companyId]/info/actions';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/buttons';
import { URL_COMPANY_IMAGE } from '@/shared/constants';

export type TMode = 'edit' | 'view';

export const CompanyInfoForm = ({
  company,
  isOwnerOrAdmin,
  companyId,
}: {
  company: TSelectCompanySchema;
  isOwnerOrAdmin: boolean;
  companyId: string;
}) => {
  const t = useTranslations('forms.create_edit_view_company');
  const [activeTab, setActiveTab] = useState('basic');
  const [previewImage, setPreviewImage] = useState<string | null>(
    company?.companyImageId ? URL_COMPANY_IMAGE(company.id, company.companyImageId) : null
  );
  const [mode, setMode] = useState<TMode>('view');

  const form = useForm<TUpdateCompanySchemaFE>({
    resolver: zodResolver(updateCompanySchemaFE),
    defaultValues: {
      name: company.name,
      description: company.description,
      email: company.email,
      phone: company.phone,
      website: company.website,
      address: {
        country: company.address?.country || '',
        city: company.address?.city || '',
        state: company.address?.state || '',
        street: company.address?.street || '',
        postalCode: company.address?.postalCode || '',
      },
    },
    mode: 'onBlur',
  });

  const {
    formState: { isDirty, isValid },
    handleSubmit,
  } = form;

  const { execute, isPending } = useServerAction(updateCompanyInfoAction, {
    onSuccess() {
      toast.success('Company has been updated');
      setMode('view');
    },
    onError({ err }) {
      toast.error('Something went wrong', {
        description: err.message,
      });
    },
  });

  const handleEditMode = () => {
    form.reset({
      name: company.name,
      description: company.description,
      email: company.email,
      phone: company.phone,
      website: company.website,
      address: {
        country: company.address?.country || '',
        city: company.address?.city || '',
        state: company.address?.state || '',
        street: company.address?.street || '',
        postalCode: company.address?.postalCode || '',
      },
    });
    setMode('edit');
  };

  const handleTabChange = (value: string) => setActiveTab(value);

  const onSubmit = (values: TUpdateCompanySchemaFE) => {
    execute({ companyId, data: values });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {mode === 'edit' ? t('edit_title') : t('view_title')}
          </h1>

          {mode === 'view' && isOwnerOrAdmin && (
            <Button onClick={handleEditMode}>{t('edit_button')}</Button>
          )}
          {mode === 'edit' && (
            <div className="flex">
              <Button onClick={() => setMode('view')}>{t('edit_button_cancel')}</Button>
              <LoadingButton
                variant="outline"
                type="submit"
                className="ml-2"
                disabled={!isDirty || !isValid}
                isLooading={isPending}
              >
                {t('edit_button_save')}
              </LoadingButton>
            </div>
          )}
        </div>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          defaultValue="basic"
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic"> {t('tabs.basic_info')}</TabsTrigger>
            <TabsTrigger value="contact">{t('tabs.contact_info')}</TabsTrigger>
            <TabsTrigger value="appearance">{t('tabs.appearance_info')}</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            {mode === 'view' ? (
              <BasicInfoView company={company} />
            ) : (
              <BasicInfoForm company={company} />
            )}
          </TabsContent>
          <TabsContent value="contact">
            {mode === 'view' ? (
              <ContactsView company={company} />
            ) : (
              <ContactsForm company={company} />
            )}
          </TabsContent>
          <TabsContent value="appearance">
            {mode === 'view' ? (
              <AppearanceView previewImage={previewImage} />
            ) : (
              <AppearanceForm
                form={form}
                // companyImageId={company}
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
              />
            )}
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};
