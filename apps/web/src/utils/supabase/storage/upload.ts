import { v4 as uuidv4 } from "uuid";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

const uploadStorage = async (file: File, bucketName: string, folderName: string): Promise<string | null> => {
  const supabase = createBrowserSupabaseClient();
  const fileExt = file.name.split(".").pop();
  const filePath = `${folderName}/${uuidv4()}.${fileExt}`;
  const { error, data: uploadData } = await supabase.storage.from(bucketName).upload(filePath, file);
  if (error) {
    return null;
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(uploadData.path);
  return data.publicUrl;
};

export { uploadStorage };
