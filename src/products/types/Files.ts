import { FILES, MAX_IMAGE_MB } from "@/products/constants/files";

type MaxFileMb = typeof MAX_IMAGE_MB;
type FilesOpts = (typeof FILES)[keyof typeof FILES];

export type { MaxFileMb, FilesOpts };
