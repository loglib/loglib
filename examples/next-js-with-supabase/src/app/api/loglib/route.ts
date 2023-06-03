import { supabaseAdapter } from "@loglib/supabase-adapter"
import { createServerRoutes } from "@loglib/next"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string)

export const { POST, GET } = createServerRoutes({
    adapter: supabaseAdapter(supabase),
    environment: "test",
    disableLocation: true
})