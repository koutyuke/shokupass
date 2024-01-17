import { Image } from "#ui/components/web/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FileButton, Group, NumberInput, Switch, Textarea, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormType, formScheme } from "../createMenu/store";
import { uploadStorage } from "@/utils/supabase/storage/upload";

type Props = {
  onSubmit: (data: FormType) => void;
  defaultValues: Partial<FormType>;
  submitText: string;
};

const MenuFrom: FC<Props> = ({ onSubmit, defaultValues, submitText }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues,
    reValidateMode: "onChange",
    resolver: zodResolver(formScheme),
  });

  const [preview, setPreview] = useState<string | null>(defaultValues.image ?? null);

  return (
    <form
      className="flex h-fit w-full flex-col items-center gap-y-4"
      onSubmit={handleSubmit(data => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="relative flex w-full">
        <div className="flex w-1/2 flex-col items-center justify-center gap-y-4">
          <div className="aspect-square h-48 overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
            {preview && <Image src={preview} width={192} height={192} alt="preview" priority />}
          </div>
          <Group justify="center">
            <FileButton
              onChange={async (payload: File | null) => {
                if (payload) {
                  const url = await uploadStorage(payload, "pictures", "menu");
                  setPreview(url);
                  if (url) {
                    setValue("image", url);
                  }
                }
              }}
              accept="image/png,image/jpeg"
            >
              {props => <Button {...props}>画像を選ぶ</Button>}
            </FileButton>
            {preview !== null && (
              <Button
                variant="light"
                onClick={() => {
                  reset({
                    image: "",
                  });
                  setPreview(null);
                }}
              >
                リセット
              </Button>
            )}
          </Group>
          {errors.image?.message && <span className="text-sm text-red-400">Please select an image</span>}
        </div>
        <span className="absolute left-1/2 inline-block h-full w-[2px] rounded-full bg-gray-400" />
        <div className="box-border w-1/2 space-y-2 pb-6 pl-6 pr-4 pt-4">
          <TextInput
            label="商品名"
            withAsterisk
            placeholder="Ex: 商品A"
            error={errors.name?.message}
            {...register("name")}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <NumberInput
                label="価格(円)"
                placeholder="Ex: 1000"
                withAsterisk
                allowNegative={false}
                {...field}
                error={errors.price?.message}
              />
            )}
          />
          <Textarea
            label="説明文"
            placeholder="Ex: めっちゃうまいで!"
            {...register("description")}
            error={errors.description?.message}
          />
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <NumberInput
                label="在庫数"
                placeholder="Ex: 0"
                withAsterisk
                allowNegative={false}
                {...field}
                error={errors.quantity?.message}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch
                label="販売状態にする"
                color="green"
                onChange={changeValue => {
                  onChange(changeValue.currentTarget.checked ? "AVAILABLE" : "PREPARATION");
                }}
                checked={value === "AVAILABLE"}
              />
            )}
          />
        </div>
      </div>
      <div className="w-1/3">
        <Button variant="filled" fullWidth type="submit" aria-label="create new menu">
          {submitText}
        </Button>
      </div>
    </form>
  );
};

export { MenuFrom };
