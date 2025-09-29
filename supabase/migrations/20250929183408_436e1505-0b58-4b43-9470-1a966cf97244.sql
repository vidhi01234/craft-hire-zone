-- Fix search_path for trigger functions
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

CREATE OR REPLACE FUNCTION public.handle_new_review()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.update_worker_rating(NEW.reviewee_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;