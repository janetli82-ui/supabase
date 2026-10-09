import { createClient } from "@/lib/supabase/serverClient";
import AccountLinkClient from "../AccountLinksClient";

const AccountLinks = async () => {
  
  const supabase = await createClient()
  const {data:{user}} = await supabase.auth.getUser()
  return (
    <AccountLinkClient user={user} />
  );
};

export default AccountLinks;
