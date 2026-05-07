
drop policy "anyone can publish a shared explanation" on public.shared_explanations;

create policy "anyone can publish a shared explanation"
  on public.shared_explanations for insert
  with check (
    length(concept) between 1 and 300
    and length(system) between 1 and 80
    and length(explanation::text) <= 20000
  );
