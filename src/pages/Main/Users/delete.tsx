"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import type { Student } from "@/api/models/Student"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "@/api/studentsAPI"
import { toast } from "sonner"

export default function DeleteProduct({ student }: { student: Student }) {
    const [open, setOpen] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] })
            toast.success(`Student ${student.first_name} deleted!`)
            setOpen(false)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const handleDelete = () => {
        mutation.mutate(student.id.toString())
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" >
                    <Trash2 /> DELETE
                </Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => { e.preventDefault() }}>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete Student: <b>{student.first_name}</b>?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="destructive" className="ml-2" onClick={handleDelete}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    )

}