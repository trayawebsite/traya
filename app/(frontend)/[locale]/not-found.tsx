import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {buttonVariants} from '@/components/ui/button';

// 404 inside the shell (header/footer come from the layout). English-only at
// launch, so copy is inline; lift to messages/NotFound when markets are added.
export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-section text-center">
      <p className="font-mono text-sm tracking-widest text-muted-foreground">404</p>
      <h1 className="mt-4 text-display-lg font-display text-foreground">Page not found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className={`${buttonVariants({variant: 'default', size: 'lg'})} mt-8`}>
        Back to home
      </Link>
    </Container>
  );
}
