import DefaultLayout from "@/components/layouts/default-layout";
import { TableModel } from "@/components/tables/table-model";
import { Payment, columns } from "@/components/tables/columns";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "489e1d42",
            amount: 125,
            status: "processing",
            email: "example@gmail.com",
        },
    ];
}

export default async function SchedulePage() {
    const data = await getData();

    return (
        <DefaultLayout title="Table">
            <TableModel columns={columns} data={data} />
        </DefaultLayout>
    );
}
