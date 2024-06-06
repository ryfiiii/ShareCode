import * as z from "zod";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const IMAGE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

export const imagesSchema = z.object({
    images: z
        .custom<FileList>()
        .optional()  // 画像の添付は任意
        .refine((files) => files == null || files.length <= 1, {
            message: "添付できる画像ファイルは1枚までです",
        })
        .refine(
            (files) => files == null || Array.from(files).every((file) => file.size <= IMAGE_SIZE_LIMIT),
            { message: "添付できる画像ファイルは5MBまでです" },
        )
        .refine(
            (files) => files == null || Array.from(files).every((file) => IMAGE_TYPES.includes(file.type)),
            { message: "添付できる画像ファイルはjpgかpngです" },
        ),
});

export type ImagesSchema = z.infer<typeof imagesSchema>;
