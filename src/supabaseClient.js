import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pdfrmttfpphwppornpzm.supabase.co'
const supabaseAnonKey = 'sb_publishable_HyGewvLYBj91jx1dchEQWA_q6T6OZH1'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)