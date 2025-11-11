import { fetchUsers } from "@/api/studentsAPI";
import { DataTable } from "@/components/data-table"
import { useQuery } from "@tanstack/react-query"
import { columns } from "./columns"
import AddEdit from "./add-edit"


function Students() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    })

    console.log(data)
    if (isLoading) return <h1 className="text-6xl">Loading...</h1>

    if (error) {
        return (
            <div>Error: <br /> {error.message} </div>
        )
    }

    return (
        <>
            <h1 style={{fontFamily: 'fantasy', fontSize: '30px'}}>Students Page</h1>
            <div className="flex flex-col gap-2 rounded-lg">
                <div className="flex-row-reverse flex">
                    <AddEdit btnType="add" />
                </div>
                <div className="container">
                    <DataTable columns={columns} data={data ?? []}/>
                </div>

            </div>
        </>
    )
}

export default Students