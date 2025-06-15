import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type BaseCardProps = {
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

const BaseCard = ({
  title,
  description,
  content,
  footer,
  className,
}: BaseCardProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {content && <CardContent className="flex-[1_0]">{content}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default BaseCard;
