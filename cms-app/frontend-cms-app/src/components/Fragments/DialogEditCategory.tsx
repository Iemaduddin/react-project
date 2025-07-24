import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { FormCategorySchemaType } from "../Pages/category-management";
import { useEffect } from "react";

type DialogEditCategoryProps = {
  open: boolean;
  setOpenEdit: (open: boolean) => void;
  formEdit: any;
  onSubmitEdit: (data: FormCategorySchemaType) => void;
  pending: boolean;
  category: FormCategorySchemaType | null;
};

export const DialogEditCategory = ({ open, setOpenEdit, formEdit, onSubmitEdit, pending, category }: DialogEditCategoryProps) => {
  useEffect(() => {
    if (category && open) {
      formEdit.reset(category);
    }
  }, [category, open, formEdit]);
  return (
    <Dialog open={open} onOpenChange={setOpenEdit}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Perbarui data category lalu klik simpan.</DialogDescription>
        </DialogHeader>

        <Form {...formEdit}>
          <form onSubmit={formEdit.handleSubmit(onSubmitEdit)} className="grid gap-4">
            <FormField
              control={formEdit.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kategori</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama lengkap" {...field} />
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
