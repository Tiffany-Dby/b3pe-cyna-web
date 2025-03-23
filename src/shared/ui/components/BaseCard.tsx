import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { ReactNode } from "react";

type BaseCardProps = {
  title: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
};

const BaseCard = ({ title, description, content, footer }: BaseCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {content && <CardContent>{content}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default BaseCard;
