import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { FormPostSchemaType } from "../Pages/posts-management";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { baseUrl } from "@/main";

type DialogAddPostProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: any;
  onSubmit: (data: FormPostSchemaType) => void;
  pending: boolean;
};

export const DialogAddPost = ({ open, setOpen, form, onSubmit, pending }: DialogAddPostProps) => {
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
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Tambah Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Post</DialogTitle>
          <DialogDescription>Masukkan data yang diperlukan. Lalu, klik simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4">
              <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
