'use client';

import { LoadingButton } from '@/components/buttons';
import {
  inviteMemberDefaultValues,
  inviteMemberSchemaFE,
  TInviteMemberSchemaFE,
} from '@/lib/zod/company-member.schema';
import { Button } from '@/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/ui';
import { useServerAction } from 'zsa-react';
import { SearchComponent } from '@/components/search';
import { useTranslations } from 'next-intl';
import { searchUsersAction } from '@/lib/zsa/actions/user.action';
import { TUserWithProfile } from '@/lib/zod/user-with-relations.schema';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { sendInviteToJoinAction } from '@/lib/zsa/actions/company.action';
import { toast } from 'sonner';

type TProps = {
  companyId: string;
  setIsOpen?: (val: boolean) => void;
  excludeCompanyId?: string;
};

export const InviteCompanyMemberForm = ({ companyId, setIsOpen, excludeCompanyId }: TProps) => {
  const [query, setQuery] = useState<string>('');
  const debouncedSearchValue = useDebounce(query, 300);
  const [searchResult, setSearchResult] = useState<Array<TUserWithProfile> | null>(null);
  const [selectedUser, setSelectedUser] = useState<TUserWithProfile | null>(null);
  const minCharsToSearch = 3;

  const t = useTranslations('company.members.invite_modal');
  const form = useForm<TInviteMemberSchemaFE>({
    resolver: zodResolver(inviteMemberSchemaFE),
    defaultValues: inviteMemberDefaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isValid },
    setValue,
    reset,
  } = form;

  const { execute: executeSearchUser, isPending } = useServerAction(searchUsersAction);
  const { execute: executeSendInvite, isPending: isSendingInvite } = useServerAction(
    sendInviteToJoinAction,
    {
      onSuccess: () => {
        toast.success(t('success_title'));
        reset();
        setQuery('');
        setSearchResult(null);
        setSelectedUser(null);
      },
      onError({ err }) {
        toast.error(t('error_title'), {
          description: err.message,
        });
        reset();
        setQuery('');
        setSearchResult(null);
        setSelectedUser(null);
      },
    }
  );

  const handleSearchUser = useCallback(
    async (val: string): Promise<Array<TUserWithProfile> | null> => {
      const [data] = await executeSearchUser({ email: val, excludeCompanyId });
      setSearchResult(data);
      return data;
    },
    [executeSearchUser, excludeCompanyId]
  );

  useEffect(() => {
    if (debouncedSearchValue) {
      if (debouncedSearchValue.length >= minCharsToSearch) {
        handleSearchUser(debouncedSearchValue);
      } else {
        setSearchResult(null);
      }
    }
  }, [debouncedSearchValue, handleSearchUser]);

  const handleSelectUser = useCallback(
    (user: TUserWithProfile) => {
      if (!user.email) return;

      setSelectedUser(user);
      setValue('email', user.email, { shouldValidate: true });
      setQuery(user.email);
      setSearchResult(null);
    },
    [setValue]
  );

  const handleSendInvite = () => {
    if (!selectedUser) return;

    executeSendInvite({ companyId, email: selectedUser.email });
  };

  const renderSearchResult = useCallback(() => {
    if (!searchResult || (Array.isArray(searchResult) && searchResult.length === 0)) {
      return null;
    }

    return (
      <ul className="text-2 max-h-60 overflow-auto py-1">
        {searchResult.map(user => (
          <li
            key={user.id}
            className="cursor-pointer border-b px-4 py-2 last:border-b-0 hover:bg-muted"
            onClick={() => handleSelectUser(user)}
          >
            <span className="flex items-center gap-3">
              {user.userProfile?.image && (
                <span
                  className="size-7 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${user.userProfile.image})` }}
                />
              )}
              <span className="flex flex-col">
                <span className="text-2">{user.email}</span>
                {user.userProfile?.fullName && (
                  <span className="text-2 text-muted-foreground">{user.userProfile.fullName}</span>
                )}
              </span>
            </span>
          </li>
        ))}
      </ul>
    );
  }, [searchResult, handleSelectUser]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSendInvite)}>
        <SearchComponent<TInviteMemberSchemaFE, TUserWithProfile>
          inputValue={query}
          setInputValue={setQuery}
          name="email"
          placeholder={t('input.placeholder')}
          isSearching={isPending}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          notFoundMessage={t('not_found')}
          renderSearchResult={renderSearchResult}
          selectedData={selectedUser}
          setSelectedData={setSelectedUser}
        />
        <div className="mt-8 flex justify-end">
          {setIsOpen && (
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          )}
          <LoadingButton
            isLooading={isSendingInvite}
            type="submit"
            className="ml-2"
            disabled={!selectedUser || !isValid}
          >
            Send Invitation
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
