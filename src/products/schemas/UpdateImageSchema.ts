import { z } from "zod";
import { FILES } from "@/products/constants/files";

const UpdateImageSchema = z.object({
  productId: z.string().min(1, "Product Id required"),
  image: z
    .instanceof(File, { message: "common:inputs.productImage.validation.min" })
    .refine((file) => file.size <= FILES.MAX_IMAGE_SIZE, {
      message: "common:inputs.productImage.validation.maxSize",
    })
    .refine(
      (file) => FILES.ACCEPTED_IMAGE_MIMETYPES.includes(file.type),
      "common:inputs.productImage.validation.mimeTypes"
    ),
});

export { UpdateImageSchema };
export type UpdateImageData = z.infer<typeof UpdateImageSchema>;
