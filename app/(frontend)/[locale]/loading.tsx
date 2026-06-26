import {Container} from '@/components/ui/container';

export default function Loading() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-section text-center">
      <div className="size-10 animate-spin rounded-full border-[3px] border-traya-border border-t-traya-red" />
      <p className="mt-6 text-sm uppercase tracking-[0.16em] text-muted-foreground">
        Loading…
      </p>
    </Container>
  );
}
