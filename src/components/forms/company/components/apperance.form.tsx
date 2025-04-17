import { RHFUpload } from '@/lib/rhf';
import { TUpdateCompanySchemaFE } from '@/lib/zod';
import { MAX_UPLOAD_IMAGE_SIZE } from '@/shared/constants';
import { icons } from '@/ui';
import { Button } from '@/ui/button';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';

export const AppearanceForm = ({
  previewImage,
  setPreviewImage,
  form,
}: {
  previewImage: string | null;
  setPreviewImage: (img: string | null) => void;
  form: UseFormReturn<TUpdateCompanySchemaFE>;
}) => {
  const ImageIcon = icons['ImageIcon'];
  const XIcon = icons['X'];

  const handleImageChange = (e: Array<File>) => {
    const img = e[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreviewImage(base64String);

      form.setValue('companyImage', img, { shouldValidate: true, shouldDirty: true });
    };
    reader.readAsDataURL(img);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    form.setValue('companyImage', null, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="mt-6 flex flex-col items-center justify-center space-y-4">
      {previewImage ? (
        <div className="relative">
          <Image
            height={192}
            width={192}
            src={previewImage}
            className="mb-4 size-48 rounded-xl border object-contain"
            alt="Company Logo"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2 size-6 rounded-full"
            onClick={handleRemoveImage}
          >
            <XIcon className="size-4 text-white" />
            {/* <p>Delete</p> */}
          </Button>
        </div>
      ) : (
        <div className="mb-4 flex size-48 flex-col items-center justify-center rounded-xl border-2 border-dashed">
          <ImageIcon className="mb-2 size-12 text-muted-foreground" />
          <p className="text-2 text-center text-muted-foreground">No image uploaded</p>
        </div>
      )}
      <RHFUpload
        name="companyImage"
        buttonText="Upload Logo"
        accept="image/*"
        maxSize={MAX_UPLOAD_IMAGE_SIZE}
        onFileSelect={files => handleImageChange(files)}
      />
    </div>
  );
};

export const AppearanceView = ({ previewImage }: { previewImage: string | null }) => {
  const ImageIcon = icons['ImageIcon'];

  return (
    <div className="mt-6 flex flex-col items-center justify-center space-y-4">
      {previewImage ? (
        <Image
          height={192}
          width={192}
          src={previewImage}
          className="mb-4 size-48 rounded-xl object-contain"
          alt="Company Logo"
        />
      ) : (
        <div className="mb-4 flex size-48 flex-col items-center justify-center rounded-xl border-2 border-dashed">
          <ImageIcon className="mb-2 size-12 text-muted-foreground" />
          <p className="text-2 text-center text-muted-foreground">No image uploaded</p>
        </div>
      )}
    </div>
  );
};
