import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dtgjdbethgqzmwbntpmq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0Z2pkYmV0aGdxem13Ym50cG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyNDQ5OTYsImV4cCI6MjA3MTgyMDk5Nn0.XO6-d4HXHGdpO48GMzFJbTI-Hl7I0YHQzZG6IwwUd_4'

export const supabase = createClient(supabaseUrl, supabaseKey)