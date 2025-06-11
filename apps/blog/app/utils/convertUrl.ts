// [todo] fix this
export default function convertUrl(supabaseUrl?: string) {
  if (!supabaseUrl) {
    return "";
  }

  const supabasePrefix =
    "https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/postImages/";
  const rheiPrefix = "https://rhei.me/images/";

  if (supabaseUrl.startsWith(supabasePrefix)) {
    const relativePath = supabaseUrl.slice(supabasePrefix.length);

    return `${rheiPrefix}${relativePath}`;
  }

  return supabaseUrl;
}
