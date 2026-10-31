"use client";

/**
 * shadcn/ui-style Dialog built on Radix (focus trap, Esc to close,
 * scroll lock, focus returns to the button that opened it).
 */
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogContent({
  className,
  children,
  closeLabel = "Close dialog",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { closeLabel?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="dialog-overlay fixed inset-0 z-[80] bg-[var(--color-overlay)] backdrop-blur-md" />
      <DialogPrimitive.Content
        className={cn(
          "dialog-content fixed top-1/2 left-1/2 z-[81] max-h-[92dvh] w-[calc(100%-32px)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto",
          "rounded-box-lg border border-line bg-card shadow-2xl shadow-black/60",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label={closeLabel}
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-line bg-card-2 text-title transition-colors hover:border-line-strong"
        >
          <X aria-hidden="true" className="size-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
