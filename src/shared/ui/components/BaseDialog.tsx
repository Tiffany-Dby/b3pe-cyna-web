import { useCategoriesStore } from "@/categories/store/categoriesStore";
import { Button } from "@/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/lib/components/ui/dialog";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description: React.ReactNode;
  srOnlyDescription?: boolean;
  children: React.ReactNode;
  showFooter?: boolean;
  buttons?: DialogButton[];
  showCancel?: boolean;
  cancelVariant?: DialogButton["variant"];
  cancelLabel?: React.ReactNode;
  autoCloseOnAction?: boolean;
};

type DialogButton = React.ComponentProps<typeof Button>;

const BaseDialog = ({
  open,
  onOpenChange,
  title,
  description,
  srOnlyDescription = false,
  children,
  showFooter = true,
  buttons,
  showCancel = true,
  cancelLabel = "dialog.actions.cancel",
  cancelVariant = "outline",
  autoCloseOnAction = true,
}: Props) => {
  const { t } = useTranslation();
  const { isLoading } = useCategoriesStore();

  const handleAction = async (
    btn: DialogButton,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (btn.onClick) await btn.onClick(event);
    if (autoCloseOnAction) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className={srOnlyDescription ? "sr-only" : ""}>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
        {showFooter && (
          <DialogFooter>
            {showCancel && (
              <Button
                variant={cancelVariant}
                onClick={() => onOpenChange(false)}
              >
                {typeof cancelLabel === "string" ? t(cancelLabel) : cancelLabel}
              </Button>
            )}
            {buttons?.map((button, index) => (
              <Button
                key={index}
                {...button}
                disabled={isLoading}
                onClick={(event) => handleAction(button, event)}
              >
                {isLoading ? t("dialog.actions.loading") : button.children}
              </Button>
            ))}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BaseDialog;
