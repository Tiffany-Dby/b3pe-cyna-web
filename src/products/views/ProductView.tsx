import BaseCarousel from "@/shared/ui/components/BaseCarousel";
import imgPlaceholder from "@/shared/assets/images/placeholder.jpg";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/components/ui/accordion";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import ProductStatusBadge from "@/products/ui/components/ProductStatusBadge";
import { ProductStatus } from "@/products/types/ProductStatus";
import { EuroIcon, SquareCheckBigIcon } from "lucide-react";
import { Separator } from "@/lib/components/ui/separator";

const product = {
  name: "Cyna EDR",
  slides: [imgPlaceholder, imgPlaceholder, imgPlaceholder],
  desciption: {
    title:
      "Extended Detection & Response - Votre centre de défense cyber unifié",
    content:
      "Détectez, analysez et neutralisez automatiquement les menaces avancées sur l’ensemble de votre infrastructure (endpoints, cloud, réseau) — sans complexité, 24/7, depuis une console SaaS sécurisée.",
  },
  benefits: [
    {
      title: "Visibilité complète",
      description:
        "Agrégation temps réel de données endpoint, cloud et réseau.",
    },
    {
      title: "Détection avancée",
      description:
        "IA & threat intelligence intégrées pour repérer les attaques zero‑day.",
    },
    {
      title: "Réponse automatisée",
      description:
        "Playbooks configurables pour contenir et neutraliser en un clic.",
    },
    {
      title: "Évolutivité sans limite",
      description:
        "Architecture cloud native, multi‑tenant, adaptée à toutes tailles d’entreprise.",
    },
  ],
  functionnalities: [
    "Surveillance 24/7 avec alertes push & e‑mail",
    "Threat hunting interactif (recherche ad hoc sur l’historique)",
    "Réponse orchestrée (isolation d’endpoint, blocage d’IP, rollback)",
    "Threat Intelligence partagée (flux MITRE ATT&CK, IOC auto‑mise à jour)",
    "Tableaux de bord personnalisables & reporting automatisé",
    "API & intégrations (SIEM, SOAR, Cloud, Ticketing)",
  ],
  specifications: [
    {
      criteria: "Disponibilité",
      description: "SLA 99,9 % (support 24/7)",
    },
    {
      criteria: "Scalabilité",
      description: "Jusqu’à 1M+ endpoints gérés",
    },
    {
      criteria: "Intégrations",
      description: "50+ (AWS, Azure, Splunk, ServiceNow…)",
    },
    {
      criteria: "Performance",
      description: "< 2s latence d’alerte",
    },
    {
      criteria: "Sécurité",
      description: "Chiffrement AES‑256 au repos & TLS 1.3 en transit",
    },
    {
      criteria: "Conformité",
      description: "GDPR, ISO27001, SOC 2 Type II",
    },
  ],
  price: 3000,
  status: 2,
};

const ProductView = () => {
  const disabled = product.status !== ProductStatus.Available;

  return (
    <article>
      <div className="container mx-auto flex flex-col gap-16 pt-4 pb-8">
        <div>
          <div className="flex flex-col gap-16 w-full max-w-3xl mx-auto px-4">
            <div>
              <div className="flex-between-center">
                <h1>{product.name}</h1>
                <ProductStatusBadge status={product.status} type={0} />
              </div>
              <div className="flex justify-end">
                <Button variant="secondary" disabled={disabled}>
                  Essayez maintenant
                </Button>
              </div>
            </div>
            <div className="flex-center-center">
              <BaseCarousel
                slides={product.slides}
                renderSlide={(slide) => (
                  <img
                    src={slide}
                    alt=""
                    className="w-full max-w-full h-full max-h-full object-center rounded-xl"
                  />
                )}
              />
            </div>
          </div>
        </div>
        <section>
          <div className="w-full max-w-3xl mx-auto px-4 flex flex-col gap-2">
            <h2>{product.desciption.title}</h2>
            <p>{product.desciption.content}</p>
          </div>
        </section>
        <section>
          <div className="w-full max-w-3xl mx-auto px-4">
            <Tabs defaultValue="one" className="flex flex-col gap-6">
              <TabsList className="w-full">
                <TabsTrigger value="one">Bénéfices</TabsTrigger>
                <TabsTrigger value="two">Fonctionnalités</TabsTrigger>
                <TabsTrigger value="three">Spécificités</TabsTrigger>
              </TabsList>
              <TabsContent value="one" className="flex flex-col gap-6">
                <h2>Pourquoi Cyna EDR ?</h2>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {product.benefits.map((elt, index) => (
                    <li key={index} className="w-full">
                      <Accordion
                        type="single"
                        collapsible
                        className="bg-primary text-primary-foreground border rounded-xl"
                      >
                        <AccordionItem value={`${index}`}>
                          <AccordionTrigger className="text-size-n items-center cursor-pointer px-4">
                            {elt.title}
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            {elt.description}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="two" className="flex flex-col gap-6">
                <h2>Fonctionnalités clés</h2>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {product.functionnalities.map((elt, index) => (
                    <li
                      key={index}
                      className="flex items-center w-full p-4 bg-primary text-primary-foreground rounded-xl shadow-sm shadow-primary/15 dark:shadow-lg border"
                    >
                      <p>{elt}</p>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="three" className="flex flex-col gap-6">
                <h2>Spécifications techniques</h2>
                <div className="rounded-xl border dark:border-white/20">
                  <Table>
                    <TableCaption className="sr-only">
                      Tableau des spécifications techniques
                    </TableCaption>
                    <TableHeader className="bg-muted">
                      <TableRow className="dark:border-white/20">
                        <TableHead className="border-r dark:border-white/20 px-6 rounded-tl-xl">
                          Critère
                        </TableHead>
                        <TableHead className="px-6 rounded-tr-xl">
                          Détail
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {product.specifications.map((elt, index) => (
                        <TableRow
                          key={index}
                          className="border-b dark:border-white/20"
                        >
                          <TableCell className="border-r dark:border-white/20 px-6">
                            {elt.criteria}
                          </TableCell>
                          <TableCell className="px-6">
                            {elt.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <div className="w-full max-w-3xl mx-auto">
          <Separator className="w-full max-w-1/2 mx-auto bg-muted" />
        </div>
        <section>
          <div className="w-full max-w-3xl mx-auto px-4 flex flex-col gap-6">
            <h2>Tarification</h2>
            <div className="flex-center-center flex-col gap-4 w-full sm:gap-0 sm:grid sm:grid-cols-3">
              <article className="w-full max-w-sm text-size-label sm:col-1 sm:row-1">
                <Card className="bg-transparent w-full justify-between sm:min-h-80 sm:pr-2">
                  <CardHeader>
                    <CardTitle className="flex-center-center flex-col">
                      <h3>Mensuel</h3>
                      <p className="w-fit relative">
                        <span className="text-size-4xl">
                          {product.price / 100}
                        </span>{" "}
                        <EuroIcon
                          size={18}
                          className="absolute top-0 left-full text-accent"
                        />
                        <span className="absolute bottom-0 left-full text-muted-foreground">
                          /mois
                        </span>
                      </p>
                    </CardTitle>
                    <CardDescription className="text-center text-size-label">
                      Facturé mensuellement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-2 justify-center w-full max-w-50 sm:max-w-none mx-auto sm:mx-0">
                      <li>
                        <SquareCheckBigIcon
                          size={16}
                          className="text-success float-left mr-2"
                        />{" "}
                        <p className="leading-4.5">Disponibilité immédiate</p>
                        <span className="clear-left"></span>
                      </li>
                      <li>
                        <SquareCheckBigIcon
                          size={16}
                          className="text-success float-left mr-2"
                        />{" "}
                        <p className="leading-4.5">Sans engagement</p>
                        <span className="clear-left"></span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button
                      className="w-full max-w-50 sm:max-w-none"
                      variant="outline"
                      disabled={disabled}
                    >
                      S'abonner
                    </Button>
                  </CardFooter>
                </Card>
              </article>
              <article className="w-full max-w-sm sm:max-w-3xs sm:z-10 sm:col-[1/-1] sm:row-1 sm:justify-self-center md:max-w-2xs">
                <Card className="bg-background w-full border-success/50 justify-between sm:min-h-96 sm:py-10">
                  <CardHeader>
                    <CardTitle className="flex-center-center flex-col">
                      <h3>Annuel</h3>
                      <p className="w-fit relative">
                        <span className="text-size-4xl">
                          {product.price / 100}
                        </span>{" "}
                        <EuroIcon
                          size={18}
                          className="absolute top-0 left-full text-accent"
                        />
                        <span className="absolute bottom-0 left-full text-muted-foreground">
                          /mois
                        </span>
                      </p>
                    </CardTitle>
                    <CardDescription className="relative flex-center-center w-fit mx-auto">
                      <span>
                        Facturé à l'année {(product.price * 12) / 100}{" "}
                      </span>
                      <EuroIcon
                        size={12}
                        className="absolute top-0.5 left-full"
                      />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-2 justify-center w-full max-w-50 sm:max-w-none mx-auto sm:mx-0">
                      <li>
                        <SquareCheckBigIcon
                          size={16}
                          className="text-success float-left mr-2"
                        />{" "}
                        <p className="leading-4.5">Disponibilité immédiate</p>
                        <span className="clear-left"></span>
                      </li>
                      <li>
                        <SquareCheckBigIcon
                          size={16}
                          className="text-success float-left mr-2"
                        />{" "}
                        <p className="leading-4.5">Sans engagement</p>
                        <span className="clear-left"></span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button
                      className="w-full max-w-50 sm:max-w-none"
                      variant="success"
                      disabled={disabled}
                    >
                      S'abonner
                    </Button>
                  </CardFooter>
                </Card>
              </article>
              <article className="w-full max-w-sm text-size-label sm:col-3 sm:row-1">
                <Card className="bg-transparent w-full justify-between sm:min-h-80 sm:pl-2">
                  <CardHeader>
                    <CardTitle className="flex-center-center flex-col">
                      <h3>Essai</h3>
                      <p className="w-fit relative">
                        <span className="text-size-4xl">0</span>{" "}
                        <EuroIcon
                          size={18}
                          className="absolute top-0 left-full text-accent"
                        />
                      </p>
                    </CardTitle>
                    <CardDescription className="text-center text-size-label">
                      Gratuit pendant 14 jours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-2 justify-center w-full max-w-50 sm:max-w-none mx-auto sm:mx-0">
                      <li>
                        <SquareCheckBigIcon
                          size={16}
                          className="text-success float-left mr-2"
                        />{" "}
                        <p className="leading-4.5">Disponibilité immédiate</p>
                        <span className="clear-left"></span>
                      </li>
                      <li>
                        <SquareCheckBigIcon
                          size={16}
                          className="text-success float-left mr-2"
                        />{" "}
                        <p className="leading-4.5">Sans engagement</p>
                        <span className="clear-left"></span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button
                      className="w-full max-w-50 sm:max-w-none"
                      variant="outline"
                      disabled={disabled}
                    >
                      Essayer
                    </Button>
                  </CardFooter>
                </Card>
              </article>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default ProductView;
