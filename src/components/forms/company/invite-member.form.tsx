'use client';

import { LoadingButton } from '@/components/buttons';
import {
  inviteMemberDefaultValues,
  inviteMemberSchema,
  TInviteMemberSchema,
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

type TProps = {
  setIsOpen?: (val: boolean) => void;
  excludeCompanyId?: string;
};

export const InviteCompanyMemberForm = ({ setIsOpen, excludeCompanyId }: TProps) => {
  const [query, setQuery] = useState<string>('');
  const debouncedSearchValue = useDebounce(query, 300);
  const [searchResult, setSearchResult] = useState<Array<TUserWithProfile> | null>(null);
  const [selectedUser, setSelectedUser] = useState<TUserWithProfile | null>(null);
  const inputValue = selectedUser ? selectedUser.email : query;
  const minCharsToSearch = 3;

  const t = useTranslations('company.members.invite_modal');
  const form = useForm<TInviteMemberSchema>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: inviteMemberDefaultValues,
  });

  const { execute, isPending } = useServerAction(searchUsersAction);

  const handleSearchUser = useCallback(
    async (val: string): Promise<Array<TUserWithProfile> | null> => {
      const [data] = await execute({ email: val, excludeCompanyId });
      setSearchResult(data);

      return data;
    },
    [execute, excludeCompanyId]
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

  const handleSelectUser = (user: TUserWithProfile) => {
    if (!user.email) return;

    setSelectedUser(user);
    // setQuery(user.email);
    setSearchResult(null);
  };

  const renderSearchResult = useCallback(() => {
    if (!searchResult || (Array.isArray(searchResult) && searchResult.length === 0)) {
      // return <span className="p-2 text-sm text-muted-foreground">{t('not_found')}</span>;
      return null;
    }

    return (
      <ul className="text-2 max-h-60 overflow-auto py-1">
        {searchResult.map((user, index) => (
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
  }, [searchResult]);

  return (
    <Form {...form}>
      <form>
        <SearchComponent<TInviteMemberSchema, TUserWithProfile>
          inputValue={inputValue || ''}
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
          <LoadingButton isLooading={false} type="submit" className="ml-2" disabled={!selectedUser}>
            Send Invitation
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
