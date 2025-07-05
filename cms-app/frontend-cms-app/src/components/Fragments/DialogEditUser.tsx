import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FormSchemaType } from "../Pages/users-management";
import { useEffect } from "react";

type DialogEditUserProps = {
  open: boolean;
  setOpenEdit: (open: boolean) => void;
  formEdit: any;
  onSubmitEdit: (data: FormSchemaType) => void;
  pending: boolean;
  user: FormSchemaType | null;
  isExistSuperAdmin: boolean;
};

export const DialogEditUser = ({ open, setOpenEdit, formEdit, onSubmitEdit, pending, user, isExistSuperAdmin }: DialogEditUserProps) => {
  useEffect(() => {
    if (user && open) {
      formEdit.reset(user);
    }
  }, [user, open, formEdit]);
  return (
    <Dialog open={open} onOpenChange={setOpenEdit}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Perbarui data user lalu klik simpan.</DialogDescription>
        </DialogHeader>

        <Form {...formEdit}>
          <form onSubmit={formEdit.handleSubmit(onSubmitEdit)} className="grid gap-4">
            <FormField
              control={formEdit.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formEdit.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formEdit.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formEdit.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peran</FormLabel>
                  <Select value={String(field.value)} onValueChange={(val) => field.onChange(Number(val))}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih peran" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1" disabled={isExistSuperAdmin}>
                          Super Admin
                        </SelectItem>
                        <SelectItem value="2">Admin</SelectItem>
                        <SelectItem value="3">Editor</SelectItem>
                        <SelectItem value="4">Author</SelectItem>
                        <SelectItem value="5">Member</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
