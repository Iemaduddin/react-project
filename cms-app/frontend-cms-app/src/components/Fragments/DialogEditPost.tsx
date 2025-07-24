import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { FormPostSchemaType } from "../Pages/posts-management";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { baseUrl } from "@/main";

type DialogEditPostProps = {
  open: boolean;
  setOpenEdit: (open: boolean) => void;
  formEdit: any;
  onSubmitEdit: (data: FormPostSchemaType) => void;
  pending: boolean;
  post: FormPostSchemaType | null;
};

export const DialogEditPost = ({ open, setOpenEdit, formEdit, onSubmitEdit, pending, post }: DialogEditPostProps) => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const urlBase = baseUrl;

  const fetchCategories = () => {
    fetch(`${urlBase}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.error("Gagal mengambil kategori:", err);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    if (post && open) {
      formEdit.reset(post);
    }
  }, [post, open, formEdit]);
  return (
    <Dialog open={open} onOpenChange={setOpenEdit}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Perbarui data post lalu klik simpan.</DialogDescription>
        </DialogHeader>

        <Form {...formEdit}>
          <form onSubmit={formEdit.handleSubmit(onSubmitEdit)} className="grid gap-4">
            <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4">
              <FormField
                control={formEdit.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kategori</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Judul" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formEdit.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formEdit.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konten</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Masukkan isi konten" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formEdit.control}
                name="thumbnail"
                render={({ field: { onChange, ref } }) => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file);
                            if (file) {
                              // Cleanup previous preview jika ada
                              if (previewUrl) {
                                URL.revokeObjectURL(previewUrl);
                              }
                              setPreviewUrl(URL.createObjectURL(file));
                            } else {
                              // Jika tidak ada file, reset preview
                              if (previewUrl) {
                                URL.revokeObjectURL(previewUrl);
                              }
                              setPreviewUrl(null);
                            }
                          }}
                          ref={ref}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 h-32 object-cover rounded" />}
              <FormField
                control={formEdit.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="publish">Publish</SelectItem>
                          <SelectItem value="trash">Trash</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formEdit.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select value={field.value?.toString()} onValueChange={(val) => field.onChange(Number(val))}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {categories?.length > 0 ? (
                            categories.map((category) => (
                              <SelectItem key={category.id} value={String(category.id)}>
                                {category.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="text-sm text-gray-500 px-4 py-2">Tidak ada kategori</div>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Batal
                </Button>
              </DialogClose>
              <Button variant="primary" type="submit" disabled={pending}>
                {pending ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
