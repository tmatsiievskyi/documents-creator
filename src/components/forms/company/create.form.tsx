'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { RHFInput, RHFTextarea } from '@/lib/rhf';
import { useState } from 'react';
import { Button } from '@/ui/button';
import { LoadingButton } from '@/components/buttons';
import { useServerAction } from 'zsa-react';
import { createCompanyAction } from '@/app/[locale]/(platform)/settings/company/create/actions';
import { toast } from 'sonner';

// import { AppearanceForm } from './components';
import { createCompanyDefaultValues, createCompanySchema, TCreateCompanySchema } from '@/lib/zod';

export const CreateCompanyForm = () => {
  const [activeTab, setActiveTab] = useState('basic');
  // const [previewImage, setPreviewImage] = useState<string | null>(null);
  const t = useTranslations('forms.create_edit_view_company');
  const form = useForm<TCreateCompanySchema>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: createCompanyDefaultValues,
  });
  const { execute, isPending } = useServerAction(createCompanyAction, {
    onSuccess() {
      toast.success(t('created_success'));
    },
    onError({ err }) {
      toast.error('Something went wrong', {
        description: err.message,
      });
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = (values: TCreateCompanySchema) => {
    execute(values);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const goToNextTab = () => {
    if (activeTab === 'basic') setActiveTab('contact');
    else if (activeTab === 'contact') setActiveTab('appearance');
  };

  const goToPreviousTab = () => {
    if (activeTab === 'appearance') setActiveTab('contact');
    else if (activeTab === 'contact') setActiveTab('basic');
  };

  const hasErrorsInTabs = (tabName: string) => {
    if (tabName === 'basic') {
      return !!errors.name;
    } else if (tabName === 'contact') {
      return !!errors.email || !!errors.phone || errors.website;
    } else if (tabName === 'appearance') {
      return !!errors.companyImage;
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs
          defaultValue="basic"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">
              {t('tabs.basic_info')}
              {hasErrorsInTabs('basic') && <span className="ml-2 text-red-500">!</span>}
            </TabsTrigger>
            <TabsTrigger value="contact">
              {t('tabs.contact_info')}
              {hasErrorsInTabs('contact') && <span className="ml-2 text-red-500">!</span>}
            </TabsTrigger>
            <TabsTrigger value="appearance">
              {t('tabs.appearance_info')}
              {hasErrorsInTabs('appearance') && <span className="ml-2 text-red-500">!</span>}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="mt-6">
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
            <div className="mt-4 flex justify-end">
              <Button type="button" onClick={goToNextTab}>
                Next: Contact Info
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="contact" className="mt-6">
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
                <h3 className="text-lg font-medium">Company Address</h3>
                <p className="text-sm text-muted-foreground">
                  The physical location of your company.
                </p>
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
            <div className="mt-4 flex justify-between">
              <Button type="button" variant="outline" onClick={goToPreviousTab}>
                {t('button_back_basic')}
              </Button>
              <Button type="button" onClick={goToNextTab}>
                {t('button_next_appearance')}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="appearance" className="mt-6">
            {/* <AppearanceForm previewImage={previewImage} setPreviewImage={setPreviewImage} />  TODO: make it work with form and file type */}
            <div className="mt-4 flex justify-between">
              <Button type="button" variant="outline" onClick={goToPreviousTab}>
                {t('button_back_info')}
              </Button>

              <LoadingButton type="submit" isLooading={isPending}>
                {t('button_submit')}
              </LoadingButton>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};
