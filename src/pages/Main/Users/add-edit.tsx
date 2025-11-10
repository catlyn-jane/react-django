import type { Student } from "@/api/models/Student";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil, Plus } from "lucide-react"
import { useState } from "react"
import { z } from 'zod'
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addeditUsers, fetchCourses, fetchSubjects } from "@/api/studentsAPI"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query";


const formSchema = z.object({
    first_name: z
        .string()
        .min(1, {
            error: "first_name is required"
        })
        .max(50, {
            error: "first_name max length is 50 characters"
        }),
    middle_name: z
        .string()
        .optional(),
    last_name: z
        .string()
        .min(1, {
            error: "last_name is required"
        })
        .max(50, {
            error: "last_name max length is 50 characters"
        }),
    course: z
        .string()
        .min(1, {
            error: "course is required"
        })
        .max(50, {
            error: "course max length is 50 characters"
        }),
    subjects: z
        .string()
        .min(1, {
            error: "subject is required"
        })
        .max(50, {
            error: "subject max length is 50 characters"
        })
})


const AddEdit = ({ btnType, student }: { btnType: string, student?: Student }) => {
    const [open, setOpen] = useState<boolean>(false)

    const queryClient = useQueryClient()

    const { data: courses = [] } = useQuery({
        queryKey: ['courses'],
        queryFn: fetchCourses,
        enabled: open
    })

    const { data: subjects = [] } = useQuery({
        queryKey: ['subjects'],
        queryFn: fetchSubjects,
        enabled: open
    })

    const mutation = useMutation({
        mutationFn: ({data, methodType}:{ data: {id?: string, first_name?:string, middle_name?: string, last_name?: string, course?: any, subjects?: any}, methodType: string}) => addeditUsers(data, methodType),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['students']})
            toast.success(`Student: ${btnType === "add" ? "added!": `ID ${student?.id} updated!`}`)
            setOpen(false)
            
        },
        onError: (error) =>{
            console.log(error)
        }
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const onOpen = () => {
        setOpen(!open)
        form.reset()

        form.setValue("first_name", student?.first_name ?? "")
        form.setValue("middle_name", student?.middle_name ?? "")
        form.setValue("last_name", student?.last_name ?? "")
        form.setValue("course", student?.course?.id?.toString() ?? "")
        form.setValue("subjects", student?.subjects?.[0]?.id?.toString() ?? "")
    }

    const onSubmit = (data: z.infer<typeof formSchema>) =>{
        
        const method = btnType === 'add' ? "POST" : "PATCH"
        
        const newData = {
            id : student?.id.toString() ?? undefined,
            first_name: (data.first_name === student?.first_name ? undefined : data.first_name),
            middle_name: (data.middle_name === student?.middle_name ? undefined : data.middle_name),
            last_name: (data.last_name === student?.last_name ? undefined : data.last_name),
            course: (data.course === student?.course ? undefined : data.course),
            subjects: (data.subjects === student?.subjects ? undefined : data.subjects)
        }
        console.log(newData)
        mutation.mutate({data: newData, methodType: method})
    }
    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogTrigger asChild>
                <Button >
                    {btnType === "add" ? (<><Plus /> ADD STUDENT</>) : (<><Pencil /> UPDATE</>)}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="border-b-2 border-black">
                    <DialogTitle className="text-4xl">
                        {btnType === "add" ? "Add a student" : `Update student ID: ${student?.id}`}
                    </DialogTitle>
                </DialogHeader>
                <form id="user-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="first_name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="first_name">
                                        first_name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="first_name"
                                        aria-invalid={fieldState.invalid}

                                    />
                                    {
                                        fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )
                                    }
                                </Field>
                            )}
                        />
                        <Controller
                            name="middle_name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="middle_name">
                                        middle_name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="middle_name"
                                        aria-invalid={fieldState.invalid}

                                    />
                                    {
                                        fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )
                                    }
                                </Field>
                            )}
                        />
                        <Controller
                            name="last_name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="last_name">
                                        last_name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="last_name"
                                        aria-invalid={fieldState.invalid}

                                    />
                                    {
                                        fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )
                                    }
                                </Field>
                            )}
                        />
                        <Controller
                            name="course"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="course">Course</FieldLabel>
                                    <select 
                                        {...field} 
                                        id="course"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Select a course</option>
                                        {courses.map((course: any) => (
                                            <option key={course.id} value={course.id}>
                                                {course.name}
                                            </option>
                                        ))}
                                    </select>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="subjects"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="subjects">Subject</FieldLabel>
                                    <select 
                                        {...field} 
                                        id="subjects"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Select a subject</option>
                                        {subjects.map((subject: any) => (
                                            <option key={subject.id} value={subject.id}>
                                                {subject.name}
                                            </option>
                                        ))}
                                    </select>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <Field orientation="horizontal">
                        <Button type="submit" form="user-form" className="w-full">
                            Submit
                        </Button>
                    </Field>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddEdit