import { Button } from "@/lib/components/ui/button";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { APP_ROUTES } from "@/shared/constants/routes";

const NotFoundView = () => {
  const navigate = useNavigate();

  return (
    <article>
      <Card className="w-full mx-auto my-10 max-w-100 text-center">
        <CardHeader className="py-6">
          <CardTitle>
            <h1 className="text-size-4xl">404</h1>
          </CardTitle>
          <CardDescription>
            <p className="text-size-2xl">Oops! Page introuvable.</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <Button onClick={() => navigate(APP_ROUTES.home)} variant="default">
            Retour à l'accueil
          </Button>
        </CardContent>
      </Card>
    </article>
  );
};

export default NotFoundView;
