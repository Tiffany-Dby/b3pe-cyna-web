import { Button } from "@/lib/components/ui/button";

type MenuBurgerProps = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const MenuBurger = ({ isOpen, onOpenChange }: MenuBurgerProps) => {
  return (
    <Button
      className={`burger${isOpen ? " burger--open" : ""}`}
      onClick={onOpenChange}
      aria-label="Burger menu"
    >
      <span></span>
    </Button>
  );
};

export default MenuBurger;
