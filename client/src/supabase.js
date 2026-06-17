import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://unpmrfrafdkyufvnjsfm.supabase.co';
const supabaseKey = 'sb_publishable_3_fY0Y4GvSJfpq7VrhQwQA_3F3w_foS';

export const supabase = createClient(supabaseUrl, supabaseKey);
