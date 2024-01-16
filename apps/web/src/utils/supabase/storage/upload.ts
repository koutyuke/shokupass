import { v4 as uuidv4 } from "uuid";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

const uploadStorage = async (file: File, bucketName: string, folderName: string): Promise<string | null> => {
  const supabase = createBrowserSupabaseClient();
  const filePath = `${folderName}/${uuidv4()}.jpeg`; // 画像の保存先のpathを指定
  const { error, data: uploadData } = await supabase.storage.from(bucketName).upload(filePath, file, {
    contentType: "image/jpeg",
  });
  if (error) {
    return null;
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(uploadData.path);
  return data.publicUrl;
};

export { uploadStorage };
