import { Product } from "@/products/types/Products";
import BaseDialog from "@/shared/ui/components/BaseDialog";

type Props = {
  selected: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const UpdateProductDialog = ({ selected, open, onOpenChange }: Props) => {
  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={"Mise à jour"}
      description={"Modifier la base d'un produit"}
      buttons={[
        {
          children: "Modifier",
          onClick: () => console.log("clicked, selected:", selected),
        },
      ]}
    >
      <div className="py-4">
        <p>
          Mettre à
          <span className="font-black">&#171; {selected.name} &#187;</span> et
          toutes ses traductions ?
        </p>
      </div>
    </BaseDialog>
  );
};

export default UpdateProductDialog;
