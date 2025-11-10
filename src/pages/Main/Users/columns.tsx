import { type Student } from "@/api/models/Student";
import { type ColumnDef } from "@tanstack/react-table";
import AddEdit from "./add-edit";
import DeleteProduct from "./delete";

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "id",
        header: "Student ID"
    },
    {
        accessorKey: "first_name",
        header: "First Name"
    },
    {
        accessorKey: "middle_name",
        header: "Middle Name"
    },
    {
        accessorKey: "last_name",
        header: "Last Name"
    },
    {
        accessorKey: "course.name",
        header: "Course"
    },
    {
        accessorFn: (row) => {
            if (row.subjects && row.subjects.length > 0) {
                return row.subjects.map(subject => subject.name).join(", ");
            }
            return "No subjects";
        },
        header: "Subjects",
        cell: ({ getValue }) => {
            const value = getValue() as string;
            return <div className="text-center">{value}</div>;
        }
    },
    {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({row}) =>{
            const student = row.original
            return (
                <div className="flex items-center flex-row justify-center gap-5">
                    <AddEdit btnType="edit" student={student}/> 
                    <DeleteProduct student={student}/>
                </div>
            )
        }
    }
]