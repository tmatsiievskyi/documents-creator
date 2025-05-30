'use client';

import { icons } from '@/ui';
import { Button } from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { InviteCompanyMemberForm } from '../forms/company';

export const InviteCompanyMemberModal = ({
  companyId,
  setIsOpen,
  excludeCompany,
}: {
  companyId: string;
  setIsOpen(val: boolean): void;
  excludeCompany?: string;
}) => {
  const t = useTranslations('company.members');

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('invite_modal.title')}</DialogTitle>
        <DialogDescription>{t('invite_modal.description')}</DialogDescription>
      </DialogHeader>
      <InviteCompanyMemberForm
        companyId={companyId}
        setIsOpen={setIsOpen}
        excludeCompanyId={excludeCompany}
      />
    </>
  );
};

export const InviteCompanyMemberButton = ({
  companyId,
  excludeCompany,
}: {
  companyId: string;
  excludeCompany?: string;
}) => {
  const t = useTranslations('company.members');
  const [isOpen, setIsOpen] = useState(false);
  const AddUserIcon = icons['UserPlus'];
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <AddUserIcon />
          {t('invite_button')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <InviteCompanyMemberModal
          companyId={companyId}
          setIsOpen={setIsOpen}
          excludeCompany={excludeCompany}
        />
      </DialogContent>
    </Dialog>
  );
};
