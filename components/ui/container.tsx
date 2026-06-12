import {cn} from '@/lib/utils';

// Width + horizontal-padding primitive. Every section uses this, so global
// page width / gutters change in exactly one place (--container-page token).
export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('mx-auto w-full max-w-page px-6 md:px-10 lg:px-16', className)} {...props}>
      {children}
    </div>
  );
}
